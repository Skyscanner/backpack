import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkSpinner from './BpkSpinner'

describe('BpkSpinner', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkSpinner />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "large" attribute', () => {
    const tree = renderer.create(<BpkSpinner large />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "extraLarge" attribute', () => {
    const tree = renderer.create(<BpkSpinner extraLarge />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
