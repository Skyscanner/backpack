# Tasks: BpkSegmentedControlV2

**Input**: Design documents from `/specs/001-composable-segmented-control/`
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | api-design.md ✅ | styling-guide.md ✅ | examples/ ✅

**Backpack Context**: V2 lives in `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/` alongside V1. V1 is unchanged and remains the default export during the deprecation window. All V2 code is new; nothing in V1 is touched until the optional deprecation step in the Polish phase.

**Tests**: Tests are MANDATORY. Follow TDD — write tests first, confirm they fail, then implement.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1–US6)

---

## Phase 1: Setup (Package Initialization)

**Purpose**: Create the V2 directory scaffold and install the new Ark-UI dependency before any story work begins.

- [X] T001 Create `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/` directory and `__snapshots__/` subdirectory (both empty — placeholder for source files)

- [X] T002 Add `"@ark-ui/react": "^3.x"` to `packages/bpk-component-segmented-control/package.json` `dependencies` section, then run `npm install` from repo root to install it

- [X] T003 [P] Create `scripts/codemods/segmented-control-v1-to-v2/` directory and `scripts/codemods/segmented-control-v1-to-v2/fixtures/` subdirectory; add `jscodeshift` to root `package.json` `devDependencies` and run `npm install`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: TypeScript types and baseline verification that must exist before any user story implementation.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T004 Create `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/common-types.ts` with: Apache 2.0 license header; `SEGMENT_TYPES_V2` const (`CanvasDefault`, `CanvasContrast`, `SurfaceDefault`, `SurfaceContrast`); `SegmentTypesV2` type; `BpkSegmentedControlV2RootProps` interface; `BpkSegmentedControlV2ItemProps` interface — shapes defined in `api-design.md` §2

- [X] T005 [P] Run `npm test -- --testPathPattern="bpk-component-segmented-control"` and confirm all existing V1 tests pass — this is the baseline; if any V1 test fails, fix before proceeding

**Checkpoint**: Foundation ready — user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 — Basic Composable Segment Group (Priority: P1) 🎯 MVP

**Goal**: A developer can render `BpkSegmentedControlV2.Root` with two or more `BpkSegmentedControlV2.Item` children, control the selected value, and respond to changes.

**Independent Test**: Render Root with two Items; verify selected item is correct; verify `onChange` fires with the clicked item's value; verify no item selected when no `defaultValue` is provided.

### Tests for User Story 1 (MANDATORY — write first, confirm they FAIL) ⚠️

- [X] T006 [P] [US1] Create `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/BpkSegmentedControlV2-test.tsx` with test cases covering:
  - Renders root + three items with minimal required props
  - Controlled: clicking an item calls `onChange` with that item's value string
  - Controlled: already-selected item click does NOT call `onChange` again
  - Uncontrolled: `defaultValue` sets initial selection on first render
  - Uncontrolled: no `defaultValue` → no item selected, no crash
  - Root `disabled`: clicking any item does not fire `onChange`
  - Individual item `disabled`: only that item is non-interactive, others remain clickable
  - Duplicate `value`: `console.warn` fires in `NODE_ENV=development`; no warn in production
  - **Constitution Check**: Jest + Testing Library; targets 70% branches, 75% functions/lines

- [X] T007 [P] [US1] Create `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/accessibility-test.tsx` with jest-axe assertions:
  - Zero axe violations: canvas-default type, 3 items, first selected, with `label` prop
  - Zero axe violations: root `disabled`
  - Zero axe violations: individual item `disabled`
  - Zero axe violations: no initial selection (no `value` or `defaultValue`)
  - **Constitution Check**: NON-NEGOTIABLE — all Backpack components MUST have accessibility tests

### Implementation for User Story 1

