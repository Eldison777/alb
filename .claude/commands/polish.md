---
description: Final pre-launch polish pass — tighten copy, sharpen interactions, verify every pixel matches the premium standard
---

You are doing a final polish pass on the AlbShift website before it goes live. This is not about new features — it's about making everything that already exists feel 10% more premium.

## Read First

Read `CLAUDE.md` (the manifesto), then read every component in `components/`. Pay attention to details.

## Polish Checklist

### Copy Tightening
Go through every heading and CTA across all components. For each one, ask:
- Is this the strongest possible version of this sentence?
- Does it speak to a CTO or founder, not a consumer?
- Is it specific? ("Sub-500ms TTFB" > "Fast loading")
- Is it bold? No hedging words ("might", "try to", "we aim to")?
- Is it short enough? Cut any word that doesn't earn its place.

Rewrite weak copy. Show the before/after for each change.

### Interaction Completeness
Every clickable element must have ALL of:
1. `hover:` state (color, opacity, or scale change)
2. `transition-all duration-300` (or appropriate duration)
3. `active:scale-[0.98]` or `active:scale-95` on buttons
4. Visual feedback that the element is interactive

Find any that are missing any of these and add them.

### Visual Consistency Audit
- Are all section label eyebrows using `text-[10px] font-black uppercase tracking-[0.3em] text-crimson-600`?
- Are all large headings using `font-black tracking-tighter`?
- Are all secondary text blocks using `opacity-60 leading-relaxed`?
- Do all sections have the crimson dot after the heading? (`<span className="text-crimson-600">.</span>`)
- Are all cards using `rounded-[2.5rem]` (large) or `rounded-2xl` (medium)?

### Spacing Consistency
- Section wrappers: `py-24`
- Card padding: `p-10` or `p-12`
- Section labels → headings: `mb-6`
- Headings → body: `mb-8` or `mb-12`
- Grid gaps: `gap-6` or `gap-8`

Report any inconsistencies.

### Animation Polish
- Do all scroll-reveal elements have `data-scroll` or `data-scroll-stagger`?
- Is there a stagger pattern on all multi-card grids?
- Are background glow elements using `animate-pulse-soft`?
- Is the `pointer-events-none` on all decorative elements?

### Micro-detail Pass
- Section dividers: consistent `border-white/5` lines
- Icon sizes: consistent within their context (nav: 18-20px, cards: 24-32px, badges: 12-14px)
- Badge pills: `rounded-full`, correct padding, `border border-white/10` or `bg-crimson-600/10`
- Loading states: spinner on form submissions
- Success/error states: present on ALL forms

### Mobile Check (conceptual)
Review every component for mobile breakpoints:
- Is the grid collapsing correctly? (`grid-cols-1 md:grid-cols-*`)
- Are font sizes scaling down? (`text-5xl md:text-7xl`)
- Are paddings reducing? (`px-6 md:px-12`)
- Is there anything that would overflow on 375px width?

## Output Format

Group your output by component. For each component:

**components/ComponentName.tsx**
- Changed: [what and why]
- Flagged: [what needs human review]
- Status: POLISHED / NEEDS WORK

End with an overall **Pre-Launch Readiness Score: X/10** and a one-paragraph verdict.
