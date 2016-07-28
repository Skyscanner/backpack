import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkLink from './BpkLink'

describe('BpkLink', () => {
  it('should render correctly with a "href" attribute', () => {
    const tree = renderer.create(<BpkLink href='#'>Link</BpkLink>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
