import React from 'react';
import renderer from 'react-test-renderer';
import BpkTooltip from './BpkTooltip';

describe('BpkTooltip', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkTooltip
        id="my-popover"
      >
        My tooltip content
      </BpkTooltip>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "padded" attribute equal to false', () => {
    const tree = renderer.create(
      <BpkTooltip
        id="my-tooltip"
        padded={false}
      >
        My tooltip content
      </BpkTooltip>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "className" attribute', () => {
    const tree = renderer.create(
      <BpkTooltip
        id="my-tooltip"
        className="my-custom-class"
      >
        My tooltip content
      </BpkTooltip>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
