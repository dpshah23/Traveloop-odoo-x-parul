# Traveloop

> Modern intelligent travel orchestration platform built with Django, DRF, React, Vite, Tailwind CSS, and JWT authentication.

[![Hackathon Project](https://img.shields.io/badge/Hackathon-Odoo%20X%20Parul-blue?logo=hackathon)](https://www.paruluniversity.ac.in)
[![Backend](https://img.shields.io/badge/Backend-Django%204.2.11-green?logo=django&logoColor=white)](https://www.djangoproject.com)
[![API](https://img.shields.io/badge/API-DRF-brightgreen?logo=django)](https://www.django-rest-framework.org)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue?logo=react)](https://vitejs.dev)
[![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-cyan?logo=tailwindcss)](https://tailwindcss.com)
[![Database](https://img.shields.io/badge/Database-SQLite%20%2F%20Postgres-lightgrey?logo=sqlite)](https://www.sqlite.org)


## 🚀 Hero

**Traveloop** is a polished travel planning platform built as a startup-grade hackathon submission for the Odoo X Parul University challenge. It combines a domain-driven Django REST backend with a premium React user experience to solve the persistent problem of fragmented travel planning.

- Built for modern solo travelers, couples, and small groups.
- Designed to centralize trip planning, itinerary creation, budget tracking, and journey insights.
- Engineered for maintainability, extensibility, and real-world product maturity.

---

## 1. Overview

Traveloop is a full-stack travel management suite that empowers users to design multi-city journeys, organize itinerary stops, monitor budgets, and maintain packing and journal details inside one cohesive platform.

It solves the challenge of scattered travel planning by providing:
- centralized trip workflows
- city-level stop management
- activity scheduling and cost tracking
- budget analytics with category breakdowns
- secure JWT-based authentication
- modern UI built with React and Tailwind

This project is ideal for:
- travel startup prototypes
- student portfolios
- product demos for B2C travel software
- project-based learning in full-stack engineering

Key engineering highlights:
- Domain-specific travel models with strong validation
- Custom JWT refresh pipeline with Axios retry queue
- Dashboard-first React architecture with responsive layouts
- DRF viewsets, action endpoints, and object-level ownership checks
- Pre-fetch and eager loading for performance-sensitive endpoints

---

## 2. Problem Statement

Travel planning is broken into dozens of disconnected tools:
- one app for flight search
- another for hotel bookings
- spreadsheets for budgets
- notes in separate apps
- itinerary details scattered across email and maps

That makes multi-city trips extremely hard to manage:
- dates drift and stop sequences become inconsistent
- budgets are tracked in spreadsheets with no realtime view
- packing lists are easy to lose while traveling
- activity plans are hard to share or revisit
- team coordination is impossible without a single source of truth

Traveloop was built to solve those real-world travel problems by unifying planning, budgeting, itinerary, packing, and sharing in one single product flow.

---

## 3. Solution Architecture

Traveloop is a clean separation of responsibilities between the backend API and the frontend experience.

User ➜ React SPA ➜ DRF JSON API ➜ Relational Database

### Architectural flow

```text
User Browser
   └─ React + Tailwind UI
        ├─ Auth context + JWT token refresh
        ├─ Protected routes for dashboard and planner
        ├─ Recharts analytics and responsive cards
        └─ Axios API client with auto-refresh queue

Backend API
   ├─ Django REST Framework viewsets
   ├─ Custom User model with email login
   ├─ Trip / Stop / Activity / Budget domain services
   ├─ Ownership permissions and validation
   └─ Public sharing via secure slug endpoint

Database
   ├─ Users
   ├─ Trips
   ├─ TripStops
   ├─ TripActivities
   ├─ BudgetEntries
   ├─ PackingItems
   └─ TripNotes
```

### System workflow

1. User registers or logs in through JWT auth
2. Frontend stores access + refresh tokens in localStorage
3. User creates a trip and adds city stops
4. Trip stops enforce in-range dates and position normalization
5. Activities and budgets are attached to stops and trips
6. Dashboard surfaces analytics, spending progress, and journey status
7. Optionally publish a trip to a public share slug for external viewing

---

## 4. Features

### 🔐 Authentication
- Secure JWT login and refresh flow
- Custom token responses with embedded user profile data
- Protected React routes and session restoration
- Auto token refresh queue for concurrent requests

### 🧭 Trip Planning
- Multi-city trip creation with travel status tracking
- Start/end date validation and status lifecycle
- Cover image, description, currency, and total budget fields
- Trip ownership enforced at the API layer

### 🗺 Itinerary Builder
- City stop timeline UI for multi-stop trips
- Stop dates validated within trip range
- Ordered trip stops with normalization service
- Activity cards with time, cost, and completion state

### 💰 Budget Tracking
- Budget entry model with planned vs actual tracking
- Category-based expense breakdowns
- Dashboard budget progress bars and analysis
- Real-time analytics from aggregated budget summaries

### 🎒 Packing Checklist
- PackingItem model scoped to trips and stops
- Essential flag, category, quantity, and position ordering
- Built inside the trip module for domain cohesion

### 📝 Notes & Journal
- Trip notes journal entries attached to trips and stops
- Public/private note flags for future sharing capabilities
- Strong trip-centric data ownership for security

### 🌐 Public Sharing
- Shareable trip slug endpoint: `GET /api/share/{slug}/`
- Public read-only trip view without auth
- Secure share slug generation with URL-safe tokens

### 📊 Dashboard & Analytics
- Responsive dashboard with summary cards
- Top spending trips and category insights
- Recharts visual analytics for budgets
- Premium dark mode-inspired interface

### 💎 UI/UX Highlights
- Modern SaaS dashboard aesthetic
- Responsive navigation and layouts
- Loading skeletons and empty states
- Reusable cards, buttons, and section components
- Tailwind design system with polished spacing

---

## 5. Technical Stack

| Layer | Technology | Purpose |
|---|---|---|
| Backend | Django 4.2, Django REST Framework | API server, data modeling, authentication |
| Auth | djangorestframework-simplejwt | JWT access + refresh, secure API auth |
| Frontend | React 18, Vite | Single-page app, fast HMR, modern build |
| Styling | Tailwind CSS | Utility-first responsive UI |
| State | React Context + hooks | Authentication and page state management |
| Charts | Recharts | Budget visualization and analytics |
| HTTP Client | Axios | API requests, token refresh interceptor |
| Database | SQLite (default) / PostgreSQL-ready | Relational storage for travel domain |
| Dev Tools | ESLint, Vite, Django devserver | Developer productivity & quality |

---

## 6. Database Design

Traveloop uses a normalized relational schema built around a `Trip` core.

### Core entities
- `CustomUser`: custom email-first user model
- `Trip`: travel plan container
- `TripStop`: destination stop inside a trip
- `TripActivity`: timed activity inside a stop
- `BudgetEntry`: expense tracking item
- `PackingItem`: packing checklist item
- `TripNote`: travel journal note
- `City`: geo destination reference

### Relationship diagram

```text
CustomUser
 └── Trip
      ├── TripStop
      │     └── TripActivity
      │     └── PackingItem
      │     └── TripNote
      ├── BudgetEntry
      ├── PackingItem
      └── TripNote

City
 └── TripStop
```

### Why this schema works
- `Trip` is the single source of truth for a travel plan
- `TripStop` is position-indexed and constrained to trip dates
- `TripActivity` enforces activity dates within stop windows
- `BudgetEntry` tracks both planned and actual spend by category
- `PackingItem` and `TripNote` are modeled in the trip domain for consistency
- `City` is denormalized as a reusable destination catalog

### Scalability and indexing
- Indexed trip ownership, status, and sharing slug lookups
- Date indexes for itinerary filtering
- Joined query support via `select_related` and `prefetch_related`
- Unique trip stop position constraints for ordering stability

---

## 7. Backend Architecture

Backend is organized into specialized Django apps:
- `accounts`: custom user model, registration, JWT authentication, profile updates
- `trips`: trip core, trip stop flow, packing and note domain objects
- `activities`: activity payloads with category and scheduling validation
- `budget`: expense entries and budget analytics
- `cities`: destination catalog and seedable city data
- `analytics`: aggregation-ready module for future reporting

### API structure
- `TripViewSet`: list, detail, create, update, delete user trips
- `TripStopViewSet`: nested stop creation and listing inside trips
- `BudgetViewSet`: trip budget entries plus list/create endpoints
- `TripActivityViewSet`: stop-level activity handling
- `PublicTripShareView`: public read-only trip share endpoint

### Services and validation
- `normalize_stop_positions`: keeps stop position values dense after reorder or insert
- `aggregate_budget`: returns planned/actual totals with category aggregation
- Model `clean()` methods protect date integrity and prevent invalid budgets
- Custom permission `IsTripOwner` protects every object related to a trip
- Custom DRF exception handler standardizes API error payloads

---

## 8. Frontend Architecture

The frontend is a React Vite SPA with scoped app layouts and reusable design components.

### Structure
- `src/App.jsx`: route definitions and protected/public routing
- `src/context/AuthContext.jsx`: auth lifecycle, login/signup, token refresh
- `src/api/client.js`: Axios client with interceptor-based JWT refresh
- `src/layouts`: Main app layout and dashboard container
- `src/pages`: dashboard, trips, itinerary, budget, packing, notes, auth pages
- `src/components`: reusable cards, UI primitives, itinerary stop cards, modals

### UI patterns
- `ProtectedRoute` / `PublicRoute` ensures gated content
- `MainLayout` provides persistent navigation and sign-out flow
- `DashboardLayout` wraps analytics pages with full-width UI
- `Card` and `StatCard` components deliver consistent SaaS styling
- `Recharts` charts render budget breakdowns with responsive design

### Data flow
- `AuthContext` initializes session from `localStorage`
- `apiClient` attaches Bearer tokens to requests automatically
- 401 responses trigger refresh logic and request replay
- All client code uses modern React hooks for state and effects

---

## 9. API Documentation

### Authentication
| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/register/` | `POST` | Register new user |
| `/api/auth/login/` | `POST` | Issue access + refresh tokens |
| `/api/auth/token/refresh/` | `POST` | Refresh access token |
| `/api/users/me/` | `GET` | Fetch current profile |
| `/api/users/update_profile/` | `PUT/PATCH` | Update profile |

### Trips
| Endpoint | Method | Notes |
|---|---|---|
| `/api/trips/` | `GET` | List user trips |
| `/api/trips/` | `POST` | Create trip |
| `/api/trips/{id}/` | `GET` | Retrieve trip detail |
| `/api/trips/{id}/` | `PATCH` | Update trip |
| `/api/trips/{id}/` | `DELETE` | Delete trip |
| `/api/trips/{id}/budget/` | `GET` | Trip budget summary |
| `/api/trips/{id}/normalize_stops/` | `POST` | Normalize stop order |

### Trip Stops
| Endpoint | Method | Notes |
|---|---|---|
| `/api/trips/{trip_pk}/stops/` | `GET` | List stops for a trip |
| `/api/trips/{trip_pk}/stops/` | `POST` | Create stop in a trip |

### Activities
| Endpoint | Method | Notes |
|---|---|---|
| `/api/stops/{stop_pk}/activities/` | `GET` | List activities for a stop |
| `/api/stops/{stop_pk}/activities/` | `POST` | Add activity to stop |
| `/api/activities/` | `GET` | Global activity listing for authenticated owner |

### Budget
| Endpoint | Method | Notes |
|---|---|---|
| `/api/budget/` | `GET` | List budget entries |
| `/api/budget/` | `POST` | Create budget entry |
| `/api/trips/{trip_pk}/budget/` | `GET` | Budget summary for a trip |

### Public Sharing
| Endpoint | Method | Notes |
|---|---|---|
| `/api/share/{slug}/` | `GET` | Public, unauthenticated trip preview |

### Example request
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","password":"SuperSecure1"}'
```

### Example response
```json
{
  "access": "<jwt-access-token>",
  "refresh": "<jwt-refresh-token>",
  "user": {
    "id": "<uuid>",
    "email": "user@example.com",
    "username": "traveler",
    "avatar_url": null,
    "bio": null
  }
}
```

---

## 10. UI/UX Highlights

- Dashboard-first experience with premium contrast and whitespace
- Floating navigation, sticky headers, and mobile-friendly menus
- Empty state handling across itinerary, trips, and budgets
- Reusable cards, stat panels, and action buttons for consistency
- Visual budget progress bars and status alerts
- Timeline-style itinerary cards for better travel sequencing
- Clear CTA flows for onboarding, trip creation, and analytics

---

## 11. Security Features

- JWT auth with access + refresh tokens
- Axios interceptor refresh queue to prevent race conditions
- Protected API routes enforced at viewset level
- `IsTripOwner` object permission for every trip-related model
- Model-level validation for date ranges and non-negative costs
- DRF exception handler for standardized API errors
- CORS whitelist for local development clients
- Environment-driven secret configuration for production

---

## 12. Performance Optimizations

- `select_related` and `prefetch_related` used on trip querysets
- Queryset filtering limited to authenticated user ownership
- DRF pagination configured globally for scalable list endpoints
- Reusable React primitives minimize render overhead
- Axios token refresh avoids repeated auth failures during session renewal
- Frontend data fetching is batched in budget analytics where possible

---

## 13. Installation & Setup

### Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate      # Windows
pip install -r requirements.txt
```

Create `.env` in `backend/` with:
```ini
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

Run migrations and seed data:
```bash
python manage.py migrate
python manage.py seed_cities
python manage.py createsuperuser
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Set frontend API base URL in `.env` if needed:
```bash
VITE_API_BASE_URL=http://localhost:8000
```

Visit `http://localhost:5173` to open the React app.

---

## 14. Project Structure

```text
Traveloop-odoo-x-parul/
├── backend/
│   ├── accounts/          # Custom user auth, JWT sign-in, profile APIs
│   ├── analytics/         # Aggregations and future reporting layer
│   ├── audit/             # [Optional placeholder for audit and logging]
│   ├── backend/           # Django project configuration, URLs, settings
│   ├── budget/            # Budget entry and spending domain
│   ├── cities/            # Destination catalog and seed data
│   ├── trips/             # Trip core, stops, packing, notes, serializers
│   ├── activities/        # Activity planning and stop-level scheduling
│   ├── manage.py
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── api/           # Axios client, auth request helpers
   │   ├── components/     # UI components, cards, itinerary widgets
   │   ├── context/        # Auth context provider and hooks
   │   ├── hooks/          # Custom React hooks
   │   ├── layouts/        # Main and dashboard layout containers
   │   ├── pages/          # App pages for dashboard, trips, itinerary, budget
   │   ├── routes/         # Public/protected route wrappers
   │   ├── utils/          # helpers and auth storage wrappers
   │   ├── App.jsx
   │   ├── main.jsx
   │   ├── index.css
   │   └── constants/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
├── README.md
```

---

## 15. Development Workflow

1. Build backend endpoints in Django viewsets.
2. Model validation and ownership checks in serializers and permissions.
3. Expose nested endpoints for trip stops, activities, budget summaries, and public share.
4. Connect React pages to the API using `apiClient`.
5. Store auth tokens with refresh support and hydrate user context on load.
6. Render analytics and itinerary pages with responsive card components.
7. Iterate UI state with skeletons, empty states, and accessible controls.

---

## 16. Edge Cases Handled

- Trip stop date validation prevents out-of-bound date ranges
- Activity creation enforces stop-specific dates
- Negative budget or activity cost values are rejected
- Unauthorized access is blocked by the owner permission layer
- Empty itineraries and budgets have polished UI states
- Token expiration is handled transparently with refresh retry logic
- Stop ordering remains stable through normalization service

---

## 17. Future Improvements

- AI-driven itinerary suggestions and destination recommendations
- Interactive map visualization for trip stops
- Real-time collaboration and shared travel planning
- Export to PDF, iCal, and shareable itinerary summaries
- Offline-first mode and progressive web app support
- Multi-currency exchange and automatic budget reconciliation
- Mobile app wrapper for native cross-platform deployment

---

## 18. Deployment

### Backend
- Configure `DEBUG=False` and secure `SECRET_KEY`
- Switch `DATABASES` to PostgreSQL or managed cloud DB
- Run via `gunicorn backend.wsgi:application`
- Use environment variables for production config

### Frontend
- Build with `npm run build`
- Host static assets on Vercel / Netlify / Cloudflare Pages
- Proxy or CORS-configure to the Django backend

### Docker / Cloud
- This repository is production-ready for Docker packaging
- Deploy backend and frontend as separate services
- Use a cloud-hosted PostgreSQL instance for scalability

---

## 19. Screenshots

> Replace these placeholders with live production screenshots when available.

- `Dashboard`: premium analytics and travel summary cards
- `Itinerary`: timeline-based itinerary builder with activity cards
- `Budget`: interactive spending breakdown and progress analytics
- `Mobile`: responsive navigation and mobile-first trip management
- `Public Share`: secure trip preview via slug URL

---

## 20. Interview / Engineering Highlights

This implementation was designed to showcase real product-level engineering:
- Chose Django + DRF for rapid API development with strong model validation
- Chose React + Vite for a polished front-end developer experience
- Built a custom JWT refresh queue to prevent auth race conditions
- Kept packing and notes within the trip domain to preserve business rules
- Introduced explicit stop ordering normalization for itinerary stability
- Used both `select_related` and `prefetch_related` to optimize DB performance

Traveloop is more than a hackathon demo: it is a full-stack travel product architecture designed for portfolio-level presentation and future productization.
