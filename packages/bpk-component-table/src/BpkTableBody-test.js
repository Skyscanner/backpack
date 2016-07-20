jest.unmock('./BpkTableBody.jsx')

import React from 'react'
import { shallow } from 'enzyme'
import BpkTableBody from './BpkTableBody.jsx'

describe('BpkTableBody', () => {
  it('should render the correct element', () => {
    const wrapper = shallow(
      <BpkTableBody>
        <tr />
      </BpkTableBody>
    )
    expect(wrapper.name()).toEqual('tbody')
  })
})
