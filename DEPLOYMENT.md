# True Smith Jewelers — Deployment Guide

## Stack
- **Framework:** Next.js 14 (App Router)
- **Platform:** Vercel
- **Database:** PostgreSQL (Vercel Postgres recommended)
- **Domain:** trusmithjewelers.com

---

## Pre-Launch Checklist

### Environment Variables
- [ ] `DATABASE_URL` — PostgreSQL connection string
- [ ] `STRIPE_SECRET_KEY` — Live key from Stripe dashboard
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Live publishable key
- [ ] `STRIPE_WEBHOOK_SECRET` — From Stripe webhook config
- [ ] `NEXT_PUBLIC_BASE_URL` — `https://trusmithjewelers.com`

### Database
- [ ] PostgreSQL provisioned (Vercel Postgres or PlanetScale)
- [ ] Run `npx prisma migrate deploy` against production DB
- [ ] Update schema.prisma: change `provider = "sqlite"` → `"postgresql"`
- [ ] Seed initial product/diamond data

### Stripe
- [ ] Create production Stripe account
- [ ] Add webhook endpoint: `https://trusmithjewelers.com/api/webhooks/stripe`
- [ ] Events to subscribe: `payment_intent.succeeded`, `payment_intent.payment_failed`
- [ ] Test deposit flow end-to-end in test mode first

### Domain & SSL
- [ ] Add `trusmithjewelers.com` domain in Vercel Dashboard
- [ ] Configure DNS A record: `76.76.21.21` (Vercel's IP)
- [ ] Configure CNAME `www` → `cname.vercel-dns.com`
- [ ] SSL certificate auto-provisioned by Vercel (Let's Encrypt)
- [ ] Wait for DNS propagation (5–48 hours)

### Functional Checks
- [ ] Homepage loads correctly
- [ ] Ring builder steps complete end-to-end
- [ ] Quote form submits (check email delivery)
- [ ] Diamonds page loads and filters work
- [ ] Mobile responsive on iPhone Safari
- [ ] Contact phone number correct: **239-244-6446**

### Performance
- [ ] Run Lighthouse on production URL
  - Performance > 90
  - Accessibility > 90
  - Best Practices > 90
  - SEO > 90
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

### Monitoring
- [ ] Vercel Analytics enabled (Dashboard → Analytics)
- [ ] Vercel Speed Insights enabled
- [ ] Error monitoring: Sentry (optional but recommended)

---

## Vercel Deployment Steps

### 1. Connect Repository
```bash
# Push to GitHub first
git remote add origin https://github.com/yourusername/trusmith-jewelers.git
git push -u origin main
```

Then in Vercel Dashboard:
1. Click "Add New Project"
2. Import from GitHub
3. Select `trusmith-jewelers` repo
4. Framework: **Next.js** (auto-detected)
5. Build Command: `npm run build`
6. Install Command: `npm install --legacy-peer-deps`

### 2. Set Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add all vars from `.env.example`.

### 3. Configure Database

**Option A: Vercel Postgres**
```bash
# In Vercel dashboard → Storage → Create Database
# Copy DATABASE_URL to environment variables
```

**Option B: External PostgreSQL (Railway, Supabase, etc.)**
```bash
# Get connection string from provider
# Set DATABASE_URL in Vercel environment variables
```

**Run migrations:**
```bash
# After setting DATABASE_URL
npx prisma migrate deploy
```

Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // ← change from "sqlite"
  url      = env("DATABASE_URL")
}
```

### 4. Deploy
```bash
git push origin main  # Triggers automatic deployment
```

Or use Vercel CLI:
```bash
npm i -g vercel
vercel --prod
```

---

## AR / 3D Models

The AR Try-On component uses:
- **SVG placeholders** (current) — replace with real hand photography for production
- **GLTF/GLB models** for 3D ring viewer — add to `public/models/`
- **USDZ models** for iOS AR Quick Look — add corresponding `.usdz` files

### Adding Real 3D Models
1. Export ring designs from CAD software as `.glb`
2. Optimize with [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline) or [glTF Transform](https://gltf-transform.donmccurdy.com/)
3. Target < 2MB per model
4. Convert to USDZ for iOS: use [Blender USDZ export](https://docs.blender.org/manual/en/latest/files/export/usdz.html)
5. Place in `public/models/ring-[id].glb` and `public/models/ring-[id].usdz`

### Adding Real Hand Photos
Replace the SVG hand placeholders in `src/components/builder/ARTryOn.tsx`:
1. Photograph hands with 3 skin tones on white/neutral background
2. Ensure ring finger is clearly visible and centered
3. Export as WebP at 600×800px
4. Place in `public/hands/hand-1.webp`, `hand-2.webp`, `hand-3.webp`

---

## Ongoing Maintenance

### Database Backups
- Vercel Postgres auto-backups daily
- Export manually: `pg_dump $DATABASE_URL > backup.sql`

### Dependency Updates
```bash
npm outdated           # Check outdated packages
npm update             # Update within semver ranges
npx npm-check-updates  # Upgrade major versions
```

### Performance Monitoring
- Vercel Dashboard → Observability → Speed Insights
- Check Core Web Vitals weekly

---

## Phase 2 Roadmap

- [x] **WebAR** — MediaPipe Hands for real-time ring try-on (Implemented Feb 17, 2026)
- [ ] **Stripe Checkout** — Deposit flow for custom ring orders
- [ ] **Admin Dashboard** — Order management, inventory
- [ ] **Email Notifications** — Automated quote follow-ups
- [ ] **Instagram Feed** — Live @trusmithjewelers integration
- [ ] **Review System** — Customer testimonials

---

*Questions? Call True Smith Jewelers: **239-244-6446***
