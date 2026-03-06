<!--
==============================================================================
DOCUMENT PURPOSE: Phase 1 — API Design
Feature: BpkButton v1.1 — Corner Radius CSS-Variable Theming
Branch: CLOV-1327
Date: 2026-03-06
Scope: Strictly limited to theme attribute addition. No new props.
==============================================================================
-->

# API Design: BpkButton v1.1 — Corner Radius Theming

## Overview

This change introduces **no new component props**. The public API of `BpkButton` is unchanged. The only API surface modification is the addition of `'buttonBorderRadius'` to the `buttonThemeAttributes` array, which extends the existing theming contract.

---

## Component Props — No Change

The full props interface is documented in the spec (`spec.md` Section 1). No modifications are required.

---

## Theme Attributes — `themeAttributes.ts`

**File**: `packages/bpk-component-button/src/themeAttributes.ts`

### Before

```typescript
export const buttonThemeAttributes = ['buttonFontSize'];
```

### After

```typescript
export const buttonThemeAttributes = ['buttonFontSize', 'buttonBorderRadius'];
```

### Theme Attribute Contract

| Theme Attribute | CSS Variable | Applies To | Fallback Token |
|---|---|---|---|
| `buttonBorderRadius` | `--bpk-button-border-radius` | All button types and sizes | `tokens.$bpk-button-border-radius` |

### Naming Convention

The attribute name `buttonBorderRadius` follows the existing camelCase pattern used throughout `themeAttributes.ts`:

| Attribute | CSS Variable |
|---|---|
| `buttonFontSize` | `--bpk-button-font-size` |
| `buttonPrimaryTextColor` | `--bpk-button-primary-text-color` |
| `buttonBorderRadius` *(new)* | `--bpk-button-border-radius` |

The `bpk-theming` package resolves camelCase attribute names to kebab-case CSS variable names automatically (`buttonBorderRadius` → `--bpk-button-border-radius`).

---

## Consumer Usage (no change to component import)

```typescript
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import { BpkThemeProvider } from '@skyscanner/backpack-web/bpk-theming';
import { buttonThemeAttributes } from '@skyscanner/backpack-web/bpk-component-button/themeAttributes';

// Apply a themed corner radius at runtime
const theme = {
  buttonBorderRadius: '1rem',  // overrides --bpk-button-border-radius
};

<BpkThemeProvider theme={theme} themeAttributes={buttonThemeAttributes}>
  <BpkButton>Book flight</BpkButton>
</BpkThemeProvider>
```

When no theme is applied, `BpkButton` renders exactly as before — `tokens.$bpk-button-border-radius` is the fallback.

---

## TypeScript Impact

No new TypeScript types are introduced. `themeAttributes.ts` exports plain string arrays; adding a string literal does not break any existing type contracts.
