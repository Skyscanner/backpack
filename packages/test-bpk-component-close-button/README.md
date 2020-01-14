# bpk-component-close-button

> Backpack close button component.

## Installation

```sh
npm install bpk-component-close-button --save-dev
```

## Usage

```js
import React from 'react';
import BpkCloseButton from 'bpk-component-close-button';

export default () => (
  <BpkCloseButton label="Close" onClick={() => console.log('click')} />
);
```

## Props

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| label    | string   | true     | -             |
| onClick  | func     | true     | -             |
