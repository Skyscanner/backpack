import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'

import TOKENS from 'bpk-tokens/tokens/base.common'
import BpkExtraLargeSpinner from './BpkExtraLargeSpinner'

describe('BpkExtraLargeSpinner', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkExtraLargeSpinner />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "fill" attribute', () => {
    const tree = renderer.create(<BpkExtraLargeSpinner fill={TOKENS.colorBlue500} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
