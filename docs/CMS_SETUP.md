# Neon CMS setup

1. Put your Neon pooled `DATABASE_URL` in `.env.local`
2. Set `AUTH_SECRET`
3. Create tables and admin user:

```bash
npm run db:push
npm run db:seed
```

4. Sign in at `/admin/login` with `admin@kililigo.org` / `Admin@123`

Optional: seed the default programs and about content:

```bash
npm run db:seed:programs
npm run db:seed:about
npm run db:seed:home
npm run db:seed:contact
```

## File uploads

- **Local development:** uploads save to `public/uploads/cms` (no Blob token needed).
- **Vercel production:** create a Blob store in the Vercel dashboard (Storage → Blob), copy `BLOB_READ_WRITE_TOKEN` into project env vars and `.env.local`.

Limits: images ≤ 2 MB, PDFs ≤ 5 MB.
