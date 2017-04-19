import React from 'react';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import { storiesOf } from '@kadira/storybook';

import BpkFieldset from './index';

storiesOf('bpk-component-fieldset', module)
  .add('Example', () => (
    <BpkFieldset
      id="name_input"
      label="Name"
      control={BpkInput}
      controlProps={{
        type: INPUT_TYPES.TEXT,
        name: 'name',
        value: '',
        placeholder: 'e.g. Joe Bloggs',
      }}
      valid={false}
      validationMessage="Please enter a name"
    />
  ));
