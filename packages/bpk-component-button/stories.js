import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import BpkButton from './index'

storiesOf('bpk-component-button', module)
  .add('Primary', () => (
    <div>
      &nbsp;<BpkButton onClick={action('primary clicked')}>Button</BpkButton>
      &nbsp;<BpkButton selected onClick={action('primary selected clicked')}>Selected</BpkButton>
      &nbsp;<BpkButton disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
      &nbsp;<BpkButton large onClick={action('large primary clicked')}>Button</BpkButton>
      &nbsp;<BpkButton large selected onClick={action('large primary selected clicked')}>Selected</BpkButton>
      &nbsp;<BpkButton large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
    </div>
  ))
  .add('Secondary', () => (
    <div>
      &nbsp;<BpkButton secondary onClick={action('secondary clicked')}>Button</BpkButton>
      &nbsp;<BpkButton secondary selected onClick={action('secondary selected clicked')}>Selected</BpkButton>
      &nbsp;<BpkButton secondary disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
      &nbsp;<BpkButton secondary large onClick={action('large secondary clicked')}>Button</BpkButton>
      &nbsp;<BpkButton secondary large selected onClick={action('large secondary selected clicked')}>Selected</BpkButton>
      &nbsp;<BpkButton secondary large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
    </div>
  ))
  .add('Destructive', () => (
    <div>
      &nbsp;<BpkButton destructive onClick={action('destructive clicked')}>Button</BpkButton>
      &nbsp;<BpkButton destructive disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
      &nbsp;<BpkButton destructive large onClick={action('large destructive clicked')}>Button</BpkButton>
      &nbsp;<BpkButton destructive large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
    </div>
  ))
  .add('Link button', () => (
    <div>
      &nbsp;<BpkButton link onClick={action('link button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton link selected onClick={action('link button selected clicked')}>Selected</BpkButton>
      &nbsp;<BpkButton link disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
      &nbsp;<BpkButton link large onClick={action('large link button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton link large selected onClick={action('large link button selected clicked')}>Selected</BpkButton>
      &nbsp;<BpkButton link large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
    </div>
  ))
  .add('Mixture', () => (
    <div>
      &nbsp;<BpkButton onClick={action('primary button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton secondary onClick={action('secondary button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton link onClick={action('link button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton large onClick={action('primary button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton large secondary onClick={action('secondary button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton large link onClick={action('link button clicked')}>Button</BpkButton>
    </div>
  ))
  .add('Anchor tags', () => (
    <div>
      &nbsp;<BpkButton href='#' onClick={action('primary anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href='#' secondary onClick={action('secondary anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href='#' link onClick={action('link anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href='#' large onClick={action('primary anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href='#' large secondary onClick={action('secondary anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href='#' large link onClick={action('link anchor clicked')}>Button</BpkButton>
    </div>
  ))
