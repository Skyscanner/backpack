<!--
==============================================================================
DOCUMENT PURPOSE: Define WHAT needs to be built and WHY (Requirements)
==============================================================================
This is a spike specification. "Users" are Backpack engineers validating an
RTL support approach, not end-users of the design system.
==============================================================================
-->

# Spike Specification: RTL Support via Ark LocaleProvider in BpkProvider (Option 2)

**Branch**: `001-rtl-spike-option2`
**Created**: 2026-03-24
**Status**: Draft
**Type**: Spike — implementation + validation

## Constitution Check

*GATE: Must pass before implementation begins.*

- [X] **Component-First Architecture**: Modifying existing `bpk-component-layout` (BpkProvider); no new package needed
- [X] **Naming Conventions**: No new component names introduced
- [X] **License Headers**: All modified source files will retain Apache 2.0 licence header
- [X] **Modern Sass**: No Sass changes required for this spike
- [X] **Accessibility-First**: RTL support is a prerequisite for full accessibility compliance
- [X] **TypeScript**: All changes will be in TypeScript
- [ ] **Test Coverage**: Spike excludes unit tests; validation is done via Storybook
- [X] **Documentation**: Spike findings documented in validation section
- [X] **Versioning**: PATCH — no public API changes, internal integration only

## Overview

Ark-based Backpack components (BpkCheckboxV2, BpkCheckboxCard, BpkSegmentedControlV2, BpkModalV3) do not automatically read text direction from the DOM. Ark UI requires either a `LocaleProvider` wrapper or explicit configuration to render correctly in RTL.

**Option 2** proposes integrating Ark's `LocaleProvider` inside the existing `BpkProvider` (layout package). Any Ark-based component rendered inside `BpkProvider` then automatically receives the correct locale and direction — with no change to consumer APIs or individual component code.

This is a Phase 1 solution. The approach accepts tighter coupling with Ark because the long-term direction for Backpack infrastructure is towards Ark, and this solves RTL quickly without touching every individual component.

---

## User Scenarios & Testing

### User Story 1 — Ark components render correctly in RTL inside BpkProvider (Priority: P1)

A Backpack consumer renders a page in RTL (e.g., Arabic locale) using `<html dir="rtl">`. They wrap their app with `BpkProvider` as usual. Ark-based components must render correctly in RTL without any additional wrapping or prop changes.

**Why this priority**: Core spike goal — validates whether Option 2 works at all for the target components.

**Independent Test**: Render BpkCheckboxV2 and BpkSegmentedControlV2 inside `BpkProvider` with `<html dir="rtl">`. Verify visual layout mirrors from LTR correctly.

**Acceptance Scenarios**:

1. **Given** the document direction is `rtl`, **When** BpkCheckboxV2 is rendered inside `BpkProvider`, **Then** the checkbox indicator appears on the right and the label flows from the right
2. **Given** the document direction is `rtl`, **When** BpkSegmentedControlV2 is rendered inside `BpkProvider`, **Then** the selected segment indicator is in the correct RTL position
3. **Given** the document direction is `rtl`, **When** BpkCheckboxCard is rendered inside `BpkProvider`, **Then** card content is right-aligned and layout is mirrored
4. **Given** the document direction is `rtl`, **When** BpkModalV3 is triggered inside `BpkProvider`, **Then** the modal layout and close button position are mirrored correctly

---

### User Story 2 — Non-Ark components are unaffected by the internal LocaleProvider (Priority: P1)

A Backpack consumer uses both Ark-based and non-Ark components (e.g., BpkTicket, BpkButton) inside the same `BpkProvider`. Adding `LocaleProvider` internally must not cause any visual or behavioural regressions.

**Why this priority**: Critical validation — regressions would block Option 2 from being safe to adopt.

**Independent Test**: Render BpkTicket alongside BpkCheckboxV2 inside `BpkProvider`, toggle direction, and confirm BpkTicket appearance is unchanged.

**Acceptance Scenarios**:

1. **Given** `BpkProvider` now internally wraps `LocaleProvider`, **When** BpkTicket is rendered, **Then** its visual layout is identical to before Option 2
2. **Given** `BpkProvider` wraps `LocaleProvider`, **When** BpkButton is rendered, **Then** its states (hover, focus, disabled) behave identically to before
3. **Given** `BpkProvider` wraps `LocaleProvider`, **When** CSS-based RTL rules (`[dir="rtl"]`) are active, **Then** they continue to apply correctly and are not blocked or overridden by `LocaleProvider`

---

### User Story 3 — Direction changes at runtime are reflected in Ark components (Priority: P2)

When the page direction is toggled dynamically (e.g., via the Storybook RTL toolbar toggle), Ark-based components inside `BpkProvider` update their layout without requiring remount.

**Why this priority**: Needed to support Storybook validation workflow and real-world apps with dynamic locale switching.

**Independent Test**: In Storybook, toggle direction while BpkCheckboxV2 is rendered — verify it re-renders in the new direction without a page reload.

**Acceptance Scenarios**:

1. **Given** BpkCheckboxV2 is rendered with `dir="ltr"`, **When** the Storybook RTL toggle switches to `dir="rtl"`, **Then** the component re-renders with correct RTL layout without a full page reload
2. **Given** BpkSegmentedControlV2 has a selected item in LTR, **When** direction changes to RTL, **Then** the indicator position updates to match the RTL layout

---

### Edge Cases

- What happens when `BpkProvider` is nested — does the inner `LocaleProvider` conflict with the outer one?
- How does `LocaleProvider` behave when no `dir` attribute is set on the document (should default to LTR)?
- What if a consumer has already added their own `LocaleProvider` outside `BpkProvider`? Is there a conflict?
- What happens during server-side rendering where `document` is unavailable?

