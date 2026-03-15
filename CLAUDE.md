# ALBSHIFT | ENGINEERING MANIFESTO

> This is the single source of truth for building AlbShift. Every line of code, every pixel, every interaction must meet this standard. Read it fully before writing anything.

---

## 1. IDENTITY

AlbShift is a **premium SaaS engineering studio** based in **Prishtina, Kosovo**. The website is its storefront — it must communicate **technical excellence**, **visual sophistication**, and **absolute confidence** in every detail.

**This is NOT a template.** It is a custom-engineered platform that must feel like it was built by the same team that builds enterprise SaaS products.

**Brand Personality**: Technical. Precise. Bold. Never generic, never playful, never cheap.

**The Ideal Client**: A technical founder or CTO at a B2B startup (seed to Series B) who has outgrown no-code tools and needs a real engineering partner. They care about architecture, uptime, and time-to-market. They've been burned by agencies that over-promised and under-delivered. They're making a $5k–$25k decision and need to feel confident before they reach out.

**What We Are NOT**: A freelancer marketplace. A design agency. A WordPress shop. A "we do everything" generalist. We are a specialized SaaS engineering studio. Every word on this site must reinforce that specialization.

---

## 2. TECH STACK

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | React 19 + TypeScript | Vite bundler, port 3000 |
| Backend | Express + Node.js | Port 3001, `backend/server.ts` |
| Database | PostgreSQL | Via `pg` driver, `backend/db.ts` |
| Styling | Tailwind CSS (Runtime) | CDN config in `index.html`, NOT build-time |
| Motion | IntersectionObserver + CSS keyframes | Native scroll reveal, no heavy animation libs |
| State | useState / useEffect | No Redux. Keep it simple until complexity demands it |
| i18n | `translations.ts` | English (`en`) + Albanian (`sq`). Every string. No exceptions |
| Admin | Hash-based routing (`#/admin`) | 17 files in `admin/` directory, token auth |

---

## 3. FILE ARCHITECTURE

```
Root
├── App.tsx                     # Main router (marketing site + #/admin split)
├── index.html                  # Design system, Tailwind config, CSS variables, glow cursor
├── index.tsx                   # React entry point
├── translations.ts             # ALL user-facing text (en + sq)
├── vite.config.ts              # Vite bundler config
│
├── components/                 # Marketing site components
│   ├── Navbar.tsx              # Navigation + language/theme toggles
│   ├── Hero.tsx                # Landing hero with metrics
│   ├── BentoServices.tsx       # 6-service grid
│   ├── ImpactModel.tsx         # 80/20 model + chart
│   ├── Process.tsx             # 4-step lifecycle
│   ├── CaseStudies.tsx         # Portfolio (API-driven + fallback)
│   ├── Team.tsx                # Team grid (API-driven + fallback)
│   ├── Blog.tsx                # Blog cards (API-driven + fallback)
│   ├── FAQ.tsx                 # Accordion (API-driven + fallback)
│   ├── Pricing.tsx             # 3-tier packages
│   ├── Contact.tsx             # Contact form + sidebar
│   └── Footer.tsx              # Newsletter + links
│
├── admin/                      # Admin dashboard (hash-routed)
│   ├── AdminApp.tsx            # Auth guard + sub-router
│   ├── AdminLogin.tsx          # Password login
│   ├── AdminLayout.tsx         # Sidebar + header shell
│   ├── AdminDashboard.tsx      # Stat cards
│   ├── hooks/                  # useAdminAuth.ts, useApi.ts
│   ├── components/             # DataTable, FormField, ConfirmModal, Sidebar, Header
│   ├── blog/                   # BlogList.tsx, BlogForm.tsx
│   ├── projects/               # ProjectList.tsx, ProjectForm.tsx
│   ├── team/                   # TeamList.tsx, TeamForm.tsx
│   └── faqs/                   # FaqList.tsx, FaqForm.tsx
│
└── backend/
    ├── server.ts               # Express API (auth + CRUD + contact + subscribe)
    ├── db.ts                   # PostgreSQL connection pool
    ├── schema.sql              # All table definitions
    └── seed.ts                 # Seed script with initial data
```

---

## 4. DESIGN SYSTEM — ABSOLUTE RULES

### 4.1 Color Palette

> **DO NOT** deviate from these colors. They are the brand identity.

