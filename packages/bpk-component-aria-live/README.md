# bpk-component-aria-live

> Backpack aria-live component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import React from 'react';
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

| Property | PropType | Required | Default Value |
| - | - | - | - |
| className | string | false | null |
| politenessSetting | oneOf([`ARIA_LIVE_POLITENESS_SETTINGS.off`, `ARIA_LIVE_POLITENESS_SETTINGS.polite`, `ARIA_LIVE_POLITENESS_SETTINGS.assertive`]) | false | `ARIA_LIVE_POLITENESS_SETTINGS.polite` |
| visible | bool | false | false |

`aria-relevant` and `aria-atomic` props can also be set.

`aria-relevant` determines what sort of changes should be read out. By default it is `text` but can be `additions`, `removals` or `all`. [Read more about `aria-relevant` on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-relevant).

`aria-atomic` is a boolean which determines whether changes should be read out, or the whole region should be read out. [Read more about `aria-atomic` on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#Use_Case:_Clock).
