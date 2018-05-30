# bpk-component-phone-input

> Backpack phone input component.

## Installation

```sh
npm install bpk-component-phone-input --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import BpkPhoneInput from 'bpk-component-phone-input';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { dialingCode: '44', phoneNumber: '' }
  }

  onChange = (evt) => {
    this.setState({ phoneNumber: evt.target.value });
  }

  onDialingCodeChange = (evt) => {
    this.setState({ dialingCode: evt.target.value });
  }


  render() {
    return (
      <BpkPhoneInput
        id="phone-input-id"
        name="Telephone input"
        placeholder="Telephone number"
        onChange={this.onChange}
        onDialingCodeChange={this.onDialingCodeChange}
        value={this.state.phoneNumber}
        dialingCode={this.state.dialingCode}
        dialingCodes={[
          { code: '44', description: '+44' },
          { code: '55', description: '+55' },
        ]}
        dialingCodeProps={{
          id: 'dialing-code',
          name: 'Dialing code',
          'aria-label': 'Dialing code',
        }}
      />
    )
  }
}
```

## Props

| Property              | PropType                                              | Required   | Default Value    |
| --------------------- | ----------------------------------------------------- | ---------- | ---------------- |
| dialingCode           | string                                                | true       | -                |
| dialingCodeProps      | shape({ id: string, name: string })                   | true       | -                |
| dialingCodes          | arrayOf(shape({ code: string, description: string })) | true       | -                |
| id                    | string                                                | true       | -                |
| name                  | string                                                | true       | -                |
| onChange              | func                                                  | true       | -                |
| onDialingCodeChange   | func                                                  | true       | -                |
| value                 | string                                                | true       | -                |
| className             | string                                                | false      | null             |
| disabled              | boolean                                               | false      | false            |
| large                 | boolean                                               | false      | false            |
| valid                 | boolean                                               | false      | null             |
| wrapperProps          | object                                                | false      | {}               |

### dialingCodeProps

Note that `id` and `name` are required but more properties can be provided, e.g. `dialingCodeProps={{ id: 'id', name: 'name', className: 'some-class' }}`. All
properties will be forwarded to the underlying `BpkSelect` component.

### dialingCodes

The same is true for `dialingCodes`. Each object **must** have a `code` and `description`, but can have more properties and those
will be forwarded the the `option` element they represent.
