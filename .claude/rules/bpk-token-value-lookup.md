# BPK Token Value Reverse Lookup

**CRITICAL RULE — NO FABRICATION**: Only use token names that **actually exist** in:
- TSX: `node_modules/@skyscanner/bpk-foundations-web/tokens/base.es6.d.ts`
- SCSS: `node_modules/@skyscanner/bpk-foundations-web/tokens/base.default.scss`

**NEVER guess or invent a token name.** If the value is not in this table, open `base.es6.d.ts` and verify before using it. If it's not in that file, the token does not exist — use the hardcoded value as-is (do NOT make one up).

---

## Naming convention (SCSS ↔ TSX)

| SCSS | TSX |
|------|-----|
| `tokens.$bpk-core-accent-day` | `coreAccentDay` |
| `tokens.$bpk-text-primary-day` | `textPrimaryDay` |

Rule: strip the `$bpk-` prefix, camelCase the result. This is mechanical — but always verify against the d.ts file before using a new token.

---

## Color Value → Token

> Values shown as hex. `rgb()` equivalents are in the d.ts file.

### Core / Brand
| Hex | SCSS token (`tokens.$`) | TSX import name |
|-----|------------------------|-----------------|
| `#0062e3` | `$bpk-core-accent-day` | `coreAccentDay` |
| `#84e9ff` | `$bpk-core-accent-night` | `coreAccentNight` |
| `#05203c` | `$bpk-core-primary-day` | `corePrimaryDay` |
| `#054184` | `$bpk-core-primary-night` | `corePrimaryNight` |
| `#0fa1a9` | `$bpk-core-eco-day` / `$bpk-core-eco-night` | `coreEcoDay` / `coreEcoNight` |

### Canvas (page backgrounds)
| Hex | SCSS token (`tokens.$`) | TSX import name |
|-----|------------------------|-----------------|
| `#ffffff` | `$bpk-canvas-day` | `canvasDay` |
| `#010913` | `$bpk-canvas-night` | `canvasNight` |
| `#eff3f8` | `$bpk-canvas-contrast-day` | `canvasContrastDay` |

### Surface (component backgrounds)
| Hex | SCSS token (`tokens.$`) | TSX import name |
|-----|------------------------|-----------------|
| `#ffffff` | `$bpk-surface-default-day` / `$bpk-surface-elevated-day` | `surfaceDefaultDay` / `surfaceElevatedDay` |
| `#131d2b` | `$bpk-surface-default-night` | `surfaceDefaultNight` |
| `#243346` | `$bpk-surface-elevated-night` / `$bpk-surface-highlight-night` | `surfaceElevatedNight` / `surfaceHighlightNight` |
| `#0062e3` | `$bpk-surface-hero-day` | `surfaceHeroDay` |
| `#010913` | `$bpk-surface-hero-night` / `$bpk-surface-contrast-night` | `surfaceHeroNight` / `surfaceContrastNight` |
| `#05203c` | `$bpk-surface-contrast-day` | `surfaceContrastDay` |
| `#e0e4e9` | `$bpk-surface-highlight-day` | `surfaceHighlightDay` |
| `#e3f0ff` | `$bpk-surface-subtle-day` | `surfaceSubtleDay` |
| `#f5f7fa` | `$bpk-surface-low-contrast-day` | `surfaceLowContrastDay` |
| `rgba(255,255,255,0.1)` | `$bpk-surface-tint-day` / `$bpk-surface-tint-night` | `surfaceTintDay` / `surfaceTintNight` |

