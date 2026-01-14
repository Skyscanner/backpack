# Component Specification: TypeScript Migration for BpkTable

**Package Branch**: `090-table-typescript`
**Created**: 2026-01-14
**Updated**: 2026-01-14 (File extension correction)
**Status**: Draft
**Input**: User description: "help me to migrate bpk-component-table and examples/bpk-component-table to fully support Typescript，I have following Acceptance Criteria: - The component's public API must remain completely unchanged, with all props, exports, default values, and behavior identical to the original Flow implementation. - Exported TypeScript types must match the original Flow type semantics, keeping optional props optional and required props required. - All existing tests must pass without modifications, snapshots must remain identical, and accessibility tests must continue passing. - Default values, event handling, lifecycle methods, and ref forwarding must behave exactly as before migration. - The component must build successfully without TypeScript errors or warnings, and bundle size should not significantly change"

**CRITICAL UPDATE**: Fix incorrect file extensions - logic files should be `.ts` (not `.tsx`), only files with JSX should be `.tsx`

## Clarifications

### Session 2026-01-14

- Q: Based on the existing TypeScript components (BpkButton, BpkCalendar) in the repository, how should TypeScript types be organized? → A: Define types inline within each component file (like BpkCalendar does)
- Q: How should rest props (`...rest`) be typed in TypeScript to match the Flow inexact object pattern? → A: Use `[rest: string]: any; // Inexact rest. See decisions/inexact-rest.md` (matches BpkButton pattern). If Storybook's react-docgen fails, fallback to intersection with React HTML attributes only
- Q: Should test files use `.ts` or `.tsx` extension after migration? → A: Use `.tsx` extension for all test files (matches BpkButton pattern: `BpkButton-test.tsx`, `accessibility-test.tsx`). Logic files without JSX should use `.ts` extension
- Q: How should TypeScript types be exported for consumer use? → A: Export types alongside component exports in each file (e.g., `export type BpkTableProps = {...}; export const BpkTable = ...`)

## Constitution Check

*GATE: Must pass before implementation begins.*

- [x] **Component-First Architecture**: Component already exists in `packages/bpk-component-table/`
- [x] **Naming Conventions**: Component names follow PascalCase (BpkTable, BpkTableHead, etc.)
- [x] **Modern Sass**: Currently uses `@use` syntax with granular imports from `bpk-mixins`
- [x] **Accessibility-First**: Currently includes `accessibility-test.js`
- [ ] **TypeScript**: Will be migrated from Flow to TypeScript
- [x] **Test Coverage**: Currently meets 70% branches, 75% functions/lines/statements
- [x] **Documentation**: Currently includes README.md, Storybook story
- [x] **Versioning**: PATCH version (migration without API changes)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - API Compatibility (Priority: P1)

Developers consuming bpk-component-table will continue using it exactly as before, with no changes to their code. The migration from Flow to TypeScript is transparent to all consumers. Developers using TypeScript will benefit from improved type inference and autocomplete, while JavaScript users experience no disruption.

**Why this priority**: This is the most critical requirement. Any breaking change to the public API would force all consumers to update their code, violating the migration's zero-disruption goal. This ensures backward compatibility and prevents ecosystem-wide breaking changes.

**Independent Test**: Can be fully tested by comparing exported API surface before and after migration. Run existing consumer code against the migrated component to verify no changes needed.

**Acceptance Scenarios**:

1. **Given** a consumer imports `BpkTable` and related components, **When** they use the migrated TypeScript version, **Then** their code works without any modifications
2. **Given** a developer uses the component with all supported props, **When** the TypeScript version is used, **Then** all props function identically to the Flow version
3. **Given** an existing codebase using bpk-component-table, **When** upgraded to the TypeScript version, **Then** no TypeScript errors or type mismatches occur
4. **Given** a JavaScript consumer (not using TypeScript), **When** they use the migrated component, **Then** they experience zero changes in behavior or API

---

### User Story 2 - Type System Migration (Priority: P1)

The component's type definitions must accurately represent the original Flow types, preserving the same optionality, constraints, and semantics. TypeScript consumers get accurate type checking and IDE autocomplete that matches the component's actual behavior.

**Why this priority**: Accurate type definitions are essential for TypeScript's value proposition. Incorrect types can lead to runtime errors or force developers to use type assertions, degrading the developer experience.

**Independent Test**: Can be tested by comparing Flow type definitions with generated TypeScript types, and by using the component in TypeScript code to verify type inference works correctly.

