# API Design: BpkIconLabel Component

**Package Branch**: `001-bpk-icon-label`
**Created**: 2026-01-28
**Updated**: 2026-01-30 (Implementation Complete)
**Spec**: [spec.md](./spec.md)
**Research**: [research.md](./research.md)

## Component Overview

BpkIconLabel is a compound component that displays an icon alongside text with optional inline links. It uses React Context for parent-child communication. The component supports 9 variants (3 typography types × 3 color schemes) via a `colorScheme` enum prop.

**Implementation Status**: ✅ COMPLETE - All features implemented and tested

---

## TypeScript Types and Interfaces

### Core Types

```typescript
/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { ReactNode, ReactElement, MouseEvent } from 'react';

/**
 * Typography variant for the icon label text.
 */
export type BpkIconLabelType = 'body' | 'label1' | 'footnote';

/**
 * Color scheme variant for the icon label.
 * ✅ IMPLEMENTED: Changed from boolean 'onDark' to enum 'colorScheme' to support night mode
 */
export type BpkIconLabelColorScheme = 'default' | 'on-dark' | 'night';

/**
 * Context value shared between Root and child components.
 */
export interface BpkIconLabelContext {
  type: BpkIconLabelType;
  colorScheme: BpkIconLabelColorScheme;
}
```

### Compound Component Props

```typescript
/**
 * Props for BpkIconLabel.Root component.
 * ✅ IMPLEMENTED
 */
export interface BpkIconLabelRootProps {
  /**
   * Typography variant - controls text size and weight.
   * @default 'body'
   */
  type?: BpkIconLabelType;

  /**
   * Color scheme - 'default' for light backgrounds, 'on-dark' for dark backgrounds, 'night' for night mode.
   * ✅ IMPLEMENTED: Changed from 'style' prop to 'colorScheme' enum
   * @default 'default'
   */
  colorScheme?: BpkIconLabelColorScheme;

  /**
   * Additional CSS class names for the container.
   */
  className?: string;

  /**
   * Child components (Icon and Text subcomponents).
   */
  children: ReactNode;

  /**
   * Inexact rest props for HTML attributes.
   * See decisions/inexact-rest.md
   */
  [rest: string]: any;
}

/**
 * Props for BpkIconLabel.Icon component.
 * ✅ IMPLEMENTED with withAlignment HOC for vertical alignment
 */
export interface BpkIconLabelIconProps {
  /**
   * When true, uses the child element as the icon directly (Ark UI asChild pattern).
   * ✅ IMPLEMENTED: Icon wrapped with withAlignment HOC for vertical centering
   * @default true
   */
  asChild?: boolean;

  /**
   * Icon element to display (e.g., <InformationCircleIcon />).
   * When asChild is true, this is used as the icon directly.
   * Icon color automatically inherits from text color via CSS 'color: inherit'
   */
  children?: ReactElement;

  /**
   * Additional CSS class names for the icon wrapper.
   */
  className?: string;

  /**
   * Inexact rest props for HTML attributes.
   */
  [rest: string]: any;
}

/**
 * Props for BpkIconLabel.Text component.
 * ✅ IMPLEMENTED: Wraps BpkText internally for typography
 */
export interface BpkIconLabelTextProps {
  /**
   * Text content to display. Can include BpkLink as children.
   * ✅ IMPLEMENTED: Supports inline BpkLink components
   * @example
   * <BpkIconLabel.Text>
   *   Information text with <BpkLink href="/learn">inline link</BpkLink>
   * </BpkIconLabel.Text>
   */
  children: ReactNode;

  /**
   * Additional CSS class names for the text wrapper.
   */
  className?: string;

  /**
   * Inexact rest props for HTML attributes.
   */
  [rest: string]: any;
}
```

### Convenience API Props

❌ **NOT IMPLEMENTED**: The convenience API was not implemented. Only the compound component pattern is available.

**Rationale**:
- Compound API provides sufficient flexibility
- Simpler maintenance with single API
- Consumers can use BpkLink directly as children for link support
- No need for simplified wrapper API

---

## Component API

### Compound Component API (Primary)

**BpkIconLabel.Root**

Container component that provides context for child components.

