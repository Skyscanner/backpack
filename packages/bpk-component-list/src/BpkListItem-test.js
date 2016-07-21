jest.unmock('./BpkListItem.jsx')

import React from 'react'
import { shallow } from 'enzyme'
import BpkListItem from './BpkListItem.jsx'

describe('BpkListItem', () => {
  it('should render the correct element', () => {
    const wrapper = shallow(<BpkListItem>List item</BpkListItem>)
    expect(wrapper.text()).toEqual('List item')
    expect(wrapper.name()).toEqual('li')
  })

  it('should render the correct class', () => {
    const wrapper = shallow(<BpkListItem>List item</BpkListItem>)
    expect(wrapper.prop('className')).toEqual('bpk-list__item')
  })
})

