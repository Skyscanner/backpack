import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';
import BpkCode from './BpkCode';

describe('BpkCode', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkCode>npm install react --save-dev</BpkCode>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