```typescript
<BpkIconLabel.Root
  type="body"          // Typography variant: 'body' | 'label-1' | 'footnote'
  style="default"      // Color scheme: 'default' | 'on-dark'
  className="custom"   // Optional additional CSS classes
>
  {/* Icon and Text subcomponents */}
</BpkIconLabel.Root>
```

**BpkIconLabel.Icon**

Icon display component. Uses the Ark UI `asChild` pattern for flexible icon composition.

```typescript
<BpkIconLabel.Icon
  asChild={true}       // Default: true - uses child directly as icon
  className="custom"   // Optional additional CSS classes
>
  <InformationCircleIcon />
</BpkIconLabel.Icon>
```

**BpkIconLabel.Text**

Text label component. Accepts text content and inline link elements as children.

```typescript
<BpkIconLabel.Text className="custom">
  Information text with <a href="/learn">inline link</a>
</BpkIconLabel.Text>
```

### Convenience API (Simplified)

For common use cases, a simplified single-component API is provided:

```typescript
<BpkIconLabel
  type="body"
  style="default"
  text="Information text"
  icon={<InformationCircleIcon />}
  showIcon={true}
  linkText="Learn more"
  linkHref="/learn-more"
  onLinkClick={(e) => console.log('clicked')}
  className="custom"
/>
```

---

## Usage Examples

### Basic Usage (Compound)

```typescript
import BpkIconLabel from '@skyscanner/backpack-web/bpk-component-icon-label';
import { InformationCircleIcon } from '@skyscanner/backpack-web/bpk-component-icon';

<BpkIconLabel.Root type="body" style="default">
  <BpkIconLabel.Icon>
    <InformationCircleIcon />
  </BpkIconLabel.Icon>
  <BpkIconLabel.Text>
    This is important information about your booking.
  </BpkIconLabel.Text>
</BpkIconLabel.Root>
```

### With Inline Link

```typescript
<BpkIconLabel.Root type="body">
  <BpkIconLabel.Icon>
    <InformationCircleIcon />
  </BpkIconLabel.Icon>
  <BpkIconLabel.Text>
    Check your details. <a href="/help">Need help?</a>
  </BpkIconLabel.Text>
</BpkIconLabel.Root>
```

### On Dark Background

```typescript
<div style={{ backgroundColor: '#161616', padding: '16px' }}>
  <BpkIconLabel.Root type="body" style="on-dark">
    <BpkIconLabel.Icon>
      <InformationCircleIcon />
    </BpkIconLabel.Icon>
    <BpkIconLabel.Text>
      White text on dark background
    </BpkIconLabel.Text>
  </BpkIconLabel.Root>
</div>
```

### Different Typography Variants

```typescript
// Body (16px regular) - default
<BpkIconLabel.Root type="body">
  <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
  <BpkIconLabel.Text>Body text variant</BpkIconLabel.Text>
</BpkIconLabel.Root>

// Label 1 (16px bold)
<BpkIconLabel.Root type="label-1">
  <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
  <BpkIconLabel.Text>Label 1 variant (bold)</BpkIconLabel.Text>
</BpkIconLabel.Root>

// Footnote (14px regular)
<BpkIconLabel.Root type="footnote">
  <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
  <BpkIconLabel.Text>Footnote variant (smaller)</BpkIconLabel.Text>
</BpkIconLabel.Root>
```

### Without Icon

```typescript
<BpkIconLabel.Root>
  <BpkIconLabel.Text>
    Text without icon
  </BpkIconLabel.Text>
</BpkIconLabel.Root>
```

### Convenience API Examples

```typescript
// Simple usage
<BpkIconLabel
  text="Information text"
  icon={<InformationCircleIcon />}
/>

// With link
<BpkIconLabel
  text="Check your booking"
  icon={<InformationCircleIcon />}
  linkText="View details"
  linkHref="/booking"
/>

// On dark background
<BpkIconLabel
  style="on-dark"
  text="Dark background variant"
  icon={<InformationCircleIcon />}
/>

// Without icon
<BpkIconLabel
  text="Text only"
  showIcon={false}
/>
```

---

## Component Composition

### Context Structure

