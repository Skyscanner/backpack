# bpk-component-flare

> Backpack example component.

## Installation

```sh
npm install bpk-component-flare --save-dev
```

## Usage

Note that the default background color is white. You will need to apply a custom className if you wish to change this.

### React components

```js
import React from 'react';
import { BpkContentBubble } from 'bpk-component-flare';

export default MyComponent = () => (
  <div>
      <BpkContentBubble
      className="myCustomClassName"
      showPointer={false}
      rounded={false}
      content={...}
      />
  </div>
)
```


## Props

| Property         | PropType | Required | Default Value |
| ---------------- | -------- | -------- | ------------- |
| className        | string   | false    | null          |
| content          | node     | false    | null          |
| contentClassName | string   | false    | null          |
| flareProps       | object   | false    | null          |
| showPointer      | bool     | false    | true          |

