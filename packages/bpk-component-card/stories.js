import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import BpkCard from './index'

storiesOf('bpk-component-card', module)
  .add('Normal', () => (
    <BpkCard href='#' onClick={action('normal clicked')}>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </BpkCard>
  ))
  .add('Focused', () => (
    <BpkCard href='#' onClick={action('focused clicked')} focused>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </BpkCard>
  ))
  .add('No padding', () => (
    <BpkCard href='#' onClick={action('no padding clicked')} padded={false}>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </BpkCard>
  ))
