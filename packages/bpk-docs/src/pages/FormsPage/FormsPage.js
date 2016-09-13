import React from 'react'

import BpkLabel from 'bpk-component-label'
import BpkRadio from 'bpk-component-radio'
import BpkSelect from 'bpk-component-select'
import BpkCheckbox from 'bpk-component-checkbox'
import BpkInput, { INPUT_TYPES } from 'bpk-component-input'

import './forms-page.scss'
import DocsPageBuilder from './../../components/DocsPageBuilder'

const components = [
  {
    id: 'inputs',
    title: 'Inputs',
    blurb: `When asking a user to input text, please be sure to use the appropriate type of input. Specifying email or number will ensure the correct keyboard is displayed (on supported devices) and also adds semantic meaning to the input.`,
    examples: [
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Input' htmlFor='input'/>
        <BpkInput
          id='input'
          name='input'
          value='Edinburgh'
          onChange={() => null}
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Input (placeholder)' htmlFor='input_placeholder'/>
        <BpkInput
          id='input_placeholder'
          name='input_placeholder'
          value=''
          onChange={() => null}
          placeholder='Enter a country, city or airport'
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Valid input' htmlFor='input_valid'/>
        <BpkInput
          id='input_valid'
          name='input_valid'
          value='Edinburgh'
          onChange={() => null}
          valid
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Invalid input' htmlFor='input_invalid'/>
        <BpkInput
          id='input_invalid'
          name='input_invalid'
          value='Edinbrvgh'
          onChange={() => null}
          valid={false}
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Disabled input' htmlFor='input_disabled'/>
        <BpkInput
          id='input_disabled'
          name='input_disabled'
          value='Edinburgh'
          onChange={() => null}
          disabled
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Email input' htmlFor='input_email'/>
        <BpkInput
          type={INPUT_TYPES.EMAIL}
          id='input_email'
          name='input_email'
          value='example@example.com'
          onChange={() => null}
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Number input' htmlFor='input_number'/>
        <BpkInput
          type={INPUT_TYPES.NUMBER}
          id='input_number'
          name='input_number'
          value='0'
          onChange={() => null}
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Password input' htmlFor='input_password'/>
        <BpkInput
          type={INPUT_TYPES.PASSWORD}
          id='input_password'
          name='input_password'
          value='letmein'
          onChange={() => null}
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Telephone input' htmlFor='input_telephone'/>
        <BpkInput
          type={INPUT_TYPES.TEL}
          id='input_telephone'
          name='input_telephone'
          value='+441234567890'
          onChange={() => null}
        />
      </form>
    ],
    readme: require('raw!bpk-component-input/readme.md')
  },
  {
    id: 'selects',
    title: 'Selects (aka Dropdowns)',
    examples: [
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Select' htmlFor='select'/>
        <BpkSelect
          id='select'
          name='select'
          value='economy'
          onChange={() => null}
          options={[
            { name: 'Economy', value: 'economy' },
            { name: 'Premium Economy', value: 'premium_economy' },
            { name: 'Business class', value: 'business' },
            { name: 'First class', value: 'first' }
          ]}
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Invalid select' htmlFor='select_invalid'/>
        <BpkSelect
          id='select_invalid'
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
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Disabled select' htmlFor='select_disabled'/>
        <BpkSelect
          id='select_disabled'
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
      </form>
    ],
    readme: require('raw!bpk-component-select/readme.md')
  },
  {
    id: 'checkboxes',
    title: 'Checkboxes',
    blurb: 'Backpack checkboxes override the browser default styles in most modern browsers. In some older browsers such as Firefox and Internet explorer they simply fall back to the browser default.',
    examples: [
      <form className='bpkdocs-forms-page__form'>
        <BpkCheckbox
          name='checkbox'
          label='Direct'
          onChange={() => null}
          checked
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkCheckbox
          name='unchecked_checkbox'
          label='1 stop'
          onChange={() => null}
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkCheckbox
          name='disabled_checkbox'
          label='2+ stops'
          onChange={() => null}
          disabled
        />
      </form>
    ],
    readme: require('raw!bpk-component-checkbox/readme.md')
  },
  {
    id: 'radios',
    title: 'Radio buttons',
    blurb: 'Like checkboxes, Backpack overrides the browser default styles for radio buttons. In some older browsers such as Firefox and Internet explorer they simply fall back to the browser default.',
    examples: [
      <form className='bpkdocs-forms-page__form'>
        <BpkRadio
          name='radio'
          label='Return'
          onChange={() => null}
          checked
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkRadio
          name='unchecked_radio'
          label='One way'
          onChange={() => null}
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkRadio
          name='disabled_radio'
          label='Multi-city'
          onChange={() => null}
          disabled
        />
      </form>
    ],
    readme: require('raw!bpk-component-radio/readme.md')
  },
  {
    id: 'labels',
    title: 'Labels',
    blurb: 'Labels should always be used with form elements to provide context to the user. Relying on placeholders alone is not good practise. These can be seen in the examples above for inputs & selects.',
    examples: [],
    readme: require('raw!bpk-component-label/readme.md')
  }
]

const FormsPage = () => <DocsPageBuilder
  title='Forms'
  blurb='Here you’ll find a range of common inputs, select menus and checkboxes/radio buttons for capturing user input. You’ll also find labels, fieldsets and form components.'
  components={components}
  sassdocId='forms'
/>

export default FormsPage
