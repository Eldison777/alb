---
description: Add new bilingual strings to translations.ts for both English and Albanian
argument-hint: [section.key "English text"] e.g. hero.newBadge "Built for CTOs"
---

You are adding new translation keys to the AlbShift i18n system.

## Input

The user provided: $ARGUMENTS

Parse this as: `[dot-path] "[english text]"` or as a plain description of what needs to be translated.

## Process

### 1. Read the current state
Read `translations.ts` in full to understand the existing structure and find where the new key should live.

### 2. Determine placement
- Find the correct section object (e.g., `hero`, `footer`, `pricing`, `contact.form`)
- If a new section is needed, create it in BOTH `en` and `sq` blocks
- Keep keys in camelCase, grouped logically

### 3. Write the English string
Use the AlbShift voice rules:
- Bold, declarative, no hedging
- Technical specificity over vague claims
- B2B tone — speak to CTOs and founders
- Short. No filler words.

### 4. Write the Albanian translation
Apply the same tone in Albanian. Rules:
- Mirror the English structure and energy
- Do NOT literally word-for-word translate if it sounds awkward in Albanian
- Technical terms (SaaS, DevOps, CI/CD, API) stay in English
- Use formal Albanian register — this is a B2B product

If you are not confident in the Albanian translation, write it anyway and add a comment: `// REVIEW: Albanian translation needs native review`

### 5. Add to both blocks

The structure must be:
```typescript
// In translations.en:
sectionName: {
  ...existing,
  newKey: "English string here",
}

// In translations.sq:
sectionName: {
  ...existing,
  newKey: "Albanian string here",
}
```

Both `en` and `sq` must always be in sync — same keys, same structure.

### 6. Output

Tell the user:
1. The exact key path added (e.g., `t.hero.newBadge`)
2. The English and Albanian values
3. How to use it in a component: `{t.hero.newBadge}`
4. Any strings that need native Albanian review