**Acceptance Scenarios**:

1. **Given** a prop is optional in Flow (e.g., `className: ?string`), **When** migrated to TypeScript, **Then** it remains optional (`className?: string`)
2. **Given** a prop is required in Flow (e.g., `children: Node`), **When** migrated to TypeScript, **Then** it remains required (`children: React.ReactNode`)
3. **Given** a prop has a default value, **When** the TypeScript version is used, **Then** the default value remains unchanged
4. **Given** TypeScript code uses the component, **When** type checking is performed, **Then** all types are correctly inferred with no `any` types leaked

---

### User Story 3 - Test Suite Preservation (Priority: P1)

All existing tests, including unit tests, accessibility tests, and snapshot tests, are migrated to TypeScript while maintaining identical test logic and assertions. This ensures the migration hasn't introduced behavioral changes or regressions.

**Why this priority**: Migrating tests to TypeScript provides type safety for test code while ensuring behavior hasn't changed. Test logic must remain identical to the original JavaScript tests.

**Independent Test**: Migrate test files to TypeScript and verify all tests pass with identical behavior.

**Acceptance Scenarios**:

1. **Given** existing Jest unit tests in `*-test.js` files, **When** migrated to TypeScript (`*-test.tsx`), **Then** all tests pass with identical assertions and behavior
2. **Given** existing snapshot tests, **When** migrated to TypeScript, **Then** snapshots remain identical
3. **Given** existing `accessibility-test.js`, **When** migrated to TypeScript (`accessibility-test.tsx`), **Then** all accessibility tests pass
4. **Given** test coverage thresholds (70% branches, 75% functions/lines/statements), **When** measuring the TypeScript test files, **Then** coverage remains at or above existing levels

---

### User Story 4 - Build & Bundle Integrity (Priority: P1)

The TypeScript version compiles successfully without errors or warnings, generates proper type declaration files (`.d.ts`), and maintains the same bundle size as the Flow version. Build tooling continues to work without configuration changes.

**Why this priority**: Build success and bundle size stability are essential for production deployment. Bundle size changes could impact page load performance for all consumers.

**Independent Test**: Run production build with TypeScript version and compare bundle size with Flow version. Verify `.d.ts` files are generated correctly.

**Acceptance Scenarios**:

1. **Given** the TypeScript migration, **When** the build process runs, **Then** compilation completes without TypeScript errors or warnings
2. **Given** the built TypeScript version, **When** bundle size is measured, **Then** size remains within 1% of the original Flow version
3. **Given** the TypeScript build output, **When** inspecting generated files, **Then** `.d.ts` type declaration files exist for all public exports
4. **Given** the component's dependencies, **When** the TypeScript version is built, **Then** no new dependencies are added (except TypeScript type definitions)

---

### User Story 5 - Examples & Documentation Migration (Priority: P2)

The Storybook examples in `examples/bpk-component-table/` are migrated to TypeScript, demonstrating correct usage patterns and providing accurate code examples for consumers. Documentation reflects TypeScript usage while remaining accessible to JavaScript users.

**Why this priority**: Examples serve as both documentation and validation. TypeScript examples help TypeScript users understand proper usage, while also serving as live tests of the type definitions.

**Independent Test**: Render all Storybook stories with the TypeScript version and verify they function identically to the Flow version.

**Acceptance Scenarios**:

1. **Given** existing Storybook `stories.js` and `examples.js` files, **When** migrated to TypeScript, **Then** all stories render correctly
2. **Given** TypeScript examples, **When** compiled, **Then** no TypeScript errors occur in example code
3. **Given** the updated examples, **When** viewed in Storybook, **Then** behavior and appearance are identical to the original Flow version
4. **Given** the README.md, **When** updated for TypeScript, **Then** usage examples work for both TypeScript and JavaScript consumers

---

### User Story 6 - File Extension Correctness (Priority: P1)

All TypeScript file extensions must follow the correct pattern: component files with JSX use `.tsx`, pure logic files without JSX use `.ts`, and test files use `.tsx`. This ensures TypeScript compiler processes files correctly and follows industry best practices.

**Why this priority**: Using incorrect file extensions (e.g., `.tsx` for non-JSX files) can cause TypeScript compiler confusion, increases bundle size unnecessarily (JSX transform overhead), and violates TypeScript community conventions. The distinction between `.ts` and `.tsx` is significant for the compiler.

**Independent Test**: Can be tested by verifying file extensions match their content (JSX presence), and by confirming TypeScript compiles without warnings about incorrect file extensions.

