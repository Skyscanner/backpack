import React from 'react';
import renderer from 'react-test-renderer';
import BpkLabel from './BpkLabel';

describe('BpkLabel', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkLabel>Origin</BpkLabel>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "white" attribute', () => {
    const tree = renderer.create(<BpkLabel white>Origin</BpkLabel>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer.create(<BpkLabel className="test">Origin</BpkLabel>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

