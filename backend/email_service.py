import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging

logger = logging.getLogger(__name__)

def send_booking_email(booking_data: dict):
    """
    Send booking notification email
    
    For production use, configure these environment variables:
    - SMTP_HOST (e.g., smtp.gmail.com)
    - SMTP_PORT (e.g., 587)
    - SMTP_USER (your email)
    - SMTP_PASSWORD (your app password)
    - COMPANY_EMAIL (email to receive notifications)
    """
    
    try:
        # Get email configuration from environment
        smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
        smtp_port = int(os.environ.get("SMTP_PORT", "587"))
        smtp_user = os.environ.get("SMTP_USER", "")
        smtp_password = os.environ.get("SMTP_PASSWORD", "")
        company_email = os.environ.get("COMPANY_EMAIL", "wegofers@gmail.com")
        
        # Check if SMTP is configured
        if not smtp_user or not smtp_password:
            logger.warning("SMTP credentials not configured. Email notification skipped.")
            return False
        
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"New Booking Request - {booking_data['packageName']}"
        msg['From'] = smtp_user
        msg['To'] = company_email
        
        # Create HTML email body
        html_body = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background-color: #ea580c; color: white; padding: 20px; text-align: center; }}
                .content {{ background-color: #f9fafb; padding: 20px; }}
                .detail {{ margin: 10px 0; }}
                .label {{ font-weight: bold; color: #374151; }}
                .value {{ color: #6b7280; }}
                .footer {{ background-color: #1f2937; color: white; padding: 15px; text-align: center; margin-top: 20px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🕉️ New Booking Received!</h1>
                    <p>Gofers Varanasi Tourism</p>
                </div>
                
                <div class="content">
                    <h2>Booking Details</h2>
                    <div class="detail">
                        <span class="label">Booking ID:</span>
                        <span class="value">{booking_data['id']}</span>
                    </div>
                    <div class="detail">
                        <span class="label">Package/Service:</span>
                        <span class="value">{booking_data['packageName']}</span>
                    </div>
                    <div class="detail">
                        <span class="label">Customer Name:</span>
                        <span class="value">{booking_data['customerName']}</span>
                    </div>
                    <div class="detail">
                        <span class="label">Phone:</span>
                        <span class="value">{booking_data['phone']}</span>
                    </div>
                    <div class="detail">
                        <span class="label">Email:</span>
                        <span class="value">{booking_data.get('email', 'Not provided')}</span>
                    </div>
                    <div class="detail">
                        <span class="label">Travel Date:</span>
                        <span class="value">{booking_data['travelDate']}</span>
                    </div>
                    <div class="detail">
                        <span class="label">Number of Guests:</span>
                        <span class="value">{booking_data['guests']}</span>
                    </div>
                    <div class="detail">
                        <span class="label">Final Price:</span>
                        <span class="value">₹{booking_data['finalPrice']}</span>
                    </div>
                    {f'<div class="detail"><span class="label">Message:</span><span class="value">{booking_data.get("message", "")}</span></div>' if booking_data.get('message') else ''}
                    
                    <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
                        <strong>Action Required:</strong> Contact the customer via WhatsApp at {booking_data['phone']}
                    </div>
                </div>
                
                <div class="footer">
                    <p><strong>Gofers Varanasi Tourism</strong></p>
                    <p>Shiv Shakti Complex, Lanka BHU Main Road, Varanasi</p>
                    <p>Phone: +91 8960260606</p>
                    <p>Instagram: @wegofers</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Attach HTML body
        part = MIMEText(html_body, 'html')
        msg.attach(part)
        
        # Send email
        server = smtplib.SMTP_SSL(smtp_host, smtp_port)
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
        
        logger.info(f"Email notification sent successfully for booking {booking_data['id']}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email notification: {str(e)}")
        return False
