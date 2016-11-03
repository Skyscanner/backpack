import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BpkSponsoredBadge from './index'

storiesOf('bpk-sponsored-badge', module)
  .add('Normal', () => (
    <div>
      &nbsp;<BpkSponsoredBadge />
      &nbsp;<BpkSponsoredBadge sponsoredText='Promocionado' />
    </div>
  )).add('Docked left', () => (
    <div>
      &nbsp;<BpkSponsoredBadge docked='left' />
      &nbsp;<BpkSponsoredBadge sponsoredText='Promocionado' docked='left' />
    </div>
)).add('Docked right', () => (
  <div>
    &nbsp;<BpkSponsoredBadge docked='right' />
    &nbsp;<BpkSponsoredBadge sponsoredText='Promocionado' docked='right' />
  </div>
))
