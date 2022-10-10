# bpk-component-page-indicator

> Backpack example component.

## Installation

```sh
npm install bpk-component-page-indicator --save-dev
```

## Usage

```js
import React from 'react';
import BpkPageIndicator from 'bpk-component-code';

export default () =>
  <BpkPageIndicator
    currentItem={0}
    totalItems={7}
    updateItemCallback={(newIndex) => {
      console.log('Slide to new index:', newIndex);
    }}
  />;
```

## Props

| Property            | PropType | Required | Default Value |
|---------------------|----------|----------|---------------|
| currentItem         | number   | true     | -             |
| totalItems          | number   | true     | -             |
| className           | string   | false    | null          |
| itemClassName       | string   | false    | null          |
| activeItemClassName | string   | false    | null          |
| ariaLabel           | string   | false    | 'Go to Slide' |
| showNav             | bool     | false    | false         |
| updateItemCallback  | func     | false    | null          |