**Acceptance Scenarios**:

1. **Given** a file contains JSX syntax (e.g., `<BpkTable>`), **When** checking the file extension, **Then** it uses `.tsx` extension
2. **Given** a file contains only imports/exports with no JSX (e.g., `index.ts`), **When** checking the file extension, **Then** it uses `.ts` extension
3. **Given** all test files (which render components in tests), **When** checking file extensions, **Then** they all use `.tsx` extension
4. **Given** component source files with React elements, **When** checking file extensions, **Then** they all use `.tsx` extension

---

### Edge Cases

- What happens when a consumer passes invalid prop types (e.g., number instead of string)?
  - TypeScript consumers get compile-time errors; JavaScript consumers get runtime prop-type warnings (preserved)
- How does the component handle missing required props?
  - TypeScript consumers get compile-time errors; JavaScript consumers get runtime prop-type warnings (preserved)
- What happens with extremely long text in table cells?
  - Behavior unchanged; `wordBreak` prop continues to function identically
- How does the component behave with nested tables or unusual children?
  - Behavior unchanged; same HTML structure and CSS behavior
- What happens when consumers use the spread operator with rest props?
  - TypeScript correctly infers spread props; behavior identical to Flow version

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: All six component exports (BpkTable, BpkTableHead, BpkTableBody, BpkTableRow, BpkTableCell, BpkTableHeadCell) MUST be migrated from Flow to TypeScript
- **FR-002**: All component source files with JSX MUST use `.tsx` extension; files without JSX (pure logic, types, utilities) MUST use `.ts` extension (currently `.js` with Flow)
- **FR-003**: All test files MUST be migrated to TypeScript with `.tsx` extension (test files typically render components, so they contain JSX)
- **FR-004**: Component public API MUST remain identical (same props, same exports, same default values)
- **FR-005**: Component behavior MUST remain identical (same rendering, same event handling, same HTML structure)
- **FR-006**: Package entry point (`index.js`) MUST be migrated to TypeScript (`index.ts`)
- **FR-007**: Examples directory (`examples/bpk-component-table/`) MUST be migrated to TypeScript (`.tsx` extensions)
- **FR-008**: All TypeScript types MUST accurately represent the original Flow types without semantic changes
- **FR-009**: Generated `.d.ts` declaration files MUST be included in published package
- **FR-010**: Component MUST maintain prop-types for runtime validation alongside TypeScript types

### Component API *(existing props - must be preserved)*

**BpkTable Props**:
- **`children`** (ReactNode, required): Table content (typically BpkTableHead and BpkTableBody)
- **`className`** (string, optional, default: null): Additional CSS class names
- **`...rest`** (object, optional): Additional HTML attributes spread to table element

**BpkTableHead Props**:
- **`children`** (ReactNode, required): Table header content (typically BpkTableRow)
- **`className`** (string, optional, default: null): Additional CSS class names
- **`...rest`** (object, optional): Additional HTML attributes spread to thead element

**BpkTableBody Props**:
- **`children`** (ReactNode, required): Table body content (typically BpkTableRow components)
- **`className`** (string, optional, default: null): Additional CSS class names
- **`...rest`** (object, optional): Additional HTML attributes spread to tbody element

**BpkTableRow Props**:
- **`children`** (ReactNode, required): Row content (typically BpkTableCell or BpkTableHeadCell)
- **`className`** (string, optional, default: null): Additional CSS class names
- **`...rest`** (object, optional): Additional HTML attributes spread to tr element

**BpkTableCell Props**:
- **`children`** (ReactNode, required): Cell content
- **`className`** (string, optional, default: null): Additional CSS class names
- **`wordBreak`** (boolean, optional, default: false): Whether to apply `word-break: break-word` CSS
- **`...rest`** (object, optional): Additional HTML attributes spread to td element

**BpkTableHeadCell Props**:
- **`children`** (ReactNode, required): Header cell content
- **`className`** (string, optional, default: null): Additional CSS class names
- **`wordBreak`** (boolean, optional, default: false): Whether to apply `word-break: break-word` CSS
- **`...rest`** (object, optional): Additional HTML attributes spread to th element

**TypeScript Type Example**:
```typescript
type BpkTableProps = {
  children: React.ReactNode;
  className?: string | null;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

type BpkTableCellProps = {
  children: React.ReactNode;
  className?: string | null;
  wordBreak?: boolean;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

type BpkTableHeadCellProps = {
  children: React.ReactNode;
  className?: string | null;
  wordBreak?: boolean;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};
```

