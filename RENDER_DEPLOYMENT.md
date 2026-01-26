# Render Deployment Guide for Gofers Backend

## Quick Deploy to Render

### Step 1: Create Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository or upload code

### Step 2: Configure Build Settings

**Build Command:**
```bash
pip install -r requirements.txt
```

**Start Command:**
```bash
uvicorn server:app --host 0.0.0.0 --port $PORT
```

### Step 3: Set Environment Variables

Add these in Render → Environment:

```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/gofers_db
DB_NAME=gofers_db
CORS_ORIGINS=*
WHATSAPP_NUMBER=918960260606
JWT_SECRET=your-random-secret-key-here

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=wegofers@gmail.com
SMTP_PASSWORD=your-gmail-app-password
COMPANY_EMAIL=wegofers@gmail.com
```

### Step 4: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create free cluster
3. Add user: Database Access → Add New User
4. Whitelist IP: Network Access → Add IP → Allow from Anywhere (0.0.0.0/0)
5. Get connection string: Connect → Connect your application
6. Replace `<password>` with your password
7. Use this as `MONGO_URL`

### Step 5: Initialize Database

After deployment, call:
```
https://your-app.onrender.com/api/init-db
```

Or if already initialized:
```
https://your-app.onrender.com/api/reset-db
```

---

## Troubleshooting CORS Errors

### Issue: CORS errors on API calls

**Solution 1: Check CORS_ORIGINS**
```
CORS_ORIGINS=*
```

**Solution 2: Verify API URL**
Frontend should use:
```
REACT_APP_BACKEND_URL=https://goferss.onrender.com
```

---

## Troubleshooting 500 Errors

### Issue: Internal Server Error

**Check 1: MongoDB Connection**
```bash
# Test health endpoint
curl https://goferss.onrender.com/api/health
```

**Check 2: View Logs**
- Go to Render Dashboard
- Click your service
- Click "Logs" tab
- Look for errors

**Check 3: Database Not Initialized**
```bash
# Initialize database
curl -X POST https://goferss.onrender.com/api/init-db
```

**Check 4: Environment Variables**
Make sure all required env vars are set:
- MONGO_URL ✅
- DB_NAME ✅
- WHATSAPP_NUMBER ✅
- JWT_SECRET ✅

---

## Test APIs

### Health Check
```bash
curl https://goferss.onrender.com/api/health
```

### Get Service Categories
```bash
curl https://goferss.onrender.com/api/services/categories
```

### Get Packages
```bash
curl https://goferss.onrender.com/api/packages
```

### Initialize Database
```bash
curl -X POST https://goferss.onrender.com/api/init-db
```

---

## Common Issues & Fixes

### 1. "Could not connect to MongoDB"
- Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- Verify MONGO_URL format: `mongodb+srv://...`
- Check database user has read/write permissions

### 2. "CORS policy blocked"
- Set `CORS_ORIGINS=*` in Render env vars
- Restart the service after changing env vars

### 3. "Collection not found"
- Database not initialized
- Run: `curl -X POST https://goferss.onrender.com/api/init-db`

### 4. "Service unavailable"
- Render free tier spins down after inactivity
- First request takes 30-60 seconds to wake up
- Consider using Render Paid plan for always-on

---

## Frontend Configuration

Update frontend `.env`:
```
REACT_APP_BACKEND_URL=https://goferss.onrender.com
```

Rebuild and redeploy frontend.

---

## Render Free Tier Limitations

- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes 30-60 seconds
- ⚠️ 750 hours/month free (approximately 31 days)
- ✅ Automatic HTTPS
- ✅ Continuous deployment from GitHub

### Keep Service Active (Optional)
Use a service like UptimeRobot or cron-job.org to ping:
```
https://goferss.onrender.com/api/health
```
Every 10-15 minutes.

---

## Support

If issues persist:
1. Check Render logs
2. Test MongoDB connection from your local machine
3. Verify all environment variables are correct
4. Contact: wegofers@gmail.com
