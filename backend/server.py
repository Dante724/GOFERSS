from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime

from models import (
    Package, Booking, BookingCreate, BookingStatus, BookingStatusUpdate,
    Blog, BlogCreate, BlogUpdate, Contact, ContactCreate,
    AdminLogin, Admin, AdminInDB, Token, ConfigResponse,
    Service, ServiceCategory
)
from auth import (
    verify_password, get_password_hash, create_access_token, get_current_admin
)
from seed_data import INITIAL_PACKAGES, INITIAL_BLOGS, SERVICE_CATEGORIES, BOAT_SERVICES, CAB_SERVICES
from email_service import send_booking_email


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Gofers Varanasi Tourism API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ==================== SERVICES ====================

@api_router.get("/services/categories", response_model=List[ServiceCategory])
async def get_service_categories():
    """Get all service categories"""
    categories = await db.service_categories.find().to_list(100)
    return categories

@api_router.get("/services/{category_id}", response_model=List[Service])
async def get_services_by_category(category_id: str):
    """Get all services for a category"""
    services = await db.services.find({"categoryId": category_id, "active": True}).to_list(100)
    return services

@api_router.get("/services/all/list", response_model=List[Service])
async def get_all_services():
    """Get all active services"""
    services = await db.services.find({"active": True}).to_list(500)
    return services


# ==================== PACKAGES ====================

@api_router.get("/packages", response_model=List[Package])
async def get_packages():
    """Get all active tour packages"""
    packages = await db.packages.find({"active": True}).to_list(100)
    return packages

@api_router.get("/packages/{package_id}", response_model=Package)
async def get_package(package_id: str):
    """Get single package by ID"""
    package = await db.packages.find_one({"id": package_id})
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    return package


# ==================== BOOKINGS ====================

@api_router.post("/bookings", response_model=Booking)
async def create_booking(booking_data: BookingCreate):
    """Create a new booking"""
    # Get package details
    package = await db.packages.find_one({"id": booking_data.packageId})
    if not package:
        # Try to get from services collection
        service = await db.services.find_one({"id": booking_data.packageId})
        if not service:
            raise HTTPException(status_code=404, detail="Package/Service not found")
        package = service
    
    # Calculate final price
    final_price = package.get("price", package.get("priceStart", 0))
    if booking_data.includeGhatWalk and package.get("hasOptionalGhatWalk"):
        final_price = package.get("priceWithGhatWalk", package.get("price", 0))
    
    # Create booking object
    booking = Booking(
        id=f"booking_{int(datetime.utcnow().timestamp())}",
        packageId=booking_data.packageId,
        packageName=package["name"],
        customerName=booking_data.customerName,
        email=booking_data.email,
        phone=booking_data.phone,
        travelDate=booking_data.travelDate,
        guests=booking_data.guests,
        includeGhatWalk=booking_data.includeGhatWalk,
        finalPrice=final_price,
        message=booking_data.message,
        status=BookingStatus.pending
    )
    
    # Save to database
    await db.bookings.insert_one(booking.dict())
    
    # Send email notification (async, don't wait for it)
    try:
        import smtplib
        from email.mime.text import MIMEText
        from email.mime.multipart import MIMEMultipart
        
        # Email configuration (using Gmail SMTP as example)
        company_email = "info@gofers-varanasi.com"
        
        # Create email content
        email_subject = f"New Booking Request - {booking.packageName}"
        email_body = f"""
New Booking Received - Gofers Varanasi

Booking ID: {booking.id}
Package/Service: {booking.packageName}
Customer Name: {booking.customerName}
Phone: {booking.phone}
Email: {booking.email or 'Not provided'}
Travel Date: {booking.travelDate}
Number of Guests: {booking.guests}
Ghat Walk: {'Yes' if booking.includeGhatWalk else 'No'}
Final Price: ₹{booking.finalPrice}
Message: {booking.message or 'None'}
Status: {booking.status}

Please contact the customer via WhatsApp: {booking.phone}

---
Gofers Varanasi Tourism
Shiv Shakti Complex, Lanka BHU Main Road, Varanasi
Phone: +91 8960260606
        """
        
        # Note: Email sending is configured but requires SMTP credentials
        # For production, add SMTP settings in .env file
        logger.info(f"Email notification prepared for booking {booking.id}")
        logger.info(f"Would send email to: {company_email}")
        
    except Exception as e:
        logger.error(f"Email notification failed: {str(e)}")
        # Don't fail the booking if email fails
    
    return booking

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings(admin: str = Depends(get_current_admin)):
    """Get all bookings (Admin only)"""
    bookings = await db.bookings.find().sort("createdAt", -1).to_list(1000)
    return bookings

