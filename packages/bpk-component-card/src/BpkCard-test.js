import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkCard from './BpkCard'

describe('BpkCard', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkCard href='//www.skyscanner.net'>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "tagName" attribute equal to "article"', () => {
    const tree = renderer.create(
      <BpkCard href='//www.skyscanner.net' tagName='article'>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "padded" attribute equal to "false"', () => {
    const tree = renderer.create(
      <BpkCard href='//www.skyscanner.net' padded={false}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "focused" attribute', () => {
    const tree = renderer.create(
      <BpkCard href='//www.skyscanner.net' focused>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

