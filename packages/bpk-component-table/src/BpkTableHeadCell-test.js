jest.unmock('./BpkTableHeadCell.jsx')

import React from 'react'
import { shallow } from 'enzyme'
import BpkTableHeadCell from './BpkTableHeadCell.jsx'

describe('BpkTableHeadCell', () => {
  it('should render the correct element', () => {
    const wrapper = shallow(<BpkTableHeadCell>Heading</BpkTableHeadCell>)
    expect(wrapper.text()).toEqual('Heading')
    expect(wrapper.name()).toEqual('th')
  })

  it('should render the correct class', () => {
    const wrapper = shallow(<BpkTableHeadCell>Heading</BpkTableHeadCell>)
    expect(wrapper.prop('className')).toEqual('bpk-table__cell bpk-table__cell--head')
  })
})