**Note**: If Storybook's react-docgen documentation generator fails with the `[rest: string]: any` pattern, fallback to intersection type with React HTML attributes (e.g., `Props & React.HTMLAttributes<HTMLTableElement>`)

### Non-Functional Requirements

- **NFR-001**: Migration MUST NOT introduce TypeScript `any` types in public API (except for rest props using `[rest: string]: any` pattern per `decisions/inexact-rest.md`)
- **NFR-002**: Migration MUST NOT change bundle size by more than 1%
- **NFR-003**: Migration MUST NOT require changes to consumer code
- **NFR-004**: TypeScript compilation MUST complete without errors or warnings
- **NFR-005**: All existing linting rules MUST pass (ESLint, Stylelint)
- **NFR-006**: Build process MUST generate `.d.ts` type declaration files
- **NFR-007**: Component MUST maintain same accessibility standards (WCAG 2.1 Level AA)
- **NFR-008**: Component MUST work in all supported browsers (no runtime behavior changes)

### Migration Requirements

- **MIG-001**: Flow type annotations MUST be removed (e.g., `/* @flow strict */`)
- **MIG-002**: Flow-specific comments MUST be removed or converted (e.g., `// $FlowFixMe`)
- **MIG-003**: Flow type imports MUST be converted to TypeScript types (e.g., `type { Node } from 'react'` → `React.ReactNode`)
- **MIG-004**: PropTypes MUST be retained for runtime validation (per Backpack constitution principle V)
- **MIG-005**: Component files with JSX MUST be renamed from `.js` to `.tsx`; pure logic/utility files without JSX MUST use `.ts` extension
- **MIG-006**: Test files MUST be migrated to TypeScript with `.tsx` extension (test files render components, so they contain JSX)
- **MIG-007**: Storybook files (`examples.js`, `stories.js`) MUST be migrated to TypeScript
- **MIG-008**: Package entry point MUST be migrated to TypeScript (`index.ts`)
- **MIG-009**: All TypeScript types MUST be exported for consumer use alongside component exports in each file
- **MIG-010**: TypeScript types MUST be defined inline within each component file (not in separate common-types files)
- **MIG-011**: Type exports MUST use named exports (e.g., `export type BpkTableProps`) to allow consumers to import types directly
- **MIG-012**: File extensions MUST be correct: `.tsx` for files with JSX, `.ts` for pure logic files without JSX (e.g., `index.ts` should NOT be `index.tsx` if it only contains imports/exports)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All six table components compile successfully with TypeScript without errors or warnings
- **SC-002**: All migrated TypeScript unit tests pass with identical test logic and assertions (100% pass rate)
- **SC-003**: All existing snapshot tests produce identical snapshots
- **SC-004**: Accessibility tests continue passing with jest-axe (zero regressions)
- **SC-005**: Test coverage remains at or above existing thresholds (70% branches, 75% functions/lines/statements)
- **SC-006**: Bundle size remains within 1% of Flow version (verify with production build)
- **SC-007**: Generated `.d.ts` files exist for all six component exports
- **SC-008**: TypeScript consumers can use the component with accurate type checking and autocomplete
- **SC-009**: JavaScript consumers experience zero breaking changes (API unchanged)
- **SC-010**: Storybook stories render identically in both Flow and TypeScript versions
- **SC-011**: Component builds successfully in CI/CD pipeline without new warnings
- **SC-012**: No new dependencies added (except TypeScript type definition packages if needed)

## Design & Visual Specifications

**Visual Impact**: None - this is a code migration with zero visual changes.

**Visual States**: All existing visual states (default, hover, focus, active) remain unchanged.

**Responsive behavior**: No changes - existing responsive behavior preserved.

## Dependencies & Related Components

**Internal Dependencies** (Backpack components):
- Uses `cssModules` from `bpk-react-utils` (unchanged)
- Uses Sass styles from `BpkTable.module.scss`, `BpkTableHead.module.scss`, etc. (unchanged)

**External Dependencies** (npm packages):
- `prop-types` (existing dependency, retained for runtime validation)
- `react` (existing peer dependency, unchanged)
- `@types/react` (may need to add as dev dependency for TypeScript types)
- `@types/prop-types` (may need to add as dev dependency for TypeScript types)

**Design Token Dependencies**:
- `@skyscanner/bpk-foundations-web` (unchanged)
- `bpk-mixins` (unchanged)