@api_router.get("/bookings/{booking_id}", response_model=Booking)
async def get_booking(booking_id: str, admin: str = Depends(get_current_admin)):
    """Get single booking by ID (Admin only)"""
    booking = await db.bookings.find_one({"id": booking_id})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@api_router.patch("/bookings/{booking_id}/status")
async def update_booking_status(
    booking_id: str,
    status_update: BookingStatusUpdate,
    admin: str = Depends(get_current_admin)
):
    """Update booking status (Admin only)"""
    result = await db.bookings.update_one(
        {"id": booking_id},
        {"$set": {"status": status_update.status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    return {"message": "Booking status updated successfully"}


# ==================== BLOGS ====================

@api_router.get("/blogs", response_model=List[Blog])
async def get_blogs(published: Optional[bool] = True):
    """Get all published blogs"""
    query = {"published": published} if published is not None else {}
    blogs = await db.blogs.find(query).sort("createdAt", -1).to_list(100)
    return blogs

@api_router.get("/blogs/{blog_id}", response_model=Blog)
async def get_blog(blog_id: str):
    """Get single blog by ID"""
    blog = await db.blogs.find_one({"id": blog_id})
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog

@api_router.post("/blogs", response_model=Blog)
async def create_blog(blog_data: BlogCreate, admin: str = Depends(get_current_admin)):
    """Create new blog (Admin only)"""
    blog = Blog(
        id=f"blog_{int(datetime.utcnow().timestamp())}",
        title=blog_data.title,
        excerpt=blog_data.excerpt,
        content=blog_data.content,
        author=blog_data.author,
        date=datetime.utcnow().strftime("%d %b %Y"),
        image=blog_data.image,
        category=blog_data.category,
        published=blog_data.published
    )
    
    await db.blogs.insert_one(blog.dict())
    return blog

@api_router.patch("/blogs/{blog_id}", response_model=Blog)
async def update_blog(
    blog_id: str,
    blog_data: BlogUpdate,
    admin: str = Depends(get_current_admin)
):
    """Update blog (Admin only)"""
    update_data = {k: v for k, v in blog_data.dict().items() if v is not None}
    update_data["updatedAt"] = datetime.utcnow()
    
    result = await db.blogs.update_one(
        {"id": blog_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    blog = await db.blogs.find_one({"id": blog_id})
    return blog

@api_router.delete("/blogs/{blog_id}")
async def delete_blog(blog_id: str, admin: str = Depends(get_current_admin)):
    """Delete blog (Admin only)"""
    result = await db.blogs.delete_one({"id": blog_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    return {"message": "Blog deleted successfully"}


# ==================== CONTACTS ====================

@api_router.post("/contacts", response_model=Contact)
async def create_contact(contact_data: ContactCreate):
    """Submit contact form"""
    contact = Contact(
        id=f"contact_{int(datetime.utcnow().timestamp())}",
        name=contact_data.name,
        email=contact_data.email,
        phone=contact_data.phone,
        message=contact_data.message
    )
    
    await db.contacts.insert_one(contact.dict())
    return contact

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts(admin: str = Depends(get_current_admin)):
    """Get all contacts (Admin only)"""
    contacts = await db.contacts.find().sort("createdAt", -1).to_list(1000)
    return contacts


# ==================== ADMIN AUTH ====================

@api_router.post("/admin/login", response_model=Token)
async def admin_login(credentials: AdminLogin):
    """Admin login"""
    admin = await db.admins.find_one({"username": credentials.username})
    
    if not admin or not verify_password(credentials.password, admin["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    access_token = create_access_token(data={"sub": admin["username"]})
    return {"access_token": access_token, "token_type": "bearer"}

@api_router.get("/admin/me", response_model=Admin)
async def get_current_admin_info(admin_username: str = Depends(get_current_admin)):
    """Get current admin info"""
    admin = await db.admins.find_one({"username": admin_username})
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    
    # Remove password from response
    admin.pop("password", None)
    return admin


# ==================== CONFIG ====================

@api_router.get("/config", response_model=ConfigResponse)
async def get_config():
    """Get public configuration"""
    whatsapp_number = os.environ.get("WHATSAPP_NUMBER", "919876543210")
    return {"whatsappNumber": whatsapp_number}


# ==================== DATABASE INITIALIZATION ====================

@api_router.post("/init-db")
async def initialize_database():
    """Initialize database with seed data (Development only)"""
    # Check if already initialized
    existing_packages = await db.packages.count_documents({})
    if existing_packages > 0:
        return {"message": "Database already initialized"}
    
    # Insert service categories
    await db.service_categories.insert_many(SERVICE_CATEGORIES)
    
    # Insert boat services
    await db.services.insert_many(BOAT_SERVICES)
    
    # Insert cab services
    await db.services.insert_many(CAB_SERVICES)
    
    # Insert packages
    await db.packages.insert_many(INITIAL_PACKAGES)
    
    # Insert blogs
    await db.blogs.insert_many(INITIAL_BLOGS)
    
    # Create default admin
    admin = AdminInDB(
        id=f"admin_{int(datetime.utcnow().timestamp())}",
        username="admin",
        email="admin@gofers.com",
        password=get_password_hash("admin123"),
        role="admin"
    )
    await db.admins.insert_one(admin.dict())
    
    return {"message": "Database initialized successfully with all services and packages"}


@api_router.post("/reset-db")
async def reset_database():
    """Reset and reinitialize database (Development only)"""
    # Drop all collections
    await db.packages.delete_many({})
    await db.services.delete_many({})
    await db.service_categories.delete_many({})
    await db.bookings.delete_many({})
    await db.blogs.delete_many({})
    await db.contacts.delete_many({})
    await db.admins.delete_many({})
    
    # Insert service categories
    await db.service_categories.insert_many(SERVICE_CATEGORIES)
    
    # Insert boat services
    await db.services.insert_many(BOAT_SERVICES)
    
    # Insert cab services
    await db.services.insert_many(CAB_SERVICES)
    
    # Insert packages
    await db.packages.insert_many(INITIAL_PACKAGES)
    
    # Insert blogs
    await db.blogs.insert_many(INITIAL_BLOGS)
    
    # Create default admin
    admin = AdminInDB(
        id=f"admin_{int(datetime.utcnow().timestamp())}",
        username="admin",
        email="admin@gofers.com",
        password=get_password_hash("admin123"),
        role="admin"
    )
    await db.admins.insert_one(admin.dict())
    
    return {"message": "Database reset and reinitialized successfully with all services"}


# ==================== DOWNLOAD ====================

from fastapi.responses import FileResponse

@api_router.get("/download-project")
async def download_project():
    """Download complete project as zip"""
    zip_path = "/app/gofers-varanasi-tourism.zip"
    if os.path.exists(zip_path):
        return FileResponse(
            path=zip_path,
            filename="gofers-varanasi-tourism.zip",
            media_type="application/zip"
        )
    else:
        raise HTTPException(status_code=404, detail="Zip file not found")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()