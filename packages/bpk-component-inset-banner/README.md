# bpk-component-inset-banner

> Backpack inset banner component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkInsetBanner, { VARIANT } from '@skyscanner/backpack-web/bpk-component-inset-banner';

export default () => (
  <BpkInsetBanner
    accessibilityLabel="Sponsored by Skyscanner"
    backgroundColor="#F55D42"
    body={{
      text: 'My body text',
      linkText: 'More information',
      link: 'www.skyscanner.net',
    }}
    callToAction={{
      text: 'Sponsored',
    }}
    logo="logo.png"
    subheadline="My subheadline"
    title="My title"
    variant={VARIANT.onDark}
  />);
```
