import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkButtonLink from './BpkButtonLink'

describe('BpkButtonLink', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkButtonLink onClick={() => null}>Link</BpkButtonLink>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "white" attribute', () => {
    const tree = renderer.create(<BpkButtonLink onClick={() => null} white>Link</BpkButtonLink>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
