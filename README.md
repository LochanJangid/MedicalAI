# MedicalAI 🧬

**An experimental AI lab for your symptoms.**

MedicalAI is a personal project exploring how far a lightweight AI assistant can go toward helping people describe their symptoms, get clarifying follow-up questions, and find nearby care that actually matches their condition — instead of a generic list of every hospital in town.

**Live app:** [medical-ai-gules.vercel.app](https://medical-ai-gules.vercel.app/)

> ⚠️ MedicalAI does not diagnose conditions or replace professional medical care. If something feels urgent, contact emergency services or a doctor directly.

---

## Features

- **Symptom-gathering chat** — short, focused follow-up questions (onset, severity, related symptoms) instead of a wall of forms, powered by Groq.
- **Google sign-in** — via Supabase Auth, with conversation history saved per user.
- **Try without an account** — 3 free messages, nothing saved, no sign-up required.
- **Incognito mode** — chat without writing anything to the database.
- **Custom chatbot behavior** — tell it how you want answers (shorter, less jargon, a different language) and it remembers.
- **Nearby doctor suggestions** — detects the relevant medical specialty from your conversation (e.g. chest pain → cardiology) and surfaces nearby hospitals/clinics that actually match, with distance and directions, instead of every result nearby.
- **Light/dark theme, collapsible sidebar, mobile-responsive layout.**

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) + Tailwind CSS |
| Backend | FastAPI (Python) |
| Database & Auth | Supabase (Postgres + Google OAuth) |
| LLM | Groq (`openai/gpt-oss-20b`) |
| Nearby places | OpenStreetMap Overpass API |
| Frontend hosting | Vercel |
| Backend hosting | Render |

## Architecture

```
┌─────────────┐     HTTPS      ┌──────────────┐
│   React     │ ─────────────▶ │   FastAPI    │
│  (Vercel)   │ ◀───────────── │   (Render)   │
└─────────────┘                └──────┬───────┘
       │                               │
       │ Google OAuth,                 │ SQLAlchemy
       │ session JWT                   ▼
       ▼                        ┌──────────────┐
┌─────────────┐                 │  Supabase    │
│  Supabase   │ ◀───────────────│  Postgres    │
│    Auth     │   JWKS verify   └──────────────┘
└─────────────┘

FastAPI also calls out to:
  • Groq            — chat replies + specialty detection
  • Overpass API    — nearby hospitals/clinics/doctors
```

The backend verifies each request's Supabase-issued JWT (HS256 legacy secret or JWKS for newer projects) rather than trusting the frontend, and Postgres rows are protected with Row Level Security so a user can only read or write their own conversations.

## Project structure

```
medicalai/
├── frontend/               React + Vite + Tailwind
│   └── src/
│       ├── pages/          Home, Login, Chat, GuestChat
│       ├── components/     chat, sidebar, settings, doctors, home
│       └── hooks/          auth, conversations, settings, theme, doctors
├── backend/                FastAPI
│   └── app/
│       ├── auth/           JWT verification
│       ├── chat/           chat + guest chat endpoints, Groq integration
│       ├── doctors/        specialty detection + Overpass search
│       ├── settings/       per-user chatbot behavior/language
│       └── db/             SQLAlchemy models + session
└── db/
    └── migrations/         SQL migrations, run in order in Supabase
```

## Running locally

**Prerequisites:** Node 18+, Python 3.12, a Supabase project, a Groq API key, a Google Cloud OAuth client.

### Backend
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in Supabase, Groq, and CORS values
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env   # fill in Supabase URL/anon key and the backend URL
npm run dev
```

### Database
Run the SQL files in `db/migrations/` in order, in the Supabase SQL Editor. They create the `conversations`, `messages`, and `user_settings` tables with Row Level Security policies scoping every row to its owner.

## Deployment

The live app is deployed frontend-on-Vercel, backend-on-Render, database-on-Supabase. Environment variables on each platform need:

- **Vercel:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_URL`
- **Render:** `SUPABASE_URL`, `SUPABASE_JWT_SECRET`, `DATABASE_URL` (Supabase *Session pooler* string — Render has no IPv6, so the direct connection string won't work), `GROQ_API_KEY`, `ALLOWED_ORIGINS`
- **Supabase:** Site URL and Redirect URLs pointed at the Vercel domain (with a `*-<vercel-account>.vercel.app/**` wildcard to also cover preview deployments)
- **Google Cloud:** the Vercel domain added to Authorized JavaScript origins, and the OAuth consent screen published (not left in Testing)

## Disclaimer

MedicalAI is an independent, experimental project. It is not a medical device, does not provide diagnoses, and is not a substitute for professional medical advice. In an emergency, contact local emergency services immediately.