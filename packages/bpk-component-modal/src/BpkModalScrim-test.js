jest.mock('react-addons-css-transition-group')

import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkModalScrim from './BpkModalScrim'

describe('BpkModalScrim', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkModalScrim />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
