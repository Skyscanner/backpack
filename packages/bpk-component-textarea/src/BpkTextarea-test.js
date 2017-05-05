import React from 'react';
import renderer from 'react-test-renderer';

import BpkTextarea from './BpkTextarea';

describe('BpkTextarea', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkTextarea
        id="test"
        name="test"
        value=""
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "className" attribute', () => {
    const tree = renderer.create(
      <BpkTextarea
        id="test"
        name="test"
        value=""
        className="my-custom-class-1 my-custom-class-2"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
