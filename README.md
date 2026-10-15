# Camellia Horizons

React (Vite) front end with a small Flask backend for trip inquiries.

## Run it (development)

Terminal 1, backend:

    cd backend
    python -m venv .venv && source .venv/bin/activate    # Windows: .venv\Scripts\activate
    pip install -r requirements.txt
    cp .env.example .env                                  # then set ADMIN_TOKEN
    python app.py

Terminal 2, front end:

    cd frontend
    npm install
    npm run dev

Open the address Vite prints. API calls are proxied to Flask on port 5000.
The site also works without the backend, except for the inquiry form.

## Run it (production, one process)

    cd frontend && npm install && npm run build
    cd ../backend && pip install -r requirements.txt gunicorn
    ADMIN_TOKEN=your-secret gunicorn -b 0.0.0.0:8000 app:app

Flask serves the built site from `frontend/dist/` and the API from `/api`.

## What to edit

| To change                         | Edit                          |
| --------------------------------- | ----------------------------- |
| Text, stats, WhatsApp, email      | `frontend/src/content.js`              |
| Journeys, prices, photos          | `backend/journeys.json`                |
| Photos                            | `frontend/public/images/` (see README) |
| Colours and fonts                 | top of `frontend/src/styles.css`       |

## Reading inquiries

    curl -H "X-Admin-Token: your-secret" http://localhost:5000/api/inquiries

They are stored in `backend/inquiries.db` (SQLite).

## Before launch

- Replace the placeholder stats, prices, WhatsApp number and email.
- Add real photos.
- Inquiries are saved but not emailed; add email sending in `create_inquiry` if you want alerts.
# Camellia
