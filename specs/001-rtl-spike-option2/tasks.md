# Tasks: RTL Spike Option 2 — Ark LocaleProvider in BpkProvider

**Branch**: `001-rtl-spike-option2` | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

---

## Phase 1: Core Implementation

### Goal: BpkProvider wraps Ark LocaleProvider reactively (FR-001, FR-002, FR-003)

- [X] T001 [US1] Modify packages/bpk-component-layout/src/BpkProvider.tsx — add useDocumentDir hook and LocaleProvider wrapper

---

## Phase 2: Storybook — Before/After comparison (US1 + US2)

### Goal: Visually confirm Ark RTL works inside BpkProvider and non-Ark components are unaffected

- [X] T002 [P] [US1] Add RtlOption2BeforeExample (BpkCheckboxV2 WITHOUT BpkProvider) to examples/bpk-component-checkbox-v2/examples.tsx
- [X] T003 [P] [US1] Add RtlOption2AfterExample (BpkCheckboxV2 WITH BpkProvider) to examples/bpk-component-checkbox-v2/examples.tsx
- [X] T004 [US1] Export RtlOption2Before and RtlOption2After in examples/bpk-component-checkbox-v2/stories.tsx

---

## Phase 3: Storybook — Mixed live toggle (US3 + US4)

### Goal: Validate that Ark-based and non-Ark components both respond correctly to live direction toggle

- [X] T005 [US3] Add RtlOption2MixedLiveToggleExample (BpkCheckboxV2 + BpkSegmentedControlV2 + BpkText in one BpkProvider) to examples/bpk-component-segmented-control-v2/examples.tsx
- [X] T006 [US3] Export RtlOption2MixedLiveToggle in examples/bpk-component-segmented-control-v2/stories.tsx

---

## Dependencies

- T002, T003 depend on T001 (need LocaleProvider in place to observe RTL effect)
- T005 depends on T001

## Validation

After completing all tasks, validate in Storybook:
1. `npm run storybook`
2. Open `bpk-component-checkbox-v2 / RTL Option 2 — Before` → toggle RTL → no Ark RTL layout change
3. Open `bpk-component-checkbox-v2 / RTL Option 2 — After` → toggle RTL → checkbox indicator moves to right
4. Open `bpk-component-segmented-control-v2 / RTL Option 2 — Mixed live toggle` → toggle RTL → all three components update simultaneously
