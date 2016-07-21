jest.unmock('./BpkHeading')

import React from 'react'
import { shallow } from 'enzyme'
import BpkHeading from './BpkHeading'

describe('BpkHeading', () => {
  it('should render the correct element', () => {
    const wrapper = shallow(<BpkHeading level='h1'>My heading</BpkHeading>)
    expect(wrapper.text()).toEqual('My heading')
    expect(wrapper.name()).toEqual('h1')
  })

  it('should render the correct class for an h1 header', () => {
    const wrapper = shallow(<BpkHeading level='h1'>My heading</BpkHeading>)
    expect(wrapper.prop('className')).toEqual('bpk-heading-h1')
  })

  it('should render the correct class for an h2 header', () => {
    const wrapper = shallow(<BpkHeading level='h2'>My heading</BpkHeading>)
    expect(wrapper.prop('className')).toEqual('bpk-heading-h2')
  })

  it('should render the correct class for an h3 header', () => {
    const wrapper = shallow(<BpkHeading level='h3'>My heading</BpkHeading>)
    expect(wrapper.prop('className')).toEqual('bpk-heading-h3')
  })

  it('should render the correct class for an h4 header', () => {
    const wrapper = shallow(<BpkHeading level='h4'>My heading</BpkHeading>)
    expect(wrapper.prop('className')).toEqual('bpk-heading-h4')
  })

  it('should render the correct class for an h5 header', () => {
    const wrapper = shallow(<BpkHeading level='h5'>My heading</BpkHeading>)
    expect(wrapper.prop('className')).toEqual('bpk-heading-h5')
  })

  it('should render the correct class for an h6 header', () => {
    const wrapper = shallow(<BpkHeading level='h6'>My heading</BpkHeading>)
    expect(wrapper.prop('className')).toEqual('bpk-heading-h6')
  })

  it('should render no "id" attribute by default', () => {
    const wrapper = shallow(<BpkHeading level='h1'>My heading</BpkHeading>)
    expect(wrapper.prop('id')).toBeNull()
  })

  it('should render given "id" attribute', () => {
    const wrapper = shallow(<BpkHeading level='h1' id='my-id'>My heading</BpkHeading>)
    expect(wrapper.prop('id')).toEqual('my-id')
  })
})
