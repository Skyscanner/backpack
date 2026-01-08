# Component Specification: [COMPONENT NAME]

**Package Branch**: `[###-component-name]`
**Created**: [DATE]
**Status**: Draft
**Input**: User description: "$ARGUMENTS"

## Constitution Check

*GATE: Must pass before implementation begins.*

- [ ] **Component-First Architecture**: Component will be in `packages/bpk-component-[name]/`
- [ ] **Naming Conventions**: Component name follows PascalCase (BpkComponentName)
- [ ] **Modern Sass**: Will use `@use` syntax with granular imports from `bpk-mixins`
- [ ] **Accessibility-First**: Will include `accessibility-test.tsx`
- [ ] **TypeScript**: Will be written in TypeScript with proper types
- [ ] **Test Coverage**: Will meet 70% branches, 75% functions/lines/statements
- [ ] **Documentation**: Will include README.md, Storybook story, JSDoc comments
- [ ] **Versioning**: Follows SemVer rules (document which: MAJOR/MINOR/PATCH)

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - [Brief Title] (Priority: P1)

[Describe this user journey in plain language - how will users interact with this component?]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently - e.g., "Can be fully tested by rendering component with minimal props and verifying basic functionality"]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [user action], **Then** [expected outcome]
2. **Given** [initial state], **When** [user action], **Then** [expected outcome]

---

### User Story 2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [user action], **Then** [expected outcome]

---

### User Story 3 - [Brief Title] (Priority: P3)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [user action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- What happens when [prop is not provided]?
- How does component handle [invalid prop values]?
- What happens with [extremely long text/content]?
- How does component behave when [parent container is too small]?
- What happens on [different screen sizes/breakpoints]?

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: Component MUST [specific capability, e.g., "render with default props"]
- **FR-002**: Component MUST [specific capability, e.g., "accept children prop"]
- **FR-003**: Component MUST [key interaction, e.g., "handle click events"]
- **FR-004**: Component MUST [styling requirement, e.g., "use CSS Modules for isolation"]
- **FR-005**: Component MUST [behavior, e.g., "support RTL languages"]
- **FR-006**: Component MUST [accessibility, e.g., "include proper ARIA attributes"]

*Example of marking unclear requirements:*

- **FR-007**: Component MUST support themes via [NEEDS CLARIFICATION: which theming approach - bpk-theming, CSS variables, or props?]
- **FR-008**: Component MUST handle loading state [NEEDS CLARIFICATION: loading indicator style not specified]

### Component API *(include props/types)*

**Props**:

- **`variant`** (string, required): Visual variant - one of: "primary", "secondary", "tertiary"
- **`size`** (string, optional, default: "medium"): Size variant - "small", "medium", "large"
- **`disabled`** (boolean, optional, default: false): Whether component is disabled
- **`className`** (string, optional): Additional CSS class names
- **`children`** (ReactNode, optional): Content to display
- **`onClick`** (function, optional): Click handler `(event: MouseEvent) => void`
- **`ariaLabel`** (string, optional): Accessible label for screen readers

**Example**:
```typescript
type BpkComponentNameProps = {
  variant: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  ariaLabel?: string;
};
```

### Non-Functional Requirements

- **NFR-001**: Component MUST be keyboard accessible (tab, enter, space)
- **NFR-002**: Component MUST work with screen readers (proper ARIA)
- **NFR-003**: Component MUST support RTL languages
- **NFR-004**: Component MUST meet WCAG 2.1 Level AA standards
- **NFR-005**: Component MUST render correctly on all supported browsers
- **NFR-006**: Component MUST use `rem` units for all sizing (not `px` or `em`)

### Styling Requirements

- **STY-001**: All styles MUST use CSS Modules (`.module.scss`)
- **STY-002**: Styles MUST use modern Sass API with `@use` syntax
- **STY-003**: Imports MUST be granular from `bpk-mixins` submodules
- **STY-004**: All spacing MUST use design tokens (e.g., `tokens.bpk-spacing-md()`)
- **STY-005**: All colors MUST use design tokens (e.g., `tokens.$bpk-color-primary`)
- **STY-006**: Class names MUST follow BEM with `bpk-` prefix (e.g., `bpk-component-name--variant`)
- **STY-007**: Component MUST support theming via `bpk-theming` if applicable

