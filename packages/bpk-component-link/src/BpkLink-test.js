import React from 'react';
import renderer from 'react-test-renderer';
import BpkLink from './BpkLink';

describe('BpkLink', () => {
  it('should render correctly with a "href" attribute', () => {
    const tree = renderer.create(<BpkLink href="#">Link</BpkLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer.create(<BpkLink href="#" className="test-class">Link</BpkLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "blank" attribute', () => {
    const tree = renderer.create(<BpkLink href="#" blank>Link (new window)</BpkLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "white" attribute', () => {
    const tree = renderer.create(<BpkLink href="#" white>Link</BpkLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with arbitrary attributes', () => {
    const tree = renderer.create(<BpkLink href="#" id="test-id">Link</BpkLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