### Text
| Hex / rgba | SCSS token (`tokens.$`) | TSX import name |
|------------|------------------------|-----------------|
| `#161616` | `$bpk-text-primary-day` | `textPrimaryDay` |
| `#ffffff` | `$bpk-text-primary-night` / `$bpk-text-on-dark-day` / `$bpk-text-on-dark-night` / `$bpk-text-primary-inverse-day` | `textPrimaryNight` / `textOnDarkDay` / `textOnDarkNight` / `textPrimaryInverseDay` |
| `#010913` | `$bpk-text-on-light-night` / `$bpk-text-primary-inverse-night` | `textOnLightNight` / `textPrimaryInverseNight` |
| `#161616` | `$bpk-text-on-light-day` | `textOnLightDay` |
| `#626971` | `$bpk-text-secondary-day` | `textSecondaryDay` |
| `#bdc4cb` | `$bpk-text-secondary-night` | `textSecondaryNight` |
| `#0062e3` | `$bpk-text-link-day` / `$bpk-text-hero-day` | `textLinkDay` / `textHeroDay` |
| `#84e9ff` | `$bpk-text-link-night` | `textLinkNight` |
| `#010913` | `$bpk-text-hero-night` | `textHeroNight` |
| `rgba(0,0,0,0.2)` | `$bpk-text-disabled-day` | `textDisabledDay` |
| `rgba(255,255,255,0.2)` | `$bpk-text-disabled-night` | `textDisabledNight` |
| `rgba(255,255,255,0.5)` | `$bpk-text-disabled-on-dark-day` / `$bpk-text-disabled-on-dark-night` | `textDisabledOnDarkDay` / `textDisabledOnDarkNight` |
| `#0c838a` | `$bpk-text-success-day` | `textSuccessDay` |
| `#62f1c6` | `$bpk-text-success-night` | `textSuccessNight` |
| `#e70866` | `$bpk-text-error-day` | `textErrorDay` |
| `#ff649c` | `$bpk-text-error-night` | `textErrorNight` |

### Line / Overlay / Scrim
| Hex / rgba | SCSS token (`tokens.$`) | TSX import name |
|------------|------------------------|-----------------|
| `#c1c7cf` | `$bpk-line-day` | `lineDay` |
| `#44505f` | `$bpk-line-night` | `lineNight` |
| `rgba(255,255,255,0.5)` | `$bpk-line-on-dark-day` | `lineOnDarkDay` |
| `rgba(0,0,0,0.7)` | `$bpk-scrim-day` / `$bpk-scrim-night` | `scrimDay` / `scrimNight` |
| `rgba(0,0,0,0.2)` | `$bpk-overlay-day` | `overlayDay` |
| `rgba(255,255,255,0.8)` | `$bpk-overlay-night` | `overlayNight` |

### Status
| Hex | SCSS token (`tokens.$`) | TSX import name |
|-----|------------------------|-----------------|
| `#0c838a` | `$bpk-status-success-spot-day` | `statusSuccessSpotDay` |
| `#62f1c6` | `$bpk-status-success-spot-night` | `statusSuccessSpotNight` |
| `#d4fff2` | `$bpk-status-success-fill-day` | `statusSuccessFillDay` |
| `#b1ffe7` | `$bpk-status-success-fill-night` | `statusSuccessFillNight` |
| `#f55d42` | `$bpk-status-warning-spot-day` | `statusWarningSpotDay` |
| `#feeb87` | `$bpk-status-warning-spot-night` | `statusWarningSpotNight` |
| `#fff7cf` | `$bpk-status-warning-fill-day` | `statusWarningFillDay` |
| `#fbf1bb` | `$bpk-status-warning-fill-night` | `statusWarningFillNight` |
| `#e70866` | `$bpk-status-danger-spot-day` | `statusDangerSpotDay` |
| `#ff649c` | `$bpk-status-danger-spot-night` | `statusDangerSpotNight` |
| `#ffe9f9` | `$bpk-status-danger-fill-day` | `statusDangerFillDay` |
| `#ffcadd` | `$bpk-status-danger-fill-night` | `statusDangerFillNight` |

---

## Spacing Value → Token

> Spacing tokens are **SCSS-only functions**. The full spacing scale has no TSX equivalents. Only three spacing values exist in base.es6: `spacingNone`, `spacingIconText`, `onePixelRem`. For all other TSX inline styles, use raw rem values.

