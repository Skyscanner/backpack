import React from 'react';
import renderer from 'react-test-renderer';
import BpkRtlToggle from './BpkRtlToggle';

describe('BpkRtlToggle', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkRtlToggle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when toggled', () => {
    const component = renderer.create(<BpkRtlToggle />);
    let tree = component.toJSON();
    tree.props.onClick({ preventDefault: () => null });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
