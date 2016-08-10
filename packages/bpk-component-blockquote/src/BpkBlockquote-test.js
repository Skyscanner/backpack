import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkBlockquote from './BpkBlockquote'

describe('BpkBlockquote', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkBlockquote>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkBlockquote>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

