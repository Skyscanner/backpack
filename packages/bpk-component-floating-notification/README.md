# bpk-component-floating-notification

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkFloatingNotification from '@skyscanner/backpack-web/bpk-component-floating-notification';
import BpkIconHeart from '../../packages/bpk-component-icon/sm/heart';

export default () => (
  <BpkFloatingNotification
    ctaText="View"
    icon={BpkIconHeart}
    onClick={() => {}}
    text="Killer Combo saved to New York and Miami 🎉"
  />
);
```