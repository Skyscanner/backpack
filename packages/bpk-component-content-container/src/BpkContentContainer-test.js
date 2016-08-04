import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkContentContainer from './BpkContentContainer'

describe('BpkContentContainer', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkContentContainer>My paragraph</BpkContentContainer>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
