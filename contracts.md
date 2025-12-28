# Gofers Varanasi Tourism - Backend Integration Contracts

## Overview
Backend APIs for tour package booking system with admin dashboard for managing bookings and blogs.

---

## 1. TOUR PACKAGES

### Mock Data Location
`/app/frontend/src/mockData.js` - `tourPackages` array (3 packages)

### Database Model: `packages`
```
{
  id: string (auto-generated)
  name: string
  duration: string
  price: number
  priceWithGhatWalk: number (optional)
  image: string (URL)
  description: string
  inclusions: array[string]
  highlights: array[string]
  hasOptionalGhatWalk: boolean
  active: boolean (default: true)
}
```

### API Endpoints
- `GET /api/packages` - Get all active packages
- `GET /api/packages/:id` - Get single package

---

## 2. BOOKINGS

### Mock Data
Currently logs to console in `BookingModal.jsx`, opens WhatsApp with pre-filled message

### Database Model: `bookings`
```
{
  id: string (auto-generated)
  packageId: string (ref to packages)
  packageName: string
  customerName: string
  email: string (optional)
  phone: string
  travelDate: Date
  guests: number
  includeGhatWalk: boolean (for package 3)
  finalPrice: number
  message: string (optional)
  status: string (enum: 'pending', 'confirmed', 'cancelled')
  createdAt: Date
}
```

### API Endpoints
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/:id` - Get single booking
- `PATCH /api/bookings/:id/status` - Update booking status

### Frontend Integration
- Update `/app/frontend/src/components/BookingModal.jsx`:
  - POST booking data to `/api/bookings`
  - On success, then open WhatsApp with confirmation
  - Show toast notifications

---

## 3. BLOG POSTS

### Mock Data Location
`/app/frontend/src/mockData.js` - `blogPosts` array (3 posts)

### Database Model: `blogs`
```
{
  id: string (auto-generated)
  title: string
  excerpt: string
  content: string (full article - will add later)
  author: string
  date: Date
  image: string (URL)
  category: string
  published: boolean (default: true)
  createdAt: Date
  updatedAt: Date
}
```

### API Endpoints
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create blog (admin only)
- `PATCH /api/blogs/:id` - Update blog (admin only)
- `DELETE /api/blogs/:id` - Delete blog (admin only)

### Frontend Integration
- Update `/app/frontend/src/components/BlogPreview.jsx` to fetch from API
- Update `/app/frontend/src/pages/BlogPage.jsx` to fetch from API

---

## 4. CONTACT FORM

### Mock Data
Currently logs to console in `Contact.jsx`

### Database Model: `contacts`
```
{
  id: string (auto-generated)
  name: string
  email: string
  phone: string
  message: string
  status: string (enum: 'new', 'replied')
  createdAt: Date
}
```

### API Endpoints
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all contacts (admin)

### Frontend Integration
- Update `/app/frontend/src/components/Contact.jsx` to POST to `/api/contacts`

---

## 5. ADMIN AUTHENTICATION

### Database Model: `admins`
```
{
  id: string (auto-generated)
  username: string (unique)
  password: string (hashed)
  email: string
  role: string (default: 'admin')
  createdAt: Date
}
```

### API Endpoints
- `POST /api/admin/login` - Admin login (returns JWT token)
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/me` - Get current admin info

### Default Admin Credentials (to be created via script)
- Username: `admin`
- Password: `admin123`

---

## 6. ADMIN DASHBOARD

### Pages Needed
- `/admin/login` - Admin login page
- `/admin/dashboard` - Dashboard overview (bookings count, contacts count)
- `/admin/bookings` - View all bookings with filters
- `/admin/blogs` - Manage blogs (CRUD)
- `/admin/contacts` - View contact form submissions

### Protected Routes
All `/admin/*` routes except `/admin/login` require JWT authentication

---

## 7. CONFIGURATION / SETTINGS

### Environment Variables (Backend)
Create in `/app/backend/.env`:
```
WHATSAPP_NUMBER=919876543210  # Configurable WhatsApp number
JWT_SECRET=your-secret-key-here
```

### Frontend Integration
- WhatsApp number fetched from backend config API
- Or keep in frontend .env as `REACT_APP_WHATSAPP_NUMBER`

---

## 8. IMPLEMENTATION PRIORITY

### Phase 1: Core Booking System
1. ✅ Setup MongoDB models (packages, bookings)
2. ✅ Create packages API (seed initial 3 packages)
3. ✅ Create bookings API
4. ✅ Integrate booking form with backend
5. ✅ Test booking flow end-to-end

### Phase 2: Admin System
6. ✅ Admin authentication (login/JWT)
7. ✅ Admin dashboard page
8. ✅ View bookings in admin panel

### Phase 3: Blog & Contact
9. ✅ Blogs API + integration
10. ✅ Contact form API + integration
11. ✅ Blog management in admin panel

---

## 9. FRONTEND FILES TO UPDATE

After backend is ready:

1. `/app/frontend/src/components/BookingModal.jsx`
   - Replace mock submission with API call
   - Use actual WHATSAPP_NUMBER from config

2. `/app/frontend/src/components/Packages.jsx`
   - Fetch packages from `/api/packages` instead of mockData

3. `/app/frontend/src/components/BlogPreview.jsx`
   - Fetch blogs from `/api/blogs`

4. `/app/frontend/src/pages/BlogPage.jsx`
   - Fetch blogs from `/api/blogs`

5. `/app/frontend/src/components/Contact.jsx`
   - POST to `/api/contacts` instead of console.log

6. Remove `/app/frontend/src/mockData.js` once all integrated

---

## 10. HOSTING CONSIDERATIONS (Hostinger)

### Backend Requirements:
- Node.js support (FastAPI = Python, so we're using FastAPI)
- MongoDB connection (use MongoDB Atlas cloud)
- Environment variables support
- Process manager (PM2 or similar)

### Deployment Structure:
```
/app/backend/  - FastAPI backend
/app/frontend/ - React build files (static)
```

### Build Commands:
- Frontend: `yarn build` (creates /build folder)
- Backend: Already production-ready with uvicorn

### Notes:
- Frontend build will be served as static files
- Backend API will handle all `/api/*` routes
- MongoDB should use cloud service (MongoDB Atlas)
- CORS properly configured for production domain

---

## 11. TESTING CHECKLIST

Before deployment:
- [ ] Create booking → saves to DB → WhatsApp opens
- [ ] Admin login works
- [ ] View bookings in admin panel
- [ ] Create/edit/delete blogs from admin
- [ ] Contact form saves to DB
- [ ] All API endpoints return proper error messages
- [ ] Frontend properly fetches data from backend
- [ ] WhatsApp number is configurable
