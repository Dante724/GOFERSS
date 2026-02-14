import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging

logger = logging.getLogger(__name__)

def send_booking_email(booking_data: dict):

    try:
        smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
        smtp_port = int(os.environ.get("SMTP_PORT", "587"))
        smtp_user = os.environ.get("SMTP_USER")
        smtp_password = os.environ.get("SMTP_PASSWORD")
        company_email = os.environ.get("COMPANY_EMAIL", smtp_user)

        if not smtp_user or not smtp_password:
            logger.error("SMTP credentials missing")
            return False

        msg = MIMEMultipart()
        msg["Subject"] = "New Contact Form Submission"
        msg["From"] = smtp_user
        msg["To"] = company_email

        body = f"""
Name: {booking_data.get("customerName")}
Email: {booking_data.get("email")}
Phone: {booking_data.get("phone")}
Message: {booking_data.get("message")}
"""

        msg.attach(MIMEText(body, "plain"))

        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()

        logger.info("Email sent successfully")
        return True

    except Exception as e:
        logger.error(f"Email failed: {str(e)}")
        return False
