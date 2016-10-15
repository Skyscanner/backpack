import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';
import BpkGridToggle from './BpkGridToggle';

describe('BpkGridToggle', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkGridToggle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when toggled', () => {
    const component = renderer.create(<BpkGridToggle />);
    let tree = component.toJSON();
    tree.props.onClick({ preventDefault: () => null });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
