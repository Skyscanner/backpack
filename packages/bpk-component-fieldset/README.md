# bpk-component-fieldset

> Backpack fieldset component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import BpkFieldset from '@skyscanner/backpack-web/bpk-component-fieldset';
import BpkInput, { INPUT_TYPES } from '@skyscanner/backpack-web/bpk-component-input';

class FieldsetContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const isValid = this.state.value !== '';

    return (
      <BpkFieldset
        label="Name"
        validationMessage="Please enter a name"
      >
        <BpkInput
          id="name_input"
          name="name"
          type={INPUT_TYPES.text}
          placeholder="e.g. Joe Bloggs"
          value={this.state.value}
          valid={isValid}
        />
      </BpkFieldset>
    );
  }
}
```

## Props

| Property          | PropType | Required | Default Value |
| ----------------- | -------- | -------- | ------------- |
| children          | node     | true     | -             |
| label             | string   | true     | -             |
| className         | string   | false    | null          |
| disabled          | bool     | false    | false         |
| isCheckbox        | bool     | false    | false         |
| required          | bool     | false    | false         |
| valid             | bool     | false    | null          |
| validationMessage | string   | false    | null          |
| validationProps   | object   | false    | {}            |
| description       | string   | false    | null          |

> **Note:** There are a couple of props that behave differently when using `isCheckbox`:
> - `valid`: checkboxes don't have a valid prop so you have to apply it to the fieldset directly
> - `label`: checkboxes have their own labels so it's safe to omit these
