---
name: backpack-scss-tokens
description: |
  Enforce correct BPK design token usage when writing SCSS for Backpack components.
  Use when: (1) generating or reviewing a styling-guide.md during speckit.plan,
  (2) writing .module.scss files for any Backpack component, (3) any SCSS code
  generation that involves colors, spacing, typography, shadows, or border-radius.
  The most common errors are: using $bpk-color-* tokens instead of semantic
  day/night tokens for component styling, and misidentifying which mixins names
  actually exist in typography (e.g. bpk-label-default does not exist).
author: Claude Code
version: 1.1.0
date: 2026-03-06
changelog: |
  v1.1.0 (2026-03-06):
  - Corrected incorrect claims: shadows/_borders/_radii modules exist and have mixins
  - Corrected: $bpk-color-white exists (raw white), clarified when to prefer semantic tokens
  - Corrected: typography.bpk-text exists (margin reset only, not full typography)
  - Added accurate lookup table of what exists vs what doesn't
---

# BPK SCSS Tokens Enforcement

## Problem

Backpack's design token API has two layers:
1. **Raw tokens** (`$bpk-color-white`, etc.) — exist but are not semantic
2. **Semantic tokens** (`$bpk-text-on-dark-day`, etc.) — preferred for component styling

The most common errors in generated SCSS are:
- Using raw color tokens (`$bpk-color-white`) instead of semantic tokens in component styles
- Using non-existent typography mixin names (`bpk-label-default`, `bpk-display-1`)
- Calling `bpk-text` expecting full typography when it only resets `margin: 0`

## Mandatory Pre-Flight Check

Before writing any SCSS for a Backpack component, read:
```
docs/bpk-tokens-reference.md
```
This file contains the token reference. Note: some mixin names in that file may be
inaccurate — always cross-check against the actual source in `packages/bpk-mixins/`.

## Available `bpk-mixins` Modules

All modules live in `packages/bpk-mixins/` as `_<name>.scss`:

```scss
@use '../../bpk-mixins/tokens';     // Variables: colors, spacing, shadows, border-radius
@use '../../bpk-mixins/typography'; // Typography mixins
@use '../../bpk-mixins/shadows';    // Shadow mixins
@use '../../bpk-mixins/radii';      // Border-radius mixins
@use '../../bpk-mixins/borders';    // Border mixins (take $color param)
@use '../../bpk-mixins/utils';      // RTL: @include utils.bpk-rtl { ... }
@use '../../bpk-mixins/breakpoints';// Responsive breakpoint mixins
@use '../../bpk-mixins/icons';      // Icon size mixins
// Also: badges, chips, forms, panels, spinners, etc.
```

## Token API — What Actually Exists

### Spacing → FUNCTIONS (call with parentheses)
```scss
tokens.bpk-spacing-sm()     // 0.25rem (4px)
tokens.bpk-spacing-md()     // 0.5rem  (8px)
tokens.bpk-spacing-base()   // 1rem    (16px)
tokens.bpk-spacing-lg()     // 1.5rem  (24px)
tokens.bpk-spacing-xl()     // 2rem    (32px)
```

### Colors → VARIABLES

Prefer **semantic** day/night tokens in component styling:
```scss
// Text colors
tokens.$bpk-text-primary-day       // #161616  main body text
tokens.$bpk-text-secondary-day     // #626971  secondary text
tokens.$bpk-text-on-dark-day       // #ffffff  text on dark backgrounds
tokens.$bpk-text-disabled-day      // rgba(0,0,0,0.2)

// Backgrounds
tokens.$bpk-canvas-day             // #ffffff  page background
tokens.$bpk-surface-default-day    // #ffffff  component background
tokens.$bpk-core-primary-day       // #05203c  Skyscanner navy
tokens.$bpk-core-accent-day        // #0062e3  Skyscanner blue

// Borders
tokens.$bpk-line-day               // #c1c7cf  borders/dividers
```

Raw color tokens **also exist** but are less semantic:
```scss
tokens.$bpk-color-white            // rgb(255,255,255) — exists, but prefer $bpk-text-on-dark-day
                                   // or $bpk-canvas-day for component contexts
```

### Shadows — TWO EQUIVALENT OPTIONS

```scss
// Option A: via shadows module mixin (no () needed, but () also works)
@use '../../bpk-mixins/shadows';
@include shadows.bpk-box-shadow-sm;
@include shadows.bpk-box-shadow-lg;
@include shadows.bpk-box-shadow-xl;

// Option B: via tokens variable (no extra @use needed)
box-shadow: tokens.$bpk-box-shadow-sm;
box-shadow: tokens.$bpk-box-shadow-lg;
```

