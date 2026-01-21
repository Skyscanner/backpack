# Storybook Examples Plan: BpkCheckbox Composable API

**Date**: 2026-01-21
**Location**: `examples/bpk-component-checkbox/`
**Phase**: 1 - Design & Planning

## Overview

This document outlines NEW examples to be added to the existing Storybook files for BpkCheckbox. These examples demonstrate the new composable API while preserving all existing examples for backward compatibility.

---

## Current Examples (DO NOT MODIFY)

**File**: `examples/bpk-component-checkbox/examples.tsx`

Existing examples that MUST be preserved:
1. `DefaultExample` - Basic checked/unchecked states
2. `IndeterminateExample` - Indeterminate state for "select all"
3. `InvalidExample` - Invalid/error state
4. `MultilineExample` - Long label text wrapping
5. `RequiredExample` - Required field with asterisk
6. `SmallLabelExample` - Small label variant
7. `SmallLabelRequiredExample` - Small label + required
8. `SmallLabelInvalidExample` - Small label + invalid
9. `WhiteExample` - White variant for dark backgrounds
10. `DisabledExample` - Disabled state
11. `MixedExample` - Visual test combining all variants

**File**: `examples/bpk-component-checkbox/stories.tsx`

Existing story exports that MUST be preserved:
- `Default`, `Indeterminate`, `Invalid`, `Multiline`, `White`, `Disabled`, `Required`, `SmallLabel`
- `VisualTest`, `VisualTestWithZoom`

---

## New Examples to ADD (Composable API)

### 1. ComposableBasicExample
**Purpose**: Demonstrate basic composable API usage
**Why**: Shows developers how to use sub-components

```tsx
const ComposableBasicExample = () => {
  const [checked, setChecked] = useState(false);

  return (
    <BpkCheckbox
      name="composable-basic"
      checked={checked}
      onCheckedChange={({ checked }) => setChecked(checked)}
    >
      <BpkCheckbox.Control>
        <BpkCheckbox.Indicator />
      </BpkCheckbox.Control>
      <BpkCheckbox.Label>Subscribe to newsletter</BpkCheckbox.Label>
      <BpkCheckbox.HiddenInput />
    </BpkCheckbox>
  );
};
```

### 2. ComposableWithDescriptionExample
**Purpose**: Show how to add helper text below label
**Why**: Common pattern for providing additional context

```tsx
const ComposableWithDescriptionExample = () => {
  const [checked, setChecked] = useState(false);

  return (
    <BpkCheckbox
      name="composable-description"
      checked={checked}
      onCheckedChange={({ checked }) => setChecked(checked)}
    >
      <BpkCheckbox.Control>
        <BpkCheckbox.Indicator />
      </BpkCheckbox.Control>
      <div>
        <BpkCheckbox.Label>Receive marketing emails</BpkCheckbox.Label>
        <div style={{ fontSize: '0.875rem', color: '#68697F', marginTop: '0.25rem' }}>
          We'll send you updates about special offers and new features.
        </div>
      </div>
      <BpkCheckbox.HiddenInput />
    </BpkCheckbox>
  );
};
```

### 3. ComposableCustomLayoutExample
**Purpose**: Demonstrate custom layout flexibility
**Why**: Shows composable API enables non-standard layouts

```tsx
const ComposableCustomLayoutExample = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { id: 'basic', label: 'Basic Plan', price: '$9.99/mo' },
    { id: 'pro', label: 'Pro Plan', price: '$19.99/mo' },
  ];

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {options.map((option) => (
        <BpkCheckbox
          key={option.id}
          name={option.id}
          checked={selected === option.id}
          onCheckedChange={({ checked }) => setSelected(checked ? option.id : null)}
        >
          <div
            style={{
              border: '2px solid',
              borderColor: selected === option.id ? '#0062E3' : '#DDDDE5',
              borderRadius: '0.5rem',
              padding: '1rem',
              width: '150px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <BpkCheckbox.Control>
                <BpkCheckbox.Indicator />
              </BpkCheckbox.Control>
              <BpkCheckbox.Label style={{ fontWeight: 'bold' }}>{option.label}</BpkCheckbox.Label>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{option.price}</div>
          </div>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox>
      ))}
    </div>
  );
};
```

### 4. ThemedComposableExample
**Purpose**: Show theming works with composable API
**Why**: Important to demonstrate theming integration

