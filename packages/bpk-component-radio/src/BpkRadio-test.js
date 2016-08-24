import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkRadio from './BpkRadio'

describe('BpkRadio', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkRadio
        name='my-radio-button'
        onChange={() => null}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with checked attribute', () => {
    const tree = renderer.create(
      <BpkRadio
        name='my-radio-button'
        onChange={() => null}
        checked
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with label attribute', () => {
    const tree = renderer.create(
      <BpkRadio
        name='my-radio-button'
        onChange={() => null}
        label='My label'
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with disabled attribute', () => {
    const tree = renderer.create(
      <BpkRadio
        name='my-radio-button'
        onChange={() => null}
        disabled
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with value attribute', () => {
    const tree = renderer.create(
      <BpkRadio
        name='my-radio-button'
        value='my-value'
        onChange={() => null}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

