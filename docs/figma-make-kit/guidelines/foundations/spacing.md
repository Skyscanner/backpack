# Spacing Tokens

## Spacing scale

Spacing is expressed as `rem` values (1rem = 16px at the default root font size). SCSS spacing values are **functions**, not variables — `tokens.bpk-spacing-base()`, not `tokens.$bpk-spacing-base`. In TSX/layout code, use the `BpkSpacing` enum from `bpk-component-layout` instead of raw numbers.

| Token (SCSS function) | `BpkSpacing` enum | Value | Usage |
| --- | --- | --- | --- |
| `bpk-spacing-xs()` | `BpkSpacing.XS` | 0.125rem (2px) | Hairline gaps |
| `bpk-spacing-sm()` | `BpkSpacing.SM` | 0.25rem (4px) | Tight gaps, icon-to-text spacing subcomponents |
| — | `BpkSpacing.Base` | 1rem (16px) | Default spacing — most padding/margin |
| `bpk-spacing-md()` | `BpkSpacing.MD` | 0.5rem (8px) | Compact spacing between related elements |
| `bpk-spacing-lg()` | `BpkSpacing.LG` | 1.5rem (24px) | Section spacing |
| `bpk-spacing-xl()` | `BpkSpacing.XL` | 2rem (32px) | Page-level spacing |
| `bpk-spacing-xxl()` | `BpkSpacing.XXL` | 2.5rem (40px) | Large section breaks |
| `bpk-spacing-xxxl()` | `BpkSpacing.XXXL` | 4rem (64px) | Hero/page-section spacing |
| `bpk-spacing-xxxxl()` | — (SCSS only) | 6rem (96px) | Very large layout spacing |
| `$bpk-spacing-none` | `BpkSpacing.None` | 0 | Explicit zero override |

Note the scale is **not** strictly linear — `BpkSpacing.MD` (8px) is smaller than `BpkSpacing.Base` (16px). Always pick by the semantic column above ("default spacing" vs "compact spacing"), not by assuming XS < SM < Base < MD < LG in a straight numeric line.

There is also `$bpk-spacing-icon-text` (0.5rem / 8px, SCSS variable, not a function) — the fixed gap Backpack components use between an icon and adjacent text.

## Grid / layout

Backpack layout is composed with `BpkFlex`, `BpkGrid`/`BpkGridItem`, and `BpkStack`/`BpkHStack`/`BpkVStack` (see `components/overview.md` and `.claude/guidelines/bpk-layout-components.md`) rather than a fixed column-count/breakpoint grid system. Responsive behaviour is expressed per-prop using `BpkBreakpoint` keys, not a separate grid component:

| Breakpoint token | Maps to |
| --- | --- |
| `BpkBreakpoint.SmallMobile` | smallest viewport |
| `BpkBreakpoint.Mobile` | mobile |
| `BpkBreakpoint.SmallTablet` | small tablet |
| `BpkBreakpoint.Tablet` | tablet |
| `BpkBreakpoint.Desktop` | desktop |

Any spacing/size/layout prop on a Backpack layout component can take a single value or a responsive object keyed by these breakpoints, e.g. `gap={{ mobile: BpkSpacing.SM, desktop: BpkSpacing.LG }}`.

## Common patterns

```tsx
{/* CORRECT — token-based spacing via a layout primitive */}
<BpkFlex direction="column" gap={BpkSpacing.MD} padding={BpkSpacing.LG}>
  {children}
</BpkFlex>

{/* WRONG — hardcoded pixels */}
<div style={{ gap: 12, padding: 24 }}>...</div>
```

## Rules

- All spacing (gap, padding, margin) must use a `BpkSpacing` token in TSX, or a `bpk-spacing-*()` SCSS function in stylesheets — never hardcode a pixel/rem value.
- Prefer a Backpack layout component (`BpkFlex`, `BpkStack`, `BpkGrid`, `BpkBox`) over a raw `<div>` with manual flex/grid CSS — see `.claude/guidelines/bpk-layout-components.md`.
- `BpkSpacing.Base` (16px) is the default choice when no other spacing is specified by the design — don't default to `MD` (8px) or invent an in-between value.
- Layout components (`BpkFlex`/`BpkBox`/`BpkGrid`/`BpkStack`) do not accept `className` or `style` (except `BpkVessel`, a migration-only escape hatch) — express all spacing through their typed props.
