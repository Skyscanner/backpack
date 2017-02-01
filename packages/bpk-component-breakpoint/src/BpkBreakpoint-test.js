import React from 'react';
import renderer from 'react-test-renderer';

import BpkBreakpoint, { BREAKPOINTS } from './BpkBreakpoint';

describe('BpkBreakpoint', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
        {() => <div>child</div>}
      </BpkBreakpoint>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

