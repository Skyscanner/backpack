# Figma Design Alignment Fixes

**Date**: 2026-01-28
**Status**: Completed
**Context**: Post-implementation Figma design verification and alignment

## Summary

After initial implementation completion, a detailed comparison with Figma design specifications revealed several typography and styling mismatches. All issues have been identified and fixed to ensure 100% alignment with Figma design.

---

## Issues Discovered and Fixed

### 1. ✅ Typography Line-Height Mismatch

**Issue**: Label and Price text used incorrect line-height
- **Figma Spec**: `line-height: 125%` (1.25) per Heading 5 style
- **Implementation Before**: `line-height: 1.5rem` (from `bpk-label-1()` mixin)
- **Root Cause**: Used generic `bpk-label-1()` mixin which applies `$bpk-line-height-base` (1.5rem)

**Fix Applied**:
```scss
// Before (incorrect)
@include typography.bpk-label-1();

// After (correct)
font-size: tokens.$bpk-font-size-base; // 1rem
line-height: 1.25; // 125% per Figma Heading 5
font-weight: tokens.$bpk-font-weight-bold; // 700
letter-spacing: 0;
```

**Files Modified**:
- `packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss`
  - Lines 207-210 (`&__label`)
  - Lines 245-248 (`&__price`)

---

### 2. ✅ Text Alignment Missing

**Issue**: Text was not centered horizontally in cards
- **Figma Spec**: `text-align: center`
- **Implementation Before**: `text-align: left` (default)

**Fix Applied** (requires 3 CSS properties working together):

1. **Parent container centering**:
```scss
&__text {
  display: flex;
  flex-direction: column;
  align-items: center; // ✅ Centers child elements horizontally
}
```

2. **Full width for text elements**:
```scss
&__label,
&__price {
  width: 100%; // ✅ Allows text-align to work
}
```

3. **Text centering within elements**:
```scss
&__label,
&__price {
  text-align: center; // ✅ Centers text content
}
```

**Files Modified**:
- `packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss`
  - Line 200 (`&__text` - added `align-items: center`)
  - Line 214 (`&__label` - added `width: 100%`, `text-align: center`)
  - Line 250 (`&__price` - added `width: 100%`, `text-align: center`)

---

### 3. ✅ On Surface Contrast Text Color

**Issue**: Text color incorrect for `onSurfaceContrast` variant in Default and Hover states
- **Figma Spec**: White text (`#FFF`) in ALL states (Default, Hover, Selected) because designed for dark backgrounds
- **Implementation Before**:
  - Default/Hover: Dark text `#161616` ❌
  - Selected: White text `#FFF` ✅

**Why This Matters**: `onSurfaceContrast` uses semi-transparent white background (`rgba(255,255,255,0.1)`) on dark backgrounds. Dark text on this background has poor contrast and is unreadable.

**Fix Applied**:
```scss
&--on-surface-contrast {
  background-color: tokens.$bpk-surface-tint-day;

  // ✅ White text for ALL states
  .bpk-checkbox-card__label,
  .bpk-checkbox-card__description,
  .bpk-checkbox-card__price {
    color: tokens.$bpk-text-on-dark-day; // White
  }

  .bpk-checkbox-card__icon {
    color: tokens.$bpk-text-on-dark-day; // White
  }
}
```

**Files Modified**:
- `packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss`
  - Lines 91-103 (added text color rules to `&--on-surface-contrast`)

---

### 4. ✅ Storybook Examples Enhancement

**Issue**: Storybook examples didn't show both `radius` variants (rounded and square) for each canvas/surface variant

**Fix Applied**: Updated all three variant examples to show:
- Rounded variant with Default and Checked states
- Square variant with Default and Checked states

**Files Modified**:
- `examples/bpk-component-checkbox-card/examples.tsx`
  - Lines 92-131 (`WithBackgroundVariant` - onCanvasDefault)
  - Lines 133-172 (`NoBackgroundVariant` - onCanvasContrast)
  - Lines 174-217 (`OnSurfaceContrastVariant` - with dark background containers)

---

## Verification

### Typography Specifications (Heading 5)

| Property | Figma Spec | Implementation | Status |
|----------|-----------|----------------|--------|
| font-size | 1rem | 1rem | ✅ |
| font-weight | 700 | 700 | ✅ |
| line-height | 125% (1.25) | 1.25 | ✅ Fixed |
| letter-spacing | 0 | 0 | ✅ |
| text-align | center | center | ✅ Fixed |

### Text Colors by Variant

