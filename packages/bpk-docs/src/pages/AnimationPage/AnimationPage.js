import React from 'react'
import pickBy from 'lodash/pickBy'
import includes from 'lodash/includes'
import TOKENS from 'bpk-tokens/tokens/base.common'
import BpkParagraph from 'bpk-component-paragraph'
import DocsPageBuilder from './../../components/DocsPageBuilder'

const components = [
  {
    id: 'durations',
    title: 'Durations',
    tokenMap: pickBy(TOKENS, (value, key) => includes(key, 'duration')),
    examples: []
  }
]

const MotionPage = () => <DocsPageBuilder
  title='Animation'
  blurb={[
    <BpkParagraph>
      Backpack components make use of animations to add delight to the user experience. Care has been taken to make
      sure that they do not obstruct user flow and that they are performant across devices and browsers.
    </BpkParagraph>
  ]}
  components={components}
  sassdocId='animation'
/>

export default MotionPage
