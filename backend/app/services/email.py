import smtplib
from email.message import EmailMessage
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

class EmailService:
    @staticmethod
    def _send_email(to: str, subject: str, html_content: str):
        if not settings.SMTP_USERNAME or not settings.SMTP_PASSWORD:
            logger.warning(f"SMTP credentials not set. Would have sent email to {to}: {subject}")
            return None
            
        try:
            msg = EmailMessage()
            msg['Subject'] = subject
            msg['From'] = f"Rudra Stay <{settings.SMTP_USERNAME}>"
            msg['To'] = to
            msg.set_content("Please enable HTML to view this email.")
            msg.add_alternative(html_content, subtype='html')

            with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
                server.starttls()
                server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
                server.send_message(msg)
                
            logger.info(f"Email sent successfully to {to}.")
            return True
        except Exception as e:
            logger.error(f"Failed to send email to {to}. Error: {str(e)}")
            return None

    @staticmethod
    def send_admin_new_booking(booking_details: dict):
        """Send notification to admin when a new booking is requested."""
        subject = f"New Booking Request - {booking_details.get('item_name', 'Room')} - {booking_details.get('guest_name')}"
        
        html = f"""
        <div style="font-family: Arial, sans-serif; max-w-md; margin: 0 auto; color: #4a3b32;">
            <h2 style="color: #b58d3d;">New Booking Request Received</h2>
            <p>A new booking request has been submitted on the Rudra Stay website.</p>
            <div style="background-color: #fcf9f2; padding: 20px; border-radius: 8px; border: 1px solid #eaddba;">
                <p><strong>Guest Name:</strong> {booking_details.get('guest_name')}</p>
                <p><strong>Email:</strong> {booking_details.get('guest_email')}</p>
                <p><strong>Phone:</strong> {booking_details.get('guest_phone')}</p>
                <p><strong>Item Booked:</strong> {booking_details.get('item_name')}</p>
                <p><strong>Check-in:</strong> {booking_details.get('check_in')}</p>
                <p><strong>Check-out:</strong> {booking_details.get('check_out')}</p>
                <p><strong>Guests:</strong> {booking_details.get('num_guests')}</p>
                <p><strong>Special Requests:</strong> {booking_details.get('special_requests') or 'None'}</p>
            </div>
            <p style="margin-top: 20px;">Please log in to the admin dashboard to confirm or reject this request.</p>
        </div>
        """
        return EmailService._send_email(to=settings.ADMIN_NOTIFICATION_EMAIL, subject=subject, html_content=html)

    @staticmethod
    def send_user_booking_confirmed(booking_details: dict, room_assigned: str = None):
        """Send confirmation to user when admin accepts the booking."""
        subject = "Your Booking at Rudra Stay is Confirmed!"
        to_email = booking_details.get('guest_email')
        
        html = f"""
        <div style="font-family: Arial, sans-serif; max-w-md; margin: 0 auto; color: #4a3b32;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #b58d3d; font-family: Georgia, serif;">Rudra Stay</h1>
            </div>
            <h2 style="color: #4a3b32;">Booking Confirmed</h2>
            <p>Dear {booking_details.get('guest_name')},</p>
            <p>We are delighted to inform you that your booking request has been <strong>confirmed</strong>!</p>
            
            <div style="background-color: #fcf9f2; padding: 20px; border-radius: 8px; border: 1px solid #eaddba; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #b58d3d;">Booking Details</h3>
                <p><strong>Item:</strong> {booking_details.get('item_name')}</p>
                <p><strong>Check-in:</strong> {booking_details.get('check_in')} (2:00 PM)</p>
                <p><strong>Check-out:</strong> {booking_details.get('check_out')} (11:00 AM)</p>
                <p><strong>Guests:</strong> {booking_details.get('num_guests')}</p>
                {f'<p><strong>Assigned Room:</strong> {room_assigned}</p>' if room_assigned else ''}
            </div>
            
            <p>We look forward to welcoming you to the serenity of Dehradun.</p>
            <p>Warm regards,<br>The Rudra Stay Team</p>
        </div>
        """
        return EmailService._send_email(to=to_email, subject=subject, html_content=html)

    @staticmethod
    def send_user_booking_rejected(booking_details: dict, rejection_reason: str = None):
        """Send rejection to user when admin rejects the booking."""
        subject = "Update regarding your booking request at Rudra Stay"
        to_email = booking_details.get('guest_email')
        
        reason_text = f"<p><strong>Reason:</strong> {rejection_reason}</p>" if rejection_reason else ""
        
        html = f"""
        <div style="font-family: Arial, sans-serif; max-w-md; margin: 0 auto; color: #4a3b32;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #b58d3d; font-family: Georgia, serif;">Rudra Stay</h1>
            </div>
            <h2 style="color: #4a3b32;">Booking Request Update</h2>
            <p>Dear {booking_details.get('guest_name')},</p>
            <p>Thank you for your interest in Rudra Stay. Unfortunately, we are unable to accommodate your booking request for the <strong>{booking_details.get('item_name')}</strong> from {booking_details.get('check_in')} to {booking_details.get('check_out')}.</p>
            
            {reason_text}
            
            <p>We apologize for the inconvenience and hope to have the opportunity to host you in the future.</p>
            <p>Warm regards,<br>The Rudra Stay Team</p>
        </div>
        """
        return EmailService._send_email(to=to_email, subject=subject, html_content=html)
