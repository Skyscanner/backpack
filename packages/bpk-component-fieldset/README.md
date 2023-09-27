# bpk-component-fieldset

> Backpack fieldset component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { Component } from 'react';
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