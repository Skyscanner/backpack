# bpk-component-skip-link

> Backpack example component.

## Installation

```sh
npm install bpk-component-skip-link --save-dev
```

## Usage

```js
import React from 'react';
import BpkSkipLink from 'bpk-component-code';

export default () => <BpkSkipLink href="#main" label="Skip to main content" />;
```

## Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| className | string   | false    | null          |
| label     | string   | true     | -             |
| href      | string   | true     | -             |

## Theme Props

- `skipLinkBackgroundColor`
