# bpk-component-price

> Backpack example component.

## Installation

```sh
npm install bpk-component-price --save-dev
```

## Usage

```js
import React from 'react';
import BpkPrice from 'bpk-component-price';

export default () => <BpkPrice title='£1,830' />;
```

## Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| title     | string   | true     | -             |
| subtitle  | string   | false    | null          |
| description | string   | false    | null          |
| className | string   | false    | null          |
