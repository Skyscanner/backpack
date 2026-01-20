# Implementation Plan: TypeScript Migration for BpkTable

**Package Branch**: `090-table-typescript` | **Date**: 2026-01-20 | **Spec**: [spec.md](./spec.md)
**Input**: Component specification from `/specs/090-table-typescript/spec.md`
**Updates**: 2026-01-20 - Added PropTypes removal, JSDoc comments, interface conversion

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Migrate bpk-component-table from Flow to TypeScript while maintaining complete API compatibility. This is a zero-breaking-change migration that updates type definitions to use interfaces with `extends` syntax (instead of type aliases with intersection types). All six table components (BpkTable, BpkTableHead, BpkTableBody, BpkTableRow, BpkTableCell, BpkTableHeadCell) will be migrated along with their tests and examples. The migration provides better type safety for TypeScript consumers while remaining fully compatible with JavaScript consumers.

**Incremental Updates (2026-01-20)**:
1. Remove PropTypes and related imports - TypeScript types are sufficient for compile-time checking
2. Add JSDoc comment `/** The content of the table */` to all `children` props for better IDE documentation
3. Convert type aliases to interfaces using `extends` syntax for better extensibility

## Technical Context

**Framework**: React 18.3.1 with TypeScript 5.9.2
**Styling**: CSS Modules + Sass (modern API with `@use`)
**Testing**: Jest 30 + Testing Library + jest-axe
**Build Tools**: Webpack 5, Babel 7
**Linting**: ESLint (@skyscanner/eslint-config-skyscanner), Stylelint
**Component Library**: Backpack Design System (Monorepo)
**Package Manager**: npm >=10.7.0
**Node Version**: >=18.20.4
**Target Browsers**: Chrome 109+, Edge 129+, Firefox 131+, Safari 15+, Samsung 26+
**Performance Goals**: Meet test coverage thresholds (70% branches, 75% functions/lines/statements)
**Constraints**: Must follow Backpack constitution and architecture decisions
**Scale/Scope**: Single reusable component in `packages/bpk-component-[name]/`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Core Principles Compliance

- [x] **Component-First Architecture**: Package structure already exists in `packages/bpk-component-table/`
- [x] **Naming Conventions**: Components follow PascalCase, `.module.scss` for styles, `*-test.tsx` for tests (after migration)
- [x] **Modern Sass**: Already using `@use` syntax with granular imports from `bpk-mixins`
- [x] **Accessibility-First**: Already includes `accessibility-test.js` (will be migrated to `.tsx`)
- [x] **TypeScript**: Will migrate all code from Flow to TypeScript with proper types
- [x] **SemVer**: PATCH version bump (no API changes, no visual changes)
- [x] **Deprecation Management**: No deprecations in this migration
- [x] **Test Coverage**: Already meets 70% branches, 75% functions/lines/statements
- [x] **Documentation**: Already includes README.md, Storybook story, JSDoc comments

### Technology Compliance

- [x] **React Version**: Using React 18.3.1
- [x] **TypeScript Version**: Will use TypeScript 5.9.2
- [x] **CSS Modules**: All styles already use `.module.scss` extension
- [x] **rem Units**: Already using `rem` units (not changing)
- [x] **Design Tokens**: Already uses tokens from `@skyscanner/bpk-foundations-web` and `bpk-mixins`
- [x] **BEM Naming**: CSS classes already follow BEM with `bpk-` prefix
- [x] **RTL Support**: Component already supports right-to-left languages
- [x] **Browser Support**: Already works on all supported browsers

### Testing Compliance

- [x] **Unit Tests**: Jest + Testing Library tests in `*-test.js` files (will be migrated to `.tsx`)
- [x] **Accessibility Tests**: jest-axe tests in `accessibility-test.js` (will be migrated to `.tsx`)
- [x] **Visual Tests**: Percy tests via Storybook (already exist)
- [x] **Snapshot Tests**: Already included for all variants
- [x] **Coverage Thresholds**: Already meets required percentages

### Documentation Compliance