| Token | Hex | Tailwind Class | Usage |
|-------|-----|---------------|-------|
| Void | `#050505` | CSS `--bg-color` | Page background |
| Obsidian | `#0a0a0a` | `bg-obsidian` | Cards, surfaces, navbars |
| Crimson 600 | `#dc2626` | `text-crimson-600` | Primary accent, CTAs, highlights |
| Crimson 700 | `#b91c1c` | `hover:text-crimson-700` | Hover states |
| White | `#ffffff` | `text-white` | Default text (dark mode) |
| White/60 | `rgba(255,255,255,0.6)` | `opacity-60` | Secondary text |
| White/5 | `rgba(255,255,255,0.05)` | `border-white/5` | Subtle borders |

### 4.2 Glass Morphism

Every card, modal, overlay, and floating surface **MUST** use the `.glass` class:

```css
.glass {
  background: var(--glass-bg);           /* rgba(10, 10, 10, 0.6) */
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border); /* rgba(255, 255, 255, 0.08) */
  box-shadow: var(--glass-shadow);       /* 0 20px 50px rgba(0, 0, 0, 0.5) */
}
```

**Never** use solid opaque backgrounds (`bg-gray-900`, `bg-black`) for containers. Use `glass`, `bg-black/5`, or `bg-obsidian` with proper opacity. The glow cursor must bleed through surfaces.

### 4.3 Typography

- **Font**: Inter (sans-serif) for body, JetBrains Mono for code/labels
- **Headings**: `font-black tracking-tighter` — always tight, always heavy
- **Section labels**: `text-[10px] font-black uppercase tracking-[0.3em] text-crimson-600`
- **Body text**: `opacity-60 leading-relaxed`

### 4.4 Spacing & Radius

- Section padding: `py-24`, horizontal `px-6 md:px-12`
- Max width: `max-w-7xl mx-auto`
- Card radius: `rounded-[2.5rem]` (large) or `rounded-2xl` (medium) or `rounded-xl` (small)
- No sharp corners. Everything rounds.

### 4.5 Cursor Glow

The `#glow-cursor` element is a 600px radial gradient that follows the mouse. It is part of the brand experience. Never obscure it with opaque backgrounds.

---

## 5. INTERACTION STANDARDS

Every interactive element must feel **alive**. No dead clicks. No flat hovers.

### Required on ALL clickable elements:
```
hover:   opacity change OR scale OR color shift OR border glow
transition-all duration-300 to duration-700 (context-dependent)
active:scale-95   (tactile press feedback on buttons)
```

### Card hover pattern:
```
hover:border-crimson-600/30
hover:scale-[1.03]
hover:-translate-y-2
transition-all duration-700
```

### Button pattern:
```
bg-crimson-600
hover:bg-crimson-700
active:scale-[0.98]
shadow-xl shadow-crimson-600/20
transition-all
```

### Scroll reveal:
Use `data-scroll` (single) or `data-scroll-stagger` (children) attributes. The IntersectionObserver in `index.html` handles the animation. No extra JS needed.

---

## 6. CODING STANDARDS

### 6.1 No Generic Code
Do not produce boilerplate. Every component must be purpose-built for AlbShift. Code should look like it was written by the team that writes production SaaS.

### 6.2 Naming
- **Component files**: `PascalCase.tsx` (e.g., `BentoServices.tsx`)
- **Logic/hook files**: `camelCase.ts` (e.g., `useAdminAuth.ts`)
- **CSS classes**: `kebab-case`
- **Variables**: `camelCase`

### 6.3 API URL Pattern
Never hardcode `localhost`. Always use:
```typescript
const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';
```

### 6.4 API-Driven Components (Blog, CaseStudies, Team, FAQ)
These components follow the **fallback pattern**:
```typescript
const [data, setData] = useState(FALLBACK_DATA);

useEffect(() => {
  fetch(`${apiUrl}/api/endpoint`)
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(d => { if (d.length > 0) setData(d); })
    .catch(() => {});  // Keep fallback on failure
}, []);
```
The marketing site **must work without the backend running**. Fallback data is the safety net.

### 6.5 Bilingual Fields
All database content uses `_en` / `_sq` suffixes. Components select by language:
```typescript
const title = lang === 'sq' && item.title_sq ? item.title_sq : item.title_en;
```

