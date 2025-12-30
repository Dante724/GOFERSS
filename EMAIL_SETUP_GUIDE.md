# Email Notification Setup Guide

## Overview
When a customer books a service, the system will:
1. ✅ Save booking details to MongoDB database
2. ✅ Open WhatsApp with pre-filled message to +91 8960260606
3. ✅ Send email notification to your company email (if configured)

---

## How It Works Currently

### Without Email Setup (Current State):
- Booking is saved to database ✅
- WhatsApp opens automatically ✅
- Email notification is **skipped** (logs a warning)

### With Email Setup (After Configuration):
- Booking is saved to database ✅
- WhatsApp opens automatically ✅
- Email sent to your company email ✅

---

## Email Configuration (Optional)

### Step 1: Get Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left menu
3. Enable "2-Step Verification" if not already enabled
4. Search for "App passwords" 
5. Create a new app password:
   - Select app: "Mail"
   - Select device: "Other (Custom name)" → Type "Gofers Website"
   - Click "Generate"
6. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### Step 2: Configure Backend .env File

Edit `/app/backend/.env` and uncomment these lines:

```bash
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com           # Your Gmail address
SMTP_PASSWORD=abcd-efgh-ijkl-mnop        # App password from Step 1
COMPANY_EMAIL=info@gofers-varanasi.com   # Email where notifications will be sent
```

**Example:**
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contact@gofers.com
SMTP_PASSWORD=abcd efgh ijkl mnop
COMPANY_EMAIL=admin@gofers-varanasi.com
```

### Step 3: Restart Backend

```bash
sudo supervisorctl restart backend
```

---

## Alternative: Using Other Email Services

### For Outlook/Hotmail:
```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
```

### For Yahoo:
```bash
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASSWORD=your-app-password
```

### For Custom Domain Email (e.g., cPanel, Hostinger):
```bash
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=info@yourdomain.com
SMTP_PASSWORD=your-email-password
```

---

## Email Notification Content

When a booking is made, you'll receive an email with:

- 🆔 Booking ID
- 📦 Package/Service Name
- 👤 Customer Name
- 📱 Customer Phone
- 📧 Customer Email (if provided)
- 📅 Travel Date
- 👥 Number of Guests
- 💰 Final Price
- 💬 Customer Message (if any)
- ⚡ Action Button to contact via WhatsApp

---

## Testing Email Setup

### Test Booking Flow:
1. Go to website
2. Click "Book Now" on any package/service
3. Fill the form completely
4. Submit the form
5. Check:
   - ✅ WhatsApp should open with pre-filled message
   - ✅ Check your company email for notification

### Check Backend Logs:
```bash
tail -f /var/log/supervisor/backend.err.log
```

Look for:
- ✅ "Email notification sent successfully" (if configured)
- ⚠️ "SMTP credentials not configured" (if not configured)

---

## Troubleshooting

### Email Not Sending?

**1. Check Gmail Security:**
- Make sure 2-Step Verification is enabled
- Use App Password, not regular Gmail password
- Check if "Less secure app access" is OFF (we use App Password)

**2. Check Logs:**
```bash
tail -n 50 /var/log/supervisor/backend.err.log | grep -i email
```

**3. Test SMTP Connection:**
```bash
python3 -c "import smtplib; s=smtplib.SMTP('smtp.gmail.com',587); s.starttls(); s.login('your-email@gmail.com','your-app-password'); print('Connected!')"
```

**4. Common Issues:**
- Wrong app password → Generate new one
- 2FA not enabled → Enable it first
- Gmail blocked login → Check Gmail security alerts

---

## Important Notes

- ✅ **WhatsApp works immediately** - No configuration needed
- ✅ **Database saves all bookings** - Check MongoDB or admin panel
- ⚠️ **Email is optional** - Website works fine without it
- 🔒 **Secure** - App passwords are more secure than regular passwords
- 📧 **Backup** - Even if email fails, booking is saved + WhatsApp opens

---

## For Production (Hostinger Deployment)

1. Add email configuration to production .env file
2. Use company email for SMTP_USER
3. Use strong app password
4. Test thoroughly before going live

---

**Need Help?** 
Contact: +91 8960260606
Email: info@gofers-varanasi.com
Instagram: @wegofers
