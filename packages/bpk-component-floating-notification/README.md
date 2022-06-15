# bpk-component-floating-notification

> Backpack example component.

## Installation

```sh
npm install bpk-component-floating-notification --save-dev
```

## Usage

```js
import React from 'react';
import BpkFloatingNotification from 'bpk-component-code';

export default () => <BpkFloatingNotification />;
```

## Props

| Property       | PropType | Required | Default Value |
| -------------- | -------- | -------- | ------------- |
| animateOnEnter | bool     | false    | true          |
| animateOnExit  | bool     | false    | true          |
| className      | string   | false    | null          |
| ctaText        | string   | false    | null          |
| darkMode       | bool     | false    | false         |
| icon           | bool     | false    | false         |
| text           | string   | true     | null          |
