import httpx
import os

ORDERRY_API_KEY = os.environ.get("7eba7fe43d1045a990b0a6fd85945f8e")

async def create_orderry_lead(name, phone, email, message):
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
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, headers=headers)
        return response.json()
