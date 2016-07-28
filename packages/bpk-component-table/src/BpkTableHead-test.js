import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkTableHead from './BpkTableHead'

describe('BpkTableHead', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkTableHead>
        <th />
      </BpkTableHead>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