| Value | SCSS function | TSX import name |
|-------|---------------|-----------------|
| `0` | `tokens.bpk-spacing-none()` | `spacingNone` |
| `0.0625rem` / `1px` | — | `onePixelRem` |
| `0.25rem` / `4px` | `tokens.bpk-spacing-sm()` | — |
| `0.5rem` / `8px` | `tokens.bpk-spacing-md()` | `spacingIconText` |
| `1rem` / `16px` | `tokens.bpk-spacing-base()` | — |
| `1.5rem` / `24px` | `tokens.bpk-spacing-lg()` | — |
| `2rem` / `32px` | `tokens.bpk-spacing-xl()` | — |
| `2.5rem` / `40px` | `tokens.bpk-spacing-xxl()` | — |
| `4rem` / `64px` | `tokens.bpk-spacing-xxxl()` | — |
| `6rem` / `96px` | `tokens.bpk-spacing-xxxxl()` | — |

---

## Border Radius Value → Token

| Value | SCSS token (`tokens.$`) | TSX import name |
|-------|------------------------|-----------------|
| `0.25rem` | `$bpk-border-radius-xs` | `borderRadiusXs` |
| `0.5rem` | `$bpk-border-radius-sm` | `borderRadiusSm` |
| `0.75rem` | `$bpk-border-radius-md` | `borderRadiusMd` |
| `1.5rem` | `$bpk-border-radius-lg` | `borderRadiusLg` |
| `2.5rem` | `$bpk-border-radius-xl` | `borderRadiusXl` |
| `100%` | `$bpk-border-radius-full` | `borderRadiusFull` |
| `1.125rem` | `$bpk-border-radius-nav-tabs` | `borderRadiusNavTabs` |

---

## Border Size → Token

| Value | SCSS token (`tokens.$`) | TSX import name |
|-------|------------------------|-----------------|
| `1px` | `$bpk-border-size-sm` | `borderSizeSm` |
| `2px` | `$bpk-border-size-lg` | `borderSizeLg` |
| `3px` | `$bpk-border-size-xl` | `borderSizeXl` |

---

## Box Shadow → Token

| Value | SCSS token (`tokens.$`) | TSX import name |
|-------|------------------------|-----------------|
| `0px 1px 3px 0px rgba(37,32,31,.3)` | `$bpk-box-shadow-sm` | `boxShadowSm` |
| `0px 4px 14px 0px rgba(37,32,31,.25)` | `$bpk-box-shadow-lg` | `boxShadowLg` |
| `0px 12px 50px 0px rgba(37,32,31,.25)` | `$bpk-box-shadow-xl` | `boxShadowXl` |

---

## Animation Duration → Token

| Value | SCSS token (`tokens.$`) | TSX import name |
|-------|------------------------|-----------------|
| `50ms` | `$bpk-duration-xs` | `durationXs` |
| `200ms` | `$bpk-duration-sm` | `durationSm` |
| `400ms` | `$bpk-duration-base` | `durationBase` |

---

## Icon Size → Token

| Value | SCSS token (`tokens.$`) | TSX import name |
|-------|------------------------|-----------------|
| `1rem` / `16px` | `$bpk-icon-size-sm` | `iconSizeSm` |
| `1.5rem` / `24px` | `$bpk-icon-size-lg` | `iconSizeLg` |
| `2rem` / `32px` | `$bpk-icon-size-xl` | `iconSizeXl` |
| `2.5rem` / `40px` | `$bpk-icon-size-xxl` | `iconSizeXxl` |
| `3rem` / `48px` | `$bpk-icon-size-xxxl` | `iconSizeXxxl` |

---

## TSX Usage Pattern

```typescript
import { coreAccentDay, textPrimaryDay, borderRadiusSm } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

const style: CSSProperties = {
  backgroundColor: coreAccentDay,   // NOT '#0062e3'
  color: textPrimaryDay,             // NOT '#161616'
  borderRadius: borderRadiusSm,      // NOT '0.5rem'
};
```

---

## What to do when a value has no matching token

1. Check `node_modules/@skyscanner/bpk-foundations-web/tokens/base.es6.d.ts` directly
2. If the exported name exists there → use it
3. If it does NOT exist → use the hardcoded value; do **not** invent a token name
