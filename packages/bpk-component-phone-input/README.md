# bpk-component-phone-input

> Backpack phone input component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import BpkPhoneInput from '@skyscanner/backpack-web/bpk-component-phone-input';
import BpkImage from '@skyscanner/backpack-web/bpk-component-image';

const DIALING_CODE_TO_ID_MAP = {
  '44': 'uk',
  '55': 'br',
};

const getFlag = dialingCode => {
  const countryCode = DIALING_CODE_TO_ID_MAP[dialingCode];
  const url = `/resources/${countryCode}.png`;

  return <BpkImage altText="Flag" height={38} width={50} src={url} />;
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { dialingCode: '44', phoneNumber: '' };
  }

  onChange = evt => {
    this.setState({ phoneNumber: evt.target.value });
  };

  onDialingCodeChange = evt => {
    this.setState({ dialingCode: evt.target.value });
  };

  render() {
    return (
      <BpkPhoneInput
        id="phone-input-id"
        name="Telephone input"
        label="Telephone number"
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
          label: 'Dialing code',
          'aria-label': 'Dialing code',
          image: getFlag(this.state.dialingCode),
        }}
      />
    );
  }
}
```

## Props

| Property            | PropType                                              | Required | Default Value |
| ------------------- | ----------------------------------------------------- | -------- | ------------- |
| dialingCode         | string                                                | true     | -             |
| dialingCodeProps    | shape({ id: string, name: string, label: string })    | true     | -             |
| dialingCodes        | arrayOf(shape({ code: string, description: string })) | true     | -             |
| id                  | string                                                | true     | -             |
| name                | string                                                | true     | -             |
| label               | string                                                | true     | -             |
| onChange            | func                                                  | true     | -             |
| onDialingCodeChange | func                                                  | true     | -             |
| value               | string                                                | true     | -             |
| className           | string                                                | false    | null          |
| dialingCodeMask     | boolean                                               | false    | null          |
| disabled            | boolean                                               | false    | false         |
| large               | boolean                                               | false    | false         |
| valid               | boolean                                               | false    | null          |
| wrapperProps        | object                                                | false    | {}            |

### dialingCodeProps

Note that `id`, `name` and `label` are required but more properties can be provided, e.g. `dialingCodeProps={{ id: 'id', name: 'name', label: 'label', className: 'some-class' }}`. All
properties will be forwarded to the underlying `BpkSelect` component.

### dialingCodes

The same is true for `dialingCodes`. Each object **must** have a `code` and `description`, but can have more properties and those
will be forwarded the the `option` element they represent.
Note that, when using the `dialingCodeMask` option, all `dialingCodes` values must have a `numberPrefix` attribute.
