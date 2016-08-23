import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkCheckbox from './BpkCheckbox'

describe('BpkCheckbox', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkCheckbox name='my-checkbox' onChange={() => null} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with checked attribute', () => {
    const tree = renderer.create(<BpkCheckbox name='my-checkbox' onChange={() => null} checked />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with label attribute', () => {
    const tree = renderer.create(<BpkCheckbox name='my-checkbox' onChange={() => null} label='My label' />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with disabled attribute', () => {
    const tree = renderer.create(<BpkCheckbox name='my-checkbox' onChange={() => null} disabled />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with value attribute', () => {
    const tree = renderer.create(<BpkCheckbox name='my-checkbox' value='my-value' onChange={() => null} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

