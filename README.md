# Kililigo Foundation Landing Page

A modern, responsive, and high-performance landing page for **Kililigo Foundation (KF)**, a Somalia-based NGO.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Font:** Inter (Google Fonts)

## Design System

- **Primary:** Orange `#EF7F1A`
- **Secondary:** Blue `#005EB8`
- **Background Cream:** `#FFFDF9`
- **Card Background:** `#FFF4E0`
- **Footer Dark:** `#003366`

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin CMS (News, Press, Vacancies)

1. Create a free **Neon** database from the Vercel Marketplace and copy `DATABASE_URL`.
2. Create a **Vercel Blob** store and copy `BLOB_READ_WRITE_TOKEN` (optional for URL-only images).
3. Copy `.env.example` → `.env.local` and fill in values. Generate `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

4. Push the schema and create an admin user:

```bash
npm run db:push
npm run db:seed
```

5. Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login) with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

Default admin credentials: **`admin@kililigo.org`** / **`Admin@123`** (change these in `.env.local` for production)

### Build for Production

```bash
npm run build
npm start
```

## Page Structure

1. **Navigation** – Sticky glassmorphism header with Logo, About Us, Programs, Impact, Donate Now CTA
2. **Hero** – Headline, subtext, and dual CTAs (Our Programs / Support Our Mission)
3. **Mission/Vision** – Horizontal cards on cream background
4. **Programs** – 8 interactive cards (Humanitarian, Health, Education, Human Rights, Women Empowerment, Youth Leadership, Peacebuilding, Research)
5. **Impact Counter** – Stats: 1,000+ Assisted, 30+ Emergency Responses, 3 Health Centers, 8 Schools
6. **Partners** – Grayscale logo carousel (UNHCR, UNICEF, MSF, USAID, IKEA Foundation)
7. **Donate Banner** – Call-to-action section
8. **Footer** – Contact form, Newsletter signup, social links, and organization details

## Contact Information

- **HQ:** Haji Ali Road, Hantiwadag, Garowe, Somalia
- **Executive Director:** Bashir Said Ismail
- **Board Chair:** Mohamed Abullahi Said
