# bpk-component-floating-notification

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
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

## Props

| Property       | PropType     | Required | Default Value |
| -------------- | ------------ | -------- | ------------- |
| animateOnEnter | bool         | false    | true          |
| animateOnExit  | bool         | false    | true          |
| className      | string       | false    | null          |
| ctaText        | string       | false    | null          |
| hideAfter      | number       | false    | 4000          |
| icon           | ReactElement | false    | null          |
| onClick        | func         | false    | null          |
| onExit         | func         | false    | null          |
| text           | string       | true     | -             |

### Prop Details

#### hideAfter

This prop controls the amount of time that the notification stays visible before the exit animation begins.

The default value is 4 seconds (4000 milliseconds).

#### onExit

Execute a function after the component has finished the exit animation.
