# Color Tokens

## Palette overview

Backpack uses a **primarily neutral** palette. Brand color (`core-accent`) is used **sparingly** — only for primary actions, links, active states, and small accents. Large areas (page canvas, cards, panels) stay neutral (white/near-white in light mode); a small set of `core-*` and `status-*` colors carry meaning.

| Role | Value (day/light) | Token (SCSS) | Frequency | Usage |
| --- | --- | --- | --- | --- |
| Page canvas | `rgb(255, 255, 255)` | `$bpk-canvas-day` | Dominant | Page background |
| Canvas contrast | `rgb(239, 243, 248)` | `$bpk-canvas-contrast-day` | Dominant | Slightly recessed page regions |
| Surface | `rgb(255, 255, 255)` | `$bpk-surface-default-day` | Dominant | Cards, panels, sheets |
| Surface elevated | `rgb(255, 255, 255)` | `$bpk-surface-elevated-day` | Dominant | Modals, popovers, elevated surfaces |
| Surface low-contrast | `rgb(245, 247, 250)` | `$bpk-surface-low-contrast-day` | Dominant | Subtly recessed surface (e.g. table stripe) |
| Surface subtle | `rgb(227, 240, 255)` | `$bpk-surface-subtle-day` | Sparse | Tinted brand-adjacent surface |
| Surface highlight | `rgb(224, 228, 233)` | `$bpk-surface-highlight-day` | Sparse | Highlighted/selected surface, code blocks |
| Surface contrast | `rgb(5, 32, 60)` | `$bpk-surface-contrast-day` | Sparse | Dark hero/contrast sections |
| Primary text | `rgb(22, 22, 22)` | `$bpk-text-primary-day` | Dominant | Body text, headings |
| Secondary text | `rgb(98, 105, 113)` | `$bpk-text-secondary-day` | Dominant | Supporting/muted text |
| Brand / core accent | `rgb(0, 98, 227)` | `$bpk-core-accent-day` | Sparse | Primary actions, links, active states |
| Core primary | `rgb(5, 32, 60)` | `$bpk-core-primary-day` | Sparse | Deep brand color, dark UI chrome |
| Line | `rgb(193, 199, 207)` | `$bpk-line-day` | Sparse | Dividers, default borders |

Backpack also ships a full **dark theme** — every `-day` token has a `-night` counterpart (e.g. `$bpk-text-primary-night`). Dark mode is switched at runtime via `data-theme="dark"` on `<html>` (see `setup.md`); Figma Make should not need to reference `-night` tokens directly unless explicitly asked to build a dark-mode screen.

## Naming pattern

SCSS tokens follow: `$bpk-{category}-{role}-{day|night}` (e.g. `$bpk-text-primary-day`).

Categories: `canvas`, `surface`, `core`, `text`, `line`, `status`, `scrim`, `overlay`.

TSX/JS tokens (from `@skyscanner/bpk-foundations-web/tokens/base.es6`) drop the `$bpk-` prefix and camelCase the rest: `$bpk-text-primary-day` → `textPrimaryDay`. Grouped exports are also available, e.g. `textColors.textPrimaryDay`, `surfaceColors.surfaceDefaultDay`.

## Token → component mapping

Figma Make does not write raw CSS custom properties or hex values for Backpack — color is applied by **using the right Backpack component and prop**, not by hand-picking a token:

- Text color → `BpkText` `color` prop (`TEXT_COLORS.textPrimary`, `textSecondary`, `textLink`, `textError`, `textSuccess`, `textDisabled`, `textOnDark`, `textOnLight`, `textPrimaryInverse`, `textSecondaryOnContrast`, `textHero`, `textDisabledOnDark`).
- Background/surface color inside a layout primitive → `BpkBox`/`BpkFlex`/etc. `backgroundColor` prop, values from `BACKGROUND_COLORS` (exported by `bpk-component-layout`).
- Status color → the relevant component's own variant prop (e.g. `BpkBadge` `type={BADGE_TYPES.success}`, `BpkBannerAlert` `type={INFO_BANNER_TYPES.error}`) — never hardcode a status hex value.
- Only reach for a raw SCSS/JS token (`tokens.$bpk-text-primary-day` / `textPrimaryDay`) when styling something with no Backpack component equivalent, per `.claude/guidelines/bpk-token-value-lookup.md`.

## Decision trees

### Background color

```
"What background color should I use?"

├─ Page canvas?                └─ page background — no wrapper needed, canvas token is the default body background
├─ Elevated card/panel?        └─ BpkCard / BpkPanel (uses surface-default / surface-elevated internally)
├─ Recessed / subtle area?     └─ BpkBox backgroundColor={BACKGROUND_COLORS.surfaceLowContrast}
├─ Primary action button?      └─ BpkButton type={BUTTON_TYPES.primary} (never a hand-set brand background)
└─ Status indicator?           └─ BpkBadge / BpkBannerAlert with the matching success/warning/danger type
```

### Text color

```
"What text color should I use?"

├─ Primary content?            └─ BpkText color={TEXT_COLORS.textPrimary} (default — usually omit color entirely)
├─ Supporting/secondary?        └─ BpkText color={TEXT_COLORS.textSecondary}
├─ Disabled/placeholder?        └─ BpkText color={TEXT_COLORS.textDisabled} (or rely on the component's own disabled state)
├─ Link?                        └─ BpkLink, or BpkText color={TEXT_COLORS.textLink}
├─ Error message?               └─ BpkText color={TEXT_COLORS.textError} / BpkFormValidation
└─ On a brand/dark background?  └─ BpkText color={TEXT_COLORS.textOnDark} or textPrimaryInverse
```

### Border color

```
"What border color should I use?"

├─ Default interactive element (input, select)?  └─ handled automatically by BpkInput/BpkSelect/etc. — do not set a border manually
├─ Subtle separator between sections?             └─ BpkDivider, or borders.bpk-border-sm(tokens.$bpk-line-day) in SCSS
└─ Focused/selected?                              └─ handled automatically by the component's focus/selected state — never override
```

## Common mistakes

```tsx
{/* CORRECT — color comes from the component's own variant/color prop */}
<BpkButton type={BUTTON_TYPES.primary}>Save</BpkButton>
<BpkText color={TEXT_COLORS.textSecondary}>Supporting copy</BpkText>

{/* WRONG — brand color hand-set as a large raw background */}
<div style={{ backgroundColor: '#0062e3' }}>...</div>

{/* WRONG — hardcoded hex instead of a token */}
<BpkText style={{ color: '#626971' }}>Supporting copy</BpkText>
```

## Rules

- Never hardcode hex/rgb values — use a Backpack component's variant prop, or a `BACKGROUND_COLORS`/`TEXT_COLORS` token as a last resort.
- Brand color (`core-accent` / `BUTTON_TYPES.primary`) is for primary actions and links only — never a large background area.
- Status colors (success/warning/danger) only come from a component's own semantic `type` prop — never picked manually to "look right."
- Don't reference `-night` tokens directly; dark mode is a runtime theme switch, not a per-component choice (see `setup.md`).
