---
description: Find and fix all broken links, dead buttons, placeholder content, and hardcoded values across the site
---

You are doing a systematic bug-fix pass on the AlbShift website. Focus only on things that are broken, misleading, or placeholder — do not refactor working code.

## Read First

Read ALL of these files before making any changes:
- `components/Footer.tsx`
- `components/Contact.tsx`
- `components/Navbar.tsx`
- `components/Hero.tsx`
- `components/Pricing.tsx`
- `translations.ts`
- `backend/server.ts`

## Fix Categories

### 1. Dead Links (`href="#"`)
Find every anchor or button linking to `#` that should link somewhere real.
- Social links (Twitter, LinkedIn, GitHub) → Ask the user for the real URLs, or note them as TODO placeholders with `aria-disabled`
- Navigation links that go to wrong anchors
- Footer legal links (Privacy, Terms, Security) → These need real pages or at minimum a note that they're coming soon

For each dead link, either:
a) Fix it with the correct URL if obvious (same-page anchor)
b) Add `title="Coming soon"` and style it as disabled (`opacity-50 cursor-not-allowed pointer-events-none`) if the page doesn't exist yet

### 2. Dead Buttons (no `onClick`, no `href`)
Find every `<button>` element that has no action. The most common one:
- "Book a Strategy Call" in `Contact.tsx` — needs a Calendly link or modal
Fix by converting to `<a href="..." target="_blank" rel="noopener noreferrer">` shaped like a button, or add a `disabled` state with a tooltip.

### 3. Budget Mismatch
- Pricing section starts at $2,900
- Contact form budget starts at $5k-$10k
Fix: Add a "$2k - $5k" option as the first budget range in the contact form select, and update the corresponding translation key in both `en` and `sq`.

### 4. Hardcoded API URLs
Search for `localhost:3001` anywhere in components — it must always use:
```typescript
const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';
```

### 5. Unsubstantiated Claims
Flag these for the user (do not auto-change — these are business decisions):
- "20+ scaling companies" in Footer — confirm this is accurate
- Hero metrics (99/100, 99.9%, 8 Wks, 98/100) — are these real?

### 6. Location Inconsistency
Check EVERY occurrence of location text across the codebase:
- `translations.ts`
- `index.html` (og tags, canonical URL, description)
- Any hardcoded text in components
They must all say the same city. Pick one and make it consistent everywhere.

### 7. Footer Link Mapping
Current known wrong mappings in `Footer.tsx`:
- "Careers" → links to `#blog` (wrong)
- "Privacy" → links to `#faq` (wrong)
- "Terms" → links to `#faq` (wrong)
- "Security" → links to `#faq` (wrong)

Fix by either:
a) Linking to actual pages if they exist
b) Adding `#contact` as a placeholder (at least logical)
c) Styling as "coming soon" links

## Output Format

For each fix made:
```
FIXED: [File:line] — [What was broken] → [What you changed]
```

For each item that needs user input:
```
ACTION NEEDED: [File:line] — [What information is required]
```

Do not make changes beyond the categories above. No refactoring, no style improvements — only fix what's broken.
