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

You can pass `matchSSR` which will instruct the breakpoint to match any time it is rendered on the server.

```js
<BpkBreakpoint query={BREAKPOINTS.TABLET} matchSSR>
  <span>Tablet viewport is active OR we are rendering on the server-side</span>
</BpkBreakpoint>
<BpkBreakpoint query={BREAKPOINTS.MOBILE}>
  <span>Mobile viewport is active AND we are rendering on the client-side</span>
</BpkBreakpoint>
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/breakpoint/web-5sPWfgsH#section-props-32).
