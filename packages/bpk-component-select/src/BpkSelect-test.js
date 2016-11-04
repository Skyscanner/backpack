import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkSelect from './BpkSelect'

describe('BpkSelect', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkSelect
        id='fruits'
        name='fruits'
        value='oranges'
        onChange={() => null}
        options={[
          { name: 'Apples', value: 'apples' },
          { name: 'Oranges', value: 'oranges' },
          { name: 'Pears', value: 'pears' },
          { name: 'Tomatos', value: 'tomatos', disabled: true }
        ]}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('should render correctly with a valid attribute equal to false', () => {
    const tree = renderer.create(
      <BpkSelect
        id='fruits'
        name='fruits'
        value='oranges'
        onChange={() => null}
        options={[
          { name: 'Apples', value: 'apples' },
          { name: 'Oranges', value: 'oranges' },
          { name: 'Pears', value: 'pears' },
          { name: 'Tomatos', value: 'tomatos', disabled: true }
        ]}
        valid={false}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with disabled attribute', () => {
    const tree = renderer.create(
      <BpkSelect
        id='fruits'
        name='fruits'
        value=''
        onChange={() => null}
        options={[
          { name: 'Apples', value: 'apples' },
          { name: 'Oranges', value: 'oranges' },
          { name: 'Pears', value: 'pears' },
          { name: 'Tomatos', value: 'tomatos', disabled: true }
        ]}
        disabled
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "large" attribute', () => {
    const tree = renderer.create(
      <BpkSelect
        id='fruits'
        name='fruits'
        value=''
        onChange={() => null}
        options={[
          { name: 'Apples', value: 'apples' },
          { name: 'Oranges', value: 'oranges' },
          { name: 'Pears', value: 'pears' },
          { name: 'Tomatos', value: 'tomatos', disabled: true }
        ]}
        large
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with "docked" attribute', () => {
    const tree = renderer.create(
      <BpkSelect
        id='fruits'
        name='fruits'
        value=''
        onChange={() => null}
        options={[
          { name: 'Apples', value: 'apples' },
          { name: 'Oranges', value: 'oranges' },
          { name: 'Pears', value: 'pears' },
          { name: 'Tomatos', value: 'tomatos', disabled: true }
        ]}
        docked
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

