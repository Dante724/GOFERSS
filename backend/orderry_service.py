import requests
import os
import logging

logger = logging.getLogger(__name__)

ORDERRY_API_KEY = os.environ.get("ORDERRY_API_KEY")

def create_orderry_lead(name, phone, email, message):
    if not ORDERRY_API_KEY:
        logger.warning("ORDERRY_API_KEY not set")
        return None
    
    url = "https://api.orderry.com/v2/lead/"
    
    headers = {
        "Authorization": f"Bearer {ORDERRY_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "contact_name": name,
        "contact_phone": phone,
        "contact_email": email,
        "notes": message
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        return response.json()
    except Exception as e:
        logger.error(f"Orderry error: {e}")
        return None