### Border Radius — TWO EQUIVALENT OPTIONS

```scss
// Option A: via radii module mixin
@use '../../bpk-mixins/radii';
@include radii.bpk-border-radius-xs;
@include radii.bpk-border-radius-sm;   // 0.5rem - buttons/inputs
@include radii.bpk-border-radius-md;   // 0.75rem - cards
@include radii.bpk-border-radius-lg;
@include radii.bpk-border-radius-xl;

// Option B: via tokens variable
border-radius: tokens.$bpk-border-radius-sm;
border-radius: tokens.$bpk-border-radius-md;
// Note: $bpk-border-radius-full = 100% but does NOT have a radii mixin equivalent
```

### Typography → MIXINS (use with @include, no parentheses needed)

```scss
// Semantic mixins (PREFERRED — set full font-size, line-height, weight):
@include typography.bpk-body-default;   // standard body
@include typography.bpk-body-longform;  // longform reading text
@include typography.bpk-caption;        // small supporting text
@include typography.bpk-heading-1;      // through heading-5
@include typography.bpk-heading-2;
@include typography.bpk-heading-3;
@include typography.bpk-label-1;        // label sizes (NOT bpk-label-default)
@include typography.bpk-label-2;
@include typography.bpk-label-3;
@include typography.bpk-link;
@include typography.bpk-link-underlined;

// Size-only mixins (no margin reset):
@include typography.bpk-text-xs;
@include typography.bpk-text-sm;
@include typography.bpk-text-base;
@include typography.bpk-text-lg;
@include typography.bpk-text-xl;
@include typography.bpk-text-xxl;
@include typography.bpk-text-xxxl;

// bpk-text: EXISTS but is ONLY a margin reset (margin: 0) — NOT full typography
@include typography.bpk-text;   // only resets margin, use bpk-body-default for styling
```

## What Does NOT Exist (Common Mistakes)

| Wrong | Correct |
|---|---|
| `@include typography.bpk-display-1` | Does not exist in `_typography.scss` |
| `@include typography.bpk-display-2` | Does not exist in `_typography.scss` |
| `@include typography.bpk-label-default` | Use `@include typography.bpk-label-1` |
| `@include typography.bpk-label-small` | Use `@include typography.bpk-label-2` or `bpk-label-3` |
| `tokens.bpk-box-shadow-sm()` | NOT a function — use `tokens.$bpk-box-shadow-sm` (variable) |
| `tokens.bpk-border-radius-md()` | NOT a function — use `tokens.$bpk-border-radius-md` (variable) |

## Canonical SCSS Template

```scss
/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * ...
 */

@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/typography';
@use '../../bpk-mixins/utils';

.bpk-[component] {
  display: flex;
  padding: tokens.bpk-spacing-base();
  background-color: tokens.$bpk-surface-default-day;
  border: tokens.$bpk-border-size-sm solid tokens.$bpk-line-day;
  border-radius: tokens.$bpk-border-radius-md;  // variable from tokens
  box-shadow: tokens.$bpk-box-shadow-sm;         // variable from tokens

  @include utils.bpk-rtl {
    // RTL-specific overrides
  }

  &__title {
    @include typography.bpk-heading-3;
    color: tokens.$bpk-text-primary-day;
    margin-bottom: tokens.bpk-spacing-sm();
  }

  &__body {
    @include typography.bpk-body-default;  // NOT bpk-text (which is only margin reset)
    color: tokens.$bpk-text-secondary-day;
  }

  &--primary {
    background-color: tokens.$bpk-core-primary-day;
    color: tokens.$bpk-text-on-dark-day;   // semantic — prefer over $bpk-color-white
  }
}
```

## Workflow for Styling Guide Generation

When generating a `styling-guide.md` for a new component:

1. **Read `docs/bpk-tokens-reference.md`** to look up token names for design values
2. Cross-check typography mixin names against `packages/bpk-mixins/_typography.scss` if unsure
3. For every color: prefer a **semantic** day/night variable over a raw `$bpk-color-*` name
4. For every spacing value: use the nearest **function** (e.g., `bpk-spacing-base()`)
5. For shadows and border-radius: both variable and mixin forms are valid — choose one consistently
6. For typography: use **semantic** mixins (`bpk-body-default`, `bpk-heading-3`) over size-only ones

## References

- `docs/bpk-tokens-reference.md` — token quick-reference (verify mixin names against source)
- `packages/bpk-mixins/_typography.scss` — authoritative typography mixin list
- `packages/bpk-mixins/_shadows.scss` — shadow mixins
- `packages/bpk-mixins/_radii.scss` — border-radius mixins
- `.specify/memory/constitution.md` — Principle III: Modern Sass (full rules)
