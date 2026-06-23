---
name: backpack-css-vars-migration
description: |
  Migrate a Backpack component's SCSS mixin from static SASS tokens to CSS custom
  properties (CSS vars) for light/dark mode support, while preserving SASS tokens
  as fallbacks. Use when: (1) a component needs light/dark mode theming via the new
  CSS var system, (2) a component still uses bare SASS token values (e.g.
  tokens.$bpk-text-primary-day) instead of var() declarations, (3) you need to
  wire up BpkThemeProvider overrides to the new CSS var names. Covers the full
  migration: SCSS mixins, themeAttributes.tsx, stories, and tests.
author: Claude Code
version: 1.1.0
date: 2026-06-23
---

# Backpack CSS Vars Migration

## Problem

Backpack components use static SASS tokens (e.g. `tokens.$bpk-text-primary-day`) that are
hardcoded to light-mode values. The new CSS var system (`theme-backpack-light.css` /
`theme-backpack-dark.css` / `primitives.css`) defines custom properties that flip
automatically with the active theme, but components need to opt in by using `var()`.

## Context / Trigger Conditions

- Component SCSS uses bare `tokens.$bpk-*-day` values with no `var()` wrapping
- Component has a mixin file using `@include utils.bpk-themeable-property(...)` with old `--bpk-{component}-*` var names
- Stories have themed examples that no longer apply overrides correctly
- `themeAttributes.tsx` lists camelCase keys that map to old var names not present in SCSS

## Key Files

| File | Purpose |
|------|---------|
| `packages/backpack-web/src/bpk-mixins/_{component}.scss` | Main mixin — where colour/spacing/typography tokens live |
| `packages/backpack-web/src/bpk-stylesheets/theme-backpack-light.css` | Light theme CSS vars (`--bpk-private-{component}-*`, `--bpk-text-*`, etc.) |
| `packages/backpack-web/src/bpk-stylesheets/theme-backpack-dark.css` | Dark theme CSS vars (same names, different values) |
| `packages/backpack-web/src/bpk-stylesheets/primitives.css` | Global primitive vars (`--bpk-spacing-*`, `--bpk-radius-*`, `--bpk-border-*`) |
| `src/bpk-component-{name}/src/themeAttributes.tsx` | Declares keys BpkThemeProvider injects as inline CSS vars |
| `src/bpk-component-{name}/src/BpkBadge.stories.tsx` | Themed story examples — must use new key names |
| `src/bpk-component-{name}/src/themeAttributes-test.tsx` | Tests for exported themeAttribute arrays |

## Solution

### Step 1: Discover available CSS vars

Check what vars exist for the component across all three CSS files:

```bash
grep -i "{component}" packages/backpack-web/src/bpk-stylesheets/theme-backpack-light.css
grep -i "{component}" packages/backpack-web/src/bpk-stylesheets/primitives.css
```

Also check global semantic vars that may apply (colours, spacing, radii):
```bash
grep -E "bpk-text-|bpk-core-|bpk-status-|bpk-surface-" packages/backpack-web/src/bpk-stylesheets/theme-backpack-light.css
grep -E "bpk-spacing-|bpk-radius-|bpk-border-" packages/backpack-web/src/bpk-stylesheets/primitives.css
```

### Step 2: Migrate the SCSS mixin

Replace every bare token and `bpk-themeable-property` call with a plain `var()`:

```scss
// Before
@include utils.bpk-themeable-property(
  background-color,
  --bpk-badge-normal-background-color,
  tokens.$bpk-private-badge-background-normal-day
);

// After
background-color: var(--bpk-private-badge-colour-bg-default, tokens.$bpk-private-badge-background-normal-day);
```

**Pattern:** `property: var(--new-css-var, tokens.$sass-fallback);`

No nested fallbacks. No cascade chains. One CSS var, one SASS fallback.

#### Colour properties
Map each token to its CSS var equivalent:

| SASS token | CSS var |
|------------|---------|
| `$bpk-text-primary-day` | `--bpk-text-primary` |
| `$bpk-text-on-light-day` | `--bpk-text-on-light` (avoid for status/info badges — Figma uses `text-primary` there) |
| `$bpk-text-on-dark-day` | `--bpk-text-on-dark` |
| `$bpk-text-primary-inverse-day` | `--bpk-text-inverse` |
| `$bpk-core-primary-day` | `--bpk-core-primary` |
| `$bpk-core-accent-day` | `--bpk-core-accent` |
| `$bpk-surface-default-day` | `--bpk-surface-default` |
| `$bpk-status-warning-spot-day` | `--bpk-status-warning-spot` |
| `$bpk-status-success-spot-day` | `--bpk-status-success-spot` |
| `$bpk-status-danger-spot-day` | `--bpk-status-danger-spot` |
| `$bpk-private-{component}-background-*` | `--bpk-private-{component}-colour-bg-*` |

#### Spacing / dimensions
```scss
// Use primitive vars with SASS fallbacks
padding: var(--bpk-spacing-sm, tokens.bpk-spacing-sm()) var(--bpk-spacing-md, tokens.bpk-spacing-md());

// Or use a component-specific dimension var if one exists:
padding: var(--bpk-spacing-sm, tokens.bpk-spacing-sm()) var(--bpk-private-{component}-dimension-padding-horizontal-default, tokens.bpk-spacing-md());
```

#### Border radius
```scss
// Use the primitive, not a component-specific var
border-radius: var(--bpk-radius-xs, tokens.$bpk-border-radius-xs);
// Other sizes: --bpk-radius-sm (0.5rem), --bpk-radius-md (0.75rem), --bpk-radius-lg (1.5rem)
```

#### Border width
Match by pixel value to the primitive:
```scss
// $bpk-border-size-sm = 1px = 0.0625rem = --bpk-border-1
border: var(--bpk-border-1, tokens.$bpk-border-size-sm) solid ...;
// Other sizes: --bpk-border-2 (0.125rem), --bpk-border-3 (0.1875rem)
```

#### Typography
Replace `@include typography.bpk-footnote` (and similar) with explicit declarations so each property can have its own var.

**Check for `--bpk-private-{component}-typography-tmp-*` vars first** — these are transitional names that exist in `theme-backpack-light/dark.css` but will be removed. If one exists, use it with a SASS fallback. If not (or if the var is marked `tmp` and removal is planned), use the SASS token directly — no CSS var wrapper.

```scss
// When a stable CSS var exists:
font-size: var(--bpk-private-{component}-typography-stable-name, tokens.$bpk-font-size-sm);

// When only a tmp var exists (will be removed) — use SASS token directly:
font-size: tokens.$bpk-font-size-xs;

// Font weight / line-height (stable vars):
font-weight: var(--bpk-{component}-font-weight, tokens.$bpk-font-weight-book);
line-height: var(--bpk-{component}-line-height, tokens.$bpk-line-height-sm);
```

When dropping a `tmp` font-size var, also remove the corresponding camelCase key (e.g. `badgeFontSize`) from `themeAttributes` and its test — it's no longer themeable via that route.

**Typography mixins `bpk-text` and `bpk-caption`**: `bpk-text` only sets `margin: 0` (already in the base mixin). `bpk-caption` only sets font-size, line-height, and font-weight via `_bpk-text-factory` — no font-family or letter-spacing. Our three explicit `var()` declarations fully replace them.

#### RTL / logical properties
Replace physical properties + `bpk-rtl` mixin with CSS logical properties:
```scss
// Before
right: 0;
@include utils.bpk-rtl { right: inherit; left: 0; }

// After
inset-inline-end: 0;
```

