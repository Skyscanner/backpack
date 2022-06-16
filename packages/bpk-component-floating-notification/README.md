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
    icon={BpkIconInformationCircle}
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
| icon           | ReactElement | false    | null          |
| text           | string       | true     | null          |

### Prop Details

#### theme

By default the component is rendered in the light theme (`TYPE.light`) which uses a dark background and white text for the notification. This contrasts against a white page.

The dark theme (`TYPE.dark`) displays the notification with a white background and black text. This contrasts against a dark page.
