# ⚡ Quick Email Setup Guide for wegofers@gmail.com

## 🎯 Automatic Email Notifications

When someone fills the booking form, they will receive:
1. ✅ **WhatsApp Redirect** - Opens WhatsApp immediately (8960260606)
2. ✅ **Email to wegofers@gmail.com** - Detailed booking info sent automatically

---

## 📧 Setup Instructions (5 Minutes)

### Step 1: Get Gmail App Password

1. Login to **wegofers@gmail.com**
2. Go to: https://myaccount.google.com/security
3. Enable **2-Step Verification** (if not already enabled)
4. Search for **"App passwords"** in the search bar
5. Click **"App passwords"**
6. Create new app password:
   - App: Select "Mail"
   - Device: Select "Other" → Type "Gofers Website"
7. Click **Generate**
8. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### Step 2: Update Backend Configuration

Edit `/app/backend/.env` file:

```bash
# Replace 'your-gmail-app-password-here' with the password from Step 1
SMTP_USER=wegofers@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop    # Your 16-char app password (remove spaces)
COMPANY_EMAIL=wegofers@gmail.com
```

**Example:**
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=wegofers@gmail.com
SMTP_PASSWORD=abcdefghijklmnop
COMPANY_EMAIL=wegofers@gmail.com
```

### Step 3: Restart Backend

```bash
sudo supervisorctl restart backend
```

### Step 4: Test It!

1. Go to your website
2. Click "Book Now" on any package
3. Fill the form completely
4. Click "Continue on WhatsApp"
5. Check:
   - ✅ WhatsApp should open
   - ✅ Check **wegofers@gmail.com** inbox for email

---

## 📧 What Email Contains

You'll receive a beautiful HTML email with:

- 📋 Booking ID
- 📦 Package/Service Name  
- 👤 Customer Name
- 📱 Customer Phone
- 📧 Customer Email
- 📅 Travel Date
- 👥 Number of Guests
- 💰 Final Price
- 💬 Customer Message
- ⚡ Quick action button to contact via WhatsApp

---

## 🔧 Troubleshooting

### ❌ Email not arriving?

**Check 1: Verify App Password**
```bash
# Test SMTP connection
python3 -c "import smtplib; s=smtplib.SMTP('smtp.gmail.com',587); s.starttls(); s.login('wegofers@gmail.com','your-app-password'); print('✅ Connected!')"
```

**Check 2: View Backend Logs**
```bash
tail -f /var/log/supervisor/backend.err.log | grep -i email
```

Look for:
- ✅ "Email notification sent successfully" (working)
- ⚠️ "SMTP credentials not configured" (password missing)
- ❌ "Failed to send email" (wrong password or connection issue)

**Check 3: Gmail Security**
- Check Gmail → Security → Recent security activity
- If login blocked, allow the connection
- Make sure 2-Step Verification is ON

**Check 4: Spam Folder**
- First email might go to spam
- Mark as "Not Spam" if it's there

---

## 🚀 Production Deployment (Hostinger)

When deploying to Hostinger:

1. Add email configuration to production `.env`:
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=wegofers@gmail.com
SMTP_PASSWORD=your-16-char-app-password
COMPANY_EMAIL=wegofers@gmail.com
```

2. Restart the backend service

3. Test the booking flow

---

## 💡 Important Notes

✅ **No Password Exposure** - App passwords are separate from your main Gmail password
✅ **Secure** - App passwords can be revoked anytime
✅ **Backup** - Even if email fails, WhatsApp still works and data saves to database
✅ **Professional** - HTML formatted emails look professional
✅ **Instant** - Emails arrive within seconds

---

## 📱 Contact

- **Email**: wegofers@gmail.com
- **Phone**: +91 8960260606  
- **WhatsApp**: +91 8960260606
- **Instagram**: @wegofers

---

## ✅ Checklist

- [ ] 2-Step Verification enabled on wegofers@gmail.com
- [ ] App password generated
- [ ] Backend .env file updated with app password
- [ ] Backend restarted
- [ ] Test booking made
- [ ] Email received in wegofers@gmail.com
- [ ] WhatsApp redirect working

**Once all checked, your system is fully operational! 🎉**
