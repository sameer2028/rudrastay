from app.services.email import EmailService
from app.core.config import settings

def test():
    print(f"RESEND_API_KEY: {settings.RESEND_API_KEY[:5]}...")
    EmailService.send_admin_new_message({
        "name": "Test Name",
        "email": "test@example.com",
        "phone": "9876543210",
        "subject": "Test Subject",
        "message": "Testing the email service"
    })

test()
