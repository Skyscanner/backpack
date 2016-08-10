import React from 'react'
import { storiesOf } from '@kadira/storybook'

import { BpkCode, BpkCodeBlock } from './index'

storiesOf('bpk-component-code', module)
  .add('Inline', () => (
    <BpkCode>npm install react --save</BpkCode>
  ))
  .add('Block', () => (
    <BpkCodeBlock>npm install react --save</BpkCodeBlock>
  ))
