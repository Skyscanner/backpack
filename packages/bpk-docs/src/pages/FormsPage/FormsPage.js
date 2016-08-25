import React from 'react'

import BpkRadio from 'bpk-component-radio'
import BpkSelect from 'bpk-component-select'
import BpkCheckbox from 'bpk-component-checkbox'
import BpkInput, { INPUT_TYPES } from 'bpk-component-input'

import ComponentPageBuilder from './../../components/ComponentPageBuilder'

const components = [
  {
    id: 'inputs',
    title: 'Inputs',
    blurb: `When asking a user to input text, please be sure to use the appropriate type of input. Specifying email or 
    number will ensure the correct keyboard is displayed (on supported devices) and also adds semantic meaning to the 
    input.`,
    examples: [
      <BpkInput
        name='input'
        value='Edinburgh'
        onChange={() => null}
      />,
      <BpkInput
        name='input_placeholder'
        value=''
        onChange={() => null}
        placeholder='Enter a country, city or airport'
      />,
      <BpkInput
        name='input_valid'
        value='Edinburgh'
        onChange={() => null}
        valid
      />,
      <BpkInput
        name='input_invalid'
        value='Edinbrvgh'
        onChange={() => null}
        valid={false}
      />,
      <BpkInput
        name='input_disabled'
        value='Edinburgh'
        onChange={() => null}
        disabled
      />,
      <BpkInput
        type={INPUT_TYPES.EMAIL}
        name='input_email'
        value='example@example.com'
        onChange={() => null}
      />,
      <BpkInput
        type={INPUT_TYPES.NUMBER}
        name='input_number'
        value='0'
        onChange={() => null}
      />,
      <BpkInput
        type={INPUT_TYPES.PASSWORD}
        name='input_password'
        value='letmein'
        onChange={() => null}
      />,
      <BpkInput
        type={INPUT_TYPES.TEL}
        name='input_telephone'
        value='+441234567890'
        onChange={() => null}
      />
    ],
    readme: require('raw!bpk-component-input/readme.md')
  },
  {
    id: 'selects',
    title: 'Selects',
    examples: [
      <BpkSelect
        name='select'
        value='economy'
        onChange={() => null}
        options={[
          { name: 'Economy', value: 'economy' },
          { name: 'Premium Economy', value: 'premium_economy' },
          { name: 'Business class', value: 'business' },
          { name: 'First class', value: 'first' }
        ]}
      />,
      <BpkSelect
        name='select_invalid'
        value=''
        onChange={() => null}
        options={[
          { name: 'Please select...', value: '', hidden: true },
          { name: 'Economy', value: 'economy' },
          { name: 'Premium Economy', value: 'premium_economy' },
          { name: 'Business class', value: 'business' },
          { name: 'First class', value: 'first' }
        ]}
        valid={false}
      />,
      <BpkSelect
        name='select_disabled'
        value='economy'
        onChange={() => null}
        options={[
          { name: 'Economy', value: 'economy' },
          { name: 'Premium Economy', value: 'premium_economy' },
          { name: 'Business class', value: 'business' },
          { name: 'First class', value: 'first' }
        ]}
        disabled
      />
    ],
    readme: require('raw!bpk-component-select/readme.md')
  },
  {
    id: 'checkboxes',
    title: 'Checkboxes',
    examples: [
      <BpkCheckbox
        name='checkbox'
        label='Direct'
        onChange={() => null}
        checked
      />,
      <br />,
      <BpkCheckbox
        name='unchecked_checkbox'
        label='1 stop'
        onChange={() => null}
      />,
      <br />,
      <BpkCheckbox
        name='disabled_checkbox'
        label='2+ stops'
        onChange={() => null}
        disabled
      />
    ],
    readme: require('raw!bpk-component-checkbox/readme.md')
  },
  {
    id: 'radios',
    title: 'Radio buttons',
    examples: [
      <BpkRadio
        name='radio'
        label='Return'
        onChange={() => null}
        checked
      />,
      <br />,
      <BpkRadio
        name='unchecked_radio'
        label='One way'
        onChange={() => null}
      />,
      <br />,
      <BpkRadio
        name='disabled_radio'
        label='Multi-city'
        onChange={() => null}
        disabled
      />
    ],
    readme: require('raw!bpk-component-radio/readme.md')
  }
]

const FormsPage = () => <ComponentPageBuilder
  title='Forms'
  blurb='Here you’ll find a range of common inputs, select menus and checkboxes/radio buttons for capturing user input. You’ll also find labels, fieldsets and form components.'
  components={components}
/>

export default FormsPage
