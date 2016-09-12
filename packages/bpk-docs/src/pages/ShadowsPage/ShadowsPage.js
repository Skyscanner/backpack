import React from 'react'
import pickBy from 'lodash/pickBy'
import includes from 'lodash/includes'
import TOKENS from 'bpk-tokens/tokens/base.common'
import DocsPageBuilder from './../../components/DocsPageBuilder'

const ShadowsPage = () => <DocsPageBuilder
  title='Shadows'
  blurb='Shadows are used to convey depth and order.'
  components={[]}
  tokenMap={pickBy(TOKENS, (value, key) => includes(key, 'boxShadow'))}
  sassdocId='box-shadows'
/>

export default ShadowsPage

