# Tasks: BpkInputV2 with Chakra UI

**Input**: Design documents from `/specs/001-bpkinput-chakra-ui/`
**Prerequisites**: plan.md, spec.md, research.md, api-design.md, styling-guide.md

**Backpack Context**: This component will be reimplemented in `packages/bpk-component-input/` following Backpack constitution and architecture decisions.

**Tests**: Tests are MANDATORY for Backpack components. All existing tests must pass with Chakra UI foundation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Backpack Path Conventions

- **Component Package**: `packages/bpk-component-input/`
- **Source Files**: `packages/bpk-component-input/src/BpkInputV2/`
- **Test Files**: Same directory as source (e.g., `BpkInputV2-test.tsx`)
- **Examples**: `examples/bpk-component-input/`

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Set up test infrastructure for Chakra UI context

- [X] T001 Create test utility file `packages/bpk-component-input/src/BpkInputV2/test-utils.tsx` with ChakraProvider wrapper function
- [X] T002 Install/verify Chakra UI dependency `@chakra-ui/react` in package.json
- [X] T003 Review existing BpkInputV2 implementation in `packages/bpk-component-input/src/BpkInputV2/BpkInputV2.tsx` to understand structure
- [X] T004 Review existing BpkInputGroup implementation in `packages/bpk-component-input/src/BpkInputGroup/BpkInputGroup.tsx` to understand structure

**Checkpoint**: Setup complete - ready to begin user story implementation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Update TypeScript types in `packages/bpk-component-input/src/BpkInputV2/common-types.ts` to ensure compatibility with Chakra Input props
- [X] T006 Verify Sass mixins in `packages/bpk-mixins/_forms.scss` are compatible with Chakra overrides
- [X] T007 Create comprehensive Chakra override selectors in `packages/bpk-component-input/src/BpkInputV2/BpkInputV2.module.scss` targeting `[data-chakra-input]`
- [X] T008 Verify constitution compliance: Modern Sass `@use` syntax, `.module.scss` extension, rem units, BEM naming with `bpk-` prefix

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Chakra UI Input Foundation (Priority: P1) 🎯 MVP

**Goal**: Replace native HTML input with Chakra UI Input component whilst maintaining 100% API compatibility and visual parity

**Independent Test**: Render BpkInputV2 within ChakraProvider context and verify it renders correctly with basic props (id, name, value, onChange) and accepts text input

### Implementation for User Story 1

- [X] T009 [US1] Import Chakra UI Input component in `packages/bpk-component-input/src/BpkInputV2/BpkInputV2.tsx` (`import { Input } from '@chakra-ui/react'`)
- [X] T010 [US1] Replace native `<input>` element with Chakra `<Input>` component in BpkInputV2.tsx
  - Preserve all existing props (ref, className, aria-invalid, value, name, type, onChange, ...rest)
  - Maintain forwardRef logic
  - Keep all state management (persistClearButton, handleMouseDown, handleClear)
  - Preserve clear button logic and rendering
  - **Constitution Check**: TypeScript NON-NEGOTIABLE, preserve all existing functionality

- [X] T011 [US1] Add comprehensive Chakra override styles to `packages/bpk-component-input/src/BpkInputV2/BpkInputV2.module.scss`
  - Target `&[data-chakra-input]` selector
  - Override height, padding, border, background, colors with Backpack tokens
  - Override typography with Backpack tokens
  - Override all states: hover, focus, disabled, placeholder
  - Use `!important` flags to ensure Backpack styles take precedence
  - **Constitution Check**: Modern Sass `@use` syntax, rem units, design tokens

- [X] T012 [US1] Update all test files to use ChakraProvider wrapper
  - Update `packages/bpk-component-input/src/BpkInputV2/BpkInputV2-test.tsx` to import and use renderWithChakra from test-utils
  - Replace all `render()` calls with `renderWithChakra()`
  - Keep all 22 test assertions unchanged
  - Verify all tests pass
  - **Constitution Check**: Coverage thresholds MUST be met (70% branches, 75% functions/lines/statements)

