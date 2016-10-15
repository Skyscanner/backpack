import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';
import BpkLabel from './BpkLabel';

describe('BpkLabel', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkLabel label="Origin" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "white" attribute', () => {
    const tree = renderer.create(<BpkLabel label="Origin" white />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer.create(<BpkLabel label="Origin" className="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