- [X] T008 [US1] Create `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/BpkSegmentedControlV2.tsx`:
  - Apache 2.0 license header
  - Import `{ SegmentGroup } from '@ark-ui/react/segment-group'`
  - Import `{ cssModules, isRTL, getDataComponentAttribute }` from `bpk-react-utils`
  - Import types and `SEGMENT_TYPES_V2` from `./common-types`
  - `BpkSegmentedControlV2Root`: wraps `SegmentGroup.Root` with `className`, `value`, `defaultValue`, `onValueChange={({value: v}) => onChange?.(v)}`, `disabled`, `aria-label={label}`, `orientation="horizontal"`, `{...getDataComponentAttribute('SegmentedControlV2')}`; dev-mode duplicate-value warning (extract Item values from `children`, check for duplicates, `console.warn`)
  - `BpkSegmentedControlV2Item`: wraps `SegmentGroup.Item` > `SegmentGroup.ItemControl` (with `aria-label={accessibilityLabel}`) > `SegmentGroup.ItemText` > `{children}` + `SegmentGroup.ItemHiddenInput`
  - Composite default export: `const BpkSegmentedControlV2 = { Root: BpkSegmentedControlV2Root, Item: BpkSegmentedControlV2Item }`
  - Named exports for `BpkSegmentedControlV2Root`, `BpkSegmentedControlV2Item`
  - Re-export `SEGMENT_TYPES_V2` from `./common-types`
  - **Constitution Check**: TypeScript NON-NEGOTIABLE; JSDoc `@experimental` on both components; British English prose in JSDoc

- [X] T009 [US1] Create `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/BpkSegmentedControlV2.module.scss`:
  - Apache 2.0 license header
  - Sass imports: `@use '../../../bpk-mixins/tokens'`, `utils`, `typography`, `radii`, `shadows`
  - `.bpk-segmented-control-v2` root: declare all 9 CSS custom properties with Backpack token defaults (per `styling-guide.md` §3–4); `display: grid; grid-auto-columns: 1fr; grid-auto-flow: column; overflow: hidden`; `background-color: var(--bpk-segmented-control-bg)`; `border-radius: var(--bpk-segmented-control-border-radius)`
  - `&--canvas-contrast`, `&--surface-default`, `&--surface-contrast`, `&--shadow` modifier blocks (all CSS variable overrides per `styling-guide.md` §6; shadow uses `@include shadows.bpk-box-shadow-sm`)
  - `.bpk-segmented-control-v2__item`: `display: contents`; `cursor: pointer`; `&[data-disabled]` cursor
  - `.bpk-segmented-control-v2__item-control`: flex centering; `min-height: tokens.bpk-spacing-xl()`; padding from CSS vars; `@include typography.bpk-label-2`; `border-inline-start` divider (logical property); `&[data-state='checked']` selected styles; `&[data-disabled]` disabled styles; `&:focus-visible { @include utils.bpk-focus-indicator }`
  - First/last child border-radius via logical properties: `border-start-start-radius`, `border-end-start-radius`, `border-start-end-radius`, `border-end-end-radius`
  - `.bpk-segmented-control-v2__item-text`: flex + gap; `white-space: nowrap; overflow: hidden; text-overflow: ellipsis; pointer-events: none`
  - **Constitution Check**: `@use` only (no `@import`); all sizing in rem via tokens; BEM with `bpk-` prefix; logical CSS properties for RTL

- [X] T010 [US1] Update `packages/bpk-component-segmented-control/index.ts` to add V2 named exports below the existing V1 exports:
  - `export { default as BpkSegmentedControlV2, SEGMENT_TYPES_V2 } from './src/BpkSegmentedControlV2/BpkSegmentedControlV2'`
  - `export type { BpkSegmentedControlV2RootProps, BpkSegmentedControlV2ItemProps, SegmentTypesV2 } from './src/BpkSegmentedControlV2/common-types'`
  - V1 default export MUST remain unchanged above the V2 additions

- [X] T011 [US1] Run `npm test -- --testPathPattern="BpkSegmentedControlV2"` and verify all US1 tests pass; fix any failures; confirm coverage ≥ 70% branches, 75% functions/lines/statements

**Checkpoint**: US1 is fully functional and independently testable. Deliver MVP if needed.

---

## Phase 4: User Story 2 — Keyboard Navigation (Priority: P1)

**Goal**: A keyboard-only user can navigate the segmented control using Arrow keys (with RTL mirroring), Home/End, and wrap-around; manual activation mode defers selection until Space/Enter.

**Independent Test**: Render the component, simulate `fireEvent.keyDown` on a focused item, and assert focus and selection move correctly. Mock `isRTL` to test both LTR and RTL.

