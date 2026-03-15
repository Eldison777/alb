---
description: Scaffold a new marketing section that follows every AlbShift design and code standard
argument-hint: [section-name] e.g. "Testimonials", "TechStack", "Clients"
---

You are adding a new section to the AlbShift marketing site. The section name is: $ARGUMENTS

## Before You Start

1. Read `CLAUDE.md` fully — every pattern you write must comply with it
2. Read `translations.ts` — you will add strings here
3. Read `App.tsx` — to know where to insert the new section
4. Read at least 2 existing components (e.g. `components/Process.tsx` and `components/BentoServices.tsx`) to match the exact patterns

## Step 1 — Design the Section

Think through:
- What is the purpose of this section? What question does it answer for a potential client?
- Where in the page flow does it belong? (Hero → Services → Impact → Process → Work → Team → Blog → FAQ → Pricing → Contact)
- What data does it display? Is it static or API-driven?
- What interaction model makes sense? (grid, accordion, carousel, list, chart?)

Briefly describe your design plan before writing any code.

## Step 2 — Add Translations

In `translations.ts`, add keys under BOTH `en` and `sq`:

```typescript
// Structure pattern:
sectionName: {
  label: "Section Label",      // The small uppercase eyebrow text
  title: "Main Heading",       // The large H2
  subtitle: "Supporting text", // The opacity-60 paragraph
  // ...any other strings
}
```

Never hardcode text in JSX. If you don't know the Albanian translation, write a placeholder like `"[SQ: ...]"` — but always add the key.

## Step 3 — Create the Component

File: `components/[SectionName].tsx`

**Mandatory patterns — every single one:**

```tsx
// 1. Section label (eyebrow)
<div className="flex items-center gap-4 mb-6">
  <div className="w-12 h-[1px] bg-crimson-600"></div>
  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-crimson-600">{t.section.label}</span>
</div>

// 2. Main heading
<h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
  {t.section.title}<span className="text-crimson-600">.</span>
</h2>

// 3. Glass cards
<div className="glass rounded-[2.5rem] p-10 border border-white/5 hover:border-crimson-600/40 hover:scale-[1.02] transition-all duration-500 group">

// 4. Scroll reveal on section wrapper
data-scroll          // single element
data-scroll-stagger  // parent of animated children

// 5. API-driven (if needed) — fallback pattern
const [data, setData] = useState(FALLBACK_DATA);
useEffect(() => {
  const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';
  fetch(`${apiUrl}/api/endpoint`)
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(d => { if (d.length > 0) setData(d); })
    .catch(() => {});
}, []);
```

**Color rules:**
- Accent: `text-crimson-600`, `bg-crimson-600`, `border-crimson-600/40`
- Hover: `hover:bg-crimson-700`, `hover:text-crimson-600`
- Backgrounds: `.glass` or `bg-obsidian` — never solid `bg-gray-*`
- Text: `dark:text-white text-slate-900` for headings, `opacity-60` for body

## Step 4 — Wire into App.tsx

Add the import and the section JSX in the correct page position. Wrap in:
```tsx
<section id="[section-id]" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
  <NewSection t={t} lang={lang} />
</section>
```

Add the anchor to the Navbar if it warrants top-level navigation.

## Step 5 — Self-Review Checklist

Before finishing, verify:
- [ ] All text from `translations.ts` — no hardcoded strings
- [ ] `.glass` on all floating surfaces
- [ ] `hover:` + `transition-all` + `active:scale-95` on all clickable elements
- [ ] `data-scroll` or `data-scroll-stagger` applied
- [ ] No `console.log` left in
- [ ] Works without backend (if API-driven, fallback data returns content)
- [ ] Color palette: only crimson, white, obsidian, transparent — no new colors

Tell the user what you built and what translations they should review/update.
