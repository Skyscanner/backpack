jest.unmock('./BpkTable.jsx')

import React from 'react'
import { shallow } from 'enzyme'
import BpkTable from './BpkTable.jsx'

describe('BpkTable', () => {
  it('should render the correct element', () => {
    const wrapper = shallow(
      <BpkTable>
        <tbody />
      </BpkTable>
    )
    expect(wrapper.name()).toEqual('table')
  })

  it('should render the correct class', () => {
    const wrapper = shallow(
      <BpkTable>
        <tbody />
      </BpkTable>
    )
    expect(wrapper.prop('className')).toEqual('bpk-table')
  })
})