### Tests for User Story 2 (MANDATORY — write first, confirm they FAIL) ⚠️

- [X] T012 [P] [US2] Add keyboard navigation test cases to `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/BpkSegmentedControlV2-test.tsx`:
  - ArrowRight moves focus + selection to next item in LTR
  - ArrowLeft moves focus + selection to previous item in LTR
  - ArrowRight wraps from last item to first item
  - ArrowLeft wraps from first item to last item
  - Home moves focus + selection to first item
  - End moves focus + selection to last item
  - With `isRTL()` mocked to `true`: ArrowRight behaves as ArrowLeft, ArrowLeft behaves as ArrowRight
  - Manual mode: ArrowRight moves DOM focus but does NOT call `onChange`
  - Manual mode: pressing Space on the focused (but unselected) item calls `onChange` with that item's value
  - Manual mode: pressing Enter on the focused item calls `onChange` with that item's value

- [X] T013 [P] [US2] Add keyboard accessibility tests to `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/accessibility-test.tsx`:
  - Zero axe violations: 3 items, second item focused via keyboard navigation
  - Roving tabindex: after focus moves to second item, only second item has `tabIndex={0}`; first and third have `tabIndex={-1}`

### Implementation for User Story 2

- [X] T014 [US2] In `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/BpkSegmentedControlV2.tsx`, add an `onKeyDown` handler to `SegmentGroup.Root`:
  - When `activationMode === 'automatic'`: only add RTL mirroring (swap ArrowLeft/ArrowRight when `isRTL()` returns `true`); pass other keys to Ark-UI's built-in handler
  - When `activationMode === 'automatic'`, Ark-UI handles ArrowLeft/Right/Home/End natively — verify these work correctly and the RTL swap is applied

- [X] T015 [US2] In `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/BpkSegmentedControlV2.tsx`, implement manual activation mode:
  - Use `useRef` array to hold refs to each `SegmentGroup.ItemControl` DOM element (attach via `ref` callback on each `ItemControl`)
  - In manual mode `onKeyDown` handler on `SegmentGroup.Root`: intercept ArrowRight/Left/Home/End; call `.focus()` on the target `ItemControl` ref (with RTL mirroring via `isRTL()`); call `event.preventDefault()`; do NOT call `onChange`
  - On Space/Enter in manual mode: call `onChange(focusedItemValue)` where `focusedItemValue` is tracked in a `useRef`

- [X] T016 [US2] Run `npm test -- --testPathPattern="BpkSegmentedControlV2"` and verify all US1+US2 tests pass; fix any failures

**Checkpoint**: US1 + US2 complete. Keyboard navigation fully functional including RTL and manual mode.

---

## Phase 5: User Story 3 — CSS Variable Theming (Priority: P2)

**Goal**: A consumer can override the 9 published CSS custom properties on a wrapper element and the component reflects the new visual style without any code changes.

**Independent Test**: Render the component inside a `<div style={{--bpk-segmented-control-bg: 'red'}}>` wrapper and assert the group background computes to `red`.

### Tests for User Story 3 (MANDATORY — write first, confirm they FAIL) ⚠️

- [X] T017 [P] [US3] Add CSS variable theming tests to `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/BpkSegmentedControlV2-test.tsx`:
  - Assert that when a wrapper element sets `--bpk-segmented-control-bg` to a custom value, the root element's computed `background-color` resolves to that value (use JSDOM `style` assertions or inline style verification)
  - Assert that when a wrapper element sets `--bpk-segmented-control-indicator-bg` to a custom value, a selected item's `background-color` resolves to that value
  - Assert that with no CSS variable overrides, the canvas-default type produces classes that include the default token variable assignments

### Implementation for User Story 3

- [X] T018 [US3] Verify that all 9 CSS custom property declarations in `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/BpkSegmentedControlV2.module.scss` (placed on `.bpk-segmented-control-v2` root class in T009) use correct Backpack tokens; cross-reference every property against `styling-guide.md` §3 and `research.md` §6 token-mapping table; correct any discrepancies