The Root component provides context to Icon and Text subcomponents:

```typescript
import { createContext, useContext } from 'react';

export const IconLabelContext = createContext<BpkIconLabelContext>({
  type: 'body',
  style: 'default',
});

// Root component provides context
export const BpkIconLabelRoot = ({
  type = 'body',
  style = 'default',
  children,
  className,
  ...rest
}: BpkIconLabelRootProps) => {
  return (
    <IconLabelContext.Provider value={{ type, style }}>
      <div
        className={classNames(
          'bpk-icon-label',
          `bpk-icon-label--${style}`,
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    </IconLabelContext.Provider>
  );
};

// Icon component consumes context
export const BpkIconLabelIcon = ({
  asChild = true,
  children,
  className,
  ...rest
}: BpkIconLabelIconProps) => {
  const { style } = useContext(IconLabelContext);

  return (
    <span
      className={classNames(
        'bpk-icon-label__icon',
        `bpk-icon-label__icon--${style}`,
        className,
      )}
      aria-hidden="true"
      {...rest}
    >
      {asChild ? children : <span>{children}</span>}
    </span>
  );
};

// Text component consumes context
export const BpkIconLabelText = ({
  children,
  className,
  ...rest
}: BpkIconLabelTextProps) => {
  const { type, style } = useContext(IconLabelContext);

  return (
    <span
      className={classNames(
        'bpk-icon-label__text',
        `bpk-icon-label__text--${type}`,
        `bpk-icon-label__text--${style}`,
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
};
```

### Main Export Structure

```typescript
// Main component with subcomponents attached
const BpkIconLabel = Object.assign(
  // Convenience API as default export
  BpkIconLabelSimple,
  // Compound component API as properties
  {
    Root: BpkIconLabelRoot,
    Icon: BpkIconLabelIcon,
    Text: BpkIconLabelText,
  }
);

export default BpkIconLabel;

// Also export subcomponents individually
export { BpkIconLabelRoot, BpkIconLabelIcon, BpkIconLabelText };

// Export types
export type {
  BpkIconLabelType,
  BpkIconLabelStyle,
  BpkIconLabelContext,
  BpkIconLabelRootProps,
  BpkIconLabelIconProps,
  BpkIconLabelTextProps,
  BpkIconLabelProps,
};
```

---

## Theming Support

### Theme Attributes

**✅ IMPLEMENTED**: Icon color inherits from text color via CSS `color: inherit`, ensuring visual consistency.

```typescript
// src/themeAttributes.ts - ✅ IMPLEMENTED
export const iconLabelThemeAttributes = [
  'iconLabelTextColor',  // Icon inherits this color
];

export const iconLabelOnDarkThemeAttributes = [
  'iconLabelOnDarkTextColor',  // Icon inherits this color
];

export const iconLabelNightThemeAttributes = [
  'iconLabelNightTextColor',  // Icon inherits this color (night mode added)
];
```

**Total**: 3 theme attributes (1 for each color scheme: default, on-dark, night)

### Theme Usage Example

```typescript
import { BpkThemeProvider } from '@skyscanner/backpack-web/bpk-theming';
import BpkIconLabel, {
  iconLabelThemeAttributes,
} from '@skyscanner/backpack-web/bpk-component-icon-label';

const customTheme = {
  iconLabelBackgroundColor: '#f0f0f0',
  iconLabelTextColor: '#333333',     // Icon automatically uses this color
  iconLabelBorderColor: '#ddd',
};

<BpkThemeProvider theme={customTheme} themeAttributes={iconLabelThemeAttributes}>
  <BpkIconLabel.Root>
    <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
    <BpkIconLabel.Text>Themed icon label</BpkIconLabel.Text>
  </BpkIconLabel.Root>
</BpkThemeProvider>
```

---

## Accessibility Considerations

### ARIA Attributes

- **Icon**: `aria-hidden="true"` (icon is decorative, text provides meaning)
- **Link**: Native `<a>` element provides built-in keyboard accessibility
- **Semantics**: Use semantic HTML (`<a>` for links, `<span>` for text)

### Keyboard Navigation

