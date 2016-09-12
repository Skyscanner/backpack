import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkAutosuggest from './BpkAutosuggest'

describe('BpkAutosuggest', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkAutosuggest
      suggestions={['Edinburgh', 'Glasgow', 'London']}
      value={'Edinburgh'}
      id={'snapshot'}
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
