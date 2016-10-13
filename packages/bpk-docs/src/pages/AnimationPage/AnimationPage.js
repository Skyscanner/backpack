import React from 'react'
import pickBy from 'lodash/pickBy'
import includes from 'lodash/includes'
import TOKENS from 'bpk-tokens/tokens/base.common'
import BpkParagraph from 'bpk-component-paragraph'
import DocsPageBuilder from './../../components/DocsPageBuilder'

const components = [
  {
    id: 'duration',
    title: 'Duration',
    blurb: [
      <BpkParagraph>
        Duration plays a big part in this. The Backpack duration stack follows best practices from industry experts.
        Animation is not intended to slow a
        user down, and you should avoid long animation durations for elements that are vital to a user’s progress.
        Rather, animation should guide and assist the user.
      </BpkParagraph>
    ],
    tokenMap: pickBy(TOKENS, (value, key) => includes(key, 'duration')),
    examples: []
  }
]

const MotionPage = () => <DocsPageBuilder
  title='Animation'
  blurb={[
    <BpkParagraph>
      Animations should reflect the Skyscanner tone-of-voice; we don’t rush users, we present them all the options, at
      an appropritat time and pace.
    </BpkParagraph>
  ]}
  components={components}
  sassdocId='motion'
/>

export default MotionPage
