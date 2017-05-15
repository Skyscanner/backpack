import React from 'react';
import renderer from 'react-test-renderer';
import BpkRouterLink from './BpkRouterLink';

describe('BpkRouterLink', () => {
  it('should render correctly with a "to" attribute', () => {
    const tree = renderer.create(<BpkRouterLink to="#">Link</BpkRouterLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer.create(
      <BpkRouterLink to="#" className="my-custom-class-1 my-custom-class-2">Link</BpkRouterLink>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with arbitrary attributes', () => {
    const tree = renderer.create(<BpkRouterLink to="#" target="_blank">Link</BpkRouterLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
