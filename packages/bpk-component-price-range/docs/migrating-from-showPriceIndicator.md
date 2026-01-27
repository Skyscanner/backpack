# Migrating from `showPriceIndicator`

## Introduction

The `showPriceIndicator` prop has been deprecated in favour of the more flexible `marker.type` API. This migration guide applies **only if you are explicitly using the `showPriceIndicator` prop** in your code. If you're not using this prop, no changes are needed.

The new API provides clearer semantics and better control over how the price marker and boundary prices are displayed.

## TL;DR

**⚠️ This migration only applies if `showPriceIndicator` appears in your code.**

If you're using `showPriceIndicator`, here's the quick mapping:

| Old API | New API | Notes |
|---------|---------|-------|
| `showPriceIndicator={true}` (or omitted) | Remove the prop entirely | Default behaviour already uses bubble marker |
| `showPriceIndicator={false}` | `marker={{ type: MARKER_DISPLAY_TYPES.DOT, ... }}` | Explicitly set type to `DOT` |
| `showPriceIndicator` with no marker | Remove the prop entirely | It has no effect when marker is absent |

## History and Rationale

The original `showPriceIndicator` prop controlled whether boundary prices (low/high segment prices) were shown below the price range bar. However, this naming was confusing because:

1. It didn't clearly communicate what was being shown/hidden (the boundary prices, not the marker itself)
2. It coupled the marker display with boundary price visibility
3. It didn't allow for different marker display styles (bubble vs dot)

The new `marker.type` API provides:

- **Clearer semantics**: `MARKER_DISPLAY_TYPES.BUBBLE` vs `MARKER_DISPLAY_TYPES.DOT` clearly describes the marker appearance
- **Better flexibility**: The marker type naturally determines boundary price visibility
- **Explicit behaviour**: `BUBBLE` shows boundaries, `DOT` hides them

## Migrating

### Check if migration is needed

First, search your codebase for `showPriceIndicator`:

```bash
# Search for any usage of showPriceIndicator
grep -r "showPriceIndicator" .
```

**If you get no results**, you don't need to migrate anything. The rest of this guide only applies if you find instances of `showPriceIndicator` in your code.

### Use case 1: Removing `showPriceIndicator={true}`

If you're explicitly setting `showPriceIndicator={true}`, simply remove the prop. The default behaviour already shows boundary prices with a bubble marker.

**Before:**
```tsx
<BpkPriceRange
  showPriceIndicator={true}  // Explicitly set to true
  marker={{ price: '£150', percentage: 50 }}
  segments={{
    low: { price: '£100', percentage: 20 },
    high: { price: '£200', percentage: 80 },
  }}
/>
```

**After:**
```tsx
// Simply remove the prop - behaviour is unchanged (type defaults to BUBBLE)
<BpkPriceRange
  marker={{ price: '£150', percentage: 50 }}
  segments={{
    low: { price: '£100', percentage: 20 },
    high: { price: '£200', percentage: 80 },
  }}
/>
```

### Use case 2: Replacing `showPriceIndicator={false}` (compact display)

If you're using `showPriceIndicator={false}` to hide boundary prices and show a compact display, replace it with `marker.type: MARKER_DISPLAY_TYPES.DOT`.

**Before:**
```tsx
<BpkPriceRange
  showPriceIndicator={false}
  marker={{ price: '£150', percentage: 50 }}
  segments={{
    low: { price: '£100', percentage: 20 },
    high: { price: '£200', percentage: 80 },
  }}
/>
```

**After:**
```tsx
import BpkPriceRange, { MARKER_DISPLAY_TYPES } from '@skyscanner/backpack-web/bpk-component-price-range';

<BpkPriceRange
  marker={{
    price: '£150',
    percentage: 50,
    type: MARKER_DISPLAY_TYPES.DOT
  }}
  segments={{
    low: { price: '£100', percentage: 20 },
    high: { price: '£200', percentage: 80 },
  }}
/>
```

### Use case 3: Using `showPriceIndicator` without a marker

If you're using `showPriceIndicator` but not providing a `marker` prop. Simply remove it. The only supported behaviour
without a marker is to show boundary prices.

**Before:**
```tsx
<BpkPriceRange
  showPriceIndicator={false}  // Has no effect without marker
  segments={{
    low: { price: '£100', percentage: 20 },
    high: { price: '£200', percentage: 80 },
  }}
/>
```

**After:**
```tsx
// Remove the prop - boundary prices are always shown when marker is absent
<BpkPriceRange
  segments={{
    low: { price: '£100', percentage: 20 },
    high: { price: '£200', percentage: 80 },
  }}
/>
```

## Migration Checklist

Follow these steps to migrate your codebase:

- [ ] **Search for usage**: Run `grep -r "showPriceIndicator" .` to find all instances
  - If no results found, you're done! No migration needed.
- [ ] **For each instance found:**
  - [ ] If `showPriceIndicator={true}` (or prop is present with true value): Remove the prop entirely
  - [ ] If `showPriceIndicator={false}`: Add `type: MARKER_DISPLAY_TYPES.DOT` to the marker object
  - [ ] If `showPriceIndicator` is used with either `true` or `false`, conditionally use
    `type: MARKER_DISPLAY_TYPES.BUBBLE` (replacing true) or `MARKER_DISPLAY_TYPES.DOT` (replacing false).
  - [ ] If using `showPriceIndicator` without a `marker` prop: Remove the prop (it has no effect)
- [ ] **Import the constant**: Ensure `MARKER_DISPLAY_TYPES` is imported where needed:
  ```tsx
  import BpkPriceRange, { MARKER_DISPLAY_TYPES } from '@skyscanner/backpack-web/bpk-component-price-range';
  ```
- [ ] **Test the component**: Verify that boundary prices show/hide as expected
- [ ] **Check TypeScript warnings**: The deprecated prop should show as strikethrough in your IDE

## Benefits of the New API

The new `marker.type` API provides several advantages:

1. **Clearer intent**: `MARKER_DISPLAY_TYPES.DOT` vs `MARKER_DISPLAY_TYPES.BUBBLE` clearly describes what you're configuring
2. **Better semantics**: The marker type naturally determines the boundary price visibility
3. **Future flexibility**: The marker type system can be extended with new display types in the future
4. **Consistent behaviour**: All marker-related configuration is now in one place (`marker` prop)
5. **Type safety**: TypeScript provides better autocomplete and type checking for the marker configuration

## Questions?

If you encounter any issues during migration or have questions about the new API, please:

1. Check the main [README](../README.md) for complete usage examples
2. Review the [component documentation](https://www.skyscanner.design) on Skyscanner's design system website
3. Raise an issue in the Backpack repository
