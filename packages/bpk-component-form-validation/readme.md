# bpk-component-form-validation

> Backpack form validation component.

## Installation

```sh
npm install bpk-component-form-validation --save-dev
```

## Usage

```js
import React from 'react';
import BpkFormValidation from 'bpk-component-form-validation';

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