- [x] **British English**: Prose uses British English, code uses US English
- [x] **Sentence Case**: Titles use sentence case, singular form
- [x] **<100 Words**: Component description under 100 words
- [x] **Storybook**: Stories already exist in `examples/bpk-component-table/stories.js` (will be migrated to `.tsx`)
- [x] **JSDoc**: All public APIs documented
- [x] **Figma Connect**: Not required for TypeScript migration (existing component)

## Project Structure

### Documentation (this component)

```text
specs/[###-component-name]/
├── spec.md              # Component specification
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── api-design.md        # Phase 1 output (/speckit.plan command)
├── styling-guide.md     # Phase 1 output (/speckit.plan command)
├── examples/            # Phase 1 output (/speckit.plan command)
│   ├── basic-usage.tsx
│   ├── variants.tsx
│   └── edge-cases.tsx
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Package Structure (Backpack Monorepo)

```text
packages/bpk-component-[name]/
├── README.md                     # Component documentation (British English prose)
├── package.json                  # Package metadata, dependencies, scripts
├── index.ts                      # Export entry point (exports from src/)
├── docs/                         # Documentation assets
│   ├── screenshots/              # Component screenshots for README
│   └── design-assets/            # Figma exports, design references
└── src/
    ├── BpkComponentName/
    │   ├── BpkComponentName.tsx            # Main component implementation
    │   ├── BpkComponentName.module.scss    # CSS Modules styles
    │   ├── BpkComponentName-test.tsx       # Unit tests (Jest + Testing Library)
    │   ├── accessibility-test.tsx          # Accessibility tests (jest-axe)
    │   ├── BpkComponentName.figma.tsx      # Figma Code Connect
    │   ├── common-types.ts                 # Shared TypeScript types
    │   └── __snapshots__/                  # Jest snapshot files
    │       └── BpkComponentName-test.tsx.snap
    └── themeAttributes.ts        # Theme attributes (if themeable)
