import { render } from '@testing-library/react';

import BpkBreakpoint, { BREAKPOINTS } from "./BpkBreakpoint";


describe('BpkBreakpoint', () => {
  it('should not render when breakpoint is not mocked within tests', () => {
    const { asFragment } = render(
      <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
        <div>doesnt match</div>
      </BpkBreakpoint>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
})