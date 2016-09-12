import React from 'react'
import pickBy from 'lodash/pickBy'
import includes from 'lodash/includes'
import TOKENS from 'bpk-tokens/tokens/base.common'
import DocsPageBuilder from './../../components/DocsPageBuilder'

const RadiiPage = () => <DocsPageBuilder
  title='Radii'
  blurb='Radii are used to soften the edges of shapes.'
  components={[]}
  tokenMap={pickBy(TOKENS, (value, key) => includes(key, 'borderRadius'))}
  sassdocId='radii'
/>

export default RadiiPage
