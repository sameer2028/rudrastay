# Product Requirements Document (PRD)

# Rudra Stay
### Luxury Stay & Travel Booking Platform

**Version:** 1.0  
**Status:** MVP Planning  
**Prepared By:** Sameer Upadhyay

---

# 1. Product Overview

## Vision

Rudra Stay is a premium travel and accommodation platform that allows customers to discover luxury stays, explore rooms, browse tour packages, and submit booking requests through a seamless and modern experience.

The platform focuses on providing an elegant booking experience while simplifying booking management for hotel staff through an admin dashboard.

The website should emphasize luxury, trust, simplicity, and excellent user experience.

---

# 2. Goals

## Business Goals

- Increase direct booking requests
- Reduce dependency on WhatsApp and phone bookings
- Improve online presence
- Showcase rooms professionally
- Promote tour packages
- Increase customer trust
- Centralize booking management
- Improve operational efficiency

---

## User Goals

Users should be able to

- Discover Rudra Stay
- View room details
- Browse galleries
- Read customer reviews
- Explore tour packages
- Find trips based on budget
- Submit booking requests
- Contact the hotel easily

---

# 3. Target Audience

- Families
- Couples
- Solo Travelers
- Friends Groups
- Backpackers
- Weekend Travelers
- Corporate Travelers
- Tourists visiting Uttarakhand

---

# 4. User Roles

## Guest

Can

- Browse website
- View rooms
- View gallery
- Read reviews
- View packages
- Submit booking request
- Send enquiry

Cannot

- Access dashboard
- Edit content

---

## Admin

Can

- Manage rooms
- Manage bookings
- Manage gallery
- Manage reviews
- Manage packages
- Manage budget trips
- Manage enquiries
- Update homepage content

---

# 5. Website Pages

## Home

Contains

- Hero Banner
- Featured Rooms
- About Preview
- Amenities
- Tour Packages
- Budget Trips
- Gallery Preview
- Customer Reviews
- Contact CTA
- Footer

---

## About

Contains

- Story
- Vision
- Why Choose Rudra Stay
- Nearby Attractions

---

## Rooms

Displays

- Room Cards
- Room Image
- Starting Price
- Capacity
- Amenities
- Book Button

---

## Room Details

Contains

- Image Gallery
- Videos
- Description
- Amenities
- Capacity
- Pricing
- Availability
- Booking CTA

---

## Gallery

Separate Tabs

- Photos
- Videos

---

## Reviews

Contains

- Customer Testimonials
- Ratings

---

## Tour Packages

Each package contains

- Title
- Images
- Duration
- Description
- Pricing
- Inclusions
- Enquiry Button

---

## Budget Trips

Categories

- Under ₹10k
- ₹10k–20k
- ₹20k+
- Family Trips
- Honeymoon Trips
- Luxury Trips
- Backpacking Trips

---

## Contact

Contains

- Contact Form
- Phone Number
- Email
- Google Maps
- WhatsApp CTA

---

# 6. Booking Flow

Homepage

↓

Rooms

↓

Room Details

↓

Book Now

↓

Booking Form

↓

Customer submits request

↓

Booking stored in database

↓

Confirmation email sent

↓

Booking visible in Admin Dashboard

↓

Admin contacts customer manually

---

# 7. Booking Form Fields

Required

- Name
- Phone Number
- Email
- Check-in
- Check-out
- Number of Guests

Optional

- Special Requests

---

# 8. Booking Status

Possible States

- Pending
- Confirmed
- Cancelled
- Completed

---

# 9. Reviews

Initially managed by Admin.

Future enhancement may allow verified customer reviews.

---

# 10. Gallery

Supports

- Photos
- Videos

Media stored using Cloudinary.

---

# 11. Tour Packages

Admin can

- Add
- Edit
- Delete

Each package contains

- Name
- Description
- Duration
- Price
- Images
- PDF Itinerary (optional)

---

# 12. Budget Trips

Admin can create categorized travel suggestions.

Example

- Under ₹10k
- Luxury
- Family
- Backpacking
- Honeymoon

---

# 13. Contact Module

Stores

- Name
- Phone
- Email
- Message

Admin can view all enquiries.

---

# 14. Admin Dashboard

## Dashboard

Displays

- Total Rooms
- Total Bookings
- Pending Bookings
- Contact Enquiries
- Recent Activity

---

## Room Management

- Create
- Update
- Delete
- Upload Images
- Upload Videos
- Manage Amenities
- Manage Pricing

---

## Booking Management

- View Bookings
- Update Status
- Search
- Filter

---

## Gallery Management

- Upload Photos
- Upload Videos
- Delete Media

---

## Reviews

- Create
- Update
- Delete

---

## Tour Packages

- Create
- Update
- Delete

---

## Budget Trips

- Create
- Update
- Delete

---

## Contact Messages

- View
- Delete
- Mark Resolved

---

# 15. Email Notifications

Customer receives

- Booking Request Received

Admin receives

- New Booking Notification
- New Contact Enquiry

---

# 16. Non-Functional Requirements

## Performance

- Lighthouse Score > 90
- Responsive on all devices
- Lazy loading
- Optimized images

---

## Security

- JWT Authentication (Admin)
- Input Validation
- Rate Limiting
- Secure Password Hashing
- Environment Variables

---

## SEO

- Server Side Rendering
- Dynamic Meta Tags
- Sitemap
- robots.txt
- Structured Data
- Open Graph Tags

---

# 17. Tech Stack

## Frontend

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Hook Form
- Zod
- Axios
- TanStack Query

---

## Backend

- FastAPI
- SQLAlchemy
- Alembic
- JWT Authentication

---

## Database

- PostgreSQL (Supabase)

---

## Storage

- Cloudinary

---

## Email

- Resend

---

## Deployment

Frontend

- Vercel

Backend

- Railway

Database

- Supabase

Storage

- Cloudinary

---

# MVP Scope

## Public Website

### Home

- Hero Section
- Featured Rooms
- About Preview
- Amenities
- Featured Packages
- Gallery Preview
- Reviews Preview
- CTA Section

---

### About

- Story
- Vision
- Why Choose Us

---

### Rooms

- Room Listing
- Filters (optional)
- Room Cards

---

### Room Details

- Images
- Videos
- Description
- Amenities
- Capacity
- Pricing
- Booking Button

---

### Gallery

- Photos
- Videos

---

### Reviews

- Customer Testimonials

---

### Tour Packages

- Package Listing
- Package Details
- Enquiry CTA

---

### Budget Trips

- Categories
- Trip Suggestions

---

### Contact

- Contact Form
- Maps
- WhatsApp
- Phone
- Email

---

## Booking System

- Booking Form
- Validation
- Save Booking
- Booking Confirmation Email
- Admin Notification

---

## Admin Panel

### Dashboard

- Overview Cards

### Rooms

- CRUD

### Bookings

- View
- Search
- Status Update

### Gallery

- Upload/Delete

### Reviews

- CRUD

### Packages

- CRUD

### Budget Trips

- CRUD

### Contact Messages

- View/Delete

---

## Integrations

- Cloudinary
- Resend
- Google Maps
- Supabase

---

# Future Scope (Phase 2)

- AI Travel Concierge
- AI Trip Planner
- Customer Authentication
- Online Payments
- Coupons
- Dynamic Pricing
- Booking Calendar
- Wishlist
- Multi-language Support
- Push Notifications
- Travel Blog
- PWA
- Analytics Dashboard

---

# Success Metrics

- Increased booking requests
- Reduced manual booking workload
- Higher visitor engagement
- Better conversion rate
- Increased package enquiries
- Faster admin operations
- Improved SEO ranking