# bpk-component-graphic-promotion

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkGraphicPromo from '@skyscanner/backpack-web/bpk-component-graphic-promotion';

export default () => (
  <BpkGraphicPromo
    buttonText="Learn more"
    contentId="graphic-promo-1"
    headline="Ride your wave"
    invertVertically
    onClick={() => redirect("https://www.sponsor-name.com/promotion")}
    sponsor={{
      label: 'Sponsored',
      logo: './path/to/sponsor/logo.png',
      altText: 'Sponsor Name',
    }}
    subheading="Portugal and 6 more countries have just been added to the UK travel green list"
    tagline="Tagline"
    textAlign={TEXT_ALIGN.start}
  />
);
```

### Use anchor tag as wrapper

```tsx
import BpkGraphicPromo from '@skyscanner/backpack-web/bpk-component-graphic-promotion';

export default () => (
  <BpkGraphicPromo
    buttonText="Learn more"
    contentId="graphic-promo-1"
    headline="Ride your wave"
    invertVertically
    onClick={() => redirect("https://www.sponsor-name.com/promotion")}
    sponsor={{
      label: 'Sponsored',
      logo: './path/to/sponsor/logo.png',
      altText: 'Sponsor Name',
    }}
    subheading="Portugal and 6 more countries have just been added to the UK travel green list"
    tagline="Tagline"
    textAlign={TEXT_ALIGN.start}
    href="http://abc" // If the href prop is provided, the component wrapper will be rendered as an <a> tag.
  />
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/graphic-promotion/web-0qnj8MN6#section-props-e3).