### 6.6 Backend Types
Use `any` for Express `req`/`res` params to avoid environment-specific type conflicts:
```typescript
app.get('/api/blog', async (_req: any, res: any) => { ... });
```

---

## 7. INTERNATIONALIZATION — ZERO ENGLISH LEAKS

**Every** user-facing string must live in `translations.ts`. Both `en` and `sq` keys. No exceptions.

When adding new text:
1. Add the English string to `translations.en`
2. Add the Albanian string to `translations.sq`
3. Use `t.section.key` in the component
4. For API-driven content, use `item.field_en` / `item.field_sq` with lang-based selection

**Common violations to watch for**:
- Section headers hardcoded in JSX
- Footer column titles ("Company", "Expertise", "Legal")
- CTA text ("Apply Now", "View Case Study")
- Placeholder text in forms
- Error messages

---

## 8. SECURITY — NON-NEGOTIABLE

### 8.1 Anti-Spam Honeypot
All public forms (Contact, Newsletter) **MUST** include a hidden honeypot field:
```html
<input type="text" name="website_url" style="display:none" tabIndex={-1} autoComplete="off" />
```
The backend rejects any submission where `website_url` is filled. Bots fill all fields; humans don't see it.

### 8.2 Admin Authentication
- Password validated against `ADMIN_PASSWORD` env var
- Token generated via `crypto.randomBytes(32)`, stored in `admin_sessions` table
- 24-hour expiry, Bearer header on all admin API calls
- `requireAuth` middleware on every `/api/admin/*` route

### 8.3 Environment Variables
Never expose secrets to the frontend bundle. Only `VITE_*` prefixed vars reach the client. Backend secrets (`ADMIN_PASSWORD`, `DATABASE_URL`, `SMTP_*`) stay server-side.

### 8.4 Input Safety
- Backend uses parameterized queries (`$1, $2, ...`) — never string interpolation in SQL
- Frontend renders user content as text nodes (React auto-escapes) — never `dangerouslySetInnerHTML`

---

## 9. COPYWRITING VOICE

AlbShift speaks like a **confident technical partner**, not a sales page.

| DO | DON'T |
|----|-------|
| "Ship Scalable SaaS Products at Velocity." | "We help you build apps." |
| "Enterprise-grade architecture, zero bloat." | "We make nice websites for you." |
| "Performance-First Engineering" | "Fast and reliable service" |
| "Sub-second load times. Ironclad security." | "Your website will be quick and safe." |
| "Multi-tenant PostgreSQL, Redis caching, zero cold starts." | "We use a modern tech stack." |
| "8-week MVP to production. Fixed scope. Fixed price." | "We can build your project quickly." |
| "We respond within 12 hours. Always." | "Our team is very responsive." |

**Rules**:
- Bold, declarative sentences. No hedging ("might", "could", "try to")
- Technical specificity over vague claims ("99.9% uptime SLA" > "very reliable")
- B2B tone — speak to CTOs and founders, not consumers
- Every claim must be either verifiable or positioned as a guarantee/commitment
- Short paragraphs. Let whitespace breathe
- Numbers anchor trust: "8 weeks", "$5,500", "99/100 Lighthouse", "12-hour response"
- Never write "we" more than once per sentence — it sounds needy
- Headlines should work standalone, pulled out of context

**Section-by-section voice guide**:
- **Hero**: Confident challenge. One sentence that makes them stop scrolling.
- **Services**: Technical but accessible. Specifics, not fluff.
- **Process**: Reassuring. "Here's exactly what happens." No surprises.
- **Case Studies**: Proof. Numbers, outcomes, before/after. Let results speak.
- **Team**: Credible. Credentials without bragging.
- **Pricing**: Transparent. "No scope creep. No hidden costs." Empowers the buyer.
- **Contact**: Warm but professional. Reduce friction. Make it feel easy to reach out.

---

## 10. PERFORMANCE

### Must-follow:
- `React.memo` for static components that don't depend on changing props
- `useMemo` for expensive computations (e.g., translation object derivation)
- Image URLs must include size constraints (`w=800`, `q=80`)
- `React.lazy()` for below-fold sections if bundle grows large
- No unused imports or dead code — strip it, don't comment it