- **Tab**: Focuses on link (if present)
- **Enter/Space**: Activates link
- **Text**: Not focusable (content only, no interaction)
- **Icon**: Not focusable (`aria-hidden="true"`)

### Screen Reader Support

```typescript
// Good: Screen reader announces "Check your details. Need help? link"
<BpkIconLabel.Root>
  <BpkIconLabel.Icon>
    <InformationCircleIcon />
  </BpkIconLabel.Icon>
  <BpkIconLabel.Text>
    Check your details. <a href="/help">Need help?</a>
  </BpkIconLabel.Text>
</BpkIconLabel.Root>

// Icon is hidden from screen readers (aria-hidden="true")
// Text and link are read naturally
```

### Focus Management

- Link receives focus with visible focus indicator
- No custom focus trapping or management needed
- Native browser behavior preserved

---

## RTL Support

Component automatically flips icon position in RTL languages:

```html
<!-- LTR (default) -->
<div class="bpk-icon-label" dir="ltr">
  [Icon] Text content
</div>

<!-- RTL -->
<div class="bpk-icon-label" dir="rtl">
  Text content [Icon]
</div>
```

Flexbox `flex-direction: row-reverse` handles the flip via CSS.

---

## Edge Cases

### Long Text Wrapping

Text wraps naturally while icon stays aligned to the first line:

```typescript
<BpkIconLabel.Root>
  <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
  <BpkIconLabel.Text>
    This is a very long piece of text that will wrap to multiple lines
    in narrow containers, and the icon should remain aligned to the first line.
  </BpkIconLabel.Text>
</BpkIconLabel.Root>
```

CSS: `align-items: flex-start` on container (not `center`) ensures icon aligns to top.

### No Icon Provided

Component gracefully handles missing icon:

```typescript
<BpkIconLabel.Root>
  <BpkIconLabel.Text>
    Text without icon
  </BpkIconLabel.Text>
</BpkIconLabel.Root>
```

### Link Only (No Text Before)

```typescript
<BpkIconLabel.Root>
  <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
  <BpkIconLabel.Text>
    <a href="/learn">Learn more</a>
  </BpkIconLabel.Text>
</BpkIconLabel.Root>
```

### Empty Text

Component renders empty but maintains structure:

```typescript
<BpkIconLabel.Root>
  <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
  <BpkIconLabel.Text></BpkIconLabel.Text>
</BpkIconLabel.Root>
```

---

## Migration Path

### For Consumers Using Compound API

No migration needed - API is stable from v1.

### For Consumers Using Convenience API

```typescript
// Initial release (v1)
<BpkIconLabel
  text="Information"
  icon={<InformationCircleIcon />}
/>

// If API changes in future (hypothetical v2)
<BpkIconLabelV2
  text="Information"
  icon={<InformationCircleIcon />}
/>
```

---

## Implementation Checklist

- [x] Define TypeScript types in `common-types.ts` (BpkIconLabelType, BpkIconLabelColorScheme)
- [x] Create `IconLabelContext` with type and colorScheme
- [x] Implement `BpkIconLabelRoot` component with colorScheme enum
- [x] Implement `BpkIconLabelIcon` component with withAlignment HOC
- [x] Implement `BpkIconLabelText` component wrapping BpkText
- [x] Attach subcomponents to main export (Root, Icon, Text)
- [x] Export theme attributes from `themeAttributes.ts` (3 theme attributes)
- [x] Add JSDoc comments to all props and components
- [x] Write unit tests for all prop combinations (32 tests passing)
- [x] Write accessibility tests with jest-axe (no violations)
- [x] Create Storybook stories for all variants (10 stories)
- [x] Test RTL layout (implemented with bpk-rtl mixin)
- [x] Test with BpkThemeProvider (ThemedExample stories)
- [x] Add night mode support (colorScheme='night')

**Status**: ✅ All items complete

---

## References

- **Spec**: [spec.md](./spec.md)
- **Research**: [research.md](./research.md)
- **Compound Component Pattern**: Research section 1
- **Theming Pattern**: Research section 2
- **Similar Components**: BpkAccordion, BpkCard, BpkNavigationBar
- **Architecture Decisions**: `decisions/inexact-rest.md`, `decisions/accessibility-tests.md`
