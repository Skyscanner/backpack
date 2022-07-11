# bpk-component-floating-notification

## Installation

```sh
npm install bpk-component-floating-notification --save-dev
```

## Usage

```js
import React from 'react';
import BpkFloatingNotification from 'bpk-component-floating-notification';
import BpkIconHeart from '../../packages/bpk-component-icon/sm/heart';

export default () => (
  <BpkFloatingNotification
    ctaText="View"
    type={TYPE.dark}
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
| type           | oneOf(TYPE)  | false    | TYPE.light    |

### Prop Details

#### hideAfter

This prop controls the amount of time that the notification stays visible before the exit animation begins.

The default value is 4 seconds (4000 milliseconds).

#### onExit

Execute a function after the component has finished the exit animation.

#### type

By default the component is rendered in the light theme (`TYPE.light`) which uses a dark background and white text for the notification. This contrasts against a white page.

The dark theme (`TYPE.dark`) displays the notification with a white background and black text. This contrasts against a dark page.
