import React from 'react';
import renderer from 'react-test-renderer';
import BpkButtonLink from './BpkButtonLink';

describe('BpkButtonLink', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkButtonLink onClick={() => null}>Link</BpkButtonLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" atribute', () => {
    const tree = renderer.create(
      <BpkButtonLink onClick={() => null} className="test-class">Link</BpkButtonLink>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "white" attribute', () => {
    const tree = renderer.create(<BpkButtonLink onClick={() => null} white>Link</BpkButtonLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with arbitrary attributes', () => {
    const tree = renderer.create(<BpkButtonLink onClick={() => null} id="test-id">Link</BpkButtonLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
