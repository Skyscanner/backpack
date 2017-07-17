import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('bpk-tether');
jest.mock('bpk-react-utils', () => {
  const original = require.requireActual('bpk-react-utils');

  return {
    ...original,
    Portal: 'Portal',
  };
});

/* eslint-disable import/first */
import BpkTooltipPortal from './BpkTooltipPortal';
/* eslint-enable */

describe('BpkTooltipPortal', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkTooltipPortal
        id="my-tooltip"
        target={<div>target</div>}
      >
        My tooltip content
      </BpkTooltipPortal>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a custom className', () => {
    const tree = renderer.create(
      <BpkTooltipPortal
        id="my-tooltip"
        target={<div>target</div>}
        className="my-custom-class"
      >
        My tooltip content
      </BpkTooltipPortal>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
