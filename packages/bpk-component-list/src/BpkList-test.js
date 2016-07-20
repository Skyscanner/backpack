jest.unmock('./BpkList.jsx')

import React from 'react'
import { shallow } from 'enzyme'
import BpkList from './BpkList.jsx'

describe('BpkList', () => {
  it('should render the correct element', () => {
    const wrapper = shallow(
      <BpkList>
        <li>list item</li>
      </BpkList>
    )
    expect(wrapper.name()).toEqual('ul')
  })

  it('should render the correct class', () => {
    const wrapper = shallow(
      <BpkList>
        <li>list item</li>
      </BpkList>
    )
    expect(wrapper.prop('className')).toEqual('bpk-list')
  })

  it('should render the correct element for an ordered list', () => {
    const wrapper = shallow(
      <BpkList ordered>
        <li>list item</li>
      </BpkList>
    )
    expect(wrapper.name()).toEqual('ol')
  })

  it('should render the correct class for an ordered list', () => {
    const wrapper = shallow(
      <BpkList ordered>
        <li>list item</li>
      </BpkList>
    )
    expect(wrapper.prop('className')).toEqual('bpk-list')
  })
})
