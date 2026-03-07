# ⚡ Quick Vercel Environment Variable Setup

## What You Need to Do Right Now

The admin panel needs 3 environment variables in Vercel. Here's how to set them up:

---

## 1️⃣ Go to Vercel Settings

https://vercel.com/amenti-ais-projects/peptide/settings/environment-variables

---

## 2️⃣ Add These 3 Variables

### A) DATABASE_URL
**Value:** Your Neon PostgreSQL connection string  
**Example:** `postgresql://user:pass@ep-xxxxx.us-east-1.aws.neon.tech/neondb?sslmode=require`

**Where to get it:**
- Go to https://console.neon.tech
- Select your project
- Copy the connection string

---

### B) ADMIN_PASSWORD
**Value:** A strong password you'll use to log in  
**Example:** `MySecurePassword123!`

**This is what you'll type at `/admin/login`**

---

### C) ADMIN_SECRET
**Value:** A random 64-character hex string

**Generate it:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste as the value.

**Example output:** `a1b2c3d4e5f6... (64 chars)`

---

## 3️⃣ Save & Redeploy

After adding all 3 variables, Vercel will auto-redeploy.

Or manually trigger:
```bash
vercel --prod
```

---

## 4️⃣ Test Admin

1. Visit: https://peptide-rust.vercel.app/admin
2. You'll redirect to `/admin/login`
3. Enter your `ADMIN_PASSWORD`
4. ✅ Done!

---

## ⚠️ Current Issue

**Right now the admin shows an error** because these env vars aren't set in Vercel yet.

Once you add them and redeploy, the admin will work perfectly.

---

## Database Setup (If Needed)

If you haven't set up the Neon database schema:

```bash
# Clone repo locally
git clone https://github.com/AmentiAI/peptide.git
cd peptide

# Install deps
npm install

# Create .env with your DATABASE_URL
echo "DATABASE_URL=postgresql://..." > .env

# Run database setup
npm run db:setup

# Optional: Seed with sample data
npm run db:seed
```

---

**That's it!** Once env vars are in Vercel, admin works. 🚀
