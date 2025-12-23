# bpk-component-link

> Backpack link component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### Default anchor link

```tsx
import BpkLink from '@skyscanner/backpack-web/bpk-component-link';

export default () => (
  <BpkLink href="http://www.skyscanner.net/">Visit Skyscanner</BpkLink>
);
```

### Polymorphic `as` prop

BpkLink supports a polymorphic `as` prop that allows rendering as different HTML elements while maintaining consistent link styling.

#### Rendering as a button (for actions without navigation)

```tsx
import BpkLink from '@skyscanner/backpack-web/bpk-component-link';

export default () => (
  <BpkLink as="button" onClick={() => console.log('Action triggered!')}>
    Trigger action
  </BpkLink>
);
```

#### Rendering as a span (non-interactive, for SEO or disabled states)

```tsx
import BpkLink from '@skyscanner/backpack-web/bpk-component-link';

export default () => (
  <p>
    This text has <BpkLink as="span">link styling</BpkLink> but is not interactive.
  </p>
);
```

#### Rendering as a div (block-level non-interactive element)

```tsx
import BpkLink from '@skyscanner/backpack-web/bpk-component-link';

export default () => (
  <BpkLink as="div">Block-level link-styled text</BpkLink>
);
```

### When to use each element

| Element | Use case |
|---------|----------|
| `a` (default) | Navigation to other pages or external URLs |
| `button` | Actions that don't navigate (e.g., opening modals, triggering functions) |
| `span` | Non-interactive inline text with link styling (e.g., SEO, disabled states) |
| `div` | Non-interactive block-level content with link styling |

### Type inference

The component correctly infers prop types based on the chosen element:

```tsx
// ✅ Correct: href is required for anchor
<BpkLink href="/">Navigate</BpkLink>

// ✅ Correct: onClick for button, no href needed
<BpkLink as="button" onClick={handleClick}>Action</BpkLink>

// ❌ TypeScript error: href is not valid for button
<BpkLink as="button" href="/">Action</BpkLink>
```

## Single Page App (SPA) Frameworks

If you're using a SPA framework like `react-router-dom` or `Next.js` to navigate between pages without refreshing, then you can wrap `BpkLink` in the component provided by the framework.

[`react-router-dom` `Link` using the `component` prop](https://reactrouter.com/web/api/Link/component-reactcomponent)

[`Next.js` `Link` using a custom component as the child element](https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag)

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/link/web-tBkgNmHW#section-props-02).

**Note:** When `as` is set to 'button', 'span', or 'div', the component accepts props appropriate to that element type instead of anchor-specific props like `href`, `blank`, and `rel`.
