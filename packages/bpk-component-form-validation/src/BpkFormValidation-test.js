import React from 'react';
import renderer from 'react-test-renderer';

import BpkFormValidation from './BpkFormValidation';

describe('BpkFormValidation', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkFormValidation id="my-form-validation" expand>
        A validation message.
      </BpkFormValidation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "expand" equal to false', () => {
    const tree = renderer.create(
      <BpkFormValidation id="my-form-validation" expand={false}>
        A validation message.
      </BpkFormValidation>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
