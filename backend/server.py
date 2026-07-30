from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime
import threading

from models import (
    Package, Booking, BookingCreate, BookingStatus, BookingStatusUpdate,
    Blog, BlogCreate, BlogUpdate, Contact, ContactCreate,
    AdminLogin, Admin, AdminInDB, Token, ConfigResponse,
    Service, ServiceCategory
)

from auth import (
    verify_password, get_password_hash, create_access_token, get_current_admin
)

from seed_data import (
    INITIAL_PACKAGES,
    INITIAL_BLOGS,
    SERVICE_CATEGORIES,
    BOAT_SERVICES,
    CAB_SERVICES
)

from email_service import send_booking_email

# ================= LOGGING =================

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ================= LOAD ENV =================

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# ================= DATABASE =================

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# ================= APP =================

app = FastAPI(title="Gofers Varanasi Tourism API")
api_router = APIRouter(prefix="/api")

# ================= SERVICES =================

@api_router.get("/services/categories", response_model=List[ServiceCategory])
async def get_service_categories():
    return await db.service_categories.find().to_list(100)


@api_router.get("/services/{category_id}", response_model=List[Service])
async def get_services_by_category(category_id: str):
    return await db.services.find({
        "categoryId": category_id,
        "active": True
    }).to_list(100)


@api_router.get("/services/all/list", response_model=List[Service])
async def get_all_services():
    return await db.services.find({"active": True}).to_list(500)


# ================= PACKAGES =================

@api_router.get("/packages", response_model=List[Package])
async def get_packages():
    return await db.packages.find({"active": True}).to_list(100)


@api_router.get("/packages/{package_id}", response_model=Package)
async def get_package(package_id: str):

    package = await db.packages.find_one({"id": package_id})

    if not package:
        raise HTTPException(404, "Package not found")

    return package


# ================= BOOKINGS =================

@api_router.post("/bookings", response_model=Booking)
async def create_booking(booking_data: BookingCreate):

    package = await db.packages.find_one({"id": booking_data.packageId})

    if not package:
        package = await db.services.find_one({"id": booking_data.packageId})

    if not package:
        raise HTTPException(404, "Package not found")

    final_price = package.get("price", package.get("priceStart", 0))

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

    await db.bookings.insert_one(booking.dict())

    # Send email safely
    threading.Thread(
        target=lambda: send_booking_email(booking.dict()),
        daemon=True
    ).start()

    return booking


# ================= BLOGS =================

@api_router.get("/blogs", response_model=List[Blog])
async def get_blogs(published: Optional[bool] = True):
    query = {"published": published} if published else {}
    return await db.blogs.find(query).to_list(100)


@api_router.get("/blogs/{blog_id}", response_model=Blog)
async def get_blog(blog_id: str):
    blog = await db.blogs.find_one({"id": blog_id})
    if not blog:
        raise HTTPException(404, "Blog not found")
    return blog

# ================= CONTACTS (FIXED) =================

@api_router.post("/contacts", response_model=Contact)
async def create_contact(contact_data: ContactCreate):

    contact = Contact(
        id=f"contact_{int(datetime.utcnow().timestamp())}",
        name=contact_data.name,
        email=contact_data.email,
        phone=contact_data.phone,
        message=contact_data.message
    )

    # Save instantly
    await db.contacts.insert_one(contact.dict())

    # Background email
    def send_email():
        try:
            send_booking_email({
                "id": contact.id,
                "packageName": "Contact Form",
                "customerName": contact.name,
                "email": contact.email,
                "phone": contact.phone,
                "travelDate": "Not specified",
                "guests": "N/A",
                "finalPrice": "N/A",
                "message": contact.message
            })
            logger.info("Contact email sent")

        except Exception as e:
            logger.error(f"Email failed: {e}")

    threading.Thread(target=send_email, daemon=True).start()

    return contact


@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts(admin=Depends(get_current_admin)):
    return await db.contacts.find().to_list(1000)


# ================= ADMIN =================

@api_router.post("/admin/login", response_model=Token)
async def admin_login(credentials: AdminLogin):

    admin = await db.admins.find_one({"username": credentials.username})

    if not admin:
        raise HTTPException(401, "Invalid login")

    if not verify_password(credentials.password, admin["password"]):
        raise HTTPException(401, "Invalid login")

    token = create_access_token({"sub": admin["username"]})

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# ================= CONFIG =================

@api_router.get("/config", response_model=ConfigResponse)
async def get_config():

    return {
        "whatsappNumber":
        os.environ.get("WHATSAPP_NUMBER", "919876543210")
    }


# ================= INIT DB =================

@api_router.post("/init-db")
async def init_db():

    await db.service_categories.insert_many(SERVICE_CATEGORIES)
    await db.services.insert_many(BOAT_SERVICES)
    await db.services.insert_many(CAB_SERVICES)
    await db.packages.insert_many(INITIAL_PACKAGES)
    await db.blogs.insert_many(INITIAL_BLOGS)

    admin = AdminInDB(
        id="admin1",
        username="admin",
        email="admin@gofers.com",
        password=get_password_hash("admin123"),
        role="admin"
    )

    await db.admins.insert_one(admin.dict())

    return {"message": "DB initialized"}


# ================= ROUTER =================

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "Gofers API is alive 🙏"}
app.include_router(api_router)

# ================= CORS =================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= SHUTDOWN =================

@app.on_event("shutdown")
async def shutdown():
    client.close()