- [X] T019 [US3] Add `Vdl2ThemeOverride` example to `examples/bpk-component-segmented-control/examples.tsx`: a wrapper `<div>` with inline CSS variable overrides demonstrating VDL 2.0 colours (see `specs/001-composable-segmented-control/examples/examples.tsx` `Vdl2ThemeOverride` for the template); run `npm test -- --testPathPattern="BpkSegmentedControlV2"` and verify US3 tests pass

**Checkpoint**: CSS variable theming API is verified. Consumers can apply VDL 2.0 styles without code changes.

---

## Phase 6: User Story 4 — Style Variants (Priority: P2)

**Goal**: Passing the `type` prop applies the correct pre-defined Backpack token set for that surface, and `shadow` applies a box shadow.

**Independent Test**: Render with each `type` value and assert the rendered element has the expected BEM modifier class; snapshot each variant; verify `shadow` adds the shadow modifier.

### Tests for User Story 4 (MANDATORY — write first, confirm they FAIL) ⚠️

- [X] T020 [P] [US4] Add type variant and shadow tests to `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/BpkSegmentedControlV2-test.tsx`:
  - Each `type` value (`canvas-default`, `canvas-contrast`, `surface-default`, `surface-contrast`) produces a distinct BEM modifier class on the root element
  - `type` defaults to `canvas-default` when not provided
  - `shadow={true}` adds `bpk-segmented-control-v2--shadow` class
  - `shadow={false}` (default) does not add shadow class
  - Snapshot: canvas-default (3 items, first selected)
  - Snapshot: canvas-contrast
  - Snapshot: surface-default
  - Snapshot: surface-contrast
  - Snapshot: shadow enabled
  - Snapshot: root disabled

### Implementation for User Story 4

- [X] T021 [US4] Verify `BpkSegmentedControlV2.module.scss` modifier blocks implemented in T009 are correct: `&--canvas-contrast` overrides `--bpk-segmented-control-bg` to `$bpk-surface-default-day`; `&--surface-contrast` overrides `--bg`, `--item-color`, `--indicator-bg`, `--indicator-color`, `--divider-color`; `&--shadow` uses `@include shadows.bpk-box-shadow-sm`; `&--surface-default` inherits canvas-default defaults (no extra override needed); cross-reference against `styling-guide.md` §6 token mapping table

- [X] T022 [US4] Add type variant and shadow Storybook stories to `examples/bpk-component-segmented-control/examples.tsx`: `CanvasContrast`, `SurfaceDefault`, `SurfaceContrast`, `WithShadow` — use templates from `specs/001-composable-segmented-control/examples/examples.tsx`

- [X] T023 [US4] Run `npm test -- --testPathPattern="BpkSegmentedControlV2" -- --updateSnapshot` to write initial snapshots, then run without `--updateSnapshot` to verify snapshots are stable; fix any failures

**Checkpoint**: All 4 type variants + shadow work. US3 + US4 provide complete theming support.

---

## Phase 7: User Story 5 — Composable Custom Content Per Segment (Priority: P2)

**Goal**: A developer can place an SVG icon alongside text inside a segment item; icon-only items provide an `accessibilityLabel` prop for screen reader announcements.

**Independent Test**: Render an item with an SVG and a text node as children; assert both are present in the DOM. Render an icon-only item with `accessibilityLabel`; assert `aria-label` is set on the control element.

### Tests for User Story 5 (MANDATORY — write first, confirm they FAIL) ⚠️

- [X] T024 [P] [US5] Add custom content tests to `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/BpkSegmentedControlV2-test.tsx`:
  - An item with an SVG child (`aria-hidden="true"`) and text string renders both inside the item (query by text + presence of `svg` element)
  - An item with `accessibilityLabel` prop has `aria-label` matching the prop value on the `ItemControl` element
  - An item without `accessibilityLabel` and without text children: assert `aria-label` is NOT set (avoid false positives)

- [X] T025 [P] [US5] Add `accessibilityLabel` accessibility tests to `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/accessibility-test.tsx`:
  - Zero axe violations: icon-only item with valid `accessibilityLabel`
  - Axe violation IS reported: icon-only item with no visible text AND no `accessibilityLabel` (confirms the prop is genuinely needed — assert `results.violations.length > 0`)

### Implementation for User Story 5

