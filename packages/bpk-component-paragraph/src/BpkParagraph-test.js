jest.unmock('./BpkParagraph')

import React from 'react'
import { shallow } from 'enzyme'
import BpkParagraph from './BpkParagraph'

describe('BpkParagraph', () => {
  it('should render the correct element', () => {
    const wrapper = shallow(<BpkParagraph>My paragraph.</BpkParagraph>)
    expect(wrapper.text()).toEqual('My paragraph.')
    expect(wrapper.name()).toEqual('p')
  })

  it('should render the correct class', () => {
    const wrapper = shallow(<BpkParagraph>My paragraph.</BpkParagraph>)
    expect(wrapper.prop('className')).toEqual('bpk-paragraph')
  })
})
