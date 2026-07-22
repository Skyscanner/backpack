# Iconography

## Icon source

Icons come from `bpk-component-icon` — a fixed set of ~300 pre-built React icon components, each shipped in two fixed sizes (`sm` = 16px, `lg` = 24px) as **separate named exports**, not a single `Icon` component with a `name` prop.

```tsx
import BpkSmallFlightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/flight';
import BpkLargeAccessibilityIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/accessibility';

<BpkSmallFlightIcon />
<BpkLargeAccessibilityIcon fill="currentColor" />
```

There is no dynamic `<Icon name="..." />` lookup API — every icon is its own component, imported by its exact file path (`bpk-component-icon/sm/{icon-name}` or `bpk-component-icon/lg/{icon-name}`). Never invent an import path or component name — verify it against the list below (or `packages/backpack-web/src/bpk-component-icon/lg/` and `/sm/` in the source repo) first.

## Available icons

~300 icons are available, covering travel/booking domains (flights, hotels, cars), UI chrome (arrows, chevrons, close, menu), status/feedback (tick, exclamation, information), and account/user icons. Representative names (same set exists in both `sm/` and `lg/`, kebab-case, `--` separates a sub-category from its base name e.g. `account--add`, `weather--rain`):

`accessibility`, `account`, `account--add`, `account-circle`, `airline`, `airports`, `alert--active`, `arrow-up/down/left/right`, `baggage-cabin`, `baggage-checked`, `breakfast-tick`, `calendar`, `chevron-up/down/left/right`, `close`, `close-circle`, `deals`, `direct`, `duration`, `edit`, `exclamation`, `exclamation-circle`, `filter`, `flight`, `globe`, `heart`, `heart--outline`, `help`, `hotels`, `information`, `information-circle`, `location`, `lock`, `mail`, `map`, `menu`, `minus`, `plus`, `price-tag`, `print`, `refresh`, `search`, `settings`, `share`, `sort`, `star`, `star-half`, `star-outline`, `stops`, `tick`, `tick-circle`, `ticket`, `time`, `trash`, `trend`, `wallet`, `weather--rain`, `wifi`.

This is a representative sample, not the full catalog — before using an icon, confirm it exists by browsing `packages/backpack-web/src/bpk-component-icon/lg/` (or `/sm/`) in the Backpack repo, or by using the `backpack-cli` skill's icon browser if available.

## Sizing

| Size | Import path | Usage |
| --- | --- | --- |
| 16px (`iconSizeSm`) | `bpk-component-icon/sm/{name}` | Inline with text, inside small controls (chips, badges) |
| 24px (`iconSizeLg`) | `bpk-component-icon/lg/{name}` | Standalone controls, buttons, larger UI chrome |

There is no 20px size. Larger dedicated size tokens exist (`iconSizeXl` 32px, `iconSizeXxl` 40px, `iconSizeXxxl` 48px) but are not exposed as separate icon component sizes — they're used internally by specific large-format components.

## Rules

- Do NOT guess icon names or invent an import path — verify the icon file exists under `bpk-component-icon/sm/` or `bpk-component-icon/lg/` first.
- If an icon doesn't exist for a concept, pick the closest existing icon rather than inventing one, or ask the user (per the no-custom-builds gate in `overview.md`).
- Never use inline `<svg>` elements — always use a `bpk-component-icon` import.
- Icons inherit color via the `fill` prop (defaults to the current text color context in most components); pass a `fill` value from `TEXT_COLORS`/`textColors` tokens, or `fill="currentColor"` to inherit from a parent's CSS `color`. Never hardcode a hex fill.
- **Inside `BpkButton`**: use the `leadingIcon`/`trailingIcon` props — never place a raw icon as a child, and never wrap it in `withButtonAlignment` (the button handles spacing/alignment itself).
- **Inline with text outside a button** (normal text flow, not a flex container): wrap the icon with `withButtonAlignment` (16px icons) or `withLargeButtonAlignment` (24px icons) from `bpk-component-icon` so it aligns to the surrounding line-height.
- **Inside a flex/grid row** (e.g. `align-items: center`): use the raw icon component, unwrapped — `withButtonAlignment`'s margin adjustment is calibrated for inline text flow and will visibly misalign the icon against flex-centered siblings.
- `className` is not supported directly on icon components (ESLint-enforced) — wrap the icon in a `<span>`/DOM element if you need a class hook.
