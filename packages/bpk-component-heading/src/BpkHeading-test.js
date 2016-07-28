import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkHeading from './BpkHeading'

describe('BpkHeading', () => {
  it('should render correctly with a "level" attribute equal to "h1"', () => {
    const tree = renderer.create(<BpkHeading level='h1'>My heading</BpkHeading>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "level" attribute equal to "h2"', () => {
    const tree = renderer.create(<BpkHeading level='h2'>My heading</BpkHeading>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "level" attribute equal to "h3"', () => {
    const tree = renderer.create(<BpkHeading level='h3'>My heading</BpkHeading>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "level" attribute equal to "h4"', () => {
    const tree = renderer.create(<BpkHeading level='h4'>My heading</BpkHeading>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "level" attribute equal to "h5"', () => {
    const tree = renderer.create(<BpkHeading level='h5'>My heading</BpkHeading>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "level" attribute equal to "h6"', () => {
    const tree = renderer.create(<BpkHeading level='h6'>My heading</BpkHeading>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "id" attribute', () => {
    const tree = renderer.create(<BpkHeading level='h1' id='my-id'>My heading</BpkHeading>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
