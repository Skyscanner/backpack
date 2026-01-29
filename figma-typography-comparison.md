# BpkCheckboxCard - Typography Comparison

## Figma Design Specifications vs Implementation

### Figma Specifications (Heading 5 Style)

#### Label Text ("Car type")

| State | Color | Font Family | Font Size | Font Weight | Line Height | Letter Spacing | Text Align |
|-------|-------|-------------|-----------|-------------|-------------|----------------|------------|
| **Default** | `#161616` (Text-Primary) | Skyscanner Relative | `1rem` | `700` | `125%` (1.25rem) | `0` | `center` |
| **Hover** | `#161616` (Text-Primary) | Skyscanner Relative | `1rem` | `700` | `125%` (1.25rem) | `0` | `center` |
| **Selected** | `#FFF` (Text-On-Dark) | Skyscanner Relative | `1rem` | `700` | `125%` (1.25rem) | `0` | `center` |

#### Price Text ("from £74")

Same as Label text - follows Heading 5 style.

---

## Issues Found

### ❌ Before Fix:

1. **Line Height Mismatch**
   - **Figma**: `125%` = `1.25rem`
   - **Implementation**: `1.5rem` (from `$bpk-line-height-base`)
   - **Impact**: Text appears more spaced out vertically than in design

2. **Text Alignment Missing**
   - **Figma**: `text-align: center`
   - **Implementation**: `text-align: left` (default)
   - **Impact**: Text not centered in card

3. **Using Generic Mixin**
   - Used `bpk-label-1()` mixin which applies `$bpk-line-height-base` (1.5rem)
   - This doesn't match Figma's Heading 5 style which uses 125% line-height

---

## ✅ After Fix:

### Updated SCSS for Label:

```scss
&__label {
  font-size: tokens.$bpk-font-size-base; // 1rem ✅
  line-height: 1.25; // 125% per Figma (Heading 5) ✅
  font-weight: tokens.$bpk-font-weight-bold; // 700 ✅
  letter-spacing: 0; ✅
  text-align: center; ✅
  color: tokens.$bpk-text-primary-day; ✅
  // ... other properties
}
```

### Updated SCSS for Price:

```scss
&__price {
  flex-shrink: 0;
  font-size: tokens.$bpk-font-size-base; // 1rem ✅
  line-height: 1.25; // 125% per Figma (Heading 5) ✅
  font-weight: tokens.$bpk-font-weight-bold; // 700 ✅
  letter-spacing: 0; ✅
  text-align: center; ✅
  color: tokens.$bpk-text-primary-day; ✅
}
```

---

## Summary

| Property | Figma | Before | After | Status |
|----------|-------|--------|-------|--------|
| **Font Size** | 1rem | 1rem | 1rem | ✅ Always matched |
| **Font Weight** | 700 | 700 | 700 | ✅ Always matched |
| **Line Height** | 1.25 (125%) | 1.5rem | 1.25 | ✅ Now matches |
| **Letter Spacing** | 0 | 0 | 0 | ✅ Always matched |
| **Text Align** | center | left | center | ✅ Now matches |
| **Color (Default)** | #161616 | #161616 | #161616 | ✅ Always matched |
| **Color (Selected)** | #FFF | #FFF | #FFF | ✅ Always matched |

---

## Why This Happened

The `bpk-label-1()` mixin uses `$bpk-line-height-base` (1.5rem), which is the standard body text line-height. However, Figma's Heading 5 style uses a tighter line-height of 125% (1.25rem) for heading text.

This is a common pattern where headings need tighter line-height than body text for better visual hierarchy.

---

## Verification Steps

1. Restart Storybook to see updated styles
2. Check that "Car type" and "from £74" text is now:
   - Centered horizontally in the card
   - Has tighter vertical spacing (line-height)
3. Verify across all three states: Default, Hover, Selected
4. Verify across all three variants: On Canvas Default, On Canvas Contrast, On Surface Contrast
