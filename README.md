# True Smith Jewelers

Luxury lab-grown diamond engagement rings, tennis bracelets, and fine jewelry.

**Live:** https://trusmithjewelers.com  
**Phone:** 239-244-6446

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom brand tokens
- **Database:** PostgreSQL (Prisma ORM)
- **Payments:** Stripe (deposit flow)
- **3D/AR:** Three.js / React Three Fiber (ring viewer)
- **Deployment:** Vercel

---

## Features

### Ring Builder (5-Step)
- Step 1: Choose diamond cut (10 options)
- Step 2: Select setting style (10 options with stories)
- Step 3: Choose metal (14K/18K Yellow/White Gold, Platinum)
- Step 4: Personalize (ring size, engraving, add-ons)
- Step 5: Preview & deposit

### AR Try-On
- 3D ring viewer with glTF model support
- Pre-rendered hand presets (3 skin tones)
- iOS AR Quick Look (.usdz) support
- TODO Phase 2: MediaPipe Hands real-time tracking

### Diamonds Catalog
- 20+ IGI/GIA certified stones
- Filter by cut, carat, color, clarity, price, certification
- Detail page with certificate modal

### Shop
- Ready-to-ship rings, bracelets, chains
- Category tabs, filters, product detail pages

### Education Center
- The 4Cs (cut, color, clarity, carat)
- 10 diamond cuts with interactive guides
- Lab-grown vs natural diamond guide
- Certification education

### Sell Gold
- Cash offers for gold, silver, platinum
- Pawn options

---

## Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Run unit tests
npm test

# Run E2E tests (requires running dev server)
npm run test:e2e

# Database studio
npm run db:studio
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_BASE_URL=https://trusmithjewelers.com
```

---

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full deployment guide.

**Quick deploy to Vercel:**
1. Push to GitHub
2. Import repo in Vercel Dashboard
3. Set environment variables
4. Run `npx prisma migrate deploy`
5. Domain → DNS → SSL

---

## Testing

- **Unit Tests:** Jest + React Testing Library (`__tests__/`)
- **E2E Tests:** Playwright (`e2e/`)
- **Coverage:** Run `npm run test:coverage`

---

## Phase Roadmap

| Phase | Status | Description |
|-------|--------|-------------|
| 0 | ✅ Complete | Foundation, design system, fonts |
| 1 | ✅ Complete | Static pages (home, about, contact) |
| 2 | ✅ Complete | Education center (4Cs, cuts, lab-grown) |
| 3 | ✅ Complete | Diamonds & shop catalog |
| 4 | ✅ Complete | Ring builder (6-step flow) |
| 5 | ✅ Complete | Stripe, SEO, Instagram, sell gold |
| 6 | ✅ Complete | AR try-on, testing, deployment |
| 7 | 🔮 Planned | WebAR (MediaPipe hand tracking) |
| 8 | 🔮 Planned | Admin dashboard, CRM |

---

*Built with ❤️ for True Smith Jewelers — Naples, FL*
