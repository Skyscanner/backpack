# bpk-component-inset-banner

> Backpack inset banner component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkInsetBanner from '@skyscanner/backpack-web/bpk-component-inset-banner';

export default () => (
  <BpkInsetBanner
    title="My title"
    subheadline="My subheadline"
    logo="logo.png"
    ctaText="Sponsored"
    backgroundColor="#F55D42"
    callToAction={{
      text: 'Sponsored',
      showIcon: true,
      onClick: () => console.log('click'),
    }}
    body={{
      text: 'My body text',
      linkText: 'More information',
      link: 'www.skyscanner.net',
    }}
    variant="onDark"
  />);
```
