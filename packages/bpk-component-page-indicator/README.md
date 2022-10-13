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
    updateItemCallback={(newIndex) => {
      console.log('Slide to new index:', newIndex);
    }}
  />;
```

## Props

| Property            | PropType | Required | Default Value |
|---------------------|----------|----------|---------------|
| currentIndex         | number   | true     | -             |
| totalBullets          | number   | true     | -             |
| className           | string   | false    | null          |
| ariaLabel           | string   | false    | 'Go to Slide' |
| showNav             | bool     | false    | false         |
| updateItemCallback  | func     | false    | null          |