```tsx
const ThemedComposableExample = () => {
  const [checked, setChecked] = useState(false);

  const theme = {
    checkboxCheckedColor: '#E70866',
  };

  return (
    <BpkThemeProvider theme={theme} themeAttributes={themeAttributes}>
      <BpkCheckbox
        name="themed-composable"
        checked={checked}
        onCheckedChange={({ checked }) => setChecked(checked)}
      >
        <BpkCheckbox.Control>
          <BpkCheckbox.Indicator />
        </BpkCheckbox.Control>
        <div>
          <BpkCheckbox.Label>Premium subscription</BpkCheckbox.Label>
          <div style={{ fontSize: '0.875rem', color: '#68697F', marginTop: '0.25rem' }}>
            Unlock all features with themed styling
          </div>
        </div>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox>
    </BpkThemeProvider>
  );
};
```

---

## Implementation Instructions

### Step 1: Add Import Statements

Add to top of `examples/bpk-component-checkbox/examples.tsx`:

```tsx
import { useState } from 'react';
import BpkThemeProvider from '../../packages/bpk-theming';
import { themeAttributes } from '../../packages/bpk-component-checkbox';
```

### Step 2: Add New Example Functions

Add the 4 new example functions to `examples/bpk-component-checkbox/examples.tsx` AFTER the existing examples (before the final export).

### Step 3: Export New Examples

Add to the existing export list at the bottom of `examples.tsx`:

```tsx
export {
  // Existing exports (DO NOT REMOVE)
  DefaultExample,
  IndeterminateExample,
  InvalidExample,
  MultilineExample,
  WhiteExample,
  DisabledExample,
  RequiredExample,
  SmallLabelExample,
  SmallLabelRequiredExample,
  SmallLabelInvalidExample,
  MixedExample,

  // NEW: Composable API examples
  ComposableBasicExample,
  ComposableWithDescriptionExample,
  ComposableCustomLayoutExample,
  ThemedComposableExample,
};
```

### Step 4: Add Story Exports

Add to `examples/bpk-component-checkbox/stories.tsx` AFTER the existing exports:

```tsx
// NEW: Composable API examples
export const ComposableBasic = ComposableBasicExample;
export const ComposableWithDescription = ComposableWithDescriptionExample;
export const ComposableCustomLayout = ComposableCustomLayoutExample;
export const ThemedComposable = ThemedComposableExample;
```

---

## Example Naming Convention

**Pattern**: `Composable[Feature]Example`

This makes it clear these are:
1. NEW examples (not modifying existing)
2. Demonstrating the COMPOSABLE API
3. Showing specific FEATURES

**Story Export Pattern**: `Composable[Feature]`

Shorter names for Storybook UI, but still clear they're composable examples.

---

## Testing the Examples

After adding the examples, verify:
1. **Storybook runs**: `npm run storybook` - no errors
2. **All old examples work**: Check existing stories still render correctly
3. **New examples render**: Navigate to new composable stories in Storybook
4. **Visual consistency**: New examples match existing checkbox styling
5. **Theming works**: ThemedComposableExample shows custom color when checked

---

## Why These Examples?

### ComposableBasicExample
- **Need**: Developers need a simple starting point for composable API
- **Unique**: Not duplicating any existing example - shows sub-component structure

### ComposableWithDescriptionExample
- **Need**: Common UX pattern to add helper text
- **Unique**: Existing MultilineExample only shows long labels, not additional description text

### ComposableCustomLayoutExample
- **Need**: Demonstrates the power of composable API (card-based selection)
- **Unique**: No existing example shows non-standard layouts or card patterns

### ThemedComposableExample
- **Need**: Proves theming works with new composable API
- **Unique**: No existing theming examples (backward compatibility doesn't have theming in Storybook)

---

## Files Modified

1. `examples/bpk-component-checkbox/examples.tsx` - Add 4 new example components
2. `examples/bpk-component-checkbox/stories.tsx` - Add 4 new story exports

**Total New Examples**: 4
**Modified Files**: 2
**Preserved Examples**: 11 (all existing examples remain unchanged)

---

## Next Steps

During implementation (`/speckit.tasks`):
1. Create task to add these examples to Storybook files
2. Test examples in Storybook
3. Take screenshots for documentation
4. Update README.md with composable API examples
5. Verify Percy visual tests pass
