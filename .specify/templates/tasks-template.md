# Tasks: [COMPONENT NAME]

**Input**: Design documents from `/specs/[###-component-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, api-design.md, styling-guide.md, examples/

**Backpack Context**: This component will be implemented in `packages/bpk-component-[name]/` following Backpack constitution and architecture decisions.

**Tests**: Tests are MANDATORY for Backpack components. All tasks include test requirements.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Backpack Path Conventions

- **Component Package**: `packages/bpk-component-[name]/`
- **Source Files**: `packages/bpk-component-[name]/src/BpkComponentName/`
- **Test Files**: Same directory as source (e.g., `BpkComponentName-test.tsx`)
- **Examples**: `examples/bpk-component-[name]/`

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Component requirements from plan.md
  - API design from api-design.md
  - Styling requirements from styling-guide.md
  - Backpack constitution principles from .specify/memory/constitution.md

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Package Initialization)

**Purpose**: Initialize component package structure per Backpack standards

- [ ] T001 Create package directory `packages/bpk-component-[name]/`
- [ ] T002 [P] Create `packages/bpk-component-[name]/index.ts` export file
- [ ] T003 [P] Create `packages/bpk-component-[name]/README.md` stub (will be completed in Phase 5)
- [ ] T004 [P] Create `packages/bpk-component-[name]/src/Bpk[ComponentName]/` directory (e.g., `src/BpkButton/`)
- [ ] T005 [P] Create `packages/bpk-component-[name]/docs/` directory for assets

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Create TypeScript types file `packages/bpk-component-[name]/src/Bpk[ComponentName]/common-types.ts` (e.g., `BpkButton/common-types.ts`) with component props interface
- [ ] T007 Create theme attributes file `packages/bpk-component-[name]/src/themeAttributes.ts` (if component is themeable)
- [ ] T008 [P] Setup test utilities and mocks in `packages/bpk-component-[name]/src/__mocks__/` if needed
- [ ] T009 Verify constitution compliance: PascalCase naming, `.module.scss` extension, test file naming

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (MANDATORY) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [P] [US1] Create unit test file `packages/bpk-component-[name]/src/Bpk[ComponentName]/Bpk[ComponentName]-test.tsx` (e.g., `BpkButton/BpkButton-test.tsx`)
  - Test rendering with required props
  - Test rendering with optional props
  - Test all variants (e.g., primary, secondary, tertiary)
  - Test snapshot for default state
  - **Constitution Check**: Uses Jest + Testing Library, targets 70% branches, 75% functions/lines

- [ ] T011 [P] [US1] Create accessibility test file `packages/bpk-component-[name]/src/Bpk[ComponentName]/accessibility-test.tsx`
  - Test with jest-axe for no violations
  - Test keyboard navigation (Tab, Enter, Space)
  - Test ARIA attributes
  - Test focus management
  - **Constitution Check**: NON-NEGOTIABLE - all components MUST have accessibility tests

- [ ] T012 [P] [US1] Create Storybook story `examples/bpk-component-[name]/stories.tsx`
  - Default story with minimal props
  - All variants story
  - All sizes story
  - **Constitution Check**: Required for visual regression testing with Percy

### Implementation for User Story 1

- [ ] T013 [US1] Create main component file `packages/bpk-component-[name]/src/Bpk[ComponentName]/Bpk[ComponentName].tsx` (e.g., `BpkButton/BpkButton.tsx`)
  - Implement component with TypeScript
  - Export default component
  - Add JSDoc comments (British English prose)
  - **Constitution Check**: TypeScript NON-NEGOTIABLE, JSDoc required

- [ ] T014 [US1] Create component styles `packages/bpk-component-[name]/src/Bpk[ComponentName]/Bpk[ComponentName].module.scss` (e.g., `BpkButton/BpkButton.module.scss`)
  - Use `@use` syntax to import from `bpk-mixins` (e.g., `@use '../../../bpk-mixins/tokens'`)
  - Import granularly (tokens, typography, shadows, etc.)
  - Use BEM naming with `bpk-` prefix (e.g., `.bpk-button`, `.bpk-button--primary`)
  - Use `rem` units for all sizing (NOT `px` or `em`)
  - Use design tokens for all values (e.g., `tokens.bpk-spacing-md()`, `tokens.$bpk-color-white`)
  - **Constitution Check**: Modern Sass NON-NEGOTIABLE, rem units REQUIRED

- [ ] T015 [US1] Add prop validation and default props in component
  - Define prop types with TypeScript
  - Set default values for optional props
  - Add prop-types for runtime validation (during migration period)
  - **Constitution Check**: TypeScript types + prop-types during migration

- [ ] T016 [US1] Implement keyboard event handlers for accessibility
  - Handle Enter key
  - Handle Space key
  - Handle Tab navigation
  - **Constitution Check**: Keyboard accessibility REQUIRED

- [ ] T017 [US1] Add ARIA attributes for screen reader support
  - aria-label or aria-labelledby
  - aria-disabled for disabled state
  - role attribute if needed
  - **Constitution Check**: Accessibility-First principle

- [ ] T018 [US1] Implement RTL (right-to-left) support
  - Use logical properties where applicable
  - Test with `isRTL` utility from `bpk-react-utils`
  - Ensure directional properties work correctly
  - **Constitution Check**: RTL support REQUIRED

- [ ] T019 [US1] Run tests and verify they pass
  - Run `npm run jest` for unit tests
  - Run `npm run jest:accessibility` for a11y tests
  - Verify coverage meets thresholds (70% branches, 75% functions/lines/statements)
  - **Constitution Check**: Coverage thresholds MUST be met

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (MANDATORY) ⚠️

- [ ] T021 [P] [US2] Add new test cases to `BpkComponentName-test.tsx` for US2 functionality
- [ ] T022 [P] [US2] Add new accessibility test cases to `accessibility-test.tsx` for US2
- [ ] T023 [P] [US2] Add new Storybook stories for US2 variants

### Implementation for User Story 2

- [ ] T024 [US2] Extend component in `BpkComponentName.tsx` with US2 functionality
- [ ] T025 [US2] Add new styles to `BpkComponentName.module.scss` for US2 variants
- [ ] T026 [US2] Update TypeScript types in `common-types.ts` for new props
- [ ] T027 [US2] Add JSDoc documentation for new props
- [ ] T028 [US2] Test integration with User Story 1 (ensure backward compatibility)
- [ ] T029 [US2] Run tests and verify they pass

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (MANDATORY) ⚠️

- [ ] T030 [P] [US3] Add new test cases for US3
- [ ] T031 [P] [US3] Add new accessibility tests for US3
- [ ] T032 [P] [US3] Add new Storybook stories for US3

### Implementation for User Story 3

- [ ] T033 [US3] Extend component with US3 functionality
- [ ] T034 [US3] Add US3 styles
- [ ] T035 [US3] Update types and documentation
- [ ] T036 [US3] Run tests and verify they pass

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Documentation & Polish

**Purpose**: Complete documentation and polish for release

- [ ] TXXX [P] Complete `packages/bpk-component-[name]/README.md`
  - Component description (<100 words, British English prose)
  - Title in sentence case, singular form (e.g., "Bar chart" not "Bar Charts")
  - Usage examples with code snippets
  - Props table with descriptions
  - Browser support information
  - **Constitution Check**: British English prose, <100 words, sentence case

- [ ] TXXX [P] Complete JSDoc/TSDoc comments for all public APIs
  - Component description
  - All props documented
  - Use `@deprecated` tags for any deprecated props
  - Include usage examples
  - **Constitution Check**: Documentation Standards principle

- [ ] TXXX [P] Create Figma Code Connect file `packages/bpk-component-[name]/src/BpkComponentName/BpkComponentName.figma.tsx`
  - Connect component to Figma designs
  - Map props to Figma properties
  - Provide usage examples
  - **Constitution Check**: Figma Code Connect REQUIRED

- [ ] TXXX [P] Complete all Storybook stories in `examples/bpk-component-[name]/stories.tsx`
  - Default story
  - All variants and sizes
  - Interactive states (hover, focus, active, disabled)
  - Edge cases (long text, empty, error)
  - Accessibility demo
  - **Constitution Check**: Comprehensive Storybook REQUIRED

- [ ] TXXX [P] Add component screenshots to `packages/bpk-component-[name]/docs/screenshots/`
  - Screenshot for README
  - Screenshots for documentation

- [ ] TXXX Run visual regression tests with Percy (if component doesn't use images)
  - Ensure all visual variants are tested
  - Review and approve Percy changes
  - **Constitution Check**: Skip if component uses images (per decisions/visual-tests.md)

- [ ] TXXX Run full test suite and verify all pass
  - `npm run test` (includes lint, type-check, jest)
  - Verify coverage thresholds met
  - Fix any failing tests

- [ ] TXXX Verify TypeScript compilation
  - Run `npm run typecheck`
  - Ensure no TypeScript errors
  - Generate `.d.ts` declaration files

- [ ] TXXX Verify ESLint and Stylelint pass
  - Run `npm run lint:js`
  - Run `npm run lint:scss`
  - Fix any linting errors

- [ ] TXXX Build component and verify output
  - Run `npm run build`
  - Check `dist/` output
  - Verify styles compiled correctly

- [ ] TXXX Test component in all supported browsers
  - Chrome >= 109
  - Edge >= 129
  - Firefox >= 131
  - Safari >= 15
  - Samsung >= 26
  - **Constitution Check**: Browser support REQUIRED

- [ ] TXXX Perform manual accessibility testing
  - Test with keyboard navigation
  - Test with screen reader (VoiceOver, NVDA, JAWS)
  - Test focus management
  - Verify WCAG 2.1 Level AA compliance
  - **Constitution Check**: Accessibility-First NON-NEGOTIABLE

- [ ] TXXX Test RTL language support
  - Switch language to Arabic or Hebrew
  - Verify layout mirrors correctly
  - Test directional properties
  - **Constitution Check**: RTL support REQUIRED

- [ ] TXXX Update package.json with correct version per SemVer
  - MAJOR: Breaking changes (API, visual, tokens, removal)
  - MINOR: New features (new component, optional props, deprecations)
  - PATCH: Bug fixes, dependencies, quality improvements
  - **Constitution Check**: SemVer MUST be followed (decisions/versioning-rules.md)

- [ ] TXXX Add any deprecation warnings if applicable
  - Add `@deprecated` JSDoc tags
  - Add runtime `console.warn` for deprecated props
  - Document migration path in README
  - **Constitution Check**: Minimum 3-month deprecation timeline

- [ ] TXXX Code review and address feedback
  - Submit PR
  - Address review comments
  - Verify constitution compliance
  - Get approval from maintainer

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Documentation & Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD approach)
- TypeScript types before implementation
- Component implementation before styles
- Styles before visual tests
- All tests passing before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- All Documentation & Polish tasks marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Complete Documentation & Polish for MVP
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Backpack Constitution Compliance Checklist

Throughout implementation, verify compliance with:

### Component-First Architecture
- [ ] Package in `packages/bpk-component-[name]/`
- [ ] Self-contained with own tests, styles, docs
- [ ] Clear public API
- [ ] Independently testable

### Naming & File Conventions (NON-NEGOTIABLE)
- [ ] Component files: PascalCase (e.g., `BpkButton.tsx`)
- [ ] Style files: `.module.scss` matching component name
- [ ] Test files: `*-test.tsx`, `accessibility-test.tsx`
- [ ] CSS classes: BEM with `bpk-` prefix
- [ ] License headers: Apache 2.0 header in all .ts, .tsx, .js, .jsx, .scss, .css files

### Modern Sass (NON-NEGOTIABLE)
- [ ] Using `@use` syntax (NOT `@import`)
- [ ] Granular imports from `bpk-mixins` submodules
- [ ] Namespace prefixes (e.g., `tokens.bpk-spacing-md()`)
- [ ] All sizing in `rem` units

### Accessibility-First (NON-NEGOTIABLE)
- [ ] `accessibility-test.tsx` with jest-axe
- [ ] Keyboard navigation support
- [ ] ARIA attributes
- [ ] Screen reader support
- [ ] WCAG 2.1 Level AA compliance

### TypeScript & Type Safety
- [ ] All code in TypeScript
- [ ] Proper type definitions
- [ ] `.d.ts` files generated
- [ ] `@deprecated` tags for deprecated APIs

### Test Coverage
- [ ] 70% branches, 75% functions/lines/statements
- [ ] Unit tests (Jest + Testing Library)
- [ ] Accessibility tests (jest-axe)
- [ ] Visual tests (Percy, unless uses images)
- [ ] Snapshot tests

### Documentation
- [ ] README.md (British English, <100 words, sentence case)
- [ ] Storybook stories (comprehensive examples)
- [ ] JSDoc comments (all public APIs)
- [ ] Figma Code Connect

### Versioning
- [ ] Follows SemVer rules
- [ ] Deprecation timeline (3 months minimum)
- [ ] Future API management (V2 components)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (TDD)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Constitution compliance is NON-NEGOTIABLE

## References

- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Architecture Decisions**: `decisions/` directory
- **Component Examples**: `packages/` directory
- **Design Tokens**: `@skyscanner/bpk-foundations-web`, `packages/bpk-mixins/`
- **React Utilities**: `packages/bpk-react-utils/`
- **Testing Patterns**: Existing component test files
