# Traveloop Backend - Django REST API

Personalized Travel Planning Made Easy - Full-Stack Engineering Blueprint

## Overview

Traveloop is a sophisticated travel planning application built with Django + Django REST Framework, featuring JWT authentication, comprehensive trip management, budget tracking, packing lists, and more.

## Quick Start

### Prerequisites
- Python 3.8+
- pip
- Virtual environment (recommended)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd traveloop/backend
```

2. **Create and activate virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment**
Create a `.env` file in the project root:
```
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

5. **Run migrations**
```bash
python manage.py migrate
```

6. **Seed cities database**
```bash
python manage.py seed_cities
```

7. **Create superuser**
```bash
python manage.py createsuperuser
```

8. **Start development server**
```bash
python manage.py runserver
```

Server will be available at `http://localhost:8000`

## API Endpoints

### Authentication

#### Register New User
```
POST /api/auth/register/
```
Request:
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "securepass123",
  "password2": "securepass123"
}
```

#### Login
```
POST /api/auth/login/
```
Request:
```json
{
  "email": "user@example.com",
  "password": "securepass123"
}
```

#### Refresh Token
```
POST /api/auth/token/refresh/
```

#### Get Current User Profile
```
GET /api/users/me/
```
Headers:
```
Authorization: Bearer <access_token>
```

#### Update Profile
```
PUT /api/users/update_profile/
PATCH /api/users/update_profile/
```

### Cities

#### List Cities
```
GET /api/cities/?search=Paris
```

#### Get City Detail
```
GET /api/cities/{id}/
```

### Trips

#### List User Trips
```
GET /api/trips/
```
Query parameters:
- `status`: PLANNING, CONFIRMED, IN_PROGRESS, COMPLETED
- `page`: Page number (default: 1)

#### Create Trip
```
POST /api/trips/
```
Request:
```json
{
  "title": "Europe 2024",
  "description": "Summer trip across Europe",
  "start_date": "2024-06-01",
  "end_date": "2024-06-30",
  "total_budget": 5000,
  "currency": "USD"
}
```

#### Get Trip Detail
```
GET /api/trips/{id}/
```

#### Update Trip
```
PATCH /api/trips/{id}/
```

#### Delete Trip
```
DELETE /api/trips/{id}/
```

### Trip Stops

#### List Stops in Trip
```
GET /api/trips/{trip_id}/stops/
```

#### Add Stop to Trip
```
POST /api/trips/{trip_id}/stops/
```
Request:
```json
{
  "city": 1,
  "start_date": "2024-06-01",
  "end_date": "2024-06-05",
  "notes": "Visit Eiffel Tower and museums"
}
```

#### Reorder Stops
```
PATCH /api/trips/{trip_id}/stops/{stop_id}/reorder/
```
Request:
```json
{
  "position": 2
}
```

### Activities

#### List Activities in Stop
```
GET /api/stops/{stop_id}/activities/
```

#### Add Activity
```
POST /api/stops/{stop_id}/activities/
```
Request:
```json
{
  "title": "Eiffel Tower Visit",
  "category": "SIGHTSEEING",
  "date": "2024-06-02",
  "start_time": "09:00",
  "end_time": "12:00",
  "cost": 25.50,
  "currency": "USD"
}
```

### Budget

#### Get Budget Summary
```
GET /api/trips/{trip_id}/budget/
```

Response includes:
- Total planned budget
- Total actual spending
- Breakdown by category
- Budget status (within/over budget)

### Packing

#### List Packing Items
```
GET /api/trips/{trip_id}/packing/
```

#### Add Packing Item
```
POST /api/trips/{trip_id}/packing/
```
Request:
```json
{
  "name": "Passport",
  "category": "DOCUMENTS",
  "is_essential": true,
  "quantity": 1
}
```

#### Get Packing Suggestions
```
POST /api/trips/{trip_id}/packing/suggest/
```

### Notes

#### List Trip Notes
```
GET /api/trips/{trip_id}/notes/
```

#### Create Note
```
POST /api/trips/{trip_id}/notes/
```
Request:
```json
{
  "title": "Travel Tips",
  "content": "Remember to visit local markets on Day 3"
}
```

### Public Sharing

#### Get Public Trip (No Auth Required)
```
GET /api/share/{slug}/
```

## Database Schema

### Users (CustomUser)
- `id` (UUID)
- `email` (unique)
- `username` (unique)
- `avatar_url` (optional)
- `bio` (optional)
- `created_at`
- `updated_at`
- `is_active`

### Cities
- `id` (AutoField)
- `name` (unique, indexed)
- `country`
- `country_code` (ISO 3166-1 alpha-2)
- `timezone`
- `latitude`, `longitude`
- `image_url` (optional)

### Trips
- `id` (UUID)
- `owner` (FK → User, CASCADE)
- `title` (indexed)
- `description`
- `cover_image`
- `start_date` (indexed)
- `end_date`
- `status` (PLANNING, CONFIRMED, IN_PROGRESS, COMPLETED)
- `is_public`
- `share_slug` (unique, URL-safe)
- `total_budget`
- `currency` (ISO 4217)
- `created_at`, `updated_at`

### TripStops
- `id` (UUID)
- `trip` (FK → Trip, CASCADE)
- `city` (FK → City, PROTECT)
- `position` (0-indexed, unique with trip)
- `start_date`, `end_date`
- `notes`
- `daily_budget` (optional)

### TripActivities
- `id` (UUID)
- `trip_stop` (FK → TripStop, CASCADE)
- `title`
- `category` (SIGHTSEEING, FOOD, TRANSPORT, ACCOMMODATION, SHOPPING, OTHER)
- `description`
- `date`
- `start_time`, `end_time` (optional)
- `cost` (always positive)
- `is_completed`
- `booking_ref` (optional)
- `position` (order within stop)

### BudgetEntries
- `id` (UUID)
- `trip` (FK → Trip, CASCADE)
- `trip_stop` (FK → TripStop, optional)
- `category`
- `label`
- `amount` (always positive)
- `entry_type` (PLANNED, ACTUAL)
- `created_at`

### PackingItems
- `id` (UUID)
- `trip` (FK → Trip, CASCADE)
- `name`
- `category` (CLOTHING, DOCUMENTS, ELECTRONICS, HEALTH, OTHER)
- `is_packed`
- `quantity`
- `is_essential`

### TripNotes
- `id` (UUID)
- `trip` (FK → Trip, CASCADE)
- `trip_stop` (FK → TripStop, optional)
- `title`
- `content` (Markdown-aware)
- `created_at`, `updated_at`

## Architecture

### Backend Structure
```
backend/
├── accounts/          # User authentication and profiles
├── trips/            # Core trip management models and logic
├── cities/           # City data and search
├── activities/       # Trip activities
├── budget/           # Budget tracking and aggregation
├── packing/          # Packing lists
├── notes/            # Trip notes and journals
├── analytics/        # Read-only analytics views
├── core/             # Shared utilities, permissions, exceptions
├── backend/          # Django settings and URLs
└── manage.py
```

### Key Design Patterns

1. **Service Layer**: Business logic separated from views
2. **Custom Permissions**: `IsOwnerOrReadOnly` for user-specific data
3. **Cascade Deletes**: Deleting a trip removes all related data
4. **UUID Primary Keys**: Prevents enumeration attacks
5. **Indexing Strategy**: Indexes on frequently queried fields

## Security Features

- ✅ JWT authentication with access/refresh tokens
- ✅ User-specific data access control
- ✅ Rate limiting on auth endpoints
- ✅ CORS configured for frontend
- ✅ Input validation and sanitization
- ✅ SQL injection prevention (Django ORM)
- ✅ UUID primary keys (no ID enumeration)
- ✅ Secure password hashing

## Performance Optimizations

- ✅ Database indexing on hot query paths
- ✅ Pagination on all list endpoints (20 per page)
- ✅ select_related/prefetch_related queries
- ✅ Aggregate queries for budget summaries
- ✅ Database caching for city lists

## Testing

Run tests:
```bash
python manage.py test
```

## Deployment

### Environment Variables
```
SECRET_KEY=<production-secret>
DEBUG=False
ALLOWED_HOSTS=yourdomain.com
DATABASE_URL=postgresql://user:password@host:port/dbname
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

### Database
Use PostgreSQL in production for better performance and reliability.

### Server
- Gunicorn: `gunicorn backend.wsgi:application`
- Nginx as reverse proxy
- SSL/TLS certificates from Let's Encrypt

## Features Implemented

✅ User Authentication (JWT)
✅ Trip Management (CRUD)
✅ Itinerary with ordered stops
✅ Activities tracking
✅ Budget management and aggregation
✅ Packing lists with smart suggestions
✅ Trip notes and journals
✅ Public share links
✅ City search and recommendations
✅ Proper data validation
✅ Cascade deletes
✅ Input sanitization
✅ Pagination
✅ Error handling

## Future Enhancements

- Real-time collaboration on trips
- ML-based activity recommendations
- Map visualization
- Email notifications
- Social features (share with friends)
- Mobile app
- Advanced analytics
- Budget forecasting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is confidential and part of the Odoox Parul evaluation.

## Support

For issues and questions, please contact the development team.

---

**Built with ❤️ using Django + DRF**
