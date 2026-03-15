# AlbShift — SaaS Engineering Studio

Premium SaaS engineering studio website built with React 19, TypeScript, Express, and PostgreSQL.

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/download/) v14+
- npm (comes with Node.js)

---

## Project Structure

```
albshift/
├── components/        # Marketing site React components
├── admin/             # Admin dashboard (hash-routed: /#/admin)
├── backend/           # Express API server (port 3001)
│   ├── server.ts
│   ├── db.ts
│   ├── schema.sql
│   └── seed.ts
├── translations.ts    # All UI text (English + Albanian)
├── App.tsx
└── index.html
```

---

## 1. Database Setup

Open your PostgreSQL client (psql or pgAdmin) and create the database:

```sql
CREATE DATABASE albshift;
```

Then run the schema to create all tables:

```bash
psql -U postgres -d albshift -f backend/schema.sql
```

Optionally seed it with initial data:

```bash
cd backend
npx ts-node seed.ts
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Copy the example env file and fill in your values:

```bash
copy .env.example .env
```

Edit `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/albshift
ADMIN_PASSWORD=choose-a-strong-password
PORT=3001
CORS_ORIGINS=http://localhost:3000

# Optional — enables contact form emails
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

Start the backend dev server:

```bash
npm run dev
```

The API will be running at `http://localhost:3001`.

---

## 3. Frontend Setup

Open a **new terminal** in the project root:

```bash
npm install
npm run dev
```

The site will be running at `http://localhost:3000`.

> The frontend works without the backend running — all sections fall back to static data automatically.

---

## 4. Running Both Together

You need **two separate terminals** open simultaneously:

| Terminal | Directory | Command |
|----------|-----------|---------|
| 1 — Backend | `backend/` | `npm run dev` |
| 2 — Frontend | root | `npm run dev` |

---

## 5. Admin Dashboard

Navigate to `http://localhost:3000/#/admin` in your browser.

Login with the password you set in `ADMIN_PASSWORD`.

From the dashboard you can manage:
- Blog posts
- Case studies / projects
- Team members
- FAQs

---

## 6. Production Build

**Frontend:**

```bash
npm run build
npm run preview
```

**Backend:**

```bash
cd backend
npm run build
npm start
```

---

## 7. Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `ADMIN_PASSWORD` | Yes | Password for the admin dashboard |
| `PORT` | No | Backend port (default: `3001`) |
| `CORS_ORIGINS` | No | Comma-separated allowed origins (default: `http://localhost:3000`) |
| `SMTP_HOST` | No | SMTP server for contact form emails |
| `SMTP_PORT` | No | SMTP port (default: `587`) |
| `SMTP_USER` | No | SMTP username |
| `SMTP_PASS` | No | SMTP password |

For the frontend, create a `.env` file in the project root if you need to point to a non-default API URL:

```env
VITE_API_URL=http://localhost:3001
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS (CDN runtime) |
| Backend | Express + Node.js |
| Database | PostgreSQL |
| i18n | Built-in (English + Albanian) |
