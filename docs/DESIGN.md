# Design Principles

## Token System

All visual values come from design tokens sourced from `@skyscanner/bpk-foundations-web`. Components never use hardcoded colors, spacing, or typography values.

### Colors (Semantic Naming)

Tokens describe purpose, not appearance:

| Category | Examples |
|----------|----------|
| **Text** | `$bpk-text-primary-day`, `$bpk-text-secondary-day`, `$bpk-text-disabled-day`, `$bpk-text-on-dark-day` |
| **Canvas** | `$bpk-canvas-day`, `$bpk-canvas-contrast-day` |
| **Surface** | `$bpk-surface-highlight-day` |
| **Core** | `$bpk-core-primary-day`, `$bpk-core-accent-day` |
| **Line** | `$bpk-line-day`, `$bpk-line-on-dark-day` |

The `-day` suffix indicates the light theme variant.

### Spacing (Function-based)

Spacing uses functions that return rem values:

| Function | Value |
|----------|-------|
| `bpk-spacing-none()` | 0 |
| `bpk-spacing-sm()` | 0.5rem (8px) |
| `bpk-spacing-base()` | 1rem (16px) |
| `bpk-spacing-md()` | 1.25rem (20px) |
| `bpk-spacing-lg()` | 1.5rem (24px) |
| `bpk-spacing-xl()` | 2rem (32px) |

All sizing is in **rem** (see `decisions/sizing-in-rem.md`).

### Typography (Mixin-based)

#### Size Scale
`bpk-text-xs` < `bpk-text-sm` < `bpk-text-base` < `bpk-text-lg` < `bpk-text-xl` < `bpk-text-xxl` < `bpk-text-xxxl`

#### Semantic Mixins (preferred)
- `bpk-body-default` - Standard body text
- `bpk-body-long-form` - Long-form reading
- `bpk-caption` - Small supporting text
- `bpk-heading-1` through `bpk-heading-5` - Headings
- `bpk-link` / `bpk-link-underlined` - Link styles
- `bpk-label-1` / `bpk-label-2` - Label styles

### Borders & Shadows

- Border radius: `bpk-border-radius-xs()` through `bpk-border-radius-lg()`
- Border size: `$bpk-border-size-sm`, `$bpk-border-size-lg`
- Shadows: `bpk-box-shadow-sm()`, `bpk-box-shadow-lg()`

## BEM Methodology

CSS classes follow Block-Element-Modifier:

```scss
.bpk-button { }              // Block
.bpk-button__icon { }        // Element
.bpk-button--large { }       // Modifier
.bpk-button--destructive { } // Modifier
```

All classes prefixed with `bpk-` to avoid namespace collisions.

## Responsive Design

Breakpoints defined in `bpk-mixins/_breakpoints.scss`:
- Components should adapt to viewport size
- Mobile-first approach
- RTL support via logical properties where possible

## Color Accessibility

- All text/background combinations must meet WCAG 2.2 AA contrast ratios
- Interactive states (hover, focus, active) maintain contrast
- Disabled states use designated `$bpk-text-disabled-day` token
- Focus indicators are visible and high-contrast
