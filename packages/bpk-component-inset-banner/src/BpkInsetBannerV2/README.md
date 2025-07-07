# bpk-component-inset-banner-v2

> Backpack inset banner v2 component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import {
  BpkInsetBannerSponsored,
  VARIANT,
} from '../../packages/bpk-component-inset-banner';

export default () => (
  <BpkInsetBanner
    title="Lorem ipsum"
    subheadline="Lorem ipsum dolor sit amet"
    logo="https://content.skyscnr.com/m/49503c4388cb05ab/original/Skyland_Black_172x96.png"
    callToAction={{
      text: 'Sponsored',
      bottomSheetContent: [
        {
          title: 'Lorem ipsum dolor sit amet',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          title: 'Consectetur adipiscing elit',
          description:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
      ],
      bottomSheetTitle: 'About this advert',
      closeBtnIcon: true,
      labelTitle: true,
      bottomSheetLabel: 'Info',
      buttonCloseLabel: 'Close',
      buttonA11yLabel: 'More info',
    }}
    backgroundColor="#FFE300"
    variant={VARIANT.onLight}
    accessibilityLabel="Sponsored by Skyscanner"
  />
);
```
