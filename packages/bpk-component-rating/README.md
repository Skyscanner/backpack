# bpk-component-rating

> Backpack rating component.

## Installation

```sh
npm install bpk-component-rating --save-dev
```

## Usage

```js
import React from 'react';
import BpkRating from 'bpk-component-rating';

export default () => (
  <BpkRating
    ariaLabel="9 Excellent would recommend"
    title="Excellent"
    subtitle="Would recommend"
    value={9}
  />
);
```

## Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| ariaLabel | string   | true     | -             |
| title     | string   | true     | -             |
| subtitle  | string   | true     | -             |
| value     | number   | true     | -             |
| className | string   | false    | null          |
