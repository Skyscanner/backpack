# bpk-component-badge

> Backpack badge component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkBadge, { BADGE_TYPES } from '@skyscanner/backpack-web/bpk-component-badge';

export default () => (
  <BpkBadge
    type={BADGE_TYPES.warning}
  >
    My Badge
  </BpkBadge>
);
```

## Props

| Property  | PropType                                                                                                                                                 | Required | Default Value       |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------| -------- | ------------------- |
| centered  | bool                                                                                                                                                     | false    | null                |
| className | string                                                                                                                                                   | false    | null                |
| docked    | oneOf('left', 'right')                                                                                                                                   | false    | null                |
| type      | oneOf(BADGE_TYPES.warning, BADGE_TYPES.success, BADGE_TYPES.destructive, BADGE_TYPES.light, BADGE_TYPES.inverse, BADGE_TYPES.outline, BADGE_TYPES.strong, BADGE_TYPES.brand)| false    | BADGE_TYPES.warning |

## Theme props

* `badgeBackgroundColor`
* `badgeSuccessBackgroundColor`
* `badgeDestructiveBackgroundColor`
