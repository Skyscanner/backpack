import React from 'react';
import renderer from 'react-test-renderer';

import BpkFormValidation from './BpkFormValidation';

describe('BpkFormValidation', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkFormValidation id="my-form-validation" expanded>
        A validation message.
      </BpkFormValidation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "expanded" equal to false', () => {
    const tree = renderer.create(
      <BpkFormValidation id="my-form-validation" expanded={false}>
        A validation message.
      </BpkFormValidation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
