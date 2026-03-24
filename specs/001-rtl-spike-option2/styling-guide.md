<!--
==============================================================================
Phase 1 Styling Guide — RTL Spike Option 2
==============================================================================
-->

# Styling Guide: RTL Spike Option 2 — Ark LocaleProvider in BpkProvider

**Branch**: `001-rtl-spike-option2`
**Date**: 2026-03-24

---

## Summary

Option 2 requires **no new CSS or Sass**. The integration is purely at the React provider level.

This guide documents:
1. How the two RTL mechanisms coexist
2. Which components use which mechanism
3. What to verify in Storybook

---

## RTL Mechanism 1: CSS-based (existing, unchanged)

**Applies to**: All non-Ark Backpack components (BpkTicket, BpkButton, BpkCalendar, BpkChip, etc.)

**How it works**:
```scss
// packages/bpk-mixins/_utils.scss
@mixin bpk-rtl {
  html[dir='rtl'] & {
    @content;
  }
}

// Usage in component:
.bpk-ticket__stub {
  border-inline-start: 1px dashed tokens.$bpk-line-day;

  @include utils.bpk-rtl {
    border-inline-end: 1px dashed tokens.$bpk-line-day;
    border-inline-start: none;
  }
}
```

**Trigger**: Setting `dir="rtl"` on `<html>` element.

**Independence from Option 2**: This mechanism reads the DOM attribute directly via CSS. Adding `LocaleProvider` to the React tree does not affect CSS selectors. Non-Ark components are completely unaffected.

---

## RTL Mechanism 2: Ark locale context (new, via Option 2)

**Applies to**: Ark-based components (BpkCheckboxV2, BpkCheckboxCard, BpkSegmentedControlV2, BpkModalV3)

**How it works**:
```
BpkProvider
  └── LocaleProvider (locale='ar-SA' when dir='rtl')
        └── [provides { locale, dir } via React context]
              └── Ark components read context via useLocaleContext()
                    └── Zag machines use dir to determine:
                          - indicator position (checkbox, segmented control)
                          - animation direction (modal slide-in)
                          - scroll direction (carousel, etc.)
```

**Trigger**: `BpkProvider` re-renders with `locale='ar-SA'` when `document.documentElement.dir` changes to `'rtl'`.

**Visual changes in RTL**:
- `BpkCheckboxV2`: indicator appears on the correct side of the label
- `BpkSegmentedControlV2`: selected segment indicator moves to correct RTL position
- `BpkCheckboxCard`: interactive state and tick circle position adjust
- `BpkModalV3`: slide-in direction and close button position mirror

---

## Coexistence

Both mechanisms trigger from the same source: `html[dir='rtl']`.

```
Browser sets html[dir="rtl"]
         │
         ├── CSS engine reads [dir="rtl"] selector
         │     └── Non-Ark components: layout flips via Sass mixin
         │
         └── MutationObserver in useDocumentDir()
               └── BpkProvider re-renders with locale='ar-SA'
                     └── Ark components: layout flips via Zag machine
```

**Result**: Both Ark and non-Ark components update simultaneously when direction changes, addressing US4.

---

## Validation in Storybook

### Storybook RTL toolbar (recommended)

Use the Storybook built-in direction toggle:
- **Toolbar → Direction → RTL**: sets `html[dir="rtl"]` on the iframe document
- Both CSS and Ark mechanisms are activated simultaneously
- Best for validating US3 (live toggle) and US4 (mixed components)

### Manual `<div dir="rtl">` wrapper (limited)

- Activates CSS `@include bpk-rtl` for elements scoped inside the div
- **Does NOT activate** `useDocumentDir()` (which reads `document.documentElement.dir`)
- Useful for CSS-only RTL verification, not for Ark context validation
- Use this pattern only for CSS regression tests

### What to look for in Storybook

| Component | LTR expected | RTL expected |
|-----------|-------------|--------------|
| BpkCheckboxV2 | Indicator on left of label | Indicator on right of label |
| BpkSegmentedControlV2 | Indicator slides left-to-right | Indicator slides right-to-left |
| BpkCheckboxCard | Tick icon on top-right | Tick icon on top-left |
| BpkModalV3 | Slides in from right | Slides in from left |
| BpkTicket | Dashed divider on left of stub | Dashed divider on right of stub |
| BpkButton | Arrow icon points right | Arrow icon points left |

---

## No New Files Required

This spike does not create new SCSS files, modify existing component stylesheets, or add new CSS classes. The only styling-relevant action is verifying that existing CSS-based RTL continues to work correctly alongside the new Ark locale context.
