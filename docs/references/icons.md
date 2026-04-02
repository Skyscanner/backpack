# Icons Reference

> **Load this doc when:** adding icons to any component or UI element — choosing size,
> finding the correct import path, pairing icons with buttons or text, or checking
> accessibility requirements for icon usage.

---

# Icons

## Sizes

Two sizes: `sm` (16px) and `lg` (24px).

## Importing

```tsx
import SmallFlightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/flight';
import LargeFlightIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flight';
```

Pattern: `@skyscanner/backpack-web/bpk-component-icon/{size}/{icon-name}`

## Using with buttons

```tsx
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import SearchIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/search';

// Icon + text button
<BpkButton type="primary">
  <SearchIcon /> Search
</BpkButton>

// Icon-only button (must have aria-label)
<BpkButton type="secondary" iconOnly aria-label="Search flights">
  <SearchIcon />
</BpkButton>
```

## Using with text

```tsx
import { BpkFlex } from '@skyscanner/backpack-web/bpk-component-layout';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import InfoIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/information-circle';

<BpkFlex inline direction="row" align="center" gap="sm">
  <InfoIcon />
  <BpkText textStyle="body-default" tagName="span">Helpful information</BpkText>
</BpkFlex>
```

Use `spacingIconText` (0.5rem) or `gap="sm"` for the gap between icons and text.

## Common icons by category

### Navigation
`arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`, `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`, `close`, `long-arrow-left`, `long-arrow-right`, `menu`

### Actions
`search`, `filter`, `sort`, `edit`, `delete`, `share`, `download`, `send`, `copy`, `refresh`, `settings`, `swap--vertical`

### Status
`tick`, `tick-circle`, `close-circle`, `information-circle`, `help-circle`, `alert--active`, `alert--add`, `alert--expired`

### Travel
`flight`, `hotels`, `car-hire`, `airports`, `aircraft`, `airline`, `baggage`, `baggage-cabin`, `baggage--add`, `baggage--remove`, `calendar`, `map`, `location`, `time`, `duration`

### People
`account`, `account-circle`, `account--add`, `adult`, `child`, `infant`

### Commerce
`price-tag`, `heart`, `heart--outline`, `star`, `star--outline`, `award`, `deals`

### Media
`camera`, `image`, `play`, `pause`, `speaker`, `mute`

## Finding icons

```bash
# Search by name
backpack-cli icons --search "flight" --verbose

# Filter by size
backpack-cli icons --size sm --json

# List all icons
backpack-cli icons --json
```

## Accessibility

- Always pair icons with accessible text — either visible label text adjacent to the icon, or `aria-label` on the containing interactive element.
- Decorative icons (next to visible text) should be hidden from screen readers with `aria-hidden="true"`.
- Icon-only buttons must have `aria-label`.
