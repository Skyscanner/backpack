# bpk-component-visually-hidden

> Backpack visually hidden component for screen reader-only content.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkVisuallyHidden from '@skyscanner/backpack-web/bpk-component-visually-hidden';

export default () => (
  <>
    <BpkVisuallyHidden>
      This text is hidden visually but announced by screen readers.
    </BpkVisuallyHidden>

    <BpkVisuallyHidden as="div">
      Block-level hidden content for screen readers.
    </BpkVisuallyHidden>

    <BpkVisuallyHidden as="h2">
      Hidden heading for better accessibility structure.
    </BpkVisuallyHidden>
  </>
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/visually-hidden/web).
