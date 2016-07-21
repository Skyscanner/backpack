jest.unmock('./BpkButton')

import React from 'react'
import { shallow } from 'enzyme'
import BpkButton from './BpkButton'

describe('BpkButton', () => {
  it('should render the correct element', () => {
    const wrapper = shallow(<BpkButton>My button</BpkButton>)
    expect(wrapper.text()).toEqual('My button')
    expect(wrapper.name()).toEqual('button')
  })

  it('should render the correct element if an href is provided', () => {
    const wrapper = shallow(<BpkButton href='#'>My button</BpkButton>)
    expect(wrapper.text()).toEqual('My button')
    expect(wrapper.name()).toEqual('a')
    expect(wrapper.prop('href')).toEqual('#')
  })

  it('should render the correct class by default', () => {
    const wrapper = shallow(<BpkButton>My button</BpkButton>)
    expect(wrapper.prop('className')).toEqual('bpk-button')
  })

  it('should render the correct classes for a secondary button', () => {
    const wrapper = shallow(<BpkButton secondary>My button</BpkButton>)
    expect(wrapper.prop('className')).toEqual('bpk-button bpk-button--secondary')
  })

  it('should render the correct classes for a selected button', () => {
    const wrapper = shallow(<BpkButton selected>My button</BpkButton>)
    expect(wrapper.prop('className')).toEqual('bpk-button bpk-button--selected')
  })

  it('should render the correct class and attribute for a disabled button', () => {
    const wrapper = shallow(<BpkButton disabled>My button</BpkButton>)
    expect(wrapper.prop('className')).toEqual('bpk-button')
    expect(wrapper.prop('disabled')).toBe(true)
  })

  it('should render the correct classes for a large button', () => {
    const wrapper = shallow(<BpkButton large>My button</BpkButton>)
    expect(wrapper.prop('className')).toEqual('bpk-button bpk-button--large')
  })

  it('should render the correct classes for a link button', () => {
    const wrapper = shallow(<BpkButton link>My button</BpkButton>)
    expect(wrapper.prop('className')).toEqual('bpk-button bpk-button--link')
  })

  it('should render the correct classes for large secondary button', () => {
    const wrapper = shallow(<BpkButton large secondary>My button</BpkButton>)
    expect(wrapper.prop('className')).toEqual('bpk-button bpk-button--secondary bpk-button--large')
  })
})
