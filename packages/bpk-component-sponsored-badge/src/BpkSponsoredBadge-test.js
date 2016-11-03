import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkSponsoredBadge from './BpkSponsoredBadge'

describe('BpkSponsoredBadge', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkSponsoredBadge />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "docked-left" attribute', () => {
    const tree = renderer.create(<BpkSponsoredBadge docked='left' />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "docked-right" attribute', () => {
    const tree = renderer.create(<BpkSponsoredBadge docked='right' />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "sponsored text" attribute set to Spanish', () => {
    const tree = renderer.create(<BpkSponsoredBadge sponsoredText='Promociando' />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
