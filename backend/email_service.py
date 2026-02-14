import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging

logger = logging.getLogger(__name__)

def send_booking_email(booking_data: dict):

    try:
        smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
        smtp_port = int(os.environ.get("SMTP_PORT", "465"))
        smtp_user = os.environ.get("SMTP_USER", "")
        smtp_password = os.environ.get("SMTP_PASSWORD", "")
        company_email = os.environ.get("COMPANY_EMAIL", smtp_user)

        if not smtp_user or not smtp_password:
            logger.error("SMTP credentials missing")
            return False

        msg = MIMEMultipart()
        msg["Subject"] = f"New Booking - {booking_data.get('packageName','Contact Form')}"
        msg["From"] = smtp_user
        msg["To"] = company_email

        html_body = f"""
        <html>
        <body>
        <h2>New Contact Received</h2>
        <p><b>Name:</b> {booking_data.get('customerName')}</p>
        <p><b>Email:</b> {booking_data.get('email')}</p>
        <p><b>Phone:</b> {booking_data.get('phone')}</p>
        <p><b>Message:</b> {booking_data.get('message')}</p>
        </body>
        </html>
        """

        msg.attach(MIMEText(html_body, "html"))

        server = smtplib.SMTP_SSL(smtp_host, smtp_port)
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()

        logger.info("Email sent successfully")

        return True

    except Exception as e:

        logger.error(f"Email failed: {str(e)}")

        return False
