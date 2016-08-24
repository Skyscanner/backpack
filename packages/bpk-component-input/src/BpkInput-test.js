import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkInput, { INPUT_TYPES } from './BpkInput'

describe('BpkInput', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkInput
        name='test'
        value=''
        onChange={() => null}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with value', () => {
    const tree = renderer.create(
      <BpkInput
        name='test'
        value='My value'
        onChange={() => null}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with placeholder', () => {
    const tree = renderer.create(
      <BpkInput
        name='test'
        value=''
        onChange={() => null}
        placeholder='Enter a country, city or airport'
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with valid attribute set to "true"', () => {
    const tree = renderer.create(
      <BpkInput
        name='test'
        value=''
        onChange={() => null}
        valid
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with valid attribute set to "false"', () => {
    const tree = renderer.create(
      <BpkInput
        name='test'
        value=''
        onChange={() => null}
        valid={false}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with type attribute', () => {
    const tree = renderer.create(
      <BpkInput
        type={INPUT_TYPES.PASSWORD}
        name='test'
        value=''
        onChange={() => null}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