```

### Storybook Examples

```text
examples/bpk-component-[name]/
├── stories.tsx           # Storybook stories
└── README.md            # Example documentation (optional)
```

**Structure Decision**: Backpack uses a Monorepo architecture where each component is a separate package in `packages/`. This enables:
- Independent versioning per component
- Clear dependency boundaries
- Isolated testing and documentation
- Easier maintenance and updates

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No constitution violations. Migration follows all Backpack standards and is a zero-breaking-change update.**

## Phase 0: Research & Discovery

**Objective**: Understand existing patterns and gather context

### Research Tasks

1. **Survey Existing Components**:
   - Review similar components in `packages/` (e.g., buttons, cards, inputs)
   - Identify reusable patterns and common approaches
   - Check for existing utilities in `bpk-react-utils`
   - Review design tokens in `@skyscanner/bpk-foundations-web`

2. **Review Sass Mixins**:
   - Explore `packages/bpk-mixins/` for relevant utilities
   - Identify which mixins to import (tokens, typography, shadows, etc.)
   - Check modern Sass API usage examples

3. **Study Testing Patterns**:
   - Review test files in similar components
   - Understand jest-axe usage patterns
   - Check Storybook story structures in `examples/`

4. **Figma Design Review**:
   - Review Figma designs and specifications
   - Identify all visual states (default, hover, focus, active, disabled)
   - Note responsive behavior and breakpoints
   - Document design token mappings

5. **Architecture Decisions Review**:
   - Read relevant files in `decisions/` directory
   - Understand naming conventions (js-filenames.md, component-scss-filenames.md)
   - Review modern Sass API requirements (modern-sass-api.md)
   - Check versioning rules (versioning-rules.md)
   - Understand deprecation policies (deprecated-api.md, future-api.md)

**Deliverable**: `research.md` documenting findings and patterns to follow

## Phase 1: Design & Planning

**Objective**: Design component API and structure before implementation

### API Design

**Deliverable**: `api-design.md` containing:

1. **Component Props Interface**:
```typescript
type BpkComponentNameProps = {
  // Define all props with types, defaults, and documentation
  variant: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large'; // default: 'medium'
  disabled?: boolean; // default: false
  className?: string;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  ariaLabel?: string;
  // ... other props
};
```

2. **Component Composition**:
   - If component is composed of sub-components, define their interfaces
   - Document how they work together
   - Example: `BpkAccordion` + `BpkAccordionItem`

3. **Theming Support**:
   - If component is themeable, define theme attributes in `themeAttributes.ts`
   - Document which properties can be themed
   - Example theme attributes for customization

4. **Accessibility Considerations**:
   - ARIA attributes required
   - Keyboard navigation support (Tab, Enter, Space, etc.)
   - Screen reader announcements
   - Focus management

### Styling Design

**Deliverable**: `styling-guide.md` containing:

1. **CSS Class Structure** (BEM with `bpk-` prefix):
```scss
.bpk-component-name { /* base class */ }
.bpk-component-name--primary { /* variant modifier */ }
.bpk-component-name--disabled { /* state modifier */ }
.bpk-component-name__element { /* child element */ }
```

2. **Sass Imports** (granular from `bpk-mixins`):
```scss
@use '../bpk-mixins/tokens';
@use '../bpk-mixins/typography';
@use '../bpk-mixins/shadows';
@use '../bpk-mixins/borders';
@use '../bpk-mixins/utils';
```

3. **Design Token Mapping**:
   - Map design specs to Backpack tokens
   - Spacing: `tokens.bpk-spacing-*()` (returns rem values)
   - Colors: `tokens.$bpk-color-*`
   - Typography: `typography.bpk-text()`, `typography.bpk-label-1()`, etc.
   - Shadows: `shadows.bpk-box-shadow-*()` mixins
   - Border radius: `tokens.bpk-border-radius-*()` or `borders.bpk-border-radius-*()` mixins

4. **Responsive Behavior**:
   - Define breakpoint behavior (mobile, tablet, desktop)
   - Use Backpack's responsive mixins if applicable

5. **RTL Support**:
   - Document directional properties (margin, padding, text-align)
   - Use logical properties where applicable
   - Test with `isRTL` utility from `bpk-react-utils`

### Example Code

**Deliverable**: `examples/` directory with:

1. **`basic-usage.tsx`**: Minimal working example
2. **`variants.tsx`**: All visual variants and sizes
3. **`edge-cases.tsx`**: Edge cases (long text, no props, errors)
4. **`interactive-states.tsx`**: Hover, focus, active, disabled states
5. **`accessibility.tsx`**: Keyboard navigation and screen reader examples

## Phase 2: Task Breakdown

**Objective**: Create detailed implementation tasks

**Note**: This phase is executed by `/speckit.tasks` command, NOT by `/speckit.plan`

**Deliverable**: `tasks.md` with sequenced implementation tasks organized by:
- Phase 1: Setup (package initialization)
- Phase 2: Core Implementation (component code)
- Phase 3: Styling (SCSS and theming)
- Phase 4: Testing (unit, accessibility, visual)
- Phase 5: Documentation (README, Storybook, JSDoc)
- Phase 6: Integration (Figma Code Connect, package publishing)

## Dependencies

### Internal Backpack Dependencies

**Design Foundations**:
- `@skyscanner/bpk-foundations-web`: Design tokens (colors, spacing, typography)
- `packages/bpk-mixins/`: Sass mixins and utilities

**React Utilities** (if needed):
- `bpk-react-utils`: Portal, cssModules, TransitionInitialMount, isRTL, etc.
- `bpk-theming`: Theming support (if component is themeable)

**Component Dependencies** (if composing with other components):
- List any Backpack components this component uses
- Example: `bpk-component-icon` for icons, `bpk-component-spinner` for loading

### External Dependencies

**Peer Dependencies** (already in project):
- `react: ^18.3.1`
- `react-dom: ^18.3.1`

**Optional Dependencies** (if needed):
- Add any specific external libraries required
- Justify why Backpack's built-in solutions are insufficient

**Development Dependencies** (already in project):
- TypeScript, Jest, Testing Library, jest-axe, etc.

## Testing Strategy

### Unit Tests (`BpkComponentName-test.tsx`)

**Framework**: Jest 30 + Testing Library

**Test Coverage**:
1. **Rendering Tests**:
   - Renders with required props
   - Renders with optional props
   - Renders all variants (primary, secondary, tertiary)
   - Renders all sizes (small, medium, large)
   - Renders with custom className
   - Renders with children

2. **Interaction Tests**:
   - onClick handler called when clicked
   - Keyboard interactions (Enter, Space)
   - Focus management

3. **State Tests**:
   - Disabled state prevents interactions
   - Loading state (if applicable)
   - Error state (if applicable)

4. **Edge Cases**:
   - No props provided (uses defaults)
   - Null/undefined children
   - Extremely long text
   - Invalid prop values (should gracefully handle or error)

5. **Snapshot Tests**:
   - Snapshot for each variant + size combination
   - Snapshot for disabled state
   - Snapshot for edge cases

**Coverage Target**: 70% branches, 75% functions/lines/statements

### Accessibility Tests (`accessibility-test.tsx`)

**Framework**: jest-axe

**Test Coverage**:
1. **Automated Checks**:
   - No accessibility violations detected by axe
   - Test all variants and states
   - Test with different content (text, icons, etc.)

2. **ARIA Attributes**:
   - Correct role (if applicable)
   - aria-label or aria-labelledby present when needed
   - aria-disabled for disabled state
   - aria-pressed for toggle buttons (if applicable)

3. **Keyboard Navigation**:
   - Tab to focus component
   - Enter/Space to activate (if interactive)
   - Focus visible (outline or focus indicator)

4. **Screen Reader**:
   - Test that component announces correctly
   - Test state changes are announced
   - Test with actual screen readers (manual testing)

**Important**: Test the public interface. If component is composed (e.g., `BpkAccordion` with `BpkAccordionItem`), test them together as they would be used by consumers.

### Visual Regression Tests (Percy via Storybook)

**Framework**: Percy + Storybook

**Test Coverage** (if component does NOT use images):
1. All visual variants (primary, secondary, tertiary)
2. All sizes (small, medium, large)
3. Interactive states (hover, focus, active, disabled)
4. Edge cases (long text, empty, error states)
5. Responsive breakpoints (mobile, tablet, desktop)
6. RTL rendering

**Exception**: If component uses images (e.g., `BpkImage`, `BpkCard` with images), do NOT add visual tests. Per `decisions/visual-tests.md`, image loading is flaky on CI and causes false positives.

### Integration Tests (if applicable)

**Framework**: Jest + Testing Library

**Test Coverage** (only if component composes with other components):
- Test integration with other Backpack components
- Test theming integration (if themeable)
- Test in realistic usage scenarios

## Documentation Requirements

### README.md (British English prose, <100 words)

**Structure**:
1. **Title**: Component name in sentence case (e.g., "Bar chart")
2. **Description**: Plain English, describe purpose (not configuration)
3. **Installation**: `npm install @skyscanner/backpack-web`
4. **Usage**: Code example with basic usage
5. **Props**: Table with prop name, type, default, description
6. **Browser Support**: Link to browser support info
7. **Accessibility**: Brief note on accessibility features
8. **Related Components**: Links to related Backpack components
9. **Figma**: Link to Figma designs

**Example**:
```markdown
# Bar chart

