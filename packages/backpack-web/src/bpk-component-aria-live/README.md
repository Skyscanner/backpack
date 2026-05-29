# bpk-component-aria-live

> Backpack aria-live component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkAriaLive, { ARIA_LIVE_POLITENESS_SETTINGS } from '@skyscanner/backpack-web/bpk-component-aria-live';

export default () => (
  <>
    <BpkAriaLive>
      Information about an interaction section of the page. This will be visible only to accessibility technologies.
    </BpkAriaLive>

    <BpkAriaLive visible politenessSetting={ARIA_LIVE_POLITENESS_SETTINGS.assertive}>
      Information about an interaction section of the page. This will be visible to everybody.
    </BpkAriaLive>
  </>
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/aria-live/web-6z9vnspZ#section-props-f7).
