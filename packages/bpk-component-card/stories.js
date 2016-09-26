import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import BpkCard from './index'

storiesOf('bpk-component-card', module)
  .add('Default', () => (
    <BpkCard href='#' onClick={action('normal clicked')}>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </BpkCard>
  ))
  .add('Without padding', () => (
    <BpkCard href='#' onClick={action('no padding clicked')} padded={false}>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </BpkCard>
  ))
