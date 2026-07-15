import requests

try:
    response = requests.post("http://localhost:8000/api/v1/contact", json={
        "name": "Sameer Upadhyay",
        "email": "sameerupadhyay0133@gmail.com",
        "phone": "9876543210",
        "subject": "General Inquiry",
        "message": "hiiiii"
    })
    print(f"Status: {response.status_code}")
    print(response.json())
except Exception as e:
    print(f"Error: {e}")
