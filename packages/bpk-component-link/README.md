# bpk-component-link

> Backpack link component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### Default anchor link

```tsx
import BpkLink from '@skyscanner/backpack-web/bpk-component-link';

<BpkLink href="http://www.skyscanner.net/">Visit Skyscanner</BpkLink>
```

### Polymorphic `as` prop

BpkLink supports a polymorphic `as` prop that allows rendering as different HTML elements while maintaining consistent link styling. You can use the `LINK_AS` constant for type-safe element selection.

```tsx
import BpkLink, { LINK_AS } from '@skyscanner/backpack-web/bpk-component-link';

// Rendering as a button (for actions without navigation)
<BpkLink as={LINK_AS.button} onClick={() => {}}>
  Trigger action
</BpkLink>

// Rendering as a span (non-interactive, for SEO or disabled states)
<BpkLink as={LINK_AS.span}>Link styling without interaction</BpkLink>

// Rendering as a div (block-level non-interactive element)
<BpkLink as={LINK_AS.div}>Block-level link-styled text</BpkLink>

// Using string literals (alternative)
<BpkLink as="button" onClick={handleClick}>Action</BpkLink>
```

### When to use each element

| Element | Constant | Use case |
|---------|----------|----------|
| `a` (default) | `LINK_AS.a` | Navigation to other pages or external URLs |
| `button` | `LINK_AS.button` | Actions that don't navigate (e.g., opening modals, triggering functions) |
| `span` | `LINK_AS.span` | Non-interactive inline text with link styling (e.g., SEO, disabled states) |
| `div` | `LINK_AS.div` | Non-interactive block-level content with link styling |

**Note:** When `as` is set to `LINK_AS.button`, `LINK_AS.span`, or `LINK_AS.
div`, the component accepts props appropriate to that element type instead
of anchor-specific props like `href`, `blank`, and `rel`.

### Type inference

The component correctly infers prop types based on the chosen element:

```tsx
// ✅ Correct: href is required for anchor
<BpkLink href="/">Navigate</BpkLink>

// ✅ Correct: onClick for button, no href needed
<BpkLink as={LINK_AS.button} onClick={handleClick}>Action</BpkLink>

// ❌ TypeScript error: href is not valid for button
<BpkLink as={LINK_AS.button} href="/">Action</BpkLink>
```

### Styling variants

```tsx
// Alternate style (for dark backgrounds)
<BpkLink href="/" alternate>Light link on dark background</BpkLink>

// Implicit style (no underline until hover)
<BpkLink href="/" implicit>Subtle link</BpkLink>

// Combined
<BpkLink href="/" alternate implicit>Subtle light link</BpkLink>
```

## Accessibility

BpkLink is designed with accessibility in mind:

- **Semantic HTML**: Uses appropriate elements (`<a>` for navigation, `<button>` for actions)
- **Keyboard navigation**: All interactive variants are focusable and operable via keyboard
- **External links**: When using `blank` prop, automatically adds `rel="noopener noreferrer"` for security
- **Color contrast**: Link colors meet WCAG 2.1 AA contrast requirements


## Single Page App (SPA) Frameworks

If you're using a SPA framework like `react-router-dom` or `Next.js` to navigate between pages without refreshing, wrap `BpkLink` in the component provided by the framework.

```tsx
// React Router v6
import { Link } from 'react-router-dom';
import BpkLink from '@skyscanner/backpack-web/bpk-component-link';

<Link to="/flights" component={BpkLink}>
  View flights
</Link>

// Next.js
import Link from 'next/link';
import BpkLink from '@skyscanner/backpack-web/bpk-component-link';

<Link href="/flights" passHref legacyBehavior>
  <BpkLink>View flights</BpkLink>
</Link>
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/link/web-tBkgNmHW#section-props-02).

