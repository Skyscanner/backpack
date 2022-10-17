# bpk-component-page-indicator

> Backpack example component.

## Installation

```sh
npm install @skyscanner/backpack-web --save
```

## Usage

```js
import React from 'react';
import BpkPageIndicator from '@skyscanner/backpack-web/bpk-component-page-indicator';

export default () =>
  <BpkPageIndicator
    currentIndex={0}
    totalBullets={7}
    onClick={(e, newIndex, direction) => {
      console.log('Slide to new index:', newIndex);
      console.log('Slide direction:', direction);
    }}
    ariaLabel='Go to Slide'
  />;
```

## Props

| Property     | PropType | Required | Default Value |
|--------------|----------|----------|---------------|
| currentIndex | number   | true     | -             |
| totalBullets | number   | true     | -             |
| ariaLabel    | string   | true     | -             |
| className    | string   | false    | null          |
| showNav      | bool     | false    | false         |
| dark         | bool     | false    | false         |
| onClick      | func     | false    | null          |

