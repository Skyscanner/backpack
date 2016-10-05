import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkModalCloseButton from './BpkModalCloseButton'

describe('BpkModalCloseButton', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkModalCloseButton label='Close' onClick={() => null} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
