import React from 'react';
import renderer from 'react-test-renderer';
import BpkSpinner from './BpkSpinner';

describe('BpkSpinner', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkSpinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer.create(<BpkSpinner className="my-custom-class" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "alignToButton" attribute', () => {
    const tree = renderer.create(<BpkSpinner alignToButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
