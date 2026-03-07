# Admin Panel Setup Guide

## Required Environment Variables

The admin panel requires these environment variables to be set in Vercel:

### 1. Database Connection
```
DATABASE_URL=postgresql://username:password@host/database
```
**Where to get it:** Your Neon PostgreSQL connection string

### 2. Admin Password
```
ADMIN_PASSWORD=YourSecurePasswordHere
```
**What it does:** Password to log into `/admin/login`

### 3. Admin Secret
```
ADMIN_SECRET=random-secret-key-here
```
**What it does:** HMAC signing key for admin session cookies  
**How to generate:** Run `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 4. (Optional) Vercel Blob for Image Uploads
```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxx
```

---

## Setup Instructions

### Step 1: Generate Admin Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output.

### Step 2: Add to Vercel
1. Go to https://vercel.com/amenti-ais-projects/peptide/settings/environment-variables
2. Add these variables:
   - `DATABASE_URL` = your Neon connection string
   - `ADMIN_PASSWORD` = choose a strong password
   - `ADMIN_SECRET` = paste the generated secret from Step 1

### Step 3: Redeploy
Vercel will automatically redeploy when you add env vars.

Or manually:
```bash
vercel --prod
```

---

## Accessing Admin

1. Go to: **https://peptide-rust.vercel.app/admin**
2. You'll be redirected to `/admin/login`
3. Enter your `ADMIN_PASSWORD`
4. You're in!

---

## Admin Features

- **Dashboard:** Overview stats (sites, products, guides, clicks)
- **Sites:** Manage multiple white-label sites
- **Products:** Add/edit research peptides
- **Guides:** Create educational content
- **Analytics:** Track affiliate clicks

---

## Database Setup

If you haven't set up the database yet:

```bash
# Install dependencies
npm install

# Set DATABASE_URL in .env
echo "DATABASE_URL=your-neon-connection-string" > .env

# Run database setup
npm run db:setup

# Seed with initial data (optional)
npm run db:seed
```

---

## Troubleshooting

### "DATABASE_URL is not set"
- Add `DATABASE_URL` to Vercel environment variables
- Make sure it's a Neon PostgreSQL connection string

### "Invalid password"
- Check that `ADMIN_PASSWORD` is set in Vercel
- Try redeploying after adding the variable

### "ADMIN_SECRET is not set"
- Generate a secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Add it to Vercel as `ADMIN_SECRET`

### Admin redirects to login in a loop
- Clear cookies
- Make sure all 3 env vars are set correctly
- Check Vercel function logs for errors

---

## Security Notes

- **Never commit `.env`** to git (it's in `.gitignore`)
- Use a **strong password** for `ADMIN_PASSWORD`
- Rotate `ADMIN_SECRET` periodically
- Admin cookies are `httpOnly` and `secure` in production
- Session lasts 30 days

---

**Status:** Admin panel is built, just needs env vars configured in Vercel.