A simple bar chart component for displaying data visually with customisable
colours and labels. Ideal for presenting comparative data in a clear format.

## Installation

npm install @skyscanner/backpack-web

## Usage

import BpkBarchart from '@skyscanner/backpack-web/bpk-component-barchart';

<BpkBarchart data={chartData} />

[Props table, examples, etc.]
```

### Storybook Stories (`examples/bpk-component-[name]/stories.tsx`)

**Stories to include**:
1. **Default**: Basic usage with minimal props
2. **Variants**: All visual variants (primary, secondary, tertiary)
3. **Sizes**: All sizes (small, medium, large)
4. **States**: Interactive states (hover, focus, active, disabled)
5. **With Content**: With children, icons, or other content
6. **Edge Cases**: Long text, empty, error states
7. **Responsive**: Mobile, tablet, desktop views
8. **Accessibility**: Keyboard navigation demo, screen reader support

**Storybook Configuration**:
- Use CSF (Component Story Format) 3.0
- Add a11y addon for accessibility checks
- Use controls for interactive prop editing
- Add JSDoc comments to stories for documentation

**Example**:
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import BpkComponentName from './BpkComponentName';

const meta: Meta<typeof BpkComponentName> = {
  title: 'Components/BpkComponentName',
  component: BpkComponentName,
};

export default meta;
type Story = StoryObj<typeof BpkComponentName>;

export const Default: Story = {
  args: {
    variant: 'primary',
  },
};

export const AllVariants: Story = {
  render: () => (
    <>
      <BpkComponentName variant="primary">Primary</BpkComponentName>
      <BpkComponentName variant="secondary">Secondary</BpkComponentName>
      <BpkComponentName variant="tertiary">Tertiary</BpkComponentName>
    </>
  ),
};
```

