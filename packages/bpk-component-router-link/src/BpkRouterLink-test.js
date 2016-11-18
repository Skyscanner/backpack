import React from 'react';
import renderer from 'react-test-renderer';
import BpkRouterLink from './BpkRouterLink';

describe('BpkRouterLink', () => {
  it('should render correctly with a "to" attribute', () => {
    const tree = renderer.create(<BpkRouterLink to="#">Link</BpkRouterLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "blank" attribute', () => {
    const tree = renderer.create(<BpkRouterLink to="#" blank>Link (new window)</BpkRouterLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
