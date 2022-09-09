# bpk-component-badge

> Backpack badge component.

## Installation

```sh
npm install bpk-component-badge --save-dev
```

## Usage

```js
import React from 'react';
import BpkBadge, { BADGE_TYPES } from 'bpk-component-badge';

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
| type      | oneOf(BADGE_TYPES.warning, BADGE_TYPES.success, BADGE_TYPES.destructive, BADGE_TYPES.light, BADGE_TYPES.inverse, BADGE_TYPES.outline, BADGE_TYPES.strong)| false    | BADGE_TYPES.warning |

## Theme props

* `badgeBackgroundColor`
* `badgeSuccessBackgroundColor`
* `badgeDestructiveBackgroundColor`


<img src="https://raw.githubusercontent.com/Skyscanner/backpack/no-jira-screenshots/decisions/lineheights.png" alt="Supernova Logo" style="max-width:100%;">
