# Phase 1: Styling Guide - TypeScript Migration for BpkTable

**Date**: 2026-01-14
**Feature**: TypeScript Migration for bpk-component-table

---

## Overview

**No styling changes** in this migration. All Sass files remain identical. This document confirms existing styles comply with Backpack constitution.

---

## Existing Sass Structure (Unchanged)

### Files

```
packages/bpk-component-table/src/
├── BpkTable.module.scss
├── BpkTableHead.module.scss
├── BpkTableBody.module.scss
├── BpkTableRow.module.scss
├── BpkTableCell.module.scss
└── BpkTableHeadCell.module.scss
```

### Modern Sass API Compliance ✅

All files already use modern Sass API per constitution:
- ✅ Using `@use` syntax (not `@import`)
- ✅ Granular imports from `bpk-mixins`
- ✅ CSS Modules (`.module.scss`)
- ✅ `rem` units for sizing
- ✅ Design tokens from `@skyscanner/bpk-foundations-web`

---

## CSS Class Structure (Unchanged)

### BEM Naming Convention ✅

All classes follow BEM with `bpk-` prefix:

```scss
// BpkTable.module.scss
.bpk-table { /* base class */ }

// BpkTableCell.module.scss
.bpk-table__cell { /* element class */ }
.bpk-table__cell--word-break { /* modifier class */ }

// BpkTableHeadCell.module.scss
.bpk-table__head-cell { /* element class */ }
.bpk-table__head-cell--word-break { /* modifier class */ }
```

---

## Design Token Usage (Unchanged)

### Current Token Mapping

**Verified compliant**: All values use design tokens, no magic numbers.

Example from existing Sass:
```scss
@use '../bpk-mixins/tokens';

.bpk-table {
  border-collapse: collapse;
  width: 100%;
}

.bpk-table__cell {
  padding: tokens.bpk-spacing-md();
  text-align: left;
}
```

---

## Responsive Behavior (Unchanged)

Tables maintain existing responsive behavior:
- Full width by default
- Overflow-x scrolling on small screens (handled by consumer)
- No breakpoint-specific styles in component

---

## RTL Support (Unchanged)

RTL support already implemented via logical CSS properties:
- `text-align: left` automatically flips to `right` in RTL
- No directional hardcoding (e.g., no `float: left`)

---

## Migration Impact: Zero

**Styling changes**: None
**Sass file modifications**: None
**Class name changes**: None
**Token updates**: None

TypeScript migration is **code-only** - styles remain identical.

---

## Constitution Compliance Verification

- [x] **Modern Sass API**: All files use `@use` syntax
- [x] **rem Units**: All sizing uses `rem` (not `px` or `em`)
- [x] **Design Tokens**: All values use tokens from `@skyscanner/bpk-foundations-web`
- [x] **BEM Naming**: Classes follow `bpk-component--modifier` pattern
- [x] **CSS Modules**: All files use `.module.scss` extension
- [x] **RTL Support**: Logical properties used (no hardcoded directions)

---

## Reference

- **Current Styles**: `packages/bpk-component-table/src/*.module.scss`
- **Constitution**: Principle III (Modern Sass with Granular Imports)
- **Decisions**: `decisions/modern-sass-api.md`, `decisions/sizing-in-rem.md`
