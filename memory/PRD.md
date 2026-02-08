# Gofers Varanasi Tourism - Product Requirements Document

## Latest Update (Feb 2026)
- **Fixed:** Navbar "Book Now" button now opens booking modal directly (instead of scrolling to packages section)
- **Implementation:** Created BookingContext in App.js to share modal state globally across all components

## Original Problem Statement
Build a tourism website for a Varanasi-based company named "Gofers" that allows users to book various services including Hotel Stays, Cab Rentals, Boat Rides, and Tour Guides. The booking should redirect to WhatsApp with pre-filled booking details.

## Company Information
- **Name:** Gofers
- **Address:** Shiv Shakti complex, Lanka BHU main road, Varanasi
- **Phone:** 8960260606
- **Email:** wegofers@gmail.com
- **Instagram:** @gofers_varanasi

## Core Requirements
1. **Service Categories:** Hotel Stays, Cab Rentals, Boat Rides, Tour Guides
2. **Booking Flow:** Form submission → WhatsApp redirect with booking details
3. **Payment:** Offline via UPI on WhatsApp (no online gateway)
4. **Design:** Traditional but luxury, spiritually beautiful
5. **No User Authentication:** Booking without login

## Tech Stack
- **Frontend:** React, Tailwind CSS, shadcn/ui
- **Backend:** Python/FastAPI
- **Database:** MongoDB
- **Deployment:** Render

## What's Been Implemented

### Completed Features (Feb 2026)
- [x] Full-stack application with React + FastAPI + MongoDB
- [x] Hero section with Om symbol and spiritual design
- [x] Service categories (Cabs, Boats, Stays, Guides)
- [x] Tour packages with pricing and inclusions
- [x] Booking modal with form validation
- [x] WhatsApp redirection with pre-filled booking message
- [x] Contact form
- [x] Blog preview section
- [x] Footer with company info and social links
- [x] Responsive design for mobile/desktop

### Bug Fixes (Feb 8, 2026)
- [x] Fixed "Book Now" button in Navbar - now scrolls to packages
- [x] Fixed WhatsApp redirection - works even if backend API fails
- [x] Added fallback WhatsApp number (918960260606)

## API Endpoints
- `GET /api/health` - Health check
- `GET /api/services/categories` - Get service categories
- `GET /api/services/{category_id}` - Get services by category
- `GET /api/packages` - Get tour packages
- `POST /api/bookings` - Create booking
- `GET /api/config` - Get WhatsApp number
- `POST /api/init-db` - Initialize database

## Pending Tasks (P1)
- [ ] Admin Dashboard - View and manage bookings
- [ ] Blog Management - Admin can create/edit blogs

## Future Tasks (P2/P3)
- [ ] Populate "Book Stay" & "Guide" services data
- [ ] Add Facebook/Twitter social links
- [ ] Email notifications (requires SMTP setup)

## Deployment
- **Download:** `https://[preview-url]/api/download-project`
- **Render Guide:** `/app/RENDER_DEPLOYMENT.md`

## Notes
- WhatsApp number: 918960260606
- Default admin: admin / admin123
- Email system is MOCKED - requires SMTP credentials in .env
