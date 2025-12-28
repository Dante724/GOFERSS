from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

# Enums
class BookingStatus(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    cancelled = "cancelled"

class ContactStatus(str, Enum):
    new = "new"
    replied = "replied"

# Package Models
class Package(BaseModel):
    id: str = Field(default_factory=lambda: str(datetime.utcnow().timestamp()))
    name: str
    duration: str
    price: int
    priceWithGhatWalk: Optional[int] = None
    image: str
    description: str
    inclusions: List[str]
    highlights: List[str]
    hasOptionalGhatWalk: bool = False
    active: bool = True

# Booking Models
class BookingCreate(BaseModel):
    packageId: str
    customerName: str
    email: Optional[EmailStr] = None
    phone: str
    travelDate: str
    guests: int
    includeGhatWalk: bool = False
    message: Optional[str] = None

class Booking(BaseModel):
    id: str = Field(default_factory=lambda: str(datetime.utcnow().timestamp()))
    packageId: str
    packageName: str
    customerName: str
    email: Optional[str] = None
    phone: str
    travelDate: str
    guests: int
    includeGhatWalk: bool = False
    finalPrice: int
    message: Optional[str] = None
    status: BookingStatus = BookingStatus.pending
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class BookingStatusUpdate(BaseModel):
    status: BookingStatus

# Blog Models
class BlogCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    author: str
    image: str
    category: str
    published: bool = True

class Blog(BaseModel):
    id: str = Field(default_factory=lambda: str(datetime.utcnow().timestamp()))
    title: str
    excerpt: str
    content: str
    author: str
    date: str
    image: str
    category: str
    published: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class BlogUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    image: Optional[str] = None
    category: Optional[str] = None
    published: Optional[bool] = None

# Contact Models
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(datetime.utcnow().timestamp()))
    name: str
    email: str
    phone: str
    message: str
    status: ContactStatus = ContactStatus.new
    createdAt: datetime = Field(default_factory=datetime.utcnow)

# Admin Models
class AdminLogin(BaseModel):
    username: str
    password: str

class Admin(BaseModel):
    id: str = Field(default_factory=lambda: str(datetime.utcnow().timestamp()))
    username: str
    email: str
    role: str = "admin"
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class AdminInDB(Admin):
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Config Model
class ConfigResponse(BaseModel):
    whatsappNumber: str