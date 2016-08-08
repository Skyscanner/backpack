import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkIcon from './BpkIcon'

describe('BpkIcon', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkIcon icon='accessibility' />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "alignToButton" attribute', () => {
    const tree = renderer.create(<BpkIcon icon='accessibility' alignToButton />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "large" attribute', () => {
    const tree = renderer.create(<BpkIcon icon='accessibility' large />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "large" and a "alignToButton" attribute', () => {
    const tree = renderer.create(<BpkIcon icon='accessibility' large alignToButton />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
