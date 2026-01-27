# BpkTextV2

> Backpack text component with icon support (V2).

## Overview

BpkTextV2 is an enhanced version of BpkText that supports prefix and suffix icons using compound components pattern (similar to Ark UI).

## New Features in V2

- **Compound Components API**: `BpkText.LeadingIcon`, `BpkText.TrailingIcon`, and `BpkText.Content`
- **Fixed 0.5rem spacing** between icons and text using design tokens
- **Icon-only mode** with `accessibilityLabel` prop for screen readers
- **Automatic RTL support** via CSS logical properties
- **Color inheritance**: Icons automatically inherit text color

## Usage

### Basic Usage with Icons

```javascript
import BpkText, { TEXT_STYLES, TEXT_COLORS } from '@skyscanner/backpack-web/bpk-component-text/src/BpkTextV2';
import BeachIconSm from '@skyscanner/backpack-web/bpk-component-icon/sm/beach';
import ChevronDownIconSm from '@skyscanner/backpack-web/bpk-component-icon/sm/chevron-down';

export default () => (
  <div>
    {/* Text with leading icon */}
    <BpkText textStyle={TEXT_STYLES.lg}>
      <BpkText.LeadingIcon>
        <BeachIconSm />
      </BpkText.LeadingIcon>
      Airport Rentals
    </BpkText>

    {/* Text with trailing icon */}
    <BpkText textStyle={TEXT_STYLES.base} color={TEXT_COLORS.textSecondary}>
      Pickup: Shuttle bus (MCO)
      <BpkText.TrailingIcon>
        <ChevronDownIconSm />
      </BpkText.TrailingIcon>
    </BpkText>

    {/* Text with both icons */}
    <BpkText>
      <BpkText.LeadingIcon>
        <BeachIconSm />
      </BpkText.LeadingIcon>
      Free cancellation
      <BpkText.TrailingIcon>
        <ChevronDownIconSm />
      </BpkText.TrailingIcon>
    </BpkText>
  </div>
);
```

### Icon-Only Mode

For icon-only text (no text content), provide an `accessibilityLabel` prop for screen readers:

```javascript
import BpkText from '@skyscanner/backpack-web/bpk-component-text/src/BpkTextV2';
import CloseIconSm from '@skyscanner/backpack-web/bpk-component-icon/sm/close-circle';

export default () => (
  <BpkText accessibilityLabel="Close">
    <BpkText.LeadingIcon>
      <CloseIconSm />
    </BpkText.LeadingIcon>
  </BpkText>
);
```

## Props

### BpkText (Main Component)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | Required | Content including text and icon components |
| textStyle | TextStyle | `bodyDefault` | Typography style |
| tagName | Tag | `span` | HTML element to render |
| className | string \| null | `null` | Additional CSS classes |
| color | TextColor \| null | `null` | Text color token |
| accessibilityLabel | string | - | Required for icon-only mode |
| id | string | - | HTML id attribute |

### BpkText.LeadingIcon / BpkText.TrailingIcon

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | Required | Icon component to render |
| className | string \| null | `null` | Additional CSS classes |

### BpkText.Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | Required | Text content |

## Migration from V1

BpkTextV2 is fully backward compatible with the original BpkText. The only addition is the compound components API for icons.

### Before (V1)
```jsx
<BpkText>My text</BpkText>
```

### After (V2 - still works!)
```jsx
<BpkText>My text</BpkText>
```

### New in V2
```jsx
<BpkText>
  <BpkText.LeadingIcon><Icon /></BpkText.LeadingIcon>
  My text
</BpkText>
```

## Technical Details

- Uses React Context API for component communication
- CSS flexbox with `inline-flex` for alignment
- Automatic `role="img"` for icon-only span elements (accessibility)
- RTL support via `margin-inline-start/end` CSS properties
- Zero breaking changes to existing API