```
top    → block-start        bottom → block-end
left   → inline-start       right  → inline-end
border-top-left-radius     → border-start-start-radius
border-top-right-radius    → border-start-end-radius
border-bottom-left-radius  → border-end-start-radius
border-bottom-right-radius → border-end-end-radius
```

### Step 3: Clean up unused imports

After migrating, remove any `@use` imports that are no longer referenced:
```bash
grep "utils\.\|typography\.\|radii\." packages/backpack-web/src/bpk-mixins/_{component}.scss
```

### Step 4: Update themeAttributes.tsx

`BpkThemeProvider` converts camelCase keys → `--bpk-{kebab-case}` inline styles. Inline styles have higher specificity than stylesheets, so themed overrides win automatically.

Update per-variant arrays to use keys that map to the new CSS var names:

```ts
// Key → CSS var injected by BpkThemeProvider
// privateBadgeColourBgDefault → --bpk-private-badge-colour-bg-default
// textPrimary                 → --bpk-text-primary
// corePrimary                 → --bpk-core-primary
// radiusXs                    → --bpk-radius-xs

export const badgeNormalThemeAttributes = [
  'privateBadgeColourBgDefault',
  'textPrimary',
];
```

**Camelcase conversion rule:** strip `--bpk-`, convert kebab to camelCase.
e.g. `--bpk-private-badge-colour-bg-default` → `privateBadgeColourBgDefault`

Note: `BpkThemeProvider` has a digit handler so `--bpk-border-1` → key `border1`.

### Step 5: Update stories

Replace old theme keys in `BpkThemeProvider` story instances:

```tsx
// Before
<BpkThemeProvider
  theme={{ badgeNormalBackgroundColor: coreAccentDay }}
  themeAttributes={['badgeNormalBackgroundColor']}
>

// After
<BpkThemeProvider
  theme={{ privateBadgeColourBgDefault: coreAccentDay }}
  themeAttributes={['privateBadgeColourBgDefault']}
>
```

### Step 6: Update themeAttributes-test.tsx

Update all `.toEqual([...])` assertions to match the new key names.

## Verify token choices against Figma

Always cross-check colour tokens against the Figma component. Use `get_design_context` with `disableCodeConnect: true` to get the generated code — it includes the CSS var names Figma uses (e.g. `--text/primary`, `--component/badge/colour/bg-default`). Strip the slashes and prepend `--bpk-` to get the SCSS var name.

The Figma-generated code is the source of truth for which colour goes on which variant. Example from badge:
- Normal / Subtle / Inverse / Warning / Success / Critical text: `--text/primary` → `--bpk-text-primary`
- Strong / Outline text: `--text/on-dark` → `--bpk-text-on-dark`
- Brand text: `--text/inverse` → `--bpk-text-inverse`

## Verification

```bash
# Check no old-style component-specific vars remain as primary values
grep -n "var(--bpk-{component}-" packages/backpack-web/src/bpk-mixins/_{component}.scss

# Run the themeAttributes test
npx jest themeAttributes-test --testPathPattern={component}
```

## Notes

- **No nested fallbacks**: `var(--new-var, sass-fallback)`. Never `var(--old-hook, var(--new-var, sass-fallback))`.
- **Specificity wins for theming**: BpkThemeProvider injects inline styles — no cascade tricks needed.
- **`--bpk-private-*` vars**: Component-scoped vars from the theme files. Prefer them for backgrounds. Use global semantic vars (`--bpk-text-*`, `--bpk-core-*`) for text and icon colours.
- **The outline box-shadow fallback line**: Keep a bare SASS token `box-shadow` declaration before the `var()` one — for browsers without CSS var support.
- **Dimension vars**: Component-specific dimension vars (e.g. `--bpk-private-{component}-dimension-padding-horizontal-default`) take precedence over generic spacing vars where they exist.
- **`bpk-themeable-property` is gone**: All colour, spacing, radius and typography properties should use plain `var()`. The mixin is only still appropriate for legacy theme hooks that have no CSS var equivalent.
