import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';
import BpkParagraph from './BpkParagraph';

describe('BpkParagraph', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkParagraph>My paragraph</BpkParagraph>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
