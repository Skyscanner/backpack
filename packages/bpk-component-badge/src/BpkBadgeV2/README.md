# bpk-component-badge

> 🧪 Experimental Component: `BpkBadgeV2`
>
> Increases the label size to 14pt (Footnote) for better legibility, and generally using less prominent colour so the badges can be used as progressive disclosure on Flights inventory cards.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import { BpkBadgeV2, BADGE_TYPES } from '@skyscanner/backpack-web/bpk-component-badge';

export default () => (
  <BpkBadgeV2 type={BADGE_TYPES.warning}>
    My Badge
  </BpkBadgeV2>
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/badge/web-vDRH571D#section-props-0c).
