import requests

try:
    response = requests.post("http://localhost:8000/api/v1/contact", json={
        "name": "Test User",
        "email": "test@example.com",
        "phone": "1234567890",
        "subject": "General Inquiry",
        "message": "Testing the contact form."
    })
    print(f"Status: {response.status_code}")
    print(response.json())
except Exception as e:
    print(f"Error: {e}")
