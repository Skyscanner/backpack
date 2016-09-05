import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkGridColumn from './BpkGridColumn'

describe('BpkGridColumn', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkGridColumn width={6}>Contents</BpkGridColumn>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "width" attribute set to 0', () => {
    const tree = renderer.create(
      <BpkGridColumn width={0}>Contents</BpkGridColumn>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "debug" attribute', () => {
    const tree = renderer.create(
      <BpkGridColumn width={6} debug>Contents</BpkGridColumn>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "mobileWidth" attribute', () => {
    const tree = renderer.create(
      <BpkGridColumn width={6} mobileWidth={6} debug>Contents</BpkGridColumn>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "mobileWidth" attribute set to 0', () => {
    const tree = renderer.create(
      <BpkGridColumn width={0} mobileWidth={0}>Contents</BpkGridColumn>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "tabletWidth" attribute', () => {
    const tree = renderer.create(
      <BpkGridColumn width={6} tabletWidth={6} debug>Contents</BpkGridColumn>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "tabletWidth" attribute set to 0', () => {
    const tree = renderer.create(
      <BpkGridColumn width={0} tabletWidth={0}>Contents</BpkGridColumn>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "offset" attribute', () => {
    const tree = renderer.create(
      <BpkGridColumn width={6} offset={6} debug>Contents</BpkGridColumn>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "offset" attribute set to 0', () => {
    const tree = renderer.create(
      <BpkGridColumn width={0} offset={0}>Contents</BpkGridColumn>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "mobileOffset" attribute', () => {
    const tree = renderer.create(
      <BpkGridColumn width={6} mobileOffset={6} debug>Contents</BpkGridColumn>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "mobileOffset" attribute set to 0', () => {
    const tree = renderer.create(
      <BpkGridColumn width={0} mobileOffset={0}>Contents</BpkGridColumn>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "tabletOffset" attribute', () => {
    const tree = renderer.create(
      <BpkGridColumn width={6} tabletOffset={6} debug>Contents</BpkGridColumn>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "tabletOffset" attribute set to 0', () => {
    const tree = renderer.create(
      <BpkGridColumn width={0} tabletOffset={0}>Contents</BpkGridColumn>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
