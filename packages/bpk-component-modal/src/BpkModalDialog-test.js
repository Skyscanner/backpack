jest.mock('react-addons-css-transition-group')

import React from 'react'
import renderer from 'react/lib/ReactTestRenderer'
import BpkModalDialog from './BpkModalDialog'

describe('BpkModalDialog', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkModalDialog
        title='Modal title'
        onClose={() => null}
        getApplicationElement={() => null}
      >
        Modal content
      </BpkModalDialog>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
