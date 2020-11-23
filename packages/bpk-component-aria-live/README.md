# bpk-component-aria-live

> Backpack aria-live component.

## Installation

```sh
npm install bpk-component-aria-live --save-dev
```

## Usage

```js
import React from 'react';
import BpkAriaLive, { ARIA_LIVE_POLITENESS_SETTINGS } from 'bpk-component-aria-live';

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
