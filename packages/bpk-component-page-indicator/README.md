# bpk-component-page-indicator

> Backpack example component.

## Installation

```sh
npm install bpk-component-page-indicator --save-dev
```

## Usage

```js
import React from 'react';
import BpkPageIndicator from 'bpk-component-page-indicator';

export default () =>
  <BpkPageIndicator
    currentIndex={0}
    totalBullets={7}
    onClick={(e, newIndex, direction) => {
      console.log('Slide to new index:', newIndex);
      console.log('Slide direction:', direction);
    }}
  />;
```

## Props

| Property     | PropType | Required | Default Value |
|--------------|----------|----------|---------------|
| currentIndex | number   | true     | -             |
| totalBullets | number   | true     | -             |
| className    | string   | false    | null          |
| ariaLabel    | string   | false    | 'Go to Slide' |
| showNav      | bool     | false    | false         |
| onClick      | func     | false    | null          |
