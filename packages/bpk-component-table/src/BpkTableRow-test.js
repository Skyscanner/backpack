jest.unmock('./BpkTableRow.jsx')

import React from 'react'
import { shallow } from 'enzyme'
import BpkTableRow from './BpkTableRow.jsx'

describe('BpkTableRow', () => {
  it('should render the correct element', () => {
    const wrapper = shallow(
      <BpkTableRow>
        <td />
      </BpkTableRow>
    )
    expect(wrapper.name()).toEqual('tr')
  })
})
