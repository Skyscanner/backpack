# bpk-component-breakpoint

> Backpack breakpoint component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkBreakpoint, { BREAKPOINTS } from '@skyscanner/backpack-web/bpk-component-breakpoint';

export default () => (
  <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
    {isActive => (isActive ? <span>Mobile viewport is active</span> : <span>Mobile viewport is inactive</span>)}
  </BpkBreakpoint>

  <BpkBreakpoint query={BREAKPOINTS.TABLET}>
    <span>Tablet viewport is active</span>
  </BpkBreakpoint>
);
```

### Server Side Render (SSR) Support

You can pass `matchSSR` which will instruct the breakpoint to match any time it is rendered on the server. You can use
this to estimate what breakpoint is likely to match on the client-side.

```js
import { isTablet, isMobilePhone } from 'some-device-detection';

<BpkBreakpoint query={BREAKPOINTS.TABLET} matchSSR={isTablet}>
  <span>Tablet viewport is active OR we are rendering on the server-side</span>
</BpkBreakpoint>
<BpkBreakpoint query={BREAKPOINTS.MOBILE} matchSSR={isMobilePhone}>
  <span>Mobile viewport is active AND we are rendering on the client-side</span>
</BpkBreakpoint>
```

If you match to a different breakpoint when rendering on the server, than what is matched to in the traveller's browser,
then React will print a warning saying there is a mismatch.**This will also cause reflow during client-side hydration, which can lead to a poor user experience—especially for layout components like header.**
Please consider this carefully before using this component in critical UI areas.

### Testing

When writing tests for any components that use BpkBreakpoint, you will have to mock either the `BpkBreakpoint` component
or the underlying `useMediaQuery`. This is because the `window.matchMedia` function that we rely on does not exist in
the jest testing environment.

A mock were you only wanted your mobile BpkBreakpoint to render:
```js
import { useMediaQuery, BREAKPOINTS } from '@skyscanner/backpack-web/bpk-component-breakpoint';

jest.mock('@skyscanner/backpack-web/bpk-component-breakpoint', () => {
  __esModule: true,
  ...jest.requireActual('@skyscanner/backpack-web/bpk-component-breakpoint'),
  useMediaQuery: jest.fn(),
});
describe('tests', () => {
  it('my test', () => {
    (useMediaQuery as jest.Mock).mockImplementation(
      (query: string) => query === BREAKPOINTS.MOBILE,
    );
  })
})
```

A simpler mock were you want all BpkBreakpoints to render:
```js
jest.mock('@skyscanner/backpack-web/bpk-component-breakpoint', () => {
  __esModule: true,
  ...jest.requireActual('@skyscanner/backpack-web/bpk-component-breakpoint'),
  useMediaQuery: () => true,
});
```


## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/breakpoint/web-5sPWfgsH#section-props-32).