### JSDoc/TSDoc Comments

**Requirements**:
- Every component must have a JSDoc comment
- Every prop must be documented
- Use `@deprecated` for deprecated props
- Include examples in JSDoc where helpful
- Use British English for prose, US English for code

**Example**:
```typescript
/**
 * BpkComponentName is a component for [purpose].
 *
 * It supports multiple variants (primary, secondary, tertiary) and sizes.
 *
 * @example
 * <BpkComponentName variant="primary" size="medium">
 *   Click me
 * </BpkComponentName>
 */
type BpkComponentNameProps = {
  /**
   * Visual variant of the component.
   */
  variant: 'primary' | 'secondary' | 'tertiary';

  /**
   * Size of the component.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether the component is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * @deprecated Use `size` prop instead. Will be removed in v11.0.0.
   */
  large?: boolean;
};
```

### Figma Code Connect (`.figma.tsx`)

**Purpose**: Connect component to Figma designs for design-to-code workflow

**Example**:
```typescript
import { figma } from '@figma/code-connect';
import BpkComponentName from './BpkComponentName';

figma.connect(BpkComponentName, 'https://www.figma.com/file/...', {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
    }),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    disabled: figma.boolean('Disabled'),
  },
  example: (props) => <BpkComponentName {...props}>Label</BpkComponentName>,
});
```

## Migration & Versioning

### Version Determination (per `decisions/versioning-rules.md`)

**This component is**: **BUG FIX / MIGRATION** → **PATCH** version bump

**Rationale**: According to Backpack versioning rules, a TypeScript migration that preserves the public API without any breaking changes qualifies as a PATCH version. The migration:
- Does NOT change the public API (props, exports, defaults, behavior all identical)
- Does NOT introduce new features
- Does NOT modify visual appearance
- Does NOT change component behavior
- Improves code quality and developer experience without breaking changes
- Provides better type safety for TypeScript consumers
- Zero impact on JavaScript consumers

### Breaking Changes

**None** - This is a zero-breaking-change migration.

### Deprecations

**None** - No APIs are being deprecated.

### Migration Guide

**Not needed** - Consumers require zero code changes. TypeScript consumers automatically benefit from improved type definitions.

---

## Release Checklist

Before releasing this migration:

- [x] All constitution checks pass
- [ ] All tests pass (unit, accessibility, visual)
- [ ] Test coverage meets thresholds (70% branches, 75% functions/lines/statements)
- [ ] TypeScript compiles without errors or warnings
- [ ] ESLint and Stylelint pass
- [ ] Type definitions use proper imports (`import type { ReactNode } from 'react'`)
- [ ] No `React.` prefix usage that causes "React is not defined" warnings
- [ ] README.md updated (minimal TypeScript note)
- [ ] Component works in all supported browsers
- [ ] Component is keyboard accessible
- [ ] Component works with screen readers
- [ ] Component supports RTL languages
- [ ] Version bump is PATCH
- [ ] Changelog is updated
- [ ] Bundle size within 1% of original
- [ ] `.d.ts` files generated correctly

---

## TypeScript Import Pattern (CRITICAL)

### React Type Imports

**MUST use named type imports to avoid "React is not defined" warnings:**

```typescript
// ✅ CORRECT - Named type imports
import type { ReactNode, HTMLAttributes } from 'react';

export type BpkTableProps = {
  children: ReactNode;  // No React. prefix
  className?: string | null;
} & Omit<HTMLAttributes<HTMLTableElement>, 'className'>;
```

