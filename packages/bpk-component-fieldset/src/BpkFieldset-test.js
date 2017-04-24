import React from 'react';
import renderer from 'react-test-renderer';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';

import BpkFieldset from './BpkFieldset';

describe('BpkFieldset', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkFieldset
        id="name_input"
        name="name"
        label="Name"
        control={BpkInput}
        type={INPUT_TYPES.TEXT}
        placeholder="e.g. Joe Bloggs"
        validationMessage="Please enter a name"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
