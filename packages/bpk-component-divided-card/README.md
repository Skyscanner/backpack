# bpk-component-divided-card

> Backpack divided component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkDividedCard, { ORIENTATION } from '@skyscanner/backpack-web/bpk-component-divided-card';

export default () => <BpkDividedCard
    primaryContent={'foo'}
    secondaryContent={'bar'}
    orientation={ORIENTATION.vertical}
  />;
```

## Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| primaryContent | node   | true    | -          |
| secondaryContent | node   | true    | -          |
| orientation | string   | false    | ORIENTATION.horizontal          |
| href | string   | false    | null          |
| className | string   | false    | null          |