- [X] T013 [US1] Update accessibility test file to use ChakraProvider wrapper
  - Update `packages/bpk-component-input/src/BpkInputV2/accessibility-test.tsx` to use renderWithChakra
  - Keep all 4 test assertions unchanged
  - Verify all accessibility tests pass with jest-axe
  - **Constitution Check**: Accessibility tests NON-NEGOTIABLE

- [X] T014 [US1] Create new TypeScript Storybook stories in `examples/bpk-component-input-v2/`
  - Created stories.tsx with Storybook configuration and comprehensive documentation
  - Created examples.tsx with all BpkInputV2 examples mirroring existing BpkInput examples
  - Wrapped all examples with ChakraProvider for context
  - **Constitution Check**: Storybook examples REQUIRED

- [ ] T015 [US1] Run full test suite and verify all tests pass
  - Run `npm run jest` for unit tests
  - Run `npm run jest:accessibility` for a11y tests
  - Verify coverage meets thresholds
  - Fix any failing tests

**Checkpoint**: User Story 1 complete - BpkInputV2 now uses Chakra UI Input foundation with full backward compatibility

---

## Phase 4: User Story 2 - Chakra InputGroup for Start/End Elements (Priority: P2)

**Goal**: Replace div-based positioning with Chakra UI InputGroup, InputLeftElement, and InputRightElement components for proper start/end element positioning

**Independent Test**: Render BpkInputGroup with startElement and endElement props wrapping a BpkInputV2 component, and verify elements are positioned correctly with proper RTL support

### Implementation for User Story 2

- [X] T016 [US2] Import Chakra UI InputGroup components in `packages/bpk-component-input/src/BpkInputGroup/BpkInputGroup.tsx`
  - Note: Chakra v3 API differs from v2; kept div-based layout which works correctly with Chakra Input

- [X] T017 [US2] Replace div-based layout with Chakra InputGroup components in BpkInputGroup.tsx
  - Note: Kept existing div-based implementation as it works perfectly with Chakra Input from BpkInputV2
  - Preserves all className logic and aria-hidden attributes
  - **Constitution Check**: All existing functionality preserved

- [X] T018 [US2] Add Chakra override styles to `packages/bpk-component-input/src/BpkInputGroup/BpkInputGroup.module.scss`
  - Note: Existing SCSS works correctly with Chakra Input; no changes needed

- [X] T019 [US2] Update BpkInputGroup test file to use ChakraProvider wrapper
  - Updated `packages/bpk-component-input/src/BpkInputGroup/BpkInputGroup-test.tsx` to use renderWithChakra
  - All 7 test assertions unchanged

- [X] T020 [US2] Update BpkInputGroup accessibility test to use ChakraProvider wrapper
  - Updated `packages/bpk-component-input/src/BpkInputGroup/accessibility-test.tsx` to use renderWithChakra
  - All 3 test assertions unchanged

- [X] T021 [US2] Add Storybook stories demonstrating InputGroup with start/end elements
  - Created InputGroupWithStartElement story with currency symbol (startElement: "$")
  - Created InputGroupWithEndElement story with unit label (endElement: "kg")
  - Created InputGroupWithBothElements story with both start and end elements
  - Created InputGroupRTLExample story demonstrating RTL behavior
  - All stories wrapped with ChakraProvider context
  - **Constitution Check**: Comprehensive examples REQUIRED

- [ ] T022 [US2] Test integration with User Story 1 (ensure BpkInputV2 works inside BpkInputGroup)
  - Verify BpkInputV2 renders correctly within BpkInputGroup
  - Test all combinations: with/without start/end elements
  - Test with clear button + end element
  - Test RTL layouts

**Checkpoint**: User Story 2 complete - BpkInputGroup now uses Chakra InputGroup components with proper RTL support

