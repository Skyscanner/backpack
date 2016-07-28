import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkLogo from './BpkLogo'

describe('BpkIcon', () => {
  it('should render correctly with a "logo" attribute equal to "cloud"', () => {
    const tree = renderer.create(<BpkLogo logo='cloud' />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "logo" attribute equal to "inline"', () => {
    const tree = renderer.create(<BpkLogo logo='inline' />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "logo" attribute equal to "stacked"', () => {
    const tree = renderer.create(<BpkLogo logo='inline' />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "logo" attribute equal to "tianxun"', () => {
    const tree = renderer.create(<BpkLogo logo='tianxun' />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with a "logo" attribute equal to "tianxun-stacked"', () => {
    const tree = renderer.create(<BpkLogo logo='tianxun-stacked' />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
