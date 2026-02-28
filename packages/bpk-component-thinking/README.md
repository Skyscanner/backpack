# bpk-component-thinking

> Backpack thinking component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkThinking from '@skyscanner/backpack-web/bpk-component-thinking';

export default () => (
  <BpkThinking content="AI is thinking" />
);
```

### On dark backgrounds

```tsx
import BpkThinking, { THINKING_TYPES } from '@skyscanner/backpack-web/bpk-component-thinking';

export default () => (
  <BpkThinking
    type={THINKING_TYPES.onDark}
    content="Finding the best flights for you..."
  />
);
```

## Props

| Property | PropType                         | Required | Default Value |
| -------- | -------------------------------- | -------- | ------------- |
| content  | string                           | true     | -             |
| type     | 'default' \| 'on-dark'           | false    | 'default'     |

## Accessibility

The `BpkThinking` component includes built-in accessibility features:

- **Visible content**: The `content` prop is rendered as visible text, which screen readers pick up naturally
- **Animated dots are decorative**: Marked with `aria-hidden="true"` so they don't interfere with screen readers
- **Respects reduced motion preferences**: Uses simpler animations when users have `prefers-reduced-motion` enabled
- **Semantic content**: Uses proper text elements that work well with assistive technologies

### Best Practices

1. Use meaningful `content` text that gives users context about the operation being performed:
   - ✅ Good: `"Searching for flights"`, `"Analyzing your options"`
   - ❌ Bad: `"Loading"`, `"Please wait"`

2. Consider the duration — if the thinking state might last a while, provide more detailed content to keep users informed

## Features

- **Animated dots**: Two bouncing dots that provide visual feedback
- **Bubble design**: Speech-bubble style container with rounded corners
- **RTL support**: Automatically adjusts bubble corner radius for right-to-left languages
- **Reduced motion support**: Provides alternative animations for users with motion sensitivity
- **Responsive**: Works well across different screen sizes with max-width constraints
- **Accessible**: Built with WCAG 2.1 AA compliance in mind

## Design tokens

The component uses the following Backpack design tokens:

- Spacing: `bpk-spacing-base()`, `bpk-spacing-md()`, `bpk-spacing-xxl()`
- Colors: `$bpk-surface-contrast-day`, `$bpk-text-on-dark-day`
- Border radius: `$bpk-border-radius-lg`, `$bpk-border-radius-xs`, `$bpk-border-radius-pill`
- Typography: Uses `BpkText` with `bodyDefault` style

## Animation

The component includes three types of animations:

1. **Entrance animation**: The component fades in and slides up smoothly
2. **Dot bounce**: The dots bounce up and down in sequence
3. **Bubble bounce**: The bubble has a subtle bounce effect

All animations respect the `prefers-reduced-motion` media query and provide simpler alternatives when needed.
