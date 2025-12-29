# Gofers Varanasi Tourism - Deployment Guide

## 🎯 Project Overview
Full-stack tourism website for Gofers Varanasi with booking system, blog management, and admin dashboard.

**Tech Stack:**
- Frontend: React 19 + Tailwind CSS + Shadcn/UI
- Backend: FastAPI (Python)
- Database: MongoDB

---

## 📁 Project Structure
```
/
├── backend/           # FastAPI backend
│   ├── server.py      # Main API server
│   ├── models.py      # Pydantic models
│   ├── auth.py        # JWT authentication
│   ├── seed_data.py   # Initial data
│   └── requirements.txt
├── frontend/          # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
└── contracts.md       # API documentation
```

---

## 🚀 Local Development Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB (local or cloud)

### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Create .env file with:
MONGO_URL=mongodb://localhost:27017
DB_NAME=gofers_tourism
WHATSAPP_NUMBER=919876543210
JWT_SECRET=your-secret-key-here

# Run server
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
yarn install
# or: npm install

# Configure environment variables
# Create .env file with:
REACT_APP_BACKEND_URL=http://localhost:8001

# Run development server
yarn start
# or: npm start
```

### Initialize Database
```bash
# Call the init endpoint to seed data
curl -X POST http://localhost:8001/api/init-db
```

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

---

## 🌐 Hostinger Deployment

### Step 1: MongoDB Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/`

### Step 2: Backend Deployment (Hostinger VPS/Cloud)

**Option A: Using Python hosting**
```bash
# Upload backend folder to Hostinger
# Install dependencies
pip install -r requirements.txt

# Update .env file
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/gofers_tourism
DB_NAME=gofers_tourism
WHATSAPP_NUMBER=919876543210
JWT_SECRET=generate-random-secure-key

# Run with gunicorn or uvicorn
uvicorn server:app --host 0.0.0.0 --port 8001
```

**Option B: Using Docker (recommended)**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8001
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

### Step 3: Frontend Deployment

**Build Frontend:**
```bash
cd frontend

# Update .env for production
REACT_APP_BACKEND_URL=https://your-api-domain.com

# Build
yarn build
# This creates /frontend/build folder
```

**Upload to Hostinger:**
1. Upload contents of `frontend/build/` folder to `public_html/`
2. Or use Hostinger's file manager
3. Set up .htaccess for React Router:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Step 4: Initialize Production Database
```bash
curl -X POST https://your-api-domain.com/api/init-db
```

---

## 🔧 Configuration

### WhatsApp Number
Update in `/backend/.env`:
```
WHATSAPP_NUMBER=919876543210
```

### Company Information
Update in `/frontend/src/mockData.js`:
```javascript
export const companyInfo = {
  name: "Gofers",
  email: "info@gofers-varanasi.com",
  phone: "+91 98765 43210",
  address: "Your address here"
};
```

---

## 📱 Features

### User Features
✅ Browse tour packages
✅ Book packages via WhatsApp
✅ Contact form
✅ Read travel blogs
✅ Mobile responsive design

### Admin Features (Coming Soon)
- View all bookings
- Manage blog posts
- View contact submissions
- Dashboard analytics

---

## 🔐 API Endpoints

### Public APIs
- `GET /api/packages` - Get all packages
- `POST /api/bookings` - Create booking
- `GET /api/blogs` - Get published blogs
- `POST /api/contacts` - Submit contact form
- `GET /api/config` - Get WhatsApp number

### Admin APIs (Requires JWT)
- `POST /api/admin/login` - Admin login
- `GET /api/bookings` - View all bookings
- `POST /api/blogs` - Create blog
- `PATCH /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

---

## 🐛 Troubleshooting

### Frontend not loading
- Check REACT_APP_BACKEND_URL in .env
- Verify build folder is uploaded correctly
- Check .htaccess configuration

### Backend not working
- Verify MongoDB connection string
- Check Python dependencies installed
- Ensure port 8001 is open
- Check backend logs

### Booking not working
- Verify WhatsApp number in backend .env
- Check /api/config returns correct number
- Test API with curl/Postman

---

## 📞 Support

For any issues during deployment:
1. Check browser console for errors
2. Check backend logs
3. Verify all environment variables
4. Test APIs individually

---

## 📄 License
Private project for Gofers Varanasi Tourism

---

## 🎉 Post-Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed and running
- [ ] Frontend built and uploaded
- [ ] Database initialized with seed data
- [ ] WhatsApp number configured
- [ ] Admin login working
- [ ] Test booking flow end-to-end
- [ ] Test contact form
- [ ] Mobile responsiveness verified
- [ ] Update DNS if needed

---

**Built with ❤️ for Gofers Varanasi Tourism**