- [X] T026 [US5] Verify `SegmentGroup.ItemText` in `BpkSegmentedControlV2Item` (created in T008) renders arbitrary `children` including SVG elements and mixed text+SVG combinations — confirm no additional implementation is required since `children` is passed as-is; if `ItemText` strips SVG children, restructure to pass children directly to `ItemControl` instead

- [X] T027 [US5] Confirm `accessibilityLabel` is wired as `aria-label` on `SegmentGroup.ItemControl` in `BpkSegmentedControlV2.tsx` (should already be in T008); verify the prop flows from `BpkSegmentedControlV2ItemProps` through to the rendered `aria-label` attribute; update if any wiring is missing

- [X] T028 [US5] Add icon+text and icon-only Storybook example implementations to `examples/bpk-component-segmented-control/examples.tsx`: `WithIconAndText`, `IconOnlyWithAccessibilityLabel` — use templates from `specs/001-composable-segmented-control/examples/examples.tsx`

- [X] T029 [US5] Run `npm test -- --testPathPattern="BpkSegmentedControlV2"` and verify all US5 tests pass; fix any failures

**Checkpoint**: Composable custom content works. All P2 user stories complete. MVP+variants+theming+content all functional.

---

## Phase 8: User Story 6 — Migration from V1 (Priority: P3)

**Goal**: A jscodeshift codemod transforms V1 `buttonContents` array usages to V2 composable Item children automatically; patterns it cannot transform are left unchanged with a warning.

**Independent Test**: Run the codemod against fixture files and assert the output matches expected V2 patterns exactly.

### Tests for User Story 6 (MANDATORY — write first, confirm they FAIL) ⚠️

- [X] T030 [P] [US6] Create fixture files in `scripts/codemods/segmented-control-v1-to-v2/fixtures/`:
  - `basic-input.tsx`: V1 usage with literal string array `buttonContents={['Price', 'Rating', 'Duration']}`, `onItemClick={(id) => handleClick(id)}`, and `type`, `shadow`, `label` props
  - `basic-output.tsx`: expected V2 output with `BpkSegmentedControlV2.Root` + three `BpkSegmentedControlV2.Item` children (values `"0"`, `"1"`, `"2"`), `onChange={(v) => handleClick(Number(v))}`, preserved `type`, `shadow`, `label`
  - `dynamic-contents-input.tsx`: V1 usage where `buttonContents={segments}` is a variable reference (not a literal array)
  - `dynamic-contents-output.tsx`: identical to `dynamic-contents-input.tsx` — codemod must leave this unchanged

- [X] T031 [P] [US6] Create `scripts/codemods/segmented-control-v1-to-v2/transform-test.ts` with jscodeshift test cases:
  - Literal string array → Item children (basic-input → basic-output)
  - `onItemClick: (id: number) => void` is mapped to `onChange: (value: string) => void` with `Number(v)` wrapper
  - `type`, `shadow`, `activationMode`, `label` props preserved unchanged on Root
  - Dynamic `buttonContents` variable → left unchanged AND `console.warn` (or `process.stdout.write`) emits warning including file/line info
  - `useSegmentedControlPanels` import → left unchanged AND warning emitted

### Implementation for User Story 6

- [X] T032 [US6] Create `scripts/codemods/segmented-control-v1-to-v2/transform.ts` jscodeshift transform:
  - Use `@babel/parser` with TypeScript + JSX plugins
  - Find all `<BpkSegmentedControl>` JSX opening elements
  - If `buttonContents` is a `JSXExpressionContainer` wrapping an `ArrayExpression` of literals: replace with `<BpkSegmentedControlV2.Root>` + map each element to `<BpkSegmentedControlV2.Item value="{index}">{content}</BpkSegmentedControlV2.Item>`
  - Map `onItemClick={(id) => ...}` to `onChange={(v) => ...}` where numeric index is replaced with `Number(v)` or the original body adapted
  - Preserve `type`, `shadow`, `activationMode`, `disabled`, `label` props verbatim
  - If `buttonContents` is a non-literal (variable/expression): emit warning to stderr with file path and line number; leave JSX unchanged
  - Detect `useSegmentedControlPanels` import: emit warning to stderr; leave unchanged
  - Update imports: replace `BpkSegmentedControl` import with `{ BpkSegmentedControlV2 }` from same package path; remove `useSegmentedControlPanels` import only if a warning was NOT emitted for it (i.e., it was successfully removed from usage) — otherwise leave it

