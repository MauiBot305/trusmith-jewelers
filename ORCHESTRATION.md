# True Smith Jewelers — Orchestration Plan

**Project:** Full luxury jewelry e-commerce website
**Created:** Feb 17, 2026
**Orchestrator:** Maui (Opus 4.5)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    OPUS 4.5 ORCHESTRATOR (Maui)                 │
│              Coordinates all work, manages dependencies          │
└─────────────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│  SONNET 4.5   │       │  SONNET 4.5   │       │  SONNET 4.5   │
│  Work Stream  │       │  Work Stream  │       │  Work Stream  │
│  (Major Area) │       │  (Major Area) │       │  (Major Area) │
└───────────────┘       └───────────────┘       └───────────────┘
        │                       │                       │
   ┌────┴────┐             ┌────┴────┐             ┌────┴────┐
   ▼         ▼             ▼         ▼             ▼         ▼
┌──────┐ ┌──────┐     ┌──────┐ ┌──────┐     ┌──────┐ ┌──────┐
│HAIKU │ │HAIKU │     │HAIKU │ │HAIKU │     │HAIKU │ │HAIKU │
│ 4.5  │ │ 4.5  │     │ 4.5  │ │ 4.5  │     │ 4.5  │ │ 4.5  │
│(Task)│ │(Task)│     │(Task)│ │(Task)│     │(Task)│ │(Task)│
└──────┘ └──────┘     └──────┘ └──────┘     └──────┘ └──────┘
```

---

## Dependency Graph

```
PHASE 0: FOUNDATION ─────────────────────────────────────────────────┐
│                                                                     │
│  [0A] Project Scaffold ──┬──> [0B] Design System                   │
│       (Next.js setup)    │         (Tailwind, shadcn)              │
│                          │                                          │
│                          └──> [0C] Database Schema                  │
│                                    (Prisma, PostgreSQL)             │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│ PHASE 1: STATIC     │  │ PHASE 2: EDUCATION  │  │ PHASE 3: PRODUCTS   │
│ (Homepage, About,   │  │ (Lab-grown, Cuts,   │  │ (Catalog, Shop,     │
│  Contact, Sell Gold)│  │  4Cs, Certs)        │  │  Product Pages)     │
│ [Can parallelize]   │  │ [Can parallelize]   │  │ [Needs 0C]          │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
          │                        │                        │
          └────────────────────────┼────────────────────────┘
                                   ▼
                    ┌─────────────────────────────────┐
                    │ PHASE 4: BUILD YOUR RING        │
                    │ (6-step configurator)           │
                    │ [Needs Phase 3 complete]        │
                    └─────────────────────────────────┘
                                   │
                                   ▼
                    ┌─────────────────────────────────┐
                    │ PHASE 5: INTEGRATIONS           │
                    │ (Stripe, Social, Analytics)     │
                    │ [Needs Phase 4 for checkout]    │
                    └─────────────────────────────────┘
                                   │
                                   ▼
                    ┌─────────────────────────────────┐
                    │ PHASE 6: POLISH & DEPLOY        │
                    │ (AR, Performance, Testing)      │
                    │ [Final phase]                   │
                    └─────────────────────────────────┘