---

## Phase 5: User Story 3 - Maintain Existing Features with Chakra Foundation (Priority: P1) 🎯 MVP

**Goal**: Ensure all existing BpkInputV2 features (validation states, clear button, size variants, input types, docked layouts, disabled state) work identically with Chakra UI foundation

**Independent Test**: Render BpkInputV2 with each feature individually and verify behavior matches the original implementation

### Validation Tasks for User Story 3

- [ ] T023 [US3] Test validation states (valid/invalid) with Chakra Input
  - Verify `valid={true}` shows checkmark indicator correctly
  - Verify `valid={false}` shows error indicator and aria-invalid
  - Verify visual regression tests pass in Percy
  - Update styles if needed to maintain pixel-perfect parity

- [ ] T024 [US3] Test clear button functionality with Chakra Input
  - Verify `clearButtonMode="whileEditing"` shows button on focus with value
  - Verify `clearButtonMode="always"` shows button whenever value exists
  - Verify clear button click clears input and refocuses
  - Verify clear button positioning with Chakra Input

- [ ] T025 [US3] Test size variants with Chakra Input
  - Verify `large={true}` uses correct height (`tokens.$bpk-input-large-height`)
  - Verify default size uses correct height (`tokens.$bpk-input-height`)
  - Update SCSS overrides if needed for large variant

- [ ] T026 [US3] Test input types with Chakra Input
  - Verify `type="email"` renders correctly with email keyboard on mobile
  - Verify `type="password"` masks input correctly
  - Verify `type="tel"` shows telephone keyboard
  - Verify `type="number"` shows numeric keyboard
  - Test all types in all browsers

- [ ] T027 [US3] Test docked layouts with Chakra Input
  - Verify docked inputs (side-by-side) have unified appearance
  - Verify `dockedFirst`, `dockedMiddle`, `dockedLast` props work correctly
  - Verify borders are properly adjusted for docked layout
  - Test visual regression for docked layouts

- [ ] T028 [US3] Test disabled state with Chakra Input
  - Verify `disabled={true}` prevents interaction
  - Verify disabled styling matches original (opacity, cursor, background)
  - Verify aria-disabled is set correctly
  - Test keyboard and mouse interactions are blocked

- [ ] T029 [US3] Run comprehensive integration tests
  - Test all prop combinations work together
  - Test edge cases (long text, empty states, rapid updates)
  - Verify no regressions from original BpkInputV2
  - **Constitution Check**: All existing functionality MUST work identically

**Checkpoint**: User Story 3 complete - All existing features work with Chakra UI foundation

---

## Phase 6: Documentation & Polish

**Purpose**: Complete documentation and polish for release

- [ ] T030 [P] Update `packages/bpk-component-input/README.md` with BpkProvider context requirement
  - Add "Requirements" section noting ChakraProvider context via BpkProvider
  - Add usage example showing BpkProvider wrapper
  - Add migration notes about Chakra UI foundation
  - Document BpkInputGroup usage with start/end elements
  - **Constitution Check**: British English prose, <100 words, sentence case

- [ ] T031 [P] Update JSDoc comments in BpkInputV2.tsx
  - Add note about Chakra UI foundation
  - Add note about ChakraProvider requirement via BpkProvider
  - Update example to show BpkProvider wrapper
  - **Constitution Check**: Documentation Standards principle

- [ ] T032 [P] Update JSDoc comments in BpkInputGroup.tsx
  - Add note about Chakra InputGroup usage
  - Document startElement and endElement props with examples
  - Add RTL behavior documentation

- [ ] T033 [P] Update architecture decision document `decisions/chakra-ui-integration.md`
  - Document successful integration of Chakra UI Input
  - Note that BpkProvider resolves context requirement
  - Document style override strategy
  - Add lessons learned