- [X] T033 [US6] Run `npx jest scripts/codemods/segmented-control-v1-to-v2/transform-test.ts` and verify all fixture transformation tests pass; fix any transform failures

**Checkpoint**: Migration codemod complete. All 6 user stories implemented.

---

## Phase 9: Documentation & Polish

**Purpose**: Complete documentation, Storybook stories, Figma Code Connect, visual regression, manual testing, and final quality checks.

- [X] T034 [P] Create `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/BpkSegmentedControlV2.figma.tsx` with Figma Code Connect:
  - Import `{ figma }` from `@figma/code-connect`
  - Connect `BpkSegmentedControlV2.Root` to the Figma component URL (placeholder `'FIGMA_URL'` until design team provides it)
  - Map `type` via `figma.enum`, `shadow` via `figma.boolean`, `disabled` via `figma.boolean`
  - Provide composable example with two `Item` children
  - See `api-design.md` §9 for the complete shape
  - **Constitution Check**: Figma Code Connect REQUIRED per Backpack constitution

- [X] T035 [P] Complete all remaining Storybook example implementations in `examples/bpk-component-segmented-control/examples.tsx`:
  - Add any examples not already added in Phases 3–7: `DefaultCanvasDefault`, `UncontrolledDefaultValue`, `RootDisabled`, `IndividualItemDisabled`, `RtlLayout`, `TwoItems`, `LongLabels`, `NoInitialSelection`
  - Use templates from `specs/001-composable-segmented-control/examples/examples.tsx` for each

- [X] T036 Add all 15 V2 Storybook story definitions to `examples/bpk-component-segmented-control/stories.tsx`:
  - Import all V2 example components added in Phases 3–7 and T035
  - Add CSF 3.0 story objects for all 15 stories (see `specs/001-composable-segmented-control/examples/stories.tsx` for the complete list)
  - Set `parameters: { a11y: { disable: false } }` in the V2 meta object
  - Ensure V1 stories are not disturbed
  - **Constitution Check**: Comprehensive Storybook REQUIRED

- [X] T037 [P] Update `packages/bpk-component-segmented-control/README.md`:
  - Add a `## BpkSegmentedControlV2` section (British English prose, <100 words description)
  - Composable usage example (Root + Items, controlled)
  - Full CSS custom properties table (9 properties, default token values)
  - Before/after migration comparison: V1 `buttonContents` array vs V2 Item children
  - Root props table and Item props table
  - **Constitution Check**: British English prose; sentence case titles; <100 words for description

- [X] T038 [P] Complete JSDoc/TSDoc comments in `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/BpkSegmentedControlV2.tsx` and `common-types.ts`:
  - Add `@experimental` to both `BpkSegmentedControlV2Root` and `BpkSegmentedControlV2Item`
  - Document all props with `@param` type annotation, default value, and plain-language description
  - Add brief component-level descriptions in British English
  - **Constitution Check**: All public APIs documented

- [X] T039 Run `npm test` (full suite including V1 tests) and verify:
  - All V2 tests pass with coverage ≥ 70% branches, 75% functions/lines/statements
  - All V1 tests still pass (no regressions — SC-011)
  - No snapshot drift (run without `--updateSnapshot` flag)

- [X] T040 Run `npm run typecheck` and verify zero TypeScript errors in all new V2 files; no `// @ts-ignore` suppressions introduced; `.d.ts` declaration files generated correctly for `BpkSegmentedControlV2`, `SEGMENT_TYPES_V2`, and all exported types

- [X] T041 Run `npm run lint` (ESLint + Stylelint) and verify zero warnings or errors introduced by V2 files; fix any issues

