# X1 AI Sales Agent Platform

A full-stack AI-powered sales agent platform designed for automotive dealerships. Integrates with VIN CRM to handle inbound calls, outbound lead engagement, and automated lead nurturing using conversational AI.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Call Flow](#call-flow)
- [Development Status](#development-status)
- [Project Structure](#project-structure)

## Overview

X1 AI Sales Agent is a plugin for VIN CRM that automates dealership communications through:

- **AI-Powered Inbound Call Handling** - Real-time conversational AI agents answer incoming calls, qualify leads, and schedule appointments
- **Outbound Lead Engagement** - Automated outreach to new leads with personalized AI conversations
- **Lead Nurturing Automation** - Intelligent follow-up sequences via AI-generated messages and emails
- **Dynamic Lead Allocation** - Configurable distribution between AI agents and human sales teams

## Features

### Agent Management
- Start/stop AI agents via dashboard toggle
- Real-time agent status monitoring
- Configurable lead allocation percentages (0%, 25%, 50%, 75%, 100%)

### Conversational AI
- ElevenLabs integration for natural voice conversations
- Dynamic variable injection (agent name, dealership name)
- Custom agent tools:
  - **Schedule Appointment** - Books appointments directly through the conversation
  - **Transfer to Human** - Seamless handoff to human operators when needed

### Analytics Dashboard
- Total calls and conversion metrics
- Call duration statistics
- Cost per lead analysis
- Call volume trends visualization
- Recent call logs with detailed outcomes

### Billing Integration
- Stripe subscription management
- Checkout session creation
- Webhook handling for payment events

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ Landing  │  │Dashboard │  │Analytics │  │  Plan    │            │
│  │  Page    │  │  Page    │  │  Page    │  │  Page    │            │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │
└─────────────────────────────┬───────────────────────────────────────┘
                              │ REST API
┌─────────────────────────────▼───────────────────────────────────────┐
│                       Backend (FastAPI)                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   Frontend   │  │   Inbound    │  │   Billing    │              │
│  │    Router    │  │    Router    │  │    Router    │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────┬──────────────────┬──────────────────┬─────────────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
    ┌──────────┐      ┌──────────────┐    ┌──────────┐
    │ Database │      │    Twilio    │    │  Stripe  │
    │(SQLModel)│      │  WebSocket   │    │   API    │
    └──────────┘      └──────┬───────┘    └──────────┘
                             │
                             ▼
                      ┌──────────────┐
                      │  ElevenLabs  │
                      │  Conv. AI    │
                      └──────────────┘
```

### Inbound Call Flow

```
Caller → Twilio → POST /api/inbound/incoming-call
                         │
                         ▼
              TwiML Response (WebSocket URL)
                         │
                         ▼
              WebSocket /media-stream
                         │
                         ▼
              TwilioAudioInterface
                    │         │
         Audio In ──┘         └── Audio Out
                    │         │
                    ▼         ▼
              ElevenLabs Conversational AI
                         │
                         ▼
              Agent Tools (Schedule, Transfer)
```

## Technology Stack

### Backend
| Technology | Purpose |
|------------|---------|
| FastAPI | Web framework |
| Uvicorn | ASGI server |
| SQLModel | ORM (SQLAlchemy + Pydantic) |
| ElevenLabs SDK | Conversational AI agents |
| Twilio | Telephony and call handling |
| Stripe | Payment processing |
| python-jose | JWT authentication |
| passlib/bcrypt | Password hashing |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| React Router | Client-side routing |
| Tailwind CSS | Styling |
| Stripe.js | Payment UI |

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- Twilio account with phone number
- ElevenLabs account with conversational AI agent
- Stripe account (for billing features)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file with required variables (see [Configuration](#configuration))

5. Start the development server:
   ```bash
   uvicorn app.main:app --reload --port 5050
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:5050/api
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## Configuration

### Backend Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ELEVENLABS_API_KEY` | ElevenLabs API key | Yes |
| `ELEVENLABS_AGENT_ID` | ElevenLabs conversational agent ID | Yes |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | Yes |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | Yes |
| `HUMAN_OPERATOR_NUMBER` | Phone number for human handoff (E.164 format) | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Yes |
| `STRIPE_PRICE_ID` | Stripe price ID for subscription | Yes |
| `FRONTEND_URL` | Frontend URL for redirects | Yes |
| `AGENT_NAME` | Default AI agent name | No |
| `DEALERSHIP_NAME` | Default dealership name | No |

### Frontend Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend API base URL |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |

### Twilio Webhook Configuration

Configure your Twilio phone number webhooks:

- **Voice Webhook URL**: `https://your-domain.com/api/inbound/incoming-call`
- **Method**: POST

## API Reference

### Frontend API (`/api/frontend`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/agent/status` | Get agent running status |
| POST | `/agent/status` | Set agent running status |
| GET | `/agent/lead-allocation` | Get lead allocation percentage |
| POST | `/agent/lead-allocation` | Update lead allocation percentage |
| GET | `/analytics/summary` | Get analytics summary |
| GET | `/analytics/nurture-leads` | Get leads in nurture pipeline |
| DELETE | `/analytics/nurture-leads/{lead_id}` | Remove lead from nurture |

### Inbound Call API (`/api/inbound`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/incoming-call` | Twilio incoming call webhook |
| WebSocket | `/media-stream` | Real-time audio streaming |

### Billing API (`/api/billing`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create-checkout-session` | Create Stripe checkout session |

### Stripe Webhooks (`/api/stripe`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/webhook` | Handle Stripe webhook events |

## Database Schema

### Users
```sql
- id (PK)
- username (indexed)
- password_hash
- email
```

### Dealerships
```sql
- id (PK)
- name (indexed)
- timezone
- phone_main
- twilio_phone_number
- elevenlabs_inbound_agent_id
- elevenlabs_outbound_agent_id
- ai_lead_percentage
- subscription_tier
- agent_running
```

### Leads (Planned)
```sql
- id (PK)
- dealership_id (FK)
- name, phone, email
- interested_vehicle
- source (website_form, autotrader, etc.)
- status (new, contacted, nurture, closed_won, closed_lost)
```

### Calls (Planned)
```sql
- id (PK)
- dealership_id (FK)
- lead_id (FK)
- twilio_call_sid
- direction (inbound/outbound)
- agent_id (ai/human)
- status (completed, no_answer, failed)
- start_time, end_time
- outcome (appointment_booked, not_interested, etc.)
```

### Nurture Entries (Planned)
```sql
- id (PK)
- dealership_id (FK)
- lead_id (FK)
- stage (followup_1, followup_2, long_term)
- last_contacted
- active (boolean)
```

## Development Status

### Completed
- Inbound call handling with Twilio/ElevenLabs integration
- Real-time WebSocket audio streaming
- Agent start/stop controls
- Lead allocation configuration
- Analytics dashboard UI
- Stripe billing integration
- Frontend dashboard, analytics, and plan pages

### In Progress
- User authentication system
- Database persistence layer

### Planned
- Outbound calling functionality
- VIN CRM integration
- Lead nurturing automation
- Call recording and transcription
- Advanced analytics and reporting
- Multi-dealership support

## Project Structure

```
sales-agent-fullstack/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── billing.py          # Stripe checkout
│   │   │   ├── frontend.py         # Dashboard APIs
│   │   │   ├── inbound.py          # Call handling
│   │   │   └── stripe_webhook.py   # Payment webhooks
│   │   ├── models/
│   │   │   ├── dealership.py       # Dealership model
│   │   │   └── user.py             # User model
│   │   ├── services/
│   │   │   └── twilio_audio_interface.py  # Audio processing
│   │   ├── main.py                 # FastAPI application
│   │   └── stripe_config.py        # Stripe configuration
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AgentStatusCard.tsx
│   │   │   ├── LeadAllocationCard.tsx
│   │   │   └── MatrixBackground.tsx
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── AnalyticsPage.tsx
│   │   │   └── PlanPage.tsx
│   │   ├── api.ts                  # API client
│   │   ├── App.tsx                 # Routing
│   │   └── main.tsx                # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── database_schema.txt
└── README.md
```

## License

Proprietary - All rights reserved.

---

For support or questions, please contact the development team.
