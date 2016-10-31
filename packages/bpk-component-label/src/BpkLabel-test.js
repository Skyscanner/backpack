import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkLabel from './BpkLabel'

describe('BpkLabel', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkLabel label='Origin' htmlFor='origin' />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "white" attribute', () => {
    const tree = renderer.create(<BpkLabel label='Origin' htmlFor='origin' white />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