```

---

## Phase Breakdown

### PHASE 0: FOUNDATION (Sonnet 4.5 Lead)

**Dependencies:** None (starts immediately)
**Blocks:** Everything else

#### 0A: Project Scaffold [Difficulty: 3/10]

| Task                        | Model | Difficulty | Description                |
| --------------------------- | ----- | ---------- | -------------------------- |
| Next.js 14 App Router setup | Haiku | 2/10       | Create app with TypeScript |
| Tailwind CSS configuration  | Haiku | 2/10       | Black + gold color palette |
| shadcn/ui installation      | Haiku | 2/10       | Core components            |
| ESLint + Prettier           | Haiku | 1/10       | Code quality tooling       |
| Folder structure            | Haiku | 2/10       | Organize by feature        |

#### 0B: Design System [Difficulty: 4/10]

| Task                | Model | Difficulty | Description              |
| ------------------- | ----- | ---------- | ------------------------ |
| Color tokens        | Haiku | 2/10       | Black, gold, accents     |
| Typography scale    | Haiku | 3/10       | Premium fonts, hierarchy |
| Base components     | Haiku | 3/10       | Button, Card, Input      |
| Layout components   | Haiku | 3/10       | Container, Grid, Section |
| Animation utilities | Haiku | 3/10       | Smooth transitions       |

#### 0C: Database Schema [Difficulty: 5/10]

| Task            | Model | Difficulty | Description                |
| --------------- | ----- | ---------- | -------------------------- |
| Prisma setup    | Haiku | 2/10       | Connect PostgreSQL         |
| Customer model  | Haiku | 3/10       | Profile, auth, preferences |
| Lead model      | Haiku | 2/10       | Quote requests             |
| Diamond model   | Haiku | 3/10       | All specs, certifications  |
| Setting model   | Haiku | 3/10       | Ring settings, styles      |
| Metal model     | Haiku | 2/10       | Gold types, platinum       |
| Design model    | Haiku | 3/10       | Saved configurations       |
| Deposit model   | Haiku | 3/10       | Payment tracking           |
| Inventory model | Haiku | 3/10       | Ready-to-ship items        |
| Contact model   | Haiku | 2/10       | Messages                   |
| Gold sell model | Haiku | 2/10       | Gold selling requests      |

---

### PHASE 1: STATIC PAGES (Sonnet 4.5 Lead)

**Dependencies:** 0A, 0B
**Can run parallel with:** Phase 2

#### 1A: Homepage [Difficulty: 6/10]

| Task                    | Model | Difficulty | Description                    |
| ----------------------- | ----- | ---------- | ------------------------------ |
| Hero section            | Haiku | 3/10       | Animated headline, CTAs        |
| Trust strip             | Haiku | 2/10       | Warranty, returns, rating      |
| Feature tiles           | Haiku | 3/10       | Build ring, find diamond, shop |
| Lab-grown value section | Haiku | 3/10       | Benefits, icons                |
| Featured carousel       | Haiku | 3/10       | Product slider                 |
| Education teaser        | Haiku | 2/10       | Link to education              |
| Instagram preview       | Haiku | 3/10       | Feed embed                     |
| Footer                  | Haiku | 2/10       | Links, contact, socials        |

#### 1B: About Page [Difficulty: 3/10]

| Task                  | Model | Difficulty | Description          |
| --------------------- | ----- | ---------- | -------------------- |
| Brand story section   | Haiku | 2/10       | Company narrative    |
| Philosophy section    | Haiku | 2/10       | Lab-grown commitment |
| Craftsmanship section | Haiku | 2/10       | Quality focus        |
| Trust badges          | Haiku | 1/10       | Certifications       |

#### 1C: Contact Page [Difficulty: 3/10]

| Task                 | Model | Difficulty | Description                 |
| -------------------- | ----- | ---------- | --------------------------- |
| Contact form         | Haiku | 3/10       | Name, phone, email, message |
| Form validation      | Haiku | 2/10       | Zod schema                  |
| API route            | Haiku | 2/10       | Handle submissions          |
| Contact info display | Haiku | 1/10       | Phone, address, socials     |

#### 1D: Sell Your Gold Page [Difficulty: 4/10]

| Task                   | Model | Difficulty | Description                     |
| ---------------------- | ----- | ---------- | ------------------------------- |
| Value proposition      | Haiku | 2/10       | 90% spot price messaging        |
| Quote form             | Haiku | 3/10       | Gold type, weight, photo upload |
| Photo upload component | Haiku | 3/10       | Drag & drop, preview            |
| Spot price display     | Haiku | 2/10       | Placeholder for API             |
| API route              | Haiku | 2/10       | Handle submissions              |

---

### PHASE 2: EDUCATION SYSTEM (Sonnet 4.5 Lead)

**Dependencies:** 0A, 0B
**Can run parallel with:** Phase 1, Phase 3

#### 2A: Lab-Grown Diamonds [Difficulty: 3/10]

| Task                   | Model | Difficulty | Description             |
| ---------------------- | ----- | ---------- | ----------------------- |
| What they are          | Haiku | 2/10       | Definition, explanation |
| Why they're real       | Haiku | 2/10       | Scientific backing      |
| Creation process       | Haiku | 2/10       | HPHT, CVD explanation   |
| Ethical benefits       | Haiku | 2/10       | Conflict-free           |
| Environmental benefits | Haiku | 2/10       | Sustainability          |
| Value advantages       | Haiku | 2/10       | Price comparison        |
| Page layout            | Haiku | 2/10       | Elegant presentation    |

#### 2B: Diamond Cuts (10 Pages) [Difficulty: 4/10]

| Task                 | Model | Difficulty | Description             |
| -------------------- | ----- | ---------- | ----------------------- |
| Round Brilliant page | Haiku | 2/10       | Look, style, why choose |
| Oval page            | Haiku | 2/10       | Look, style, why choose |
| Princess page        | Haiku | 2/10       | Look, style, why choose |
| Cushion page         | Haiku | 2/10       | Look, style, why choose |
| Emerald page         | Haiku | 2/10       | Look, style, why choose |
| Marquise page        | Haiku | 2/10       | Look, style, why choose |
| Pear page            | Haiku | 2/10       | Look, style, why choose |
| Radiant page         | Haiku | 2/10       | Look, style, why choose |
| Asscher page         | Haiku | 2/10       | Look, style, why choose |
| Heart page           | Haiku | 2/10       | Look, style, why choose |
| Cuts index page      | Haiku | 3/10       | All cuts overview grid  |
| Cut comparison tool  | Haiku | 3/10       | Side-by-side compare    |

#### 2C: The 4Cs [Difficulty: 3/10]

| Task                | Model | Difficulty | Description         |
| ------------------- | ----- | ---------- | ------------------- |
| Cut explanation     | Haiku | 2/10       | Simple language     |
| Color explanation   | Haiku | 2/10       | Simple language     |
| Clarity explanation | Haiku | 2/10       | Simple language     |
| Carat explanation   | Haiku | 2/10       | Simple language     |
| Interactive visuals | Haiku | 3/10       | Comparison graphics |
| Page layout         | Haiku | 2/10       | Educational flow    |

#### 2D: Certifications (IGI vs GIA) [Difficulty: 3/10]

| Task                    | Model | Difficulty | Description         |
| ----------------------- | ----- | ---------- | ------------------- |
| IGI history & strengths | Haiku | 2/10       | Lab background      |
| GIA history & strengths | Haiku | 2/10       | Lab background      |
| Comparison table        | Haiku | 2/10       | Key differences     |
| Why IGI preferred       | Haiku | 2/10       | Lab-grown expertise |
| GIA option              | Haiku | 2/10       | Special order CTA   |
| What's in a certificate | Haiku | 2/10       | Report breakdown    |

#### 2E: Education Hub [Difficulty: 3/10]

| Task                 | Model | Difficulty | Description         |
| -------------------- | ----- | ---------- | ------------------- |
| Education index page | Haiku | 3/10       | All topics overview |
| Navigation structure | Haiku | 2/10       | Sidebar/tabs        |
| CTA integration      | Haiku | 2/10       | Links to builder    |

---

### PHASE 3: PRODUCT SYSTEM (Sonnet 4.5 Lead)

**Dependencies:** 0C (Database)
**Can run parallel with:** Phase 1, Phase 2 (after 0C)

#### 3A: Diamonds Catalog [Difficulty: 6/10]

| Task                     | Model | Difficulty | Description              |
| ------------------------ | ----- | ---------- | ------------------------ |
| Catalog page layout      | Haiku | 3/10       | Grid, sidebar filters    |
| Filter: Cut (10 options) | Haiku | 3/10       | Multi-select             |
| Filter: Carat range      | Haiku | 3/10       | Slider                   |
| Filter: Color            | Haiku | 2/10       | Grade selection          |
| Filter: Clarity          | Haiku | 2/10       | Grade selection          |
| Filter: Price range      | Haiku | 3/10       | Slider                   |
| Filter: Certification    | Haiku | 2/10       | IGI/GIA toggle           |
| Search & sort            | Haiku | 3/10       | Text search, sorting     |
| Pagination               | Haiku | 2/10       | Infinite scroll or pages |
| API routes               | Haiku | 3/10       | Filter, paginate, search |

#### 3B: Diamond Detail Page [Difficulty: 5/10]

| Task                  | Model | Difficulty | Description           |
| --------------------- | ----- | ---------- | --------------------- |
| Image/video gallery   | Haiku | 3/10       | Multiple views        |
| 3D viewer integration | Haiku | 4/10       | Three.js basic viewer |
| Specs display         | Haiku | 2/10       | All diamond data      |
| Certificate viewer    | Haiku | 3/10       | PDF/image display     |
| Add to Builder CTA    | Haiku | 2/10       | Link to Step 1        |
| Related diamonds      | Haiku | 2/10       | Similar items         |

#### 3C: Ready-to-Ship Inventory [Difficulty: 5/10]

| Task                 | Model | Difficulty | Description              |
| -------------------- | ----- | ---------- | ------------------------ |
| Shop page layout     | Haiku | 3/10       | Grid, categories         |
| Category tabs        | Haiku | 2/10       | Rings, bracelets, chains |
| Filter: Price        | Haiku | 2/10       | Range slider             |
| Filter: Metal        | Haiku | 2/10       | Gold types               |
| Filter: Diamond type | Haiku | 2/10       | Lab/natural              |
| Product cards        | Haiku | 3/10       | Image, price, quick view |
| API routes           | Haiku | 3/10       | Filter, paginate         |

#### 3D: Product Detail Page [Difficulty: 4/10]

| Task          | Model | Difficulty | Description     |
| ------------- | ----- | ---------- | --------------- |
| Image gallery | Haiku | 3/10       | Multiple angles |
| Product specs | Haiku | 2/10       | All details     |
| Warranty info | Haiku | 1/10       | Trust signals   |
| Returns info  | Haiku | 1/10       | Policy display  |
| Contact CTA   | Haiku | 2/10       | Inquiry form    |

---

### PHASE 4: BUILD YOUR RING (Sonnet 4.5 Lead)

**Dependencies:** Phase 3 (needs diamonds catalog)
**Critical Path:** Core feature

#### 4A: Builder Framework [Difficulty: 5/10]

| Task                 | Model | Difficulty | Description            |
| -------------------- | ----- | ---------- | ---------------------- |
| Stepper UI component | Haiku | 3/10       | 6-step navigation      |
| Persistent sidebar   | Haiku | 3/10       | Always-visible summary |
| State management     | Haiku | 4/10       | Zustand or Context     |
| Save/load design     | Haiku | 3/10       | Local storage + API    |
| Progress indicator   | Haiku | 2/10       | Visual completion      |

#### 4B: Step 1 - Select Diamond [Difficulty: 4/10]

| Task                 | Model | Difficulty | Description         |
| -------------------- | ----- | ---------- | ------------------- |
| Cut selection UI     | Haiku | 3/10       | Visual picker       |
| Browse catalog link  | Haiku | 2/10       | Full catalog access |
| Educational tooltips | Haiku | 2/10       | 4Cs hints           |
| Diamond card display | Haiku | 2/10       | Selected diamond    |
| Add to design        | Haiku | 2/10       | Lock selection      |

#### 4C: Step 2 - Select Setting [Difficulty: 4/10]

| Task              | Model | Difficulty | Description           |
| ----------------- | ----- | ---------- | --------------------- |
| 10 setting styles | Haiku | 3/10       | Solitaire, halo, etc. |
| Style stories     | Haiku | 2/10       | Meaning, description  |
| Visual picker     | Haiku | 3/10       | Image grid            |
| Selection confirm | Haiku | 2/10       | Add to design         |

#### 4D: Step 3 - Select Metal [Difficulty: 3/10]

| Task               | Model | Difficulty | Description        |
| ------------------ | ----- | ---------- | ------------------ |
| Yellow gold option | Haiku | 2/10       | With description   |
| White gold option  | Haiku | 2/10       | With description   |
| Platinum option    | Haiku | 2/10       | Future placeholder |
| Visual comparison  | Haiku | 2/10       | Color swatches     |

#### 4E: Step 4 - Add-Ons [Difficulty: 3/10]

| Task               | Model | Difficulty | Description         |
| ------------------ | ----- | ---------- | ------------------- |
| Engraving input    | Haiku | 2/10       | Text field, preview |
| Ring size selector | Haiku | 2/10       | Size dropdown       |
| Save/favorite      | Haiku | 2/10       | Wishlist feature    |
| Notes field        | Haiku | 1/10       | Special requests    |

#### 4F: Step 5 - Preview [Difficulty: 7/10]

| Task              | Model  | Difficulty | Description          |
| ----------------- | ------ | ---------- | -------------------- |
| High-res render   | Haiku  | 4/10       | Composited image     |
| 3D viewer         | Sonnet | 5/10       | Three.js interactive |
| Design summary    | Haiku  | 2/10       | All selections       |
| AR Try-On (basic) | Sonnet | 6/10       | Hand preset overlay  |

#### 4G: Step 6 - Quote & Deposit [Difficulty: 5/10]

| Task                   | Model  | Difficulty | Description             |
| ---------------------- | ------ | ---------- | ----------------------- |
| Quote form             | Haiku  | 3/10       | Name, phone, email      |
| Form validation        | Haiku  | 2/10       | Zod schema              |
| Deposit amount display | Haiku  | 2/10       | Fixed/percentage        |
| Stripe integration     | Sonnet | 4/10       | Checkout session        |
| Confirmation page      | Haiku  | 2/10       | Success state           |
| API routes             | Haiku  | 3/10       | Lead + deposit creation |

---

### PHASE 5: INTEGRATIONS (Sonnet 4.5 Lead)

**Dependencies:** Phase 4 (needs checkout flow)

#### 5A: Stripe Payments [Difficulty: 5/10]

| Task                   | Model | Difficulty | Description        |
| ---------------------- | ----- | ---------- | ------------------ |
| Stripe SDK setup       | Haiku | 2/10       | Install, configure |
| Checkout session API   | Haiku | 3/10       | Create sessions    |
| Webhook handler        | Haiku | 4/10       | Payment events     |
| Deposit status updates | Haiku | 3/10       | DB updates         |
| Success/cancel pages   | Haiku | 2/10       | Post-payment UX    |

#### 5B: Instagram Integration [Difficulty: 3/10]

| Task              | Model | Difficulty | Description       |
| ----------------- | ----- | ---------- | ----------------- |
| Embed component   | Haiku | 2/10       | Instagram feed    |
| Feed styling      | Haiku | 2/10       | Match brand       |
| Placeholder state | Haiku | 1/10       | Before connection |

#### 5C: Social & SEO [Difficulty: 4/10]

| Task            | Model | Difficulty | Description         |
| --------------- | ----- | ---------- | ------------------- |
| Meta tags setup | Haiku | 2/10       | OG, Twitter cards   |
| Structured data | Haiku | 3/10       | Product schema      |
| Sitemap         | Haiku | 2/10       | Auto-generation     |
| Social icons    | Haiku | 1/10       | Header/footer links |

---

### PHASE 6: POLISH & DEPLOY (Sonnet 4.5 Lead)

**Dependencies:** All previous phases

#### 6A: AR Try-On Enhancement [Difficulty: 6/10]

| Task                 | Model  | Difficulty | Description       |
| -------------------- | ------ | ---------- | ----------------- |
| glTF model loading   | Haiku  | 3/10       | 3D assets         |
| Hand presets         | Haiku  | 3/10       | Overlay images    |
| Mobile camera access | Sonnet | 4/10       | WebAR basics      |
| USDZ export          | Haiku  | 3/10       | iOS AR Quick Look |

#### 6B: Performance [Difficulty: 4/10]

| Task               | Model | Difficulty | Description     |
| ------------------ | ----- | ---------- | --------------- |
| Image optimization | Haiku | 2/10       | Next.js Image   |
| Code splitting     | Haiku | 2/10       | Dynamic imports |
| Caching headers    | Haiku | 2/10       | Static assets   |
| Lighthouse audit   | Haiku | 3/10       | Fix issues      |

#### 6C: Testing [Difficulty: 4/10]

| Task                | Model | Difficulty | Description             |
| ------------------- | ----- | ---------- | ----------------------- |
| Unit tests          | Haiku | 3/10       | Key components          |
| Integration tests   | Haiku | 3/10       | API routes              |
| E2E tests           | Haiku | 4/10       | Critical flows          |
| Cross-browser check | Haiku | 2/10       | Safari, Chrome, Firefox |

#### 6D: Deployment [Difficulty: 3/10]

| Task                | Model | Difficulty | Description       |
| ------------------- | ----- | ---------- | ----------------- |
| Vercel setup        | Haiku | 2/10       | Project creation  |
| Environment vars    | Haiku | 2/10       | Secrets config    |
| Database connection | Haiku | 2/10       | Production DB     |
| Domain setup        | Haiku | 2/10       | DNS configuration |
| SSL verification    | Haiku | 1/10       | HTTPS check       |

---

## Execution Plan

### Wave 1: Foundation (Sequential)

1. **[0A] Project Scaffold** → Start immediately
2. **[0B] Design System** → After 0A
3. **[0C] Database Schema** → After 0A (parallel with 0B)

### Wave 2: Content (Parallel - after Wave 1)

Launch simultaneously:

- **[1A-1D] Static Pages** (Homepage, About, Contact, Sell Gold)
- **[2A-2E] Education System** (All education content)
- **[3A-3D] Product System** (Catalogs, detail pages)

### Wave 3: Core Feature (Sequential - after Wave 2)

- **[4A-4G] Build Your Ring** (6-step configurator)

### Wave 4: Integration (After Wave 3)

- **[5A-5C] Integrations** (Stripe, Social, SEO)

### Wave 5: Final (After Wave 4)

- **[6A-6D] Polish & Deploy** (AR, Performance, Testing, Deploy)

---

## Agent Summary

| Phase           | Sonnet Lead | Haiku Tasks | Total Tasks |
| --------------- | ----------- | ----------- | ----------- |
| 0: Foundation   | 1           | 21          | 22          |
| 1: Static Pages | 1           | 17          | 18          |
| 2: Education    | 1           | 26          | 27          |
| 3: Products     | 1           | 22          | 23          |
| 4: Build Ring   | 1           | 29          | 30          |
| 5: Integrations | 1           | 11          | 12          |
| 6: Polish       | 1           | 15          | 16          |
| **TOTAL**       | **7**       | **141**     | **148**     |

---

## RAG Resources (Frank: 192.168.0.244)

| RAG               | Use For                                |
| ----------------- | -------------------------------------- |
| Website Building  | All frontend, 3D, AR, UI/UX            |
| Gemology & Metals | Education content, 4Cs, certifications |
| Admin System      | Any admin features                     |
| Integrations      | Stripe, social, email                  |
| DevOps            | Testing, deployment, performance       |

---

## Status Tracking

| Phase           | Status     | Lead Agent | Started | Completed |
| --------------- | ---------- | ---------- | ------- | --------- |
| 0: Foundation   | ⏳ Pending | -          | -       | -         |
| 1: Static Pages | ⏳ Pending | -          | -       | -         |
| 2: Education    | ⏳ Pending | -          | -       | -         |
| 3: Products     | ⏳ Pending | -          | -       | -         |
| 4: Build Ring   | ⏳ Pending | -          | -       | -         |
| 5: Integrations | ⏳ Pending | -          | -       | -         |
| 6: Polish       | ⏳ Pending | -          | -       | -         |

---

_Generated by Maui (Opus 4.5 Orchestrator)_
_Feb 17, 2026 @ 02:35 EST_
