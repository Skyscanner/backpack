# bpk-component-ticket

> Backpack ticket component.

## Installation

```sh
npm install bpk-component-ticket --save-dev
```

## Usage

```js
import React from 'react';
import BpkTicket from 'bpk-component-ticket';

export default () => (
  <BpkTicket stub="Lorem ipsum dolor sit amet.">
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
    commodo ligula eget dolor. Aenean massa. Cum sociis natoque
    penatibus et magnis dis parturient montes, nascetur ridiculus mus.
  </BpkTicket>
);
```

## Props

| Property      | PropType | Required | Default Value |
| ------------- | -------- | -------- | ------------- |
| children      | node     | true     | -             |
| stub          | node     | true     | -             |
| href          | string   | false    | null          |
| padded        | bool     | false    | true          |
| vertical      | bool     | false    | false         |
| stubProps     | object   | false    | {}            |
| stubClassName | string   | false    | null          |
| withNotches   | bool     | false    | true          |

