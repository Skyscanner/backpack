<!--
==============================================================================
DOCUMENT PURPOSE: Phase 1 — Styling Guide
Feature: BpkButton v1.1 — Corner Radius CSS-Variable Theming
Branch: CLOV-1327
Date: 2026-03-06
Scope: Strictly limited to border-radius theming changes.
==============================================================================
-->

# Styling Guide: BpkButton v1.1 — Corner Radius Theming

## Overview

This guide covers all styling changes for the corner radius theming feature, spanning two files:

- `packages/bpk-mixins/_buttons.scss` — 3 edits (base mixin + 2 icon-only mixin removals)
- `packages/bpk-component-button/src/BpkButtonV2/BpkButton.module.scss` — 2 removals (icon-only selector overrides)

---

## File: `packages/bpk-mixins/_buttons.scss`

### Change 1 — Base `bpk-button` mixin (line 42)

Replace the static `border-radius` declaration with a `bpk-themeable-property` include.

**Before**:
```scss
@mixin bpk-button {
  display: inline-block;
  min-height: tokens.$bpk-button-height;
  margin: 0;
  padding: (6 * tokens.$bpk-one-pixel-rem) tokens.bpk-spacing-base();
  border: 0;
  border-radius: tokens.$bpk-button-border-radius;   // ← replace this line
  text-align: center;
  ...
```

**After**:
```scss
@mixin bpk-button {
  display: inline-block;
  min-height: tokens.$bpk-button-height;
  margin: 0;
  padding: (6 * tokens.$bpk-one-pixel-rem) tokens.bpk-spacing-base();
  border: 0;
  @include utils.bpk-themeable-property(        // ← replace with this block
    border-radius,
    --bpk-button-border-radius,
    tokens.$bpk-button-border-radius
  );
  text-align: center;
  ...
```

**Compiled output** (what browsers receive after Sass compilation):
```css
border-radius: <token-value>;
border-radius: var(--bpk-button-border-radius, <token-value>);
```

When `--bpk-button-border-radius` is not set, both declarations resolve to the same token value — appearance is unchanged.

---

### Change 2 — `bpk-button--icon-only` mixin (~line 535)

Remove the duplicate `border-radius` declaration.

**Before**:
```scss
@mixin bpk-button--icon-only {
  $horizontal-padding: (tokens.$bpk-button-height - tokens.$bpk-icon-size-sm) * 0.5;

  padding-right: $horizontal-padding;
  padding-left: $horizontal-padding;
  border-radius: tokens.$bpk-button-border-radius;   // ← remove this line
}
```

**After**:
```scss
@mixin bpk-button--icon-only {
  $horizontal-padding: (tokens.$bpk-button-height - tokens.$bpk-icon-size-sm) * 0.5;

  padding-right: $horizontal-padding;
  padding-left: $horizontal-padding;
}
```

**Why**: This mixin is applied after `bpk-button`. The static `border-radius` override would override the CSS variable set in the base, preventing runtime theming for icon-only buttons. Removing it allows the base mixin's `var(--bpk-button-border-radius, ...)` to remain in effect.

---

### Change 3 — `bpk-button--large-icon-only` mixin (~line 558)

Remove the duplicate `border-radius` declaration.

**Before**:
```scss
@mixin bpk-button--large-icon-only {
  $horizontal-padding: (tokens.$bpk-button-large-height - tokens.$bpk-icon-size-lg) * 0.5;

  padding-right: $horizontal-padding;
  padding-left: $horizontal-padding;
  border-radius: tokens.$bpk-button-border-radius;   // ← remove this line
}
```

**After**:
```scss
@mixin bpk-button--large-icon-only {
  $horizontal-padding: (tokens.$bpk-button-large-height - tokens.$bpk-icon-size-lg) * 0.5;

  padding-right: $horizontal-padding;
  padding-left: $horizontal-padding;
}
```

**Why**: Same reason as Change 2. The large-icon-only mixin also applies after `bpk-button`, so the static override must be removed.

---

## Existing Imports — No Change

The `utils` module is already imported at the top of `_buttons.scss`:

```scss
@use 'tokens';
@use 'typography';
@use 'utils';
```

No new `@use` statements are required.

---

## CSS Cascade Behaviour

After the changes, the cascade for a `.bpk-button.bpk-button--icon-only` element is:

1. `.bpk-button` applies `border-radius: <token>` (fallback) and `border-radius: var(--bpk-button-border-radius, <token>)` (override)
2. `.bpk-button--icon-only` applies only padding adjustments — no `border-radius` override
3. Net result: `var(--bpk-button-border-radius, <token>)` wins

This is the correct and intended behaviour.

---

## RTL

`border-radius` is not directional. No RTL-specific handling needed.

---

## No New BEM Classes

This change does not introduce any new CSS classes. The existing BEM class structure is unchanged.

---

## Design Token Reference

| Token | Value | Usage |
|---|---|---|
| `tokens.$bpk-button-border-radius` | Defined in `@skyscanner/bpk-foundations-web` | Fallback value in both the compiled declaration and the `var(...)` fallback argument |

---

## Test Impact

Automated tests for this change now use explicit assertions rather than CSS snapshots.
No snapshot update step (for example, `jest --updateSnapshot`) is required for this work.