```typescript
// ❌ INCORRECT - Using React namespace
import React from 'react';

export type BpkTableProps = {
  children: React.ReactNode;  // Causes warning
  className?: string | null;
} & Omit<React.HTMLAttributes<HTMLTableElement>, 'className'>;
```

**Rationale**:
- TypeScript's `import type` is stripped at compile time
- Using `React.ReactNode` without importing React causes warnings
- Named imports are cleaner and avoid namespace pollution
- Follows TypeScript best practices

### All React Types to Import

For table components, import these types:

```typescript
import type {
  ReactNode,
  HTMLAttributes,
  TableHTMLAttributes,       // for <table>
  HTMLTableSectionElement,    // for <thead>, <tbody>
  HTMLTableRowElement,        // for <tr>
  HTMLTableCellElement,       // for <td>, <th>
} from 'react';
```

---

## Notes

### Key Backpack Patterns to Follow

1. **CSS Modules**: Always use `.module.scss` for component styles (unchanged)
2. **Modern Sass**: Use `@use` syntax, never `@import` (unchanged)
3. **Granular Imports**: Import specific mixins, not entire package (unchanged)
4. **Design Tokens**: Use tokens for all values (colors, spacing, typography) (unchanged)
5. **rem Units**: Always use `rem` for sizing, never `px` or `em` (unchanged)
6. **BEM Classes**: Use `bpk-component-name--modifier` pattern (unchanged)
7. **TypeScript**: All code in TypeScript with proper type imports (**UPDATED**)
8. **Accessibility**: Test with jest-axe, ensure keyboard nav and ARIA (unchanged)
9. **British English**: Prose in British English, code in US English (unchanged)
10. **Documentation**: <100 words, sentence case, singular titles (unchanged)

### TypeScript Migration-Specific Patterns

1. **Named Type Imports**: Use `import type { ReactNode } from 'react'`
2. **Interface Pattern**: Use `interface BpkTableProps extends Omit<HTMLAttributes<T>, 'className'>` for prop definitions
3. **No `any` Types**: Use proper inheritance instead of `[rest: string]: any`
4. **PropTypes Removal**: Remove PropTypes imports and declarations - TypeScript types replace runtime validation
5. **Type Exports**: Export interfaces with components: `export interface BpkTableProps`
6. **Inline Types**: Define interfaces within component files (not separate files)
7. **JSDoc Comments**: Add `/** The content of the table */` to `children` props for IDE documentation

### Common Pitfalls to Avoid

1. ❌ Using `React.ReactNode` → ✅ Import and use `ReactNode`
2. ❌ Using `React.HTMLAttributes<T>` → ✅ Import and use `HTMLAttributes<T>`
3. ❌ Using `[rest: string]: any` → ✅ Use `interface extends Omit<HTMLAttributes<T>, 'className'>`
4. ❌ Not importing React types → ✅ `import type { ReactNode } from 'react'`
5. ❌ Changing test logic → ✅ Keep test logic identical
6. ❌ Changing component behavior → ✅ Zero behavioral changes
7. ❌ Adding new props → ✅ API must remain identical
8. ❌ Modifying styles → ✅ Styles unchanged
9. ❌ Using type aliases with `&` → ✅ Use interfaces with `extends` for better extensibility
10. ❌ Creating examples in specs/ → ✅ Examples only in api-design.md as documentation
11. ❌ Forgetting JSDoc comments → ✅ Add `/** The content of the table */` to children props

---

## References

- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Architecture Decisions**: `decisions/` directory
- **Component Examples**: Browse `packages/` for similar components
- **Design Tokens**: `@skyscanner/bpk-foundations-web` and `packages/bpk-mixins/`
- **React Utilities**: `packages/bpk-react-utils/`
- **Theming**: `packages/bpk-theming/`
- **Storybook Examples**: `examples/` directory
- **Testing Patterns**: Review test files in existing components
- **TypeScript Handbook**: [Utility Types - Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)
- **Spec**: [spec.md](./spec.md)
- **Research**: [research.md](./research.md)
- **API Design**: [api-design.md](./api-design.md)
- **Styling Guide**: [styling-guide.md](./styling-guide.md)
