# Suchir Reddy Portfolio

Premium Next.js portfolio frontend with a PostgreSQL/Prisma admin CMS.

## Setup

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
3. Install dependencies with `npm install`.
4. Run `npm run prisma:migrate`.
5. Run `npm run admin:create`.
6. Start the app with `npm run dev`.

## Admin

- Login: `/admin/login`
- Dashboard: `/admin/dashboard`
- Projects, skills, timeline, messages, and settings are managed from protected admin routes.
- Project screenshots upload to `public/uploads/projects`.