### Animation budget:
- CSS transitions: unlimited (GPU-accelerated, zero JS cost)
- JS-driven animations: use sparingly, only for complex orchestration
- `will-change`: never apply globally, only on elements actively animating

---

## 11. DATABASE CONVENTIONS

All content tables follow this pattern:

```sql
CREATE TABLE IF NOT EXISTS <entity> (
  id SERIAL PRIMARY KEY,
  <field>_en TEXT NOT NULL,
  <field>_sq TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- Bilingual: `_en` + `_sq` for all user-facing text
- Ordering: `sort_order ASC, created_at DESC`
- Visibility: `is_published = true` for public queries, all rows for admin
- Schema changes: update `backend/schema.sql` immediately

---

## 12. ADMIN DASHBOARD

### Routing
Hash-based: `#/admin`, `#/admin/blog`, `#/admin/blog/new`, `#/admin/blog/:id`
Parsed in `AdminApp.tsx`. No react-router dependency.

### Styling
Matches the marketing site aesthetic — same glass morphism, same crimson accents, same Inter font. The admin is not a separate design; it's the same brand in a different context.

### CRUD Pattern
Each entity (blog, projects, team, faqs) has:
- `EntityList.tsx` — DataTable + delete confirmation modal
- `EntityForm.tsx` — Create/edit form with bilingual fields

### API Pattern
```typescript
// List:   GET    /api/admin/{entity}
// Get:    GET    /api/admin/{entity}/:id
// Create: POST   /api/admin/{entity}
// Update: PUT    /api/admin/{entity}/:id
// Delete: DELETE /api/admin/{entity}/:id
```

---

## 13. WORKFLOW CHECKLIST

Before submitting any change:

- [ ] All new text added to `translations.ts` (both `en` and `sq`)
- [ ] Schema changes reflected in `backend/schema.sql`
- [ ] API URL uses env variable pattern, never hardcoded localhost
- [ ] Every interactive element has hover + transition + active states
- [ ] Forms include honeypot field
- [ ] Glass morphism used on all floating surfaces
- [ ] Color palette strictly followed (no new grays, no new accents)
- [ ] No `console.log` left in production code (use proper error handling)
- [ ] Component works with AND without backend running (fallback data)

---

---

## 14. CONVERSION ARCHITECTURE

The website has one job: get qualified leads to fill out the contact form or book a call. Every section must contribute to that goal.

### Page Flow — The Funnel

```
Hero          → WHO WE ARE + THE PROMISE (hook)
Services      → WHAT WE DO (credibility)
ImpactModel   → HOW WE THINK (differentiation)
Process       → WHAT WORKING WITH US LOOKS LIKE (trust)
CaseStudies   → PROOF THAT WE DELIVER (social proof)
Team          → WHO YOU'RE WORKING WITH (human trust)
Blog          → WE KNOW OUR CRAFT (authority)
FAQ           → OBJECTION HANDLING (remove friction)
Pricing       → WHAT IT COSTS (transparency)
Contact       → THE ASK (conversion)
```

### CTA Placement Rules
- **Primary CTA** ("Start a Project" / "Book a Call") must appear: Navbar, Hero, Footer CTA block
- **Secondary CTAs** must appear: end of CaseStudies, end of Pricing, end of Team
- Every section should make the visitor want to scroll to the next one
- The contact form should feel like the **natural conclusion** of a conversation, not a wall

### Reducing Friction
- Contact form: 5 fields max. Name, Email, Company (optional), Budget, Message.
- Book a Call: Must link to a real booking tool (Calendly or equivalent)
- Response time promise: "We respond within 12 hours" — stated and kept
- No CAPTCHA. Honeypot handles spam silently.

---

## 15. TRUST SIGNAL REQUIREMENTS

A potential client needs to see proof before they reach out. These are non-negotiable trust signals that must exist on the site:

### Tier 1 — Must Have Before Launch
- [ ] **Real case studies** with specific outcomes (metrics, not just screenshots)
- [ ] **Team section** with real names, real roles, real photos (no stock photos)
- [ ] **Pricing transparency** — exact prices, not "contact for pricing"
- [ ] **Location + contact info** — physical city, email, response time SLA
- [ ] **Process section** — what exactly happens after someone contacts you