## Testing Strategy

### Unit Tests (`*-test.tsx` files)

**Critical Requirement**: All test files MUST be migrated to TypeScript with identical test logic.

- Migrate tests to TypeScript: `BpkTable-test.tsx`, `BpkTableHead-test.tsx`, `BpkTableBody-test.tsx`, `BpkTableRow-test.tsx`, `BpkTableCell-test.tsx`, `BpkTableHeadCell-test.tsx`
- All test files use `.tsx` extension
- Test all prop combinations (identical to existing tests)
- Test className application (identical to existing tests)
- Test wordBreak prop functionality (identical to existing tests)
- Test rest props spreading (identical to existing tests)
- Snapshot tests must produce identical snapshots
- Add TypeScript type safety to test code where appropriate

### Accessibility Tests (`accessibility-test.tsx`)

**Critical Requirement**: Accessibility test MUST be migrated to TypeScript with identical test logic.

- Migrate test to TypeScript: `accessibility-test.tsx`
- Uses `.tsx` extension
- Uses jest-axe for automated checks (identical to existing)
- Tests table semantic HTML structure (identical to existing)
- Tests ARIA attributes if any (identical to existing)
- Add TypeScript type safety to test code where appropriate

### Type Testing (new requirement)

**New Requirement**: Verify TypeScript types work correctly for consumers.

- Create type tests to verify exported types are correct
- Test that optional props are truly optional
- Test that required props are enforced
- Test that rest props are correctly typed
- Verify no `any` types leak into public API
- Test type inference works correctly

### Integration Testing

- Run Storybook examples to verify visual output unchanged
- Test component in TypeScript consumer project
- Test component in JavaScript consumer project
- Verify `.d.ts` files are correct and usable

## Documentation Requirements

### README.md

**Changes Required**: Minimal updates to reflect TypeScript usage.

- Update usage examples to show TypeScript import types (optional for TypeScript users)
- Maintain JavaScript examples (primary)
- Add note about TypeScript support
- Keep component description unchanged (<100 words, British English prose)
- Keep props table link to Skyscanner design system docs unchanged
- Keep browser support information unchanged

**Example Addition**:
```markdown
## TypeScript

This component is written in TypeScript and provides its own type definitions. TypeScript users benefit from autocomplete and type checking:

\`\`\`typescript
import {
  BpkTable,
  BpkTableHead,
  // ... other imports
} from '@skyscanner/backpack-web/bpk-component-table';

// Types are automatically inferred
\`\`\`
```

### Storybook (`examples/bpk-component-table/`)

**Changes Required**: Migrate example files to TypeScript.

- Migrate `examples.js` to `examples.tsx`
- Migrate `stories.js` to `stories.tsx`
- Add TypeScript type annotations where helpful
- Ensure all stories render identically to Flow version
- Visual output must be pixel-perfect identical

### JSDoc/TSDoc Comments

**Changes Required**: Minimal - preserve existing JSDoc, ensure compatibility with TSDoc.

- Existing JSDoc comments should be compatible with TSDoc
- Add type information that TypeScript can't infer (if any)
- Document component purpose (existing)
- Document props (existing prop-types serve this purpose)

## Migration & Versioning

**Version Type**: PATCH

**Rationale**: According to `decisions/versioning-rules.md`, a TypeScript migration that preserves the public API without any breaking changes qualifies as a PATCH version. The migration:
- Does NOT change the public API
- Does NOT introduce new features
- Does NOT modify visual appearance
- Does NOT change component behavior
- Improves code quality and developer experience without breaking changes

**Breaking Changes**: None

**Deprecations**: None

**Migration Guide**: Not needed - consumers require zero code changes

## Implementation Notes

