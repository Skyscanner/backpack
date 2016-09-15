import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'

import TOKENS from 'bpk-tokens/tokens/base.common'
import BpkInlineLogo from './BpkInlineLogo'

describe('BpkInlineLogo', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkInlineLogo />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "fill" attribute', () => {
    const tree = renderer.create(<BpkInlineLogo fill={TOKENS.colorBlue500} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