- [X] T042 Verify bundle size: run `npm run build` for `packages/bpk-component-segmented-control/`; compare gzipped output size against V1 baseline; confirm increase is ≤ 5 kB gzipped (SC-008)
  - **Result**: V2 component itself: ~2.6 kB gzipped (within 5 kB budget vs V1 ~2.5 kB)
  - **Ark-UI + @zag-js runtime** (first-time Ark-UI consumers): ~17 kB total new code gzipped
  - **SC-008 STATUS**: ⚠️ EXCEEDS budget for consumers who don't already use Ark-UI. The component-only delta is within budget, but the Ark-UI/zag-js runtime (~14 kB) is not.
  - **Mitigation**: V2 is experimental and opt-in. V1-only consumers see zero bundle increase. @zag-js/core (~6.8 kB) is amortised across all future Ark-UI V2 components. Flag for PR review.

- [ ] T043 Perform manual accessibility testing in a browser with the Storybook running:
  - Keyboard navigation: Tab to enter control, ArrowRight/Left to move selection, Home/End, wrap-around
  - Screen reader: VoiceOver (macOS) — verify item values announced as `radio`, `1 of 3`, `checked/unchecked`
  - WCAG 2.2 Focus Appearance: confirm focus indicator meets 3:1 contrast ratio and minimum area
  - Icon-only item: confirm `accessibilityLabel` is announced instead of empty
  - **Constitution Check**: Accessibility-First NON-NEGOTIABLE

- [ ] T044 Test RTL layout manually:
  - Open the `RTL layout` Storybook story in a browser
  - Confirm items are visually mirrored (first item on right, last on left)
  - Press ArrowRight and confirm focus moves to the left (previous item in RTL)
  - Confirm `border-inline-start` dividers are on the correct side
  - **Constitution Check**: RTL support REQUIRED