---

## Requirements

### Functional Requirements

- **FR-001**: `BpkProvider` MUST internally wrap its children with Ark's `LocaleProvider`, deriving the locale from the current document direction
- **FR-002**: The locale passed to `LocaleProvider` MUST reflect `document.documentElement.dir`; when `document` is unavailable (SSR), it MUST default to LTR
- **FR-003**: `BpkProvider`'s public API MUST remain unchanged — no new props, no removed props
- **FR-004**: BpkCheckboxV2 MUST render correctly in RTL when wrapped in `BpkProvider`
- **FR-005**: BpkCheckboxCard MUST render correctly in RTL when wrapped in `BpkProvider`
- **FR-006**: BpkSegmentedControlV2 MUST render correctly in RTL when wrapped in `BpkProvider`
- **FR-007**: BpkModalV3 MUST render correctly in RTL when triggered inside `BpkProvider`
- **FR-008**: No existing non-Ark Backpack component MUST exhibit visual or behavioural regressions after Option 2 is applied
- **FR-009**: Storybook stories MUST include at least one story rendering both Ark-based and non-Ark components together in RTL

### Non-Functional Requirements

- **NFR-001**: The integration MUST be SSR-safe — no `document` access at module load time
- **NFR-002**: `LocaleProvider` MUST NOT cause additional re-renders for components that do not consume Ark locale context
- **NFR-003**: No new peer dependencies may be added (`@ark-ui/react` is already available in the layout package's dependency tree)
- **NFR-004**: Changes MUST be contained to `bpk-component-layout` — individual component packages (checkbox, segmented-control, modal) MUST NOT be modified

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: All four target Ark components (BpkCheckboxV2, BpkCheckboxCard, BpkSegmentedControlV2, BpkModalV3) render correctly in RTL inside `BpkProvider` — confirmed visually in Storybook
- **SC-002**: No visual difference observed in non-Ark components (BpkTicket, BpkButton) before and after Option 2 — confirmed by Storybook side-by-side comparison
- **SC-003**: CSS-based RTL selectors (`[dir="rtl"]`) continue to function correctly alongside `LocaleProvider` — confirmed by inspecting styled elements in Storybook DevTools
- **SC-004**: Direction toggle in Storybook causes Ark components to update layout within one render cycle — no full remount required
- **SC-005**: TypeScript compiles without errors
- **SC-006**: The team can clearly answer both validation concerns (compatibility with existing RTL patterns, and coupling/performance of `LocaleProvider`) based on spike findings — sufficient to update the decision log

---

## Validation Plan

This spike requires Storybook validation. The following stories MUST be created:

| Story | Components rendered | Validation purpose |
|-------|--------------------|--------------------|
| RTL Option 2 — Ark components | BpkCheckboxV2, BpkCheckboxCard, BpkSegmentedControlV2 | Confirm Ark RTL layout |
| RTL Option 2 — Mixed (Ark + non-Ark) | BpkCheckboxV2 + BpkTicket in same `BpkProvider` | Confirm no regression |
| RTL Option 2 — Modal | BpkModalV3 open state | Confirm modal RTL layout |
| RTL Option 2 — Before / After | BpkCheckboxV2 without `BpkProvider` vs inside `BpkProvider` | Show the effect of Option 2 |

### Concern 1: Compatibility with existing RTL patterns

Verify in Storybook:
- Render BpkTicket (CSS `[dir="rtl"]`-driven) alongside BpkCheckboxV2 in one story, toggle direction, observe both simultaneously
- Confirm BpkTicket layout is driven by the DOM `dir` attribute alone, not Ark locale
- Confirm no visual conflict between CSS-based and Ark-based RTL mechanisms

### Concern 2: Coupling and performance of LocaleProvider

Assess in Storybook / React DevTools:
- Observe React re-render count when direction is stable (LTR, no toggle)
- Note whether `LocaleProvider` introduces any responsibilities beyond direction (e.g., calendar locale, date formatting)
- Evaluate whether those extra responsibilities affect Backpack components at all in practice

---

## Dependencies & Related Components

**Modified**:
- `packages/bpk-component-layout` — `BpkProvider` gains an internal `LocaleProvider` wrapper

**Validated (read-only during spike)**:
- `packages/bpk-component-checkbox` — BpkCheckboxV2
- `packages/bpk-component-checkbox-card` — BpkCheckboxCard
- `packages/bpk-component-segmented-control` — BpkSegmentedControlV2
- `packages/bpk-component-modal` — BpkModalV3

**External Dependencies**:
- `@ark-ui/react` — `LocaleProvider` (already in the dependency tree via component packages)

---

## Assumptions

- `@ark-ui/react` is reachable from `bpk-component-layout` via the monorepo workspace; no new installation is needed
- Ark's `LocaleProvider` accepts a BCP 47 locale string and derives text direction from it (not a direct `dir` prop)
- `'en-US'` maps to LTR and `'ar-SA'` maps to RTL within Ark's locale inference (consistent with existing `getArkLocale` utility)
- SSR fallback defaults to `'ltr'` — matching the same assumption in `getDocumentDir`
- Spike does not need to pass unit tests; Storybook visual validation is the acceptance gate

---

## References

- Decision log: `_fayexiao-Decision Log_ RTL Support for Ark-based Backpack Components`
- Related spike branches: `CLOV-1447-rtl-spike-option1`, `CLOV-1447-rtl-spike-option4`
- Existing `BpkProvider`: `packages/bpk-component-layout/src/BpkProvider/`
- `getArkLocale` utility: `packages/bpk-react-utils/src/getArkLocale.ts`
- Ark UI `LocaleProvider`: `@ark-ui/react` package