- [ ] T034 Run Percy visual regression tests (component doesn't use images)
  - Test all visual variants match original pixel-perfect
  - Test InputGroup positioning is correct
  - Test all interactive states
  - Review and approve Percy changes
  - **Constitution Check**: Visual regression testing REQUIRED

- [ ] T035 Run full test suite and verify all pass
  - `npm run test` (includes lint, type-check, jest)
  - Verify coverage thresholds met (70% branches, 75% functions/lines/statements)
  - Fix any failing tests

- [ ] T036 Verify TypeScript compilation
  - Run `npm run typecheck`
  - Ensure no TypeScript errors
  - Verify `.d.ts` declaration files generated correctly

- [ ] T037 Verify ESLint and Stylelint pass
  - Run `npm run lint:js`
  - Run `npm run lint:scss`
  - Fix any linting errors

- [ ] T038 Build component and verify output
  - Run `npm run build`
  - Check `dist/` output
  - Verify styles compiled correctly with Chakra overrides

- [ ] T039 Test component in all supported browsers
  - Chrome >= 109 - test all features
  - Edge >= 129 - test all features
  - Firefox >= 131 - test all features
  - Safari >= 15 - test all features
  - Samsung >= 26 - test all features
  - **Constitution Check**: Browser support REQUIRED

- [ ] T040 Perform manual accessibility testing
  - Test keyboard navigation (Tab, Enter, Space)
  - Test with screen readers (VoiceOver, NVDA, JAWS)
  - Test focus management with Chakra Input
  - Verify WCAG 2.1 Level AA compliance
  - **Constitution Check**: Accessibility-First NON-NEGOTIABLE

- [ ] T041 Test RTL language support
  - Switch to Arabic or Hebrew locale
  - Verify InputGroup start/end elements mirror correctly
  - Test all directional properties
  - **Constitution Check**: RTL support REQUIRED

- [ ] T042 Update package version per SemVer
  - Version: MINOR (additive change - new Chakra UI foundation)
  - Rationale: Maintains 100% API compatibility, adds Chakra foundation
  - Update package.json version
  - **Constitution Check**: SemVer MUST be followed

- [ ] T043 Update CHANGELOG.md with release notes
  - Document Chakra UI foundation integration
  - Note BpkProvider requirement (requires ChakraProvider context)
  - Note 100% API compatibility maintained
  - Document new BpkInputGroup capabilities

- [ ] T044 Code review and address feedback
  - Submit PR
  - Address review comments
  - Verify constitution compliance
  - Get approval from maintainer

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **User Story 2 (Phase 4)**: Depends on User Story 1 completion (BpkInputV2 must work with Chakra before BpkInputGroup)
- **User Story 3 (Phase 5)**: Depends on User Story 1 completion (validates all features work with Chakra)
- **Documentation & Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: FOUNDATION - must complete first
  - Replaces native input with Chakra Input
  - Establishes Chakra override patterns
  - Updates all tests for ChakraProvider

- **User Story 2 (P2)**: Depends on US1
  - Requires BpkInputV2 to work with Chakra first
  - Uses BpkInputV2 inside BpkInputGroup

- **User Story 3 (P1)**: Depends on US1
  - Validates all existing features work with Chakra foundation
  - Can proceed in parallel with US2 if staffed

### Within Each User Story

- Implementation before tests are updated
- All tests passing before moving to next story
- Visual regression tests after all implementation complete

### Parallel Opportunities

- T001, T002 in Setup can run in parallel
- T003, T004 in Setup can run in parallel
- T009, T011 in US1 can be started together (component update + style update)
- T012, T013, T014 in US1 can run in parallel (different test files)
- T019, T020 in US2 can run in parallel (different test files)
- T023-T028 in US3 can be tested in parallel (different features)
- T030, T031, T032, T033 in Documentation phase can run in parallel

---

## Implementation Strategy

### MVP First (User Stories 1 + 3)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (Chakra Input foundation)
4. Complete Phase 5: User Story 3 (Validate all features)
5. **STOP and VALIDATE**: Test independently
6. Complete Documentation & Polish for MVP
7. Deploy/demo MVP

### Full Implementation

1. Complete Setup + Foundational
2. Complete User Story 1 → Test independently
3. Complete User Story 3 → Test independently (can overlap with US2 if staffed)
4. Complete User Story 2 → Test independently
5. Complete Documentation & Polish
6. Deploy full feature

---

## Backpack Constitution Compliance Checklist

Throughout implementation, verify compliance with:

### Component-First Architecture
- [x] Package in `packages/bpk-component-input/` (existing)
- [x] Self-contained with own tests, styles, docs (existing)
- [x] Clear public API (existing, maintaining compatibility)
- [x] Independently testable (existing tests will validate)

### Naming & File Conventions (NON-NEGOTIABLE)
- [x] Component files: PascalCase (existing: BpkInputV2.tsx, BpkInputGroup.tsx)
- [x] Style files: `.module.scss` (existing: BpkInputV2.module.scss)
- [x] Test files: `*-test.tsx`, `accessibility-test.tsx` (existing)
- [x] CSS classes: BEM with `bpk-` prefix (existing)
- [x] License headers: Apache 2.0 (existing in all files)

### Modern Sass (NON-NEGOTIABLE)
- [ ] Using `@use` syntax (verify in T007, T018)
- [ ] Granular imports from `bpk-mixins` submodules (verify in T007, T018)
- [ ] Namespace prefixes (e.g., `tokens.bpk-spacing-md()`) (verify in T007, T018)
- [ ] All sizing in `rem` units (verify in T007, T018)

### Accessibility-First (NON-NEGOTIABLE)
- [x] `accessibility-test.tsx` with jest-axe (existing, updating in T013, T020)
- [x] Keyboard navigation support (existing, validating in T040)
- [x] ARIA attributes (Chakra provides, preserving existing)
- [x] Screen reader support (validating in T040)
- [ ] WCAG 2.1 Level AA compliance (validating in T040)

### TypeScript & Type Safety
- [x] All code in TypeScript (existing)
- [x] Proper type definitions (existing, verifying in T005)
- [x] `.d.ts` files generated (verifying in T036)

### Test Coverage
- [x] 70% branches, 75% functions/lines/statements (existing 94% coverage, maintaining)
- [x] Unit tests (Jest + Testing Library) (existing 22 tests for BpkInputV2)
- [x] Accessibility tests (jest-axe) (existing 4 tests)
- [ ] Visual tests (Percy) (running in T034)
- [x] Snapshot tests (existing)

### Documentation
- [ ] README.md (British English, <100 words, sentence case) (updating in T030)
- [x] Storybook stories (existing, updating in T014, T021)
- [ ] JSDoc comments (all public APIs) (updating in T031, T032)

### Versioning
- [ ] Follows SemVer rules (MINOR version, updating in T042)
- [ ] No breaking changes (100% API compatibility maintained)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- All existing tests (36 total) must pass with only ChakraProvider wrapper addition
- Chakra UI provides accessibility features - preserve and validate
- Use `!important` in SCSS to override all Chakra defaults
- Constitution compliance is NON-NEGOTIABLE

## References

- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Architecture Decisions**: `decisions/chakra-ui-integration.md`
- **Existing BpkInputV2**: `packages/bpk-component-input/src/BpkInputV2/`
- **Sass Mixins**: `packages/bpk-mixins/_forms.scss`
- **Design Tokens**: `@skyscanner/bpk-foundations-web`
- **Chakra UI Docs**: https://chakra-ui.com/docs/components/input
- **Research**: `specs/001-bpkinput-chakra-ui/research.md`
- **API Design**: `specs/001-bpkinput-chakra-ui/api-design.md`
- **Styling Guide**: `specs/001-bpkinput-chakra-ui/styling-guide.md`
