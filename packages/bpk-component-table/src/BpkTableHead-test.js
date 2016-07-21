jest.unmock('./BpkTableHead.jsx')

import React from 'react'
import { shallow } from 'enzyme'
import BpkTableHead from './BpkTableHead.jsx'

describe('BpkTableHead', () => {
  it('should render the correct element', () => {
    const wrapper = shallow(
      <BpkTableHead>
        <th />
      </BpkTableHead>
    )
    expect(wrapper.name()).toEqual('thead')
  })
})