**Example SCSS structure**:
```scss
@use '../bpk-mixins/tokens';
@use '../bpk-mixins/typography';

.bpk-component-name {
  padding: tokens.bpk-spacing-md();
  @include typography.bpk-text();

  &--primary {
    background-color: tokens.$bpk-color-primary;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Component renders correctly with all prop combinations
- **SC-002**: All accessibility tests pass with jest-axe
- **SC-003**: Visual regression tests pass in Percy
- **SC-004**: Test coverage meets thresholds (70% branches, 75% functions/lines/statements)
- **SC-005**: TypeScript compiles without errors
- **SC-006**: Storybook story demonstrates all variants and states
- **SC-007**: README documentation is complete with usage examples
- **SC-008**: Component works in all supported browsers (Chrome 109+, Edge 129+, Firefox 131+, Safari 15+)

## Design & Visual Specifications

<!--
  Link to Figma designs, visual mockups, or describe visual requirements
-->

**Figma**: [Link to Figma file]

**Visual States to implement**:
- Default/Rest state
- Hover state
- Focus state (keyboard navigation)
- Active/Pressed state
- Disabled state
- Loading state (if applicable)
- Error state (if applicable)

**Responsive behavior**:
- Mobile (<= 768px): [behavior]
- Tablet (769px - 1023px): [behavior]
- Desktop (>= 1024px): [behavior]

## Dependencies & Related Components

**Internal Dependencies** (other Backpack components):
- Uses `bpk-component-[name]` for [purpose]
- Composed with `bpk-component-[name]` in [scenario]

**External Dependencies** (npm packages):
- None expected (or list specific dependencies)

**Design Token Dependencies**:
- `@skyscanner/bpk-foundations-web` for design tokens
- `bpk-mixins` for Sass utilities

## Testing Strategy

### Unit Tests (`[ComponentName]-test.tsx`)
- Test all prop combinations
- Test event handlers (onClick, onChange, etc.)
- Test conditional rendering
- Test edge cases (null/undefined props, empty children)
- Snapshot tests for each variant

### Accessibility Tests (`accessibility-test.tsx`)
- Use jest-axe for automated checks
- Test keyboard navigation
- Test screen reader support
- Test ARIA attributes
- Test focus management

### Visual Regression Tests (Percy via Storybook)
- Test all visual variants
- Test all interactive states
- Test responsive breakpoints
- ⚠️ Do NOT test if component uses images (flaky on CI per `decisions/visual-tests.md`)

## Documentation Requirements

### README.md
- Component description (<100 words, British English prose)
- Usage examples with code snippets
- Props table with descriptions
- Browser support information
- Link to Storybook

### Storybook (`examples/bpk-component-[name]/stories.tsx`)
- Default story showing basic usage
- Story for each variant/size combination
- Story for interactive states (hover, focus, active)
- Story for disabled state
- Story for edge cases (long text, no props, etc.)
- Add a11y addon for accessibility checks

### JSDoc/TSDoc Comments
- Component description
- All props documented with type and description
- Examples in JSDoc where helpful
- `@deprecated` tags for any deprecated props

### Figma Code Connect (`.figma.tsx`)
- Connect component to Figma designs
- Map props to Figma properties
- Provide usage examples

## Migration & Versioning

**Version Type**: [MAJOR / MINOR / PATCH]

**Rationale**: [Why this version bump according to `decisions/versioning-rules.md`]

**Breaking Changes** (if MAJOR):
- [List any breaking API changes]
- [Migration guide for consumers]

**Deprecations** (if applicable):
- [Any APIs being deprecated]
- Timeline for removal (minimum 3 months)
- Alternative approaches

**Future API** (if applicable):
- [Any V2 versions being introduced]
- [Opt-in flags or alternative component names]

## Implementation Notes

**File Structure** (per constitution):
```
packages/bpk-component-[name]/
├── README.md
├── index.ts                            # exports default from src/
├── docs/                               # screenshots, design assets
└── src/
    ├── BpkComponentName/
    │   ├── BpkComponentName.tsx
    │   ├── BpkComponentName.module.scss
    │   ├── BpkComponentName-test.tsx
    │   ├── accessibility-test.tsx
    │   ├── BpkComponentName.figma.tsx
    │   ├── common-types.ts             # shared types if needed
    │   └── __snapshots__/
    └── themeAttributes.ts              # if component is themeable
```

**Key Implementation Principles**:
1. Follow Backpack constitution principles
2. Use TypeScript for all code
3. Use modern Sass with `@use` syntax
4. Ensure accessibility with jest-axe
5. Meet test coverage requirements
6. Document with British English prose, US English code
7. Use `rem` units for all sizing
8. Support RTL languages

## Open Questions

<!--
  List any unresolved questions or decisions needed
-->

- [ ] Q1: [Question about requirements, design, or implementation]
- [ ] Q2: [Question about API design or naming]
- [ ] Q3: [Question about browser support or technical constraints]

## References

- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Architecture Decisions**: `decisions/` directory
- **Component Examples**: Other components in `packages/`
- **Design Tokens**: `@skyscanner/bpk-foundations-web`
- **Sass Mixins**: `packages/bpk-mixins/`
