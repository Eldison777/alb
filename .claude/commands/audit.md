---
description: Full site audit — checks every component against the AlbShift manifesto and outputs a prioritized fix list
---

You are performing a comprehensive quality audit of the AlbShift website. Your job is to be ruthlessly honest — this is a premium SaaS engineering studio and every detail must meet that standard.

## Audit Scope

Read ALL of the following files before writing a single word of output:

**Core:**
- `CLAUDE.md` (the manifesto — this is your benchmark)
- `translations.ts` (check for missing keys, English leaks, inconsistencies)
- `index.html` (SEO tags, design system vars, scripts)
- `App.tsx` (routing, section order, structure)

**All components in `components/`:**
- Navbar.tsx, Hero.tsx, BentoServices.tsx, ImpactModel.tsx
- Process.tsx, CaseStudies.tsx, Team.tsx, Blog.tsx
- FAQ.tsx, Pricing.tsx, Contact.tsx, Footer.tsx

**Backend spot-check:**
- `backend/server.ts` (security, honeypot validation, auth)

## What to Check

### 1. Broken / Dead Interactions
- Buttons with no `href` or `onClick`
- Links pointing to `#` or wrong anchors
- Form fields that don't submit anywhere
- CTAs that do nothing when clicked

### 2. Design System Compliance
- Are all surfaces using `.glass` (not solid `bg-gray-*` or `bg-black`)?
- Is the color palette strictly crimson + void + white? Any rogue grays or blues?
- Is every card using `rounded-[2.5rem]` or `rounded-2xl`? No sharp corners?
- Does every interactive element have hover + transition + active states?

### 3. i18n Completeness
- Is every user-facing string in `translations.ts`?
- Are both `en` and `sq` keys present and non-empty?
- Any hardcoded English text in JSX?

### 4. Trust & Conversion
- Are there real, verifiable claims? Or vague/unsubstantiated numbers?
- Does every section have a clear next action?
- Is there a logical flow that guides a visitor toward `/contact`?
- Are social links real? Is the booking CTA functional?

### 5. Content Consistency
- Does location match across the whole site? (Pick one: Tirana or Prishtina)
- Does pricing in the form match pricing on the pricing page?
- Are "20+ companies" and similar claims accurate?

### 6. Security
- Do both public forms have honeypot fields?
- Is the API URL using the env variable pattern, not hardcoded localhost?
- Is `dangerouslySetInnerHTML` used anywhere?

### 7. Performance
- Are there `console.log` statements left in?
- Any heavy libs imported that could be replaced with native CSS?
- Are images using size constraints?

### 8. Copywriting Voice
- Does every headline sound like a confident technical partner?
- Are there any hedging words ("might", "try to", "could")?
- Is every section header specific and bold?

## Output Format

Structure your report exactly like this:

---

# AlbShift Site Audit — [Date]

## CRITICAL (Fix before showing to any client)
For each issue: **[File:line]** — Description — Recommended fix

## HIGH (Fix this week)
...

## MEDIUM (Fix this sprint)
...

## LOW (Nice to have)
...

## PASSES (Things done right — keep them)
...

## Audit Score: X/100
Brief one-paragraph verdict on the overall state of the site.

---

Be specific. Include the exact file and line number for every issue. Do not summarize — every item should be actionable.
