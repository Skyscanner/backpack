# bpk-component-link

> Backpack link component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkLink, { BpkButtonLink } from '@skyscanner/backpack-web/bpk-component-link';

export default () => (
  <div>
    Links can be both <BpkLink href="http://www.skyscanner.net/">anchor tags</BpkLink> as well
    as <BpkButtonLink onClick={() => console.log('link button click!')}>button tags</BpkButtonLink>.
  </div>
)
```

## Single Page App (SPA) Frameworks

If you're using a SPA framework like `react-router-dom` or `Next.js` to navigate between pages without refreshing, then you can wrap `BpkLink` in the component provided by the framework.

[`react-router-dom` `Link` using the `component` prop](https://reactrouter.com/web/api/Link/component-reactcomponent)

[`Next.js` `Link` using a custom component as the child element](https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag)

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/link/web-tBkgNmHW#section-props-02).
