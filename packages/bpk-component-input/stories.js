import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import BpkInput, { INPUT_TYPES } from './index'

storiesOf('bpk-component-input', module)
  .add('Text value', () => (
    <BpkInput
      name='origin'
      value='Edinburgh'
      onChange={action('input changed')}
      placeholder='Enter a country, city or airport'
    />
  ))
  .add('Placeholder', () => (
    <BpkInput
      name='origin'
      value=''
      onChange={action('input changed')}
      placeholder='Enter a country, city or airport'
    />
  ))
  .add('Valid', () => (
    <BpkInput
      name='origin'
      value='Edinburgh'
      onChange={action('input changed')}
      placeholder='Enter a country, city or airport'
      valid
    />
  ))
  .add('Invalid', () => (
    <BpkInput
      name='origin'
      value='Edinbrvgh'
      onChange={action('input changed')}
      placeholder='Enter a country, city or airport'
      valid={false}
    />
  ))
  .add('Disabled', () => (
    <BpkInput
      name='disabled'
      value='Edinburgh'
      onChange={action('input changed')}
      placeholder='Enter a country, city or airport'
      disabled
    />
  ))
  .add('Email', () => (
    <BpkInput
      type={INPUT_TYPES.EMAIL}
      name='email'
      value=''
      onChange={action('input changed')}
      placeholder='example@example.com'
    />
  ))
  .add('Number', () => (
    <BpkInput
      type={INPUT_TYPES.NUMBER}
      name='number'
      value='0'
      onChange={action('input changed')}
    />
  ))
  .add('Password', () => (
    <BpkInput
      type={INPUT_TYPES.PASSWORD}
      name='password'
      value='letmein'
      onChange={action('input changed')}
    />
  ))
  .add('Telephone', () => (
    <BpkInput
      type={INPUT_TYPES.TEL}
      name='telephone'
      value='+441234567890'
      onChange={action('input changed')}
      placeholder='Enter your telephone number'
    />
  ))