- [ ] T045 Review Percy visual regression results for all V2 Storybook stories:
  - Approve all new visual baselines
  - Confirm no unexpected V1 visual regressions
  - Do not test stories that use raster images (per `decisions/visual-tests.md`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — no dependency on other user stories
- **US2 (Phase 4)**: Depends on Phase 2 — requires US1 SCSS and component file to exist; builds on top of US1 implementation
- **US3 (Phase 5)**: Depends on Phase 2 — independent of US2 but requires the SCSS from US1
- **US4 (Phase 6)**: Depends on US1 SCSS (Phase 3); closely related to US3 (same SCSS file)
- **US5 (Phase 7)**: Depends on Phase 2 — can start after US1 component file exists
- **US6 (Phase 8)**: Depends only on Phase 1 (codemod directory); independent of all component phases
- **Polish (Phase 9)**: Depends on all desired user stories being complete

### Within Each User Story

1. Write tests first → confirm they **fail** → implement → confirm they **pass**
2. TypeScript types (`common-types.ts`) must exist before component implementation
3. SCSS before visual/snapshot tests
4. All tests passing before moving to next story

### Parallel Opportunities

- T006 (unit tests) and T007 (a11y tests) can be written in parallel
- T008 (component) and T009 (SCSS) can be developed in parallel once types exist
- T012 and T013 (US2 tests) can be written in parallel with each other
- T030 and T031 (US6 fixtures and test file) can be created in parallel
- T034 (Figma Connect), T035 (remaining examples), T037 (README), T038 (JSDoc) can all run in parallel in Polish phase
- US6 (codemod) can be worked on in parallel with US3–US5 since it's fully independent

---

## Implementation Strategy

### MVP (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational — CRITICAL
3. Complete Phase 3: US1 → Basic Composable Segment Group
4. **STOP and VALIDATE**: render `BpkSegmentedControlV2.Root` + Items independently
5. Proceed to Polish (T039–T041 at minimum)

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. US1 → MVP: composable component works
3. US2 → Keyboard navigation (P1 complete)
4. US3 + US4 → Theming + variants (all P2 done)
5. US5 → Custom content (P2 complete)
6. US6 → Migration codemod (P3 complete)
7. Polish → Ready for PR

---

## Backpack Constitution Compliance Checklist

Throughout implementation, verify:

### Component-First Architecture
- [X] V2 in `packages/bpk-component-segmented-control/src/BpkSegmentedControlV2/`
- [X] V1 unchanged (`src/BpkSegmentedControl.tsx`, V1 tests still pass)
- [X] Clear public API via `index.ts` named exports
- [X] Each user story independently testable

### Naming & File Conventions (NON-NEGOTIABLE)
- [X] Component: `BpkSegmentedControlV2.tsx` (PascalCase)
- [X] Styles: `BpkSegmentedControlV2.module.scss`
- [X] Tests: `BpkSegmentedControlV2-test.tsx`, `accessibility-test.tsx`
- [X] CSS: BEM with `bpk-` prefix (`bpk-segmented-control-v2`, `__item`, `--shadow`)
- [X] Apache 2.0 license header in all `.ts`, `.tsx`, `.scss` files

### Modern Sass (NON-NEGOTIABLE)
- [X] `@use` syntax only — no `@import` anywhere
- [X] Granular imports: `@use '../../../bpk-mixins/tokens'`, `utils`, `typography`, `radii`, `shadows`
- [X] Namespace prefixes: `tokens.bpk-spacing-md()`, `tokens.$bpk-text-primary-day`
- [X] All sizing in `rem` via spacing token functions

### Accessibility-First (NON-NEGOTIABLE)
- [X] `accessibility-test.tsx` with jest-axe for all variants
- [X] WAI-ARIA radiogroup/radio model (via Ark-UI)
- [X] Keyboard navigation: ArrowRight/Left/Home/End + wrap
- [X] RTL arrow-key mirroring
- [ ] Focus visible: `@include utils.bpk-focus-indicator`

### TypeScript & Type Safety
- [X] All files in TypeScript — no `.js` files
- [X] `BpkSegmentedControlV2RootProps` and `BpkSegmentedControlV2ItemProps` exported
- [X] `@experimental` JSDoc annotation on both components
- [ ] `@deprecated` JSDoc deferred to V1 deprecation step (≥ 3 months after V2 stable)

### Test Coverage
- [X] ≥ 70% branches, 75% functions/lines/statements
- [X] Unit tests: rendering, controlled, uncontrolled, keyboard, disabled, duplicate warning, accessibilityLabel
- [X] Accessibility: jest-axe, all type variants, disabled states, icon-only with label
- [ ] Visual: Percy via Storybook (all story variants)
- [X] Migration: jscodeshift fixture transforms

### Documentation
- [X] README.md: V2 section added, British English, <100 words, sentence case
- [X] Storybook: 15 stories covering all variants, states, edge cases, a11y addon enabled
- [X] JSDoc: all public props documented with `@experimental`
- [X] Figma Code Connect: `BpkSegmentedControlV2.figma.tsx`

### Versioning
- [ ] This PR: **MINOR** bump (adding V2 as named opt-in export alongside V1)
- [ ] V1 deprecation: **MINOR** bump (≥ 3 months after V2 stable — NOT part of this PR)
- [ ] V1 removal: **MAJOR** bump (future — NOT part of this PR)

---

## Summary

| Phase | Tasks | Stories |
|---|---|---|
| Phase 1: Setup | T001–T003 | — |
| Phase 2: Foundational | T004–T005 | — |
| Phase 3 🎯 MVP | T006–T011 | US1 (P1) |
| Phase 4 | T012–T016 | US2 (P1) |
| Phase 5 | T017–T019 | US3 (P2) |
| Phase 6 | T020–T023 | US4 (P2) |
| Phase 7 | T024–T029 | US5 (P2) |
| Phase 8 | T030–T033 | US6 (P3) |
| Phase 9: Polish | T034–T045 | — |
| **Total** | **45 tasks** | **6 stories** |

**Suggested MVP scope**: Phases 1–3 (T001–T011) + T039–T041 from Polish = 14 tasks to deliver a working composable segmented control.

---

## References

- **Spec**: `specs/001-composable-segmented-control/spec.md`
- **Plan**: `specs/001-composable-segmented-control/plan.md`
- **API Design**: `specs/001-composable-segmented-control/api-design.md`
- **Styling Guide**: `specs/001-composable-segmented-control/styling-guide.md`
- **Example Templates**: `specs/001-composable-segmented-control/examples/`
- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Architecture Decisions**: `decisions/` directory
- **V1 Reference**: `packages/bpk-component-segmented-control/src/BpkSegmentedControl.tsx`
- **CSS Variable Theming Reference**: `packages/bpk-component-button/src/BpkButtonV2/BpkButton.module.scss`