| Variant | State | Figma Spec | Implementation | Status |
|---------|-------|-----------|----------------|--------|
| onCanvasDefault | Default | #161616 | #161616 | ✅ |
| onCanvasDefault | Selected | #FFF | #FFF | ✅ |
| onCanvasContrast | Default | #161616 | #161616 | ✅ |
| onCanvasContrast | Selected | #FFF | #FFF | ✅ |
| **onSurfaceContrast** | **Default** | **#FFF** | **#FFF** | ✅ **Fixed** |
| **onSurfaceContrast** | **Hover** | **#FFF** | **#FFF** | ✅ **Fixed** |
| **onSurfaceContrast** | **Selected** | **#FFF** | **#FFF** | ✅ |

---

## Documentation Updates

### spec.md Updates

Added comprehensive Typography Specifications section:
- Complete Heading 5 typography specification table
- Text color by variant and state table
- Critical note about onSurfaceContrast requiring white text in all states
- Layout requirements for proper text centering

Added Implementation Notes:
- Line-height mismatch explanation
- Text centering three-property requirement
- onSurfaceContrast text color implementation pattern
- Recommended workflow using Figma MCP tools

**File Modified**:
- `specs/001-checkbox-card/spec.md`
  - Lines 330-363 (Typography Specifications section)
  - Lines 502-528 (Typography Implementation Notes)

---

## Key Learnings

### 1. Don't Trust Generic Mixins for Specific Design Styles

The `bpk-label-1()` mixin is designed for body text labels with 1.5rem line-height. Figma's Heading 5 style requires tighter 1.25 line-height for headings. **Always verify design specifications match mixin output**.

### 2. Figma MCP Tools are Essential

Using Figma's `get_design_context` and `get_screenshot` tools immediately after seeing design specs would have caught these issues earlier. The tools show:
- Exact CSS property values from Figma
- Color tokens and their values
- Typography specifications

**Recommended Workflow**:
1. Use Figma MCP tool to read design specs
2. Compare with Backpack token values
3. Implement based on verified tokens
4. Visual verification in Storybook

### 3. Text Centering Requires Three Properties

Proper text centering in flex layouts requires:
1. `align-items: center` on flex container (horizontal centering of children)
2. `width: 100%` on text elements (provides space for text-align)
3. `text-align: center` on text elements (centers text content)

Missing any one property results in left-aligned text.

### 4. Variant-Specific Styles Need Context Awareness

`onSurfaceContrast` is fundamentally different from Canvas variants:
- **Canvas variants**: White backgrounds → dark text by default → white text when selected
- **Surface Contrast**: Dark background → **white text always**

Don't apply the same text color logic to all variants. Context matters.

---

## Impact Assessment

### User-Facing Changes

- **Improved Typography**: Text now has tighter, more readable line-height matching Heading 5 style
- **Centered Text**: All text is properly centered in cards as designed
- **Better Contrast**: On Surface Contrast variant now has readable white text in all states
- **Complete Storybook**: All radius variants (rounded/square) now visible for each canvas variant

### Developer Experience

- **Accurate Documentation**: spec.md now includes complete typography specifications
- **Clear Implementation Notes**: Guidance on common pitfalls (line-height, text centering, variant text colors)
- **Better Examples**: Storybook shows all combinations for easier integration

### No Breaking Changes

All fixes are visual/styling improvements. No API changes, no breaking changes to component interface.

---

## Verification Steps

1. ✅ Start Storybook: `npm run storybook`
2. ✅ Navigate to `bpk-component-checkbox-card` stories
3. ✅ Verify typography:
   - Text is centered horizontally
   - Line-height appears tighter (125% not 150%)
4. ✅ Verify On Surface Contrast:
   - Text is white in Default state (on dark background)
   - Text is white in Hover state (on dark background)
   - Text is white in Selected state (on blue background)
5. ✅ Verify all three variants show both rounded and square radius options

---

## Files Modified Summary

| File | Changes | Reason |
|------|---------|--------|
| `BpkCheckboxCard.module.scss` | Typography properties, text centering, onSurfaceContrast text color | Align with Figma Heading 5 specs |
| `examples.tsx` | Expanded variant examples | Show both radius options for each variant |
| `spec.md` | Added Typography Specifications section, Implementation Notes | Document typography requirements and learnings |
| `FIGMA_ALIGNMENT_FIXES.md` | Created this document | Document all fixes and learnings |

---

## Status: Complete ✅

All Figma design alignment issues identified and fixed. Component now implements 100% of Figma design specifications for:
- ✅ Typography (Heading 5 style)
- ✅ Text alignment (centered)
- ✅ Text colors (by variant and state)
- ✅ Layout (proper flex centering)
- ✅ Visual variants (all radius options shown in Storybook)
