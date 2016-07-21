import React from 'react'
import { storiesOf } from '@kadira/storybook'

import 'bpk-stylesheets/base.scss'
import { BpkList, BpkListItem } from './index'

storiesOf('bpk-component-list', module)
  .add('Unordered', () => (
    <BpkList>
      <BpkListItem>Apples</BpkListItem>
      <BpkListItem>Oranges</BpkListItem>
      <BpkListItem>Pears</BpkListItem>
    </BpkList>
  ))
  .add('Ordered', () => (
    <BpkList ordered>
      <BpkListItem>Apples</BpkListItem>
      <BpkListItem>Oranges</BpkListItem>
      <BpkListItem>Pears</BpkListItem>
    </BpkList>
  ))
  .add('Nested', () => (
    <BpkList>
      <BpkListItem>Apples</BpkListItem>
      <BpkListItem>
        Oranges
        <BpkList ordered>
          <BpkListItem>Tangerines</BpkListItem>
          <BpkListItem>Nectarines</BpkListItem>
          <BpkListItem>Satsuma</BpkListItem>
        </BpkList>
      </BpkListItem>
      <BpkListItem>Pears</BpkListItem>
    </BpkList>
  ))
