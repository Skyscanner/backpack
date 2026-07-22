# Borders & Corners

## Corner radius

Backpack uses **rounded corners throughout** — there is no sharp/0px interactive-element convention. Corner radius scales with the size of the element it's applied to (small controls get a small radius, large surfaces get a large radius).

| Token (SCSS variable) | Value | Usage |
| --- | --- | --- |
| `$bpk-border-radius-xs` | 0.25rem (4px) | Code blocks, small chips |
| `$bpk-border-radius-sm` | 0.5rem (8px) | Buttons, inputs, selects — default control radius |
| `$bpk-border-radius-md` | 0.75rem (12px) | Large buttons/inputs, small cards |
| `$bpk-border-radius-lg` | 1.5rem (24px) | Cards, panels, modals |
| `$bpk-border-radius-xl` | 2.5rem (40px) | Large overlays, hero surfaces |
| `$bpk-border-radius-full` | 100% | Pills, avatars, circular icon buttons |
| `$bpk-border-radius-nav-tabs` | 1.125rem (18px) | Navigation tab group (component-specific) |

These are variables, not functions — `tokens.$bpk-border-radius-sm`, never `tokens.bpk-border-radius-sm()`. TSX equivalents drop the `$bpk-` prefix and camelCase: `borderRadiusSm`, `borderRadiusMd`, etc., from `@skyscanner/bpk-foundations-web/tokens/base.es6`.

In practice, Figma Make never sets a raw radius value directly — every Backpack component applies its own radius internally (a button is always `borderRadiusSm`/`borderRadiusMd` depending on `size`, a card is always `borderRadiusLg`, etc.). Only reach for a raw radius token when styling a custom element that has no Backpack component equivalent.

## Border usage

- Borders are used for **interactive element outlines** (inputs, selects — a hairline border is the default resting state) and **explicit separators** (`BpkDivider`, table rows).
- Layout regions (cards vs. page background, recessed panels) are distinguished primarily by **surface color and elevation** (shadow), not by adding a border — see `color.md` surface tokens and the `outlined`/`noElevation`/`default` variants on `BpkCardV2`.
- Border width tokens: `$bpk-border-size-sm` (1px, default hairline), `$bpk-border-size-lg` (2px, emphasis/focus), `$bpk-border-size-xl` (3px).

## Rules

- Use the corner tokens above — never hardcode `border-radius`.
- Corner radius is set by the component you use, not chosen independently — don't override a Backpack component's built-in radius.
- Prefer surface color/elevation over adding a border to separate a card or panel from its background; reach for `BpkDivider` or a border token only for genuine hairline separators.
