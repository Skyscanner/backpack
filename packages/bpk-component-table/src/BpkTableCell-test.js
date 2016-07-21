jest.unmock('./BpkTableCell.jsx')

import React from 'react'
import { shallow } from 'enzyme'
import BpkTableCell from './BpkTableCell.jsx'

describe('BpkTableCell', () => {
  it('should render the correct element', () => {
    const wrapper = shallow(<BpkTableCell>Tabular data</BpkTableCell>)
    expect(wrapper.text()).toEqual('Tabular data')
    expect(wrapper.name()).toEqual('td')
  })

  it('should render the correct class', () => {
    const wrapper = shallow(<BpkTableCell>Tabular data</BpkTableCell>)
    expect(wrapper.prop('className')).toEqual('bpk-table__cell')
  })
})