### Tier 2 — Add Within 30 Days of Launch
- [ ] **Client logos** — even 3-4 logos from past work are powerful
- [ ] **Testimonials** — 2-3 real quotes with name, title, company
- [ ] **Real social links** — LinkedIn at minimum; GitHub with real activity
- [ ] **Blog with real content** — at least 2-3 technical posts showing expertise

### Tier 3 — As You Grow
- [ ] **Video testimonials** or Loom walkthroughs of delivered work
- [ ] **Awards or press mentions** if applicable
- [ ] **Open source contributions** — GitHub repos, npm packages

### Trust Killers — Remove Immediately
- Dead social links (`href="#"`)
- Placeholder text ("Lorem ipsum", "Coming soon" without context)
- Buttons that do nothing when clicked
- Unverifiable numbers presented as facts
- Location inconsistency across pages

---

## 16. WHAT "BEST" LOOKS LIKE — EXCELLENCE BENCHMARKS

These are the standards AlbShift's site must meet or exceed. Reference these when evaluating any addition.

### Performance
- Lighthouse Performance score: **95+**
- Largest Contentful Paint (LCP): **< 2.5s**
- Cumulative Layout Shift (CLS): **< 0.1**
- Time to First Byte (TTFB): **< 500ms**
- No render-blocking scripts
- Fonts preloaded, images lazy-loaded with size constraints

### SEO
- Title tag: `[Brand] | [Specific Value Prop]` — under 60 chars
- Meta description: specific and compelling — under 155 chars
- Open Graph image: 1200×630px, branded, exists at the referenced URL
- Canonical URL set to production domain
- Structured data (JSON-LD) for Organization schema — consider adding
- All anchor text descriptive (not "click here")

### Accessibility
- Color contrast ratio: 4.5:1 minimum for body text
- All images have `alt` text
- All form inputs have associated `<label>` elements
- Keyboard navigation works on all interactive elements
- Focus rings visible (do not `outline: none` without a replacement)

### Design Quality Bar
Study these studios for reference (do not copy, understand what makes them excellent):
- Linear.app — precision, technical confidence, minimal
- Vercel.com — developer-first, grid systems, authority
- Stripe.com — trust through detail, every pixel justified
- Framer.com — interactive, bold, knows its audience

Ask of every design decision: **"Would Linear put this on their site?"**

---

## 17. SECTION-SPECIFIC REQUIREMENTS

What must be true for each section to be considered "done".

### Hero — Done When:
- Headline communicates the exact value prop in under 10 words
- Subheadline answers "for whom" and "how"
- At least 2 CTAs (primary: contact/book, secondary: view work)
- Metrics are real and sourced, or framed as guarantees
- No text below the fold on desktop before scrolling

### Case Studies — Done When:
- Minimum 3 real projects (not placeholder data)
- Each has: client industry, challenge, solution, measurable outcome
- At least one has a before/after performance metric
- Tech stack tags are shown for each project

### Team — Done When:
- Every team member has a real photo (not an icon or avatar)
- Bio focuses on what they build, not where they went to school
- A "Join the Team" section with a real application process or email

### Blog — Done When:
- At least 3 published posts
- Posts demonstrate genuine technical depth (not marketing fluff)
- Posts are linked from the section, not just shown as cards

### Pricing — Done When:
- Prices are real and current
- Each tier's scope is unambiguous
- Contact form budget options match the pricing tiers exactly
- Timeline estimates are honest (not best-case)

### Contact — Done When:
- Form submits successfully and sends an email
- "Book a Call" links to a real booking page
- Success state thanks the user and sets expectations ("We'll reply in 12 hours")
- Error state gives actionable guidance ("Try emailing hello@albshift.com directly")

---

## 18. SLASH COMMANDS (PROJECT SKILLS)

Custom Claude skills available in this project (`.claude/commands/`):

| Command | What it does |
|---------|-------------|
| `/audit` | Full site audit against this manifesto. Outputs a prioritized fix list. |
| `/add-section [name]` | Scaffolds a new marketing section with all AlbShift patterns. |
| `/new-translation [key] "[text]"` | Adds bilingual strings to `translations.ts`. |
| `/fix-broken` | Finds and fixes dead links, empty buttons, placeholder content. |
| `/polish` | Final pre-launch pass — copy, interactions, spacing, mobile. |

Run any of these when you need systematic help with a specific task.

---

*AlbShift 2026. Prishtina, Kosovo. Performance-First Engineering.*
