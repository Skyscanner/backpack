jest.mock('react-dom')

import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkModal from './BpkModal'

describe('BpkModal', () => {
  xit('should render correctly', () => {
    const tree = renderer.create(
      <BpkModal />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
