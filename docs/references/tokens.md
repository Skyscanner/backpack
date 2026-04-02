# Design Tokens Reference

> **Load this doc when:** looking up specific token names, values, or categories — spacing scale,
> colour tokens, border radius, box shadows, breakpoints, or any design value you need to reference
> precisely. Also load when you need to know whether to use function or variable syntax for a given token.

---

# Design tokens

## Importing tokens

### JavaScript
```tsx
import { spacingBase, spacingLg, canvasDay, textPrimaryDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';
```

### SCSS
```scss
@use '@skyscanner/backpack-web/bpk-mixins/tokens' as tokens;

.example {
  color: tokens.$bpk-text-primary-day;
  padding: tokens.bpk-spacing-base();       // spacing uses function syntax
  background: tokens.$bpk-canvas-day;       // colors use variable syntax
  border-radius: tokens.$bpk-border-radius-sm;
}
```

**SCSS rule**: Spacing tokens generally use function syntax `tokens.bpk-spacing-*()`, except for tokens like `spacingNone` and `spacingIconText` which use variable syntax (`tokens.$bpk-spacing-none`, `tokens.$bpk-spacing-icon-text`). All other tokens use variable syntax `tokens.$bpk-*`. For any token, run `backpack-cli token <name>` to confirm its SCSS usage.

## Spacing scale

| Token (JS) | SCSS | Value | Use for |
|------------|------|-------|---------|
| `spacingNone` | `tokens.$bpk-spacing-none` | 0 | No spacing |
| `spacingXxs` | `tokens.bpk-spacing-xxs()` | 0.0625rem (1px) | Hairline: dividers, micro adjustments |
| `spacingXs` | `tokens.bpk-spacing-xs()` | 0.125rem (2px) | Minimal gap |
| `spacingSm` | `tokens.bpk-spacing-sm()` | 0.25rem (4px) | Tight: badge padding |
| `spacingMd` | `tokens.bpk-spacing-md()` | 0.5rem (8px) | Compact: between related items |
| `spacingIconText` | `tokens.$bpk-spacing-icon-text` | 0.5rem (8px) | Gap between icon and text (variable, not function) |
| `spacingBase` | `tokens.bpk-spacing-base()` | 1rem (16px) | Default: card padding, form field gaps |
| `spacingLg` | `tokens.bpk-spacing-lg()` | 1.5rem (24px) | Comfortable: between sections |
| `spacingXl` | `tokens.bpk-spacing-xl()` | 2rem (32px) | Generous: between major sections |
| `spacingXxl` | `tokens.bpk-spacing-xxl()` | 2.5rem (40px) | Large gaps |
| `spacingXxxl` | `tokens.bpk-spacing-xxxl()` | 4rem (64px) | Section-level spacing |
| `spacingXxxxl` | `tokens.bpk-spacing-xxxxl()` | 6rem (96px) | Page-level spacing |

When using layout components, pass spacing token names directly: `gap="base"`, `padding="lg"`.

## Semantic colors

Use semantic tokens, not raw hex/rgb. Semantic tokens auto-switch for light/dark mode.

### Canvas (page backgrounds)

| Token (JS) | SCSS | Value | Use for |
|------------|------|-------|---------|
| `canvasDay` | `tokens.$bpk-canvas-day` | rgb(255, 255, 255) | White page background |
| `canvasContrastDay` | `tokens.$bpk-canvas-contrast-day` | rgb(239, 243, 248) | Tinted background for contrast |

### Surfaces

| Token (JS) | SCSS | Value | Use for |
|------------|------|-------|---------|
| `surfaceDefaultDay` | `tokens.$bpk-surface-default-day` | rgb(255, 255, 255) | Card/panel background |
| `surfaceElevatedDay` | `tokens.$bpk-surface-elevated-day` | rgb(255, 255, 255) | Modals, popovers |
| `surfaceHighlightDay` | `tokens.$bpk-surface-highlight-day` | rgb(224, 228, 233) | Hover/highlight states |
| `surfaceSubtleDay` | `tokens.$bpk-surface-subtle-day` | rgb(227, 240, 255) | Subtle emphasis |
| `surfaceLowContrastDay` | `tokens.$bpk-surface-low-contrast-day` | rgb(245, 247, 250) | Subtle grey background |
| `surfaceContrastDay` | `tokens.$bpk-surface-contrast-day` | rgb(5, 32, 60) | Dark surface for contrast |
| `surfaceHeroDay` | `tokens.$bpk-surface-hero-day` | rgb(0, 98, 227) | Brand blue hero surface |
| `surfaceTintDay` | `tokens.$bpk-surface-tint-day` | rgba(255, 255, 255, 0.1) | Subtle tint overlay |

### Text colors

