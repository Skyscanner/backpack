# bpk-component-toast

> Backpack toast component.

## Installation

```sh
npm install bpk-component-toast --save-dev
```

## Usage

```javascript
import React from 'react';
import BpkToast from 'bpk-component-toast';

export default () => (
  <BpkToast message="My sample toast" isVisible />
);
```

## Props

| Property  | PropType                                 | Required | Default Value |
| --------- | ---------------------------------------- | -------- | ------------- |
| message   | string                                   | true     | -             |
| isVisible | bool                                     | false    | false         |
| onClose   | function                                 | false    | () => {}      |
