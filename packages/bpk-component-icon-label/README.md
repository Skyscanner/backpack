# @skyscanner/backpack-web/bpk-component-icon-label

> Backpack Icon Label component - Display icons with text labels and optional inline links.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

BpkIconLabel is a compound component that displays an icon alongside text content. It supports multiple typography styles and color schemes, with built-in support for inline links and right-to-left (RTL) languages.

### Basic Usage

```tsx
import BpkIconLabel from '@skyscanner/backpack-web/bpk-component-icon-label';
import InformationCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/information-circle';

export default () => (
  <BpkIconLabel.Root>
    <BpkIconLabel.Icon>
      <InformationCircleIcon />
    </BpkIconLabel.Icon>
    <BpkIconLabel.Text>This is an information message</BpkIconLabel.Text>
  </BpkIconLabel.Root>
);
```

### With Inline Link

```tsx
import BpkIconLabel from '@skyscanner/backpack-web/bpk-component-icon-label';
import InformationCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/information-circle';
import BpkLink from '@skyscanner/backpack-web/bpk-component-link';

export default () => (
  <BpkIconLabel.Root>
    <BpkIconLabel.Icon>
      <InformationCircleIcon />
    </BpkIconLabel.Icon>
    <BpkIconLabel.Text>
      Learn more about our{' '}
      <BpkLink href="https://www.skyscanner.net/privacy">privacy policy</BpkLink>
    </BpkIconLabel.Text>
  </BpkIconLabel.Root>
);
```

### Text Only (No Icon)

```tsx
import BpkIconLabel from '@skyscanner/backpack-web/bpk-component-icon-label';

export default () => (
  <BpkIconLabel.Root>
    <BpkIconLabel.Text>This message has no icon</BpkIconLabel.Text>
  </BpkIconLabel.Root>
);
```

### Typography Variants

```tsx
import BpkIconLabel from '@skyscanner/backpack-web/bpk-component-icon-label';
import InformationCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/information-circle';

// Body typography (16px regular) - Default
<BpkIconLabel.Root type="body">
  <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
  <BpkIconLabel.Text>Body text</BpkIconLabel.Text>
</BpkIconLabel.Root>

// Label 1 typography (16px bold) - Emphasized
<BpkIconLabel.Root type="label1">
  <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
  <BpkIconLabel.Text>Label 1 text</BpkIconLabel.Text>
</BpkIconLabel.Root>

// Footnote typography (14px regular) - Secondary
<BpkIconLabel.Root type="footnote">
  <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
  <BpkIconLabel.Text>Footnote text</BpkIconLabel.Text>
</BpkIconLabel.Root>
```

### On Dark Background

```tsx
import BpkIconLabel from '@skyscanner/backpack-web/bpk-component-icon-label';
import InformationCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/information-circle';

<div style={{ backgroundColor: '#161616', padding: '20px' }}>
  <BpkIconLabel.Root onDark>
    <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
    <BpkIconLabel.Text>This message appears on a dark background</BpkIconLabel.Text>
  </BpkIconLabel.Root>
</div>
```

## Props

### BpkIconLabel.Root

The root container that wraps all child components.

| Property    | PropType                               | Required | Default Value |
| ----------- | -------------------------------------- | -------- | ------------- |
| children    | node                                   | true     | -             |
| type        | 'body', 'label1', 'footnote'           | false    | 'body'        |
| onDark      | boolean                                | false    | false         |
| className   | string                                 | false    | null          |

### BpkIconLabel.Icon

The icon wrapper component.

| Property    | PropType                               | Required | Default Value |
| ----------- | -------------------------------------- | -------- | ------------- |
| children    | node                                   | true     | -             |
| asChild     | boolean                                | false    | true          |
| className   | string                                 | false    | null          |

### BpkIconLabel.Text

The text label component that wraps BpkText internally.

| Property    | PropType                               | Required | Default Value |
| ----------- | -------------------------------------- | -------- | ------------- |
| children    | node                                   | true     | -             |
| className   | string                                 | false    | null          |

## Features

- **Compound Component Pattern**: Flexible composition using Root, Icon, and Text subcomponents
- **BpkText Integration**: Leverages existing Backpack text component for consistent typography
- **Multiple Variants**: 3 typography styles × 2 color schemes = 6 total variants
- **Inline Links**: Full support for BpkLink as children within text
- **RTL Support**: Automatic layout flipping for right-to-left languages
- **Accessibility**: WCAG 2.1 Level AA compliant, icons are decorative (aria-hidden)
- **Text Wrapping**: Icon stays aligned to first line when text wraps
- **Themeable**: Supports custom colors via BpkThemeProvider

## Typography Styles

| Type       | Font Size | Font Weight | Use Case           |
| ---------- | --------- | ----------- | ------------------ |
| body       | 16px      | regular     | Default content    |
| label1     | 16px      | bold        | Emphasized content |
| footnote   | 14px      | regular     | Secondary info     |

## Accessibility

- Icons are marked with `aria-hidden="true"` (decorative only)
- Text content is fully accessible to screen readers
- Links within text are keyboard navigable
- Meets WCAG 2.1 Level AA standards

## Theming

BpkIconLabel supports theming via `BpkThemeProvider`. The following theme attributes can be customized:

### Theme Attributes

**BpkIconLabel Theme Attributes:**
- `iconLabelTextColor` - Text and icon color (default style) - icon inherits from text
- `iconLabelOnDarkTextColor` - Text and icon color on dark backgrounds - icon inherits from text

**Note:** Link colors are controlled through BpkLink's own theme attributes (`linkColor`, `linkHoverColor`, `linkActiveColor`, `linkVisitedColor`), not through BpkIconLabel theme attributes.

### Usage Example

```tsx
import BpkIconLabel, { iconLabelThemeAttributes } from '@skyscanner/backpack-web/bpk-component-icon-label';
import BpkLink, { linkThemeAttributes } from '@skyscanner/backpack-web/bpk-component-link';
import BpkThemeProvider from '@skyscanner/backpack-web/bpk-theming';
import InformationCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/information-circle';

// Theme for BpkIconLabel (text and icon colors)
const iconLabelTheme = {
  iconLabelTextColor: '#0770E3', // Blue text and icon
};

// Theme for BpkLink (link colors)
const linkTheme = {
  linkColor: '#FF00FF', // Pink links
  linkHoverColor: '#AA00AA', // Darker pink on hover
};

// Combine both themes
const combinedTheme = {
  ...iconLabelTheme,
  ...linkTheme,
};

export default () => (
  <BpkThemeProvider
    theme={combinedTheme}
    themeAttributes={[...iconLabelThemeAttributes, ...linkThemeAttributes]}
  >
    <BpkIconLabel.Root>
      <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
      <BpkIconLabel.Text>
        Blue text with <BpkLink href="/learn">pink link</BpkLink>
      </BpkIconLabel.Text>
    </BpkIconLabel.Root>
  </BpkThemeProvider>
);
```
