# SchemeFinder — Full Project (Backend + Frontend, integrated)

```
SchemeFinder_Full/
  backend/          Django project — API + admin, SQLite DB, Excel sheets
  schemefinder/     React (Vite) frontend — already wired to call the backend
```

The frontend's `src/services/schemeService.js` is the only file changed on the
frontend — it now calls the Django API below instead of dummy JSON. Every page and
component works unchanged.

## 1. Run the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

# db.sqlite3 is already included with 539 schemes imported — this step is optional,
# only needed if you want to re-import / refresh from the Excel sheets in backend/excel/:
python manage.py migrate
python manage.py import_schemes

# Creates/updates the admin login: admin / admin@gmail.com / Balaji@2006
python manage.py create_admin

python manage.py runserver
```

Backend runs at **http://127.0.0.1:8000**
- API: `http://127.0.0.1:8000/api/schemes/` (list) and `.../api/schemes/AGR001/` (detail)
- Admin panel: `http://127.0.0.1:8000/admin/` — log in with `admin` / `Balaji@2006`

## 2. Run the frontend

Open a second terminal:

```bash
cd schemefinder
npm install
npm run dev
```

Frontend runs at **http://localhost:5173** and pulls real scheme data from the
Django API running on port 8000. Keep both servers running together.

## How it's wired together

- `schemefinder/.env` sets `VITE_API_BASE_URL=http://127.0.0.1:8000/api`.
- `schemefinder/src/services/schemeService.js` fetches from that URL and reshapes
  each Django scheme record (Excel column names) into the field names the UI
  already expects (`name`, `incomeLimit`, `documents[]`, `eligibility[]`, etc.).
- `backend/backend/settings.py` has CORS enabled for `localhost:5173` so the
  browser can call the API directly in dev.
- Eligibility matching (`checkEligibility`) runs as a simple client-side score
  against the real scheme data.
- The Categories page still uses its own static list (`schemefinder/src/data/categories.js`)
  — only scheme listing/details/explore/results pull from the database.

## Notes

- Kept deliberately simple: SQLite (no Postgres), function-based DRF views (no
  viewsets/routers), no auth required to read schemes.
- If you move the API off localhost later, update `schemefinder/.env`'s
  `VITE_API_BASE_URL` and add the new origin to `CORS_ALLOWED_ORIGINS` in
  `backend/backend/settings.py`.
