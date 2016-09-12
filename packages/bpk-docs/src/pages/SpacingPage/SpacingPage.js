import React from 'react'
import pickBy from 'lodash/pickBy'
import includes from 'lodash/includes'
import TOKENS from 'bpk-tokens/tokens/base.common'

import BpkParagraph from 'bpk-component-paragraph'
import DocsPageBuilder from './../../components/DocsPageBuilder'

const SpacingPage = () => <DocsPageBuilder
  title='Spacing'
  blurb={[
    <BpkParagraph>
      All spacing is measured in ‘rems’. Since these are relative to the value inherited from the browser font-size,
      all other units will scale accordingly should a user change this.
    </BpkParagraph>,
    <BpkParagraph>To ensure elements are distributed evenly, we use .375rem (6px) increments:</BpkParagraph>
  ]}
  components={[]}
  tokenMap={pickBy(TOKENS, (value, key) => includes(key, 'spacing'))}
  sassdocId='spacings'
/>

export default SpacingPage
