# Gone by Noon — gonebynoon.co

One-page site for Gone by Noon junk removal (Doylestown / Bucks County, PA). Next.js, hosted on Vercel.

## Edit the basics
Everything you'll want to change often is in **`src/site.ts`**: phone number, email, hours, partner company, prices and the town list. Anything still in `[BRACKETS]` needs a real value before launch.

## Quote form
The form posts to `/api/quote`, which:
1. Saves any photos to **Vercel Blob** (Vercel → Storage → create a Blob store → connect it to this project; that adds `BLOB_READ_WRITE_TOKEN`).
2. Sends the lead as JSON to **`CRM_WEBHOOK_URL`** (with `Authorization: Bearer CRM_WEBHOOK_SECRET` if set).

Payload:
```json
{ "source": "gonebynoon.co", "submittedAt": "2026-11-18T18:54:07.436Z",
  "name": "…", "phone": "…", "town": "…", "details": "…", "photoUrls": ["https://…"] }
```
With no webhook set, requests are only written to the Vercel function logs.

## Run locally
```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy
Push to GitHub → import the repo in Vercel → add the env vars from `.env.example` → add the domain `gonebynoon.co` under Settings → Domains.
