## Full-stack portfolio (React + Django)

This repo contains:
- **`backend/`**: Django settings + URL router
- **`core/`**: REST API endpoints (`/api/profile/`, `/api/contact/`)
- **`frontend/`**: React (Vite) portfolio UI (Tailwind v4)

### Run backend (Django)

From the repo root:

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
```

API endpoints:
- `GET /api/health/`
- `GET /api/profile/`
- `POST /api/contact/` (JSON: `{ name, email, subject?, message }`)

### Run frontend (React)

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). The dev server proxies `/api/*` to `http://127.0.0.1:8000`.

### Customize content

Resume content currently lives in `core/api.py` under `PROFILE`. Update it anytime and refresh the frontend.