**File Structure** (after migration):
```
packages/bpk-component-table/
├── README.md                              # Updated with TypeScript note
├── index.ts                               # Migrated from index.js (.ts because no JSX)
├── src/
│   ├── BpkTable.tsx                       # Migrated from .js (.tsx because contains JSX)
│   ├── BpkTable.module.scss               # Unchanged
│   ├── BpkTable-test.tsx                  # Migrated from .js (.tsx because tests render JSX)
│   ├── BpkTableHead.tsx                   # Migrated from .js (.tsx because contains JSX)
│   ├── BpkTableHead.module.scss           # Unchanged
│   ├── BpkTableHead-test.tsx              # Migrated from .js (.tsx because tests render JSX)
│   ├── BpkTableBody.tsx                   # Migrated from .js (.tsx because contains JSX)
│   ├── BpkTableBody.module.scss           # Unchanged
│   ├── BpkTableBody-test.tsx              # Migrated from .js (.tsx because tests render JSX)
│   ├── BpkTableRow.tsx                    # Migrated from .js (.tsx because contains JSX)
│   ├── BpkTableRow.module.scss            # Unchanged
│   ├── BpkTableRow-test.tsx               # Migrated from .js (.tsx because tests render JSX)
│   ├── BpkTableCell.tsx                   # Migrated from .js (.tsx because contains JSX)
│   ├── BpkTableCell.module.scss           # Unchanged
│   ├── BpkTableCell-test.tsx              # Migrated from .js (.tsx because tests render JSX)
│   ├── BpkTableHeadCell.tsx               # Migrated from .js (.tsx because contains JSX)
│   ├── BpkTableHeadCell.module.scss       # Unchanged
│   ├── BpkTableHeadCell-test.tsx          # Migrated from .js (.tsx because tests render JSX)
│   ├── accessibility-test.tsx             # Migrated from .js (.tsx because tests render JSX)
│   └── __snapshots__/                     # Unchanged snapshots

examples/bpk-component-table/
├── examples.tsx                           # Migrated from examples.js (.tsx because renders JSX)
└── stories.tsx                            # Migrated from stories.js (.tsx because renders JSX)
```

**File Extension Rules**:
- `.tsx` - For files that contain JSX/React components (component files, test files, examples, stories)
- `.ts` - For pure logic files with no JSX (index exports, utility functions, type definitions)
- The key distinction: If the file uses `<JSXElement>` syntax, it must be `.tsx`; otherwise use `.ts`

**Key Implementation Principles**:

1. **API Preservation**: Maintain exact same props, exports, defaults, and behavior
2. **Type Accuracy**: TypeScript types must match Flow types semantically
3. **Test Preservation**: All existing tests pass without modifications
4. **Zero Breaking Changes**: Consumers require zero code changes
5. **Bundle Size**: Maintain same bundle size (within 1%)
6. **PropTypes Retention**: Keep prop-types for runtime validation per constitution principle V
7. **Type Generation**: Ensure `.d.ts` files are generated correctly

**Flow to TypeScript Conversion Patterns**:

- `/* @flow strict */` → Remove entirely
- `type { Node } from 'react'` → `React.ReactNode`
- `?string` → `string | null` or `string | undefined` (context-dependent)
- `?boolean` → `boolean | undefined`
- `// $FlowFixMe` → Remove or replace with proper TypeScript typing
- `PropTypes.node.isRequired` → `children: React.ReactNode` (required)
- `PropTypes.string` → `string | undefined` (optional)
- `PropTypes.bool` → `boolean | undefined` (optional)

**Common Flow/TypeScript Mapping**:
```typescript
// Flow: children: Node (required)
// TypeScript: children: React.ReactNode

// Flow: className: ?string (optional, nullable)
// TypeScript: className?: string | null

// Flow: wordBreak: ?boolean (optional, nullable)
// TypeScript: wordBreak?: boolean

// Flow: {...rest} (inexact object spread)
// TypeScript: [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
```

**Type Export Pattern**:
```typescript
// Example for BpkTable.tsx
export type BpkTableProps = {
  children: React.ReactNode;
  className?: string | null;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

export const BpkTable = ({ children, className = null, ...rest }: BpkTableProps) => {
  // Component implementation
};
```

Consumers can then import both component and types:
```typescript
import { BpkTable, type BpkTableProps } from '@skyscanner/backpack-web/bpk-component-table';
```

## Open Questions

None - all requirements are clearly specified in the acceptance criteria.

## References

- **Backpack Constitution**: `.specify/memory/constitution.md` (Principle V: TypeScript Migration)
- **Architecture Decisions**: `decisions/` directory
- **Versioning Rules**: `decisions/versioning-rules.md` (PATCH for non-breaking migrations)
- **TypeScript Deprecation Guidelines**: `decisions/ts-deprecating-props.md`
- **Component Examples**: Other migrated TypeScript components in `packages/`
- **Design Tokens**: `@skyscanner/bpk-foundations-web` (unchanged)
- **Sass Mixins**: `packages/bpk-mixins/` (unchanged)
- **Current Component**: `packages/bpk-component-table/` (Flow version)
- **Current Examples**: `examples/bpk-component-table/` (Flow version)
