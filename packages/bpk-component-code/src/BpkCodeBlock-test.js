import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkCodeBlock from './BpkCodeBlock'

describe('BpkCodeBlock', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkCodeBlock>npm install react --save-dev</BpkCodeBlock>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

