# bpk-component-skip-link

> Backpack example component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkSkipLink from '@skyscanner/backpack-web/bpk-component-skip-link';

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
