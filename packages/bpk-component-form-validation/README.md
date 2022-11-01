# bpk-component-form-validation

> Backpack form validation component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkFormValidation from '@skyscanner/backpack-web/bpk-component-form-validation';

export default () => (
  <BpkFormValidation id="my-form-validation" expanded>
    A validation message.
  </BpkFormValidation>,
)
```

## Props

| Property       | PropType | Required | Default Value |
| -------------- | -------- | -------- | ------------- |
| children       | node     | true     | -             |
| id             | string   | true     | -             |
| expanded       | bool     | true     | -             |
| isCheckbox     | bool     | false    | false         |
| className      | string   | false    | null          |
| containerProps | object   | false    | {}            |
