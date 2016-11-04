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
    blurb: 'When asking a user to input text, please be sure to use the appropriate type of input. Specifying email or number will ensure the correct keyboard is displayed (on supported devices) and also adds semantic meaning to the input.',
    examples: [
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Input' htmlFor='input' />
        <BpkInput
          id='input'
          name='input'
          value='Edinburgh'
          onChange={() => null}
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Input (placeholder)' htmlFor='input_placeholder' />
        <BpkInput
          id='input_placeholder'
          name='input_placeholder'
          value=''
          onChange={() => null}
          placeholder='Enter a country, city or airport'
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Valid input' htmlFor='input_valid' />
        <BpkInput
          id='input_valid'
          name='input_valid'
          value='Edinburgh'
          onChange={() => null}
          valid
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Invalid input' htmlFor='input_invalid' />
        <BpkInput
          id='input_invalid'
          name='input_invalid'
          value='Edinbrvgh'
          onChange={() => null}
          valid={false}
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Disabled input' htmlFor='input_disabled' />
        <BpkInput
          id='input_disabled'
          name='input_disabled'
          value='Edinburgh'
          onChange={() => null}
          disabled
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Email input' htmlFor='input_email' />
        <BpkInput
          type={INPUT_TYPES.EMAIL}
          id='input_email'
          name='input_email'
          value='example@example.com'
          onChange={() => null}
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Number input' htmlFor='input_number' />
        <BpkInput
          type={INPUT_TYPES.NUMBER}
          id='input_number'
          name='input_number'
          value='0'
          onChange={() => null}
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Password input' htmlFor='input_password' />
        <BpkInput
          type={INPUT_TYPES.PASSWORD}
          id='input_password'
          name='input_password'
          value='letmein'
          onChange={() => null}
        />
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Telephone input' htmlFor='input_telephone' />
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
    title: 'Selects (aka dropdowns)',
    blurb: 'Backpack selects override the default styles in most modern browsers. In some older browsers they simply fall back to the browser default.',
    examples: [
      <form className='bpkdocs-forms-page__form'>
        <BpkLabel label='Select' htmlFor='select' />
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
        <BpkLabel label='Invalid select' htmlFor='select_invalid' />
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
        <BpkLabel label='Disabled select' htmlFor='select_disabled' />
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
    id: 'docked-inputs-and-selects',
    title: 'Docked inputs & selects',
    blurb: 'Both inputs and selects can be docked together to build a one-line form.',
    examples: [
      <form className='bpkdocs-forms-page__form'>
        <div className='bpkdocs-forms-page__flights-form-row'>
          <BpkLabel label='From' htmlFor='input_origin' />
          <BpkLabel label='To' htmlFor='input_destination' />
          <BpkLabel label='Depart' htmlFor='input_outbound' />
          <BpkLabel label='Return' htmlFor='input_inbound' />
        </div>
        <div className='bpkdocs-forms-page__flights-form-row'>
          <BpkInput
            id='input_origin'
            name='input_origin'
            value='Edinburgh'
            onChange={() => null}
            docked
            large
          />
          <BpkInput
            id='input_destination'
            name='input_destination'
            value=''
            placeholder='Country, city or airport'
            onChange={() => null}
            docked
            large
          />
          <BpkInput
            id='input_outbound'
            name='input_outbound'
            value={new Date().toLocaleDateString()}
            onChange={() => null}
            docked
            large
          />
          <BpkInput
            id='input_inbound'
            name='input_inbound'
            value={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString()}
            onChange={() => null}
            docked
            large
          />
        </div>
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <div className='bpkdocs-forms-page__hotels-form-row'>
          <BpkLabel label='Find hotel deals' htmlFor='input_hotels_destination' />
          <BpkLabel label='Check-in' htmlFor='input_checkin' />
          <BpkLabel label='Check-out' htmlFor='input_checkout' />
          <BpkLabel label='Guests' htmlFor='input_guests' />
          <BpkLabel label='Rooms' htmlFor='input_rooms' />
        </div>
        <div className='bpkdocs-forms-page__hotels-form-row'>
          <BpkInput
            id='input_hotels_destination'
            name='input_hotels_destination'
            value=''
            placeholder='Enter destination or hotel name'
            onChange={() => null}
            docked
            large
          />
          <BpkInput
            id='input_checkin'
            name='input_checkin'
            value={new Date().toLocaleDateString()}
            onChange={() => null}
            docked
            large
          />
          <BpkInput
            id='input_checkout'
            name='input_checkout'
            value={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString()}
            onChange={() => null}
            docked
            large
          />
          <BpkSelect
            id='input_guests'
            name='input_guests'
            value='2'
            onChange={() => null}
            options={[
              { name: '0', value: '0' },
              { name: '1', value: '1' },
              { name: '2', value: '2' },
              { name: '3', value: '3' }
            ]}
            docked
            large
          />
          <BpkSelect
            id='input_rooms'
            name='input_rooms'
            value='1'
            onChange={() => null}
            options={[
              { name: '0', value: '0' },
              { name: '1', value: '1' },
              { name: '2', value: '2' },
              { name: '3', value: '3' }
            ]}
            docked
            large
          />
        </div>
      </form>,
      <form className='bpkdocs-forms-page__form'>
        <div className='bpkdocs-forms-page__car-hire-form-row'>
          <BpkLabel label='Pick-up location' htmlFor='input_pickup_location' />
          <BpkLabel label='Pick-up date' htmlFor='input_pickup_date' />
          <BpkLabel label='Pick-up time' htmlFor='input_pickup_time' />
          <BpkLabel label='Drop-off date' htmlFor='input_dropoff_date' />
          <BpkLabel label='Drop-off time' htmlFor='input_dropoff_time' />
        </div>
        <div className='bpkdocs-forms-page__car-hire-form-row'>
          <BpkInput
            id='input_pickup_location'
            name='input_pickup_location'
            value=''
            placeholder='Enter city or airport'
            onChange={() => null}
            docked
            large
          />
          <BpkInput
            id='input_pickup_date'
            name='input_pickup_date'
            value={new Date().toLocaleDateString()}
            onChange={() => null}
            docked
            large
          />
          <BpkSelect
            id='input_pickup_time'
            name='input_pickup_time'
            value='10:00'
            onChange={() => null}
            options={[
              { name: '10:00', value: '10:00' },
              { name: '10:15', value: '10:15' },
              { name: '10:30', value: '10:30' },
              { name: '10:45', value: '10:45' }
            ]}
            docked
            large
          />
          <BpkInput
            id='input_dropoff_date'
            name='input_dropoff_date'
            value={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString()}
            onChange={() => null}
            docked
            large
          />
          <BpkSelect
            id='input_dropoff_time'
            name='input_dropoff_time'
            value='10:00'
            onChange={() => null}
            options={[
              { name: '10:00', value: '10:00' },
              { name: '10:15', value: '10:15' },
              { name: '10:30', value: '10:30' },
              { name: '10:45', value: '10:45' }
            ]}
            docked
            large
          />
        </div>
      </form>

    ]
  },
  {
    id: 'checkboxes',
    title: 'Checkboxes',
    blurb: 'Similar to selects, checkboxes override the default styles in most modern browsers. In some older browsers they simply fall back to the browser default.',
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
    blurb: 'Again, Backpack overrides the browser default styles for radio buttons. In some older browsers they simply fall back to the browser default.',
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
  blurb='Here you’ll find a range of common inputs for capturing user data.'
  components={components}
  sassdocId='forms'
/>

export default FormsPage
