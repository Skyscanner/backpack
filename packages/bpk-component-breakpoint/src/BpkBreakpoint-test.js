import React from 'react';
import renderer from 'react-test-renderer';

import { BREAKPOINTS } from './BpkBreakpoint';

describe('BpkBreakpoint', () => {
  it('should render if the breakpoint is matched', () => {
    jest.resetModules();
    const BpkBreakpoint = require('./BpkBreakpoint').default; // eslint-disable-line global-require
    jest.mock('react-responsive', () => props => props.children(true));

    const tree = renderer.create(
      <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
        {matches => (matches ? <div>matches</div> : <div>does not match</div>)}
      </BpkBreakpoint>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render if the breakpoint is not matched', () => {
    jest.resetModules();
    const BpkBreakpoint = require('./BpkBreakpoint').default; // eslint-disable-line global-require
    jest.mock('react-responsive', () => props => props.children(false));

    const tree = renderer.create(
      <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
        {matches => (matches ? <div>matches</div> : <div>does not match</div>)}
      </BpkBreakpoint>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
