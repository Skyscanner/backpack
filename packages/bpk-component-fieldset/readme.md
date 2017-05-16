# bpk-component-fieldset

> Backpack fieldset component.

## Installation

```sh
npm install bpk-component-fieldset --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import BpkFieldset from 'bpk-component-fieldset';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';

class FieldsetContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
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
          type={INPUT_TYPES.TEXT}
          placeholder="e.g. Joe Bloggs"
          value={this.state.value}
          valid={isValid}
        />
      </BpkFieldset>
    );
  }
}
```

### Props

| Property          | PropType | Required | Default Value |
| ----------------- | -------- | -------- | ------------- |
| children          | node     | true     | -             |
| className         | string   | false    | null          |
| disabled          | bool     | false    | false         |
| isCheckbox        | bool     | false    | false         |
| label             | string   | false    | null          |
| required          | bool     | false    | false         |
| valid             | bool     | false    | null          |
| validationMessage | string   | false    | null          |
| validationProps   | object   | false    | {}            |

> **Note:** There are a couple of props that behave differently when using `isCheckbox`:
> - `valid`: checkboxes don't have a valid prop so you have to apply it to the fieldset directly
> - `label`: checkboxes have their own labels so it's safe to omit these