| Token (JS) | SCSS | Value | Use for |
|------------|------|-------|---------|
| `textPrimaryDay` | `tokens.$bpk-text-primary-day` | rgb(22, 22, 22) | Default body text |
| `textSecondaryDay` | `tokens.$bpk-text-secondary-day` | rgb(98, 105, 113) | Secondary/muted text |
| `textHeroDay` | `tokens.$bpk-text-hero-day` | rgb(0, 98, 227) | Brand blue text |
| `textOnDarkDay` | `tokens.$bpk-text-on-dark-day` | rgb(255, 255, 255) | Text on dark surfaces |
| `textOnLightDay` | `tokens.$bpk-text-on-light-day` | rgb(22, 22, 22) | Text on light surfaces |
| `textPrimaryInverseDay` | `tokens.$bpk-text-primary-inverse-day` | rgb(255, 255, 255) | Inverse (white on dark) |
| `textErrorDay` | `tokens.$bpk-text-error-day` | rgb(231, 8, 102) | Error/validation text |
| `textSuccessDay` | `tokens.$bpk-text-success-day` | rgb(12, 131, 138) | Success text |
| `textDisabledDay` | `tokens.$bpk-text-disabled-day` | rgba(0, 0, 0, 0.2) | Disabled state |
| `textDisabledOnDarkDay` | `tokens.$bpk-text-disabled-on-dark-day` | rgba(255, 255, 255, 0.5) | Disabled on dark |

### Core brand

| Token (JS) | SCSS | Value | Use for |
|------------|------|-------|---------|
| `coreAccentDay` | `tokens.$bpk-core-accent-day` | rgb(0, 98, 227) | Skyscanner blue |
| `corePrimaryDay` | `tokens.$bpk-core-primary-day` | rgb(5, 32, 60) | Skyscanner navy |

### Status

| Token (JS) | Value | Use for |
|------------|-------|---------|
| `statusSuccessSpotDay` | rgb(12, 131, 138) | Success icon/text |
| `statusSuccessFillDay` | rgb(212, 255, 242) | Success background |
| `statusWarningSpotDay` | rgb(245, 93, 66) | Warning icon/text |
| `statusWarningFillDay` | rgb(255, 247, 207) | Warning background |
| `statusDangerSpotDay` | rgb(231, 8, 102) | Danger icon/text |
| `statusDangerFillDay` | rgb(255, 233, 249) | Danger background |

### Lines and borders

| Token (JS) | Value | Use for |
|------------|-------|---------|
| `lineDay` | rgb(193, 199, 207) | Borders, dividers |
| `lineOnDarkDay` | rgba(255, 255, 255, 0.5) | Borders on dark backgrounds |

## Border radius

| Token (JS) | SCSS | Value |
|------------|------|-------|
| `borderRadiusXs` | `tokens.$bpk-border-radius-xs` | 0.25rem |
| `borderRadiusSm` | `tokens.$bpk-border-radius-sm` | 0.5rem |
| `borderRadiusMd` | `tokens.$bpk-border-radius-md` | 0.75rem |
| `borderRadiusLg` | `tokens.$bpk-border-radius-lg` | 1.5rem |
| `borderRadiusXl` | `tokens.$bpk-border-radius-xl` | 2.5rem |
| `borderRadiusFull` | `tokens.$bpk-border-radius-full` | 100% |

## Box shadows

| Token (JS) | Value |
|------------|-------|
| `boxShadowSm` | 0px 1px 3px 0px rgba(37,32,31,.3) |
| `boxShadowLg` | 0px 4px 14px 0px rgba(37,32,31,.25) |
| `boxShadowXl` | 0px 12px 50px 0px rgba(37,32,31,.25) |

## Breakpoints

| Name | Token (JS) | Value |
|------|------------|-------|
| Small mobile | `breakpointSmallMobile` | 22.4375rem |
| Mobile | `breakpointMobile` | 32rem |
| Small tablet | `breakpointSmallTablet` | 48rem |
| Tablet | `breakpointTablet` | 64rem |
| Desktop | `breakpointDesktop` | 80rem |

Use `BpkBreakpoint` component or responsive props on layout components rather than writing media queries.

## Typography tokens

| Token (JS) | Value |
|------------|-------|
| `fontFamilyBase` | 'Skyscanner Relative', system fallbacks |
| `fontFamilyLarken` | 'Larken', serif fallbacks |
| `fontSizeXs` | 0.75rem |
| `fontSizeSm` | 0.875rem |
| `fontSizeBase` | 1rem |
| `fontSizeLg` | 1.25rem |
| `fontSizeXl` | 1.5rem |
| `fontSizeXxl` | 2rem |
| `fontSizeXxxl` | 2.5rem |
| `fontSizeXxxxl` | 3rem |
| `fontSizeXxxxxl` | 4rem |

Prefer `BpkText` with `textStyle` over using typography tokens directly. Use tokens only when building custom components outside the design system.

## Token categories

For browsing all tokens: `backpack-cli tokens --category <name> --verbose`

Categories: animations, borders, box-shadows, breakpoints, buttons, calendar, canvas-colors, cards, colors, core-colors, flare, font-weights, forms, horizontal-nav, icons, letter-spacings, line-colors, marcomms-colors, modals, notifications, overlay-colors, panels, radii, scrim-colors, spacings, status-colors, surface-colors, text-colors, typesettings, z-indices.
