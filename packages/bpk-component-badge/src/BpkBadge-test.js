import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import BpkBadge from './BpkBadge';

describe('BpkBadge', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkBadge>Promociando</BpkBadge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "centered"', () => {
    const tree = renderer.create(<BpkBadge centered>Promociando</BpkBadge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "docked" attribute value equal to "right"', () => {
    const tree = renderer.create(<BpkBadge docked="right">Promociando</BpkBadge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "docked" attribute value equal to "left"', () => {
    const tree = renderer.create(<BpkBadge docked="left">Promociando</BpkBadge>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
