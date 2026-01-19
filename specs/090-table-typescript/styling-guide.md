# Styling Guide: TypeScript Migration for BpkTable

**Date**: 2026-01-19
**Feature**: TypeScript Migration for bpk-component-table
**Objective**: Document styling approach (no changes in this migration)

---

## Overview

**This TypeScript migration does NOT change any styling.**

All Sass files, CSS classes, design tokens, and visual appearance remain unchanged. This document confirms the existing styling approach continues to be used.

---

## Styling Architecture (Unchanged)

### CSS Modules

**Status**: No changes

All components use CSS Modules with `.module.scss` extension:
- `BpkTable.module.scss`
- `BpkTableHead.module.scss`
- `BpkTableBody.module.scss`
- `BpkTableRow.module.scss`
- `BpkTableCell.module.scss`
- `BpkTableHeadCell.module.scss`

### Modern Sass API

**Status**: Already compliant

All components use modern Sass with `@use` syntax (not `@import`):
```scss
@use '../bpk-mixins/tokens';
@use '../bpk-mixins/typography';
```

### BEM Class Names

**Status**: No changes

All CSS classes follow BEM with `bpk-` prefix:
- `.bpk-table`
- `.bpk-table__cell`
- `.bpk-table__cell--wordBreak`
- etc.

---

## Migration Impact on Styles

### No Changes Required

| Aspect | Status | Rationale |
|--------|--------|-----------|
| Sass files | ✅ Unchanged | TypeScript migration doesn't affect styles |
| CSS classes | ✅ Unchanged | BEM classes remain identical |
| Design tokens | ✅ Unchanged | Token usage preserved |
| `rem` units | ✅ Unchanged | Already using `rem` |
| RTL support | ✅ Unchanged | Existing RTL implementation preserved |
| Visual appearance | ✅ Unchanged | Zero visual changes |

### What Gets Migrated

**Only TypeScript files**:
- Component `.tsx` files (type definitions updated)
- Test `.tsx` files (file extension only)
- Example `.tsx` files (file extension only)

**NOT migrated**:
- `.scss` files (remain unchanged)
- `.module.scss` files (remain unchanged)
- `cssModules` usage (remains unchanged)

---

## Verification

### Visual Regression Tests

**Requirement**: Percy tests must pass without changes

**Expected Outcome**: Zero visual differences between Flow and TypeScript versions

### Bundle Size

**Requirement**: CSS bundle size must remain within 1% of original

**Expected Outcome**: Identical CSS output (Sass compilation unchanged)

---

## References

- **Spec**: [spec.md](./spec.md) - Confirms zero visual changes
- **Constitution**: Principle III (Modern Sass) - Already compliant
- **Architecture Decision**: `decisions/modern-sass-api.md` - Already implemented
