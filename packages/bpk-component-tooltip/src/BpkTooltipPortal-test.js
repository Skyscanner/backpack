import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('bpk-tether');
jest.mock('bpk-react-utils');

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
});
