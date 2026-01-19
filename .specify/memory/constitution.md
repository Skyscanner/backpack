<!--
Sync Impact Report:
Version: 1.0.0 → 1.0.1 (PATCH - Clarification of existing requirement)
Modified principles:
- Principle II (Naming & File Conventions): Enhanced license header section with explicit file type list and complete code examples for all file types (TypeScript, JavaScript, CSS, SCSS, bash scripts)
Added sections: None
Removed sections: None
Templates status:
- ✅ .specify/templates/spec-template.md - Updated Constitution Check to include explicit license header requirement
- ✅ .specify/templates/plan-template.md - Updated Core Principles Compliance to include license header checkpoint
- ✅ .specify/templates/tasks-template.md - Updated Naming & File Conventions compliance checklist to include license headers
Follow-up TODOs: None - all templates aligned with clarified requirement
-->

# Backpack Design System Constitution

## Core Principles

### I. Component-First Architecture

Every feature MUST be developed as a reusable component within the Backpack design system. Components MUST:

- Follow the established Monorepo structure in `packages/`
- Be self-contained with their own tests, styles, and documentation
- Export a clear public API
- Have a singular, well-defined purpose
- Be independently testable and documented

**Rationale**: The Monorepo architecture (95+ packages) enables independent versioning, clear boundaries, and reusability across Skyscanner products. Single-purpose components are easier to maintain, test, and compose.

### II. Naming & File Conventions (NON-NEGOTIABLE)

All code MUST follow these conventions:

- **Component files**: PascalCase (e.g., `BpkButton.tsx`, `BpkHorizontalNavItem.tsx`)
- **Style files**: Match component name exactly with `.module.scss` extension (e.g., `BpkButton.module.scss`)
- **Test files**: `*-test.tsx` for unit tests, `accessibility-test.tsx` for accessibility tests
- **Utility files**: kebab-case (e.g., `button-utils.ts`, `theme-attributes.ts`)
- **Package names**: kebab-case with `bpk-` prefix (e.g., `bpk-component-button`)
- **CSS class names**: BEM style with `bpk-` prefix (e.g., `bpk-button--primary`)

**License Headers (NON-NEGOTIABLE)**:

ALL source files MUST include the Apache 2.0 license header at the top. This applies to:
- TypeScript files (`.ts`, `.tsx`)
- JavaScript files (`.js`, `.jsx`)
- Sass/CSS files (`.scss`, `.css`)
- Bash scripts (`.sh`)

**For TypeScript, JavaScript, Sass, and CSS files**, use the following multi-line comment format:

```typescript
/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
```

**For bash scripts**, use `#` comment syntax immediately after the shebang line:

```bash
#!/bin/bash
# Backpack - Skyscanner's Design System
#
# Copyright 2016 Skyscanner Ltd
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
```

**Rationale**: Consistent naming enables quick navigation, automated tooling, and reduces cognitive load. License headers ensure legal compliance and proper attribution. This is documented in `decisions/js-filenames.md` and `decisions/component-scss-filenames.md`.

### III. Modern Sass with Granular Imports (NON-NEGOTIABLE)

All styles MUST use the modern Sass API:

- Use `@use` syntax, NEVER `@import` (deprecated)
- Import specific mixins granularly from `bpk-mixins` submodules
- Reference mixins with namespace prefixes (e.g., `tokens.bpk-spacing-md()`)
- Use CSS Modules (`.module.scss`) for component isolation
- All sizing values MUST be in `rem` units, not `px` or `em`

**Foundation Elements & Tokens** :

All visual CSS parameters (colors, margins, paddings, typography, shadows) MUST use design tokens from `@skyscanner/bpk-foundations-web`. NO magic numbers allowed in component code.

- Token changes require separate PR to [`backpack-foundations`](https://github.com/Skyscanner/backpack-foundations)
- All tokens, Sass mixins, and icons live in the foundations repository

**Example**:
```scss
@use '../bpk-mixins/tokens';
@use '../bpk-mixins/shadows';

.bpk-button {
  padding: tokens.bpk-spacing-md();  // ✅ Token, not magic number
  color: tokens.$bpk-color-primary;   // ✅ Token, not #007bff
  @include shadows.bpk-box-shadow-sm();
}
```

**Rationale**: Modern Sass API improves modularity and build performance. `rem` units provide consistent, flexible sizing that respects user preferences and enables font scaling for accessibility. Centralized tokens ensure visual consistency and enable global theme changes. See `decisions/modern-sass-api.md` and `decisions/sizing-in-rem.md`.

**Accessibility Note**: Using `rem` instead of `px` is critical for accessibility. When users increase browser default font size (font scaling), `rem` values scale proportionally while `px` values stay fixed. This enables users with visual impairments to comfortably read content without manual zoom adjustments on every site. See Skyscanner Web Documentation: "Accessibility/pixels-vs-rems.md".

### IV. Accessibility-First Testing (NON-NEGOTIABLE)

Every public-facing component MUST meet WCAG 2.1 Level AA standards:

**Automated Testing**:
- Use `jest-axe` for automated accessibility testing
- Place tests in `accessibility-test.tsx` files
- Test the public interface (how components are actually used)
- All tests MUST pass before release

**Manual Testing Requirements** :
- Keyboard-only navigation (Tab, Enter, Space, Arrow keys)
- Screen reader testing (VoiceOver, NVDA, JAWS)
- Zoom functionality:
  - Page MUST be functional and readable at 200% text magnification
  - Page MUST reflow at 400% zoom without horizontal scrolling
- Color contrast MUST meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- Touch targets MUST be minimum 44x44 pixels on mobile

**Five Core Accessibility Elements**:
1. **Design**: Accessible colors (contrast & color blindness), font size, layout, motion, interactions
2. **Content**: Plain language, clear links/CTAs, ALT text, hidden labels
3. **Keyboard-only**: Correct navigation order, all interactive elements reachable
4. **Screen readers**: Meaningful focus order, heading tags, image descriptions, ARIA labels
5. **Magnification**: Zoom up to 400% without losing content or functionality

**Rationale**: Accessibility is non-negotiable - 1 in 5 people have a permanent disability. Automated testing catches ~40% of issues; manual testing is required for 100% coverage. Skyscanner's 2023 goal: >90% accessible with 0 critical issues. See `decisions/accessibility-tests.md` and Skyscanner Web Documentation: "Accessibility/guidelines-for-developers.md".

### V. TypeScript Migration & Type Safety

All new code MUST be written in TypeScript:

- Use TypeScript for all new components and utilities
- Maintain both TypeScript types and prop-types during migration
- Generate `.d.ts` declaration files for published packages
- Use JSDoc `@deprecated` tags for deprecated APIs
- Add console warnings for deprecated prop usage at runtime

**Example**:
```typescript
type MyCompProps = {
  stableProp: string;
  /** @deprecated deprecatedProp is deprecated. Use stableProp instead. */
  deprecatedProp?: string;
}
```

**Rationale**: TypeScript provides type safety, better IDE support, and catches errors at compile time. See `decisions/ts-deprecating-props.md`.

### VI. Semantic Versioning (SemVer)

All package releases MUST follow semantic versioning:

- **MAJOR**: Breaking changes (API changes, visual changes, token changes, removal of components/props, new mandatory functionality)
- **MINOR**: New features (optional props, new components, deprecations)
- **PATCH**: Bug fixes, dependency updates, code quality improvements

**Rationale**: SemVer ensures consumers can safely update dependencies without unexpected breakage. See `decisions/versioning-rules.md`.

### VII. Deprecation & Future API Management

Breaking changes MUST be introduced gradually:

**Deprecation Cycle** (minimum 3 months):
- Use `@deprecated` JSDoc/TSDoc comments
- Add runtime console warnings
- Deprecated props/arguments MUST be optional
- Document alternative approaches

**V2 Components for Major Changes** :

Create V2 component if change requires:
- Multiple code modifications by consumers, OR
- Significant structural/API alteration that makes dual-API unreadable

**V2 Component Structure**:
```
packages/bpk-component-button/src/
├── BpkButton/           # V1 (current)
│   └── BpkButton.tsx
└── BpkButtonV2/         # V2 (future, experimental)
    └── BpkButton.tsx
```

**V2 Guidelines**:
- Path: `packages/bpk-component-[name]/src/Bpk[Name]V2/`
- Export both from `index.ts`
- V2 is experimental; follow-up changes NOT considered breaking
- Provide 3+ months for adoption before deprecating V1
- Migration guide REQUIRED for all breaking changes

**Skip Deprecation Cycle If**:
- Change has limited usage (~5-10 usages across Skyscanner)
- Change is non-breaking

**Contact Clover Team** if unsure about change impact or scale.

**Rationale**: Gradual migration prevents sudden breakage. V2 components enable safe experimentation with major changes. See `decisions/deprecated-api.md`, `decisions/future-api.md`, and CONTRIBUTING.md.

### VIII. Test Coverage & Quality

All components MUST meet these test requirements:

**Coverage Thresholds**:
- Branches: 70%
- Functions/Lines/Statements: 75%

**Test Types**:
- Unit tests with Jest + Testing Library
- Accessibility tests with jest-axe
- Visual regression tests with Percy (via Storybook)
- Snapshot tests (auto-generated)

**Visual Testing**: Components using images should NOT be visually tested (flaky on CI)

**Quality Standards** :
- **Zero warnings allowed** (not just zero errors)
- Follow Backpack style guide
- High test coverage with good examples
- **Extreme case testing required**:
  - Large text (200% zoom, 400% zoom)
  - Small devices (320px width)
  - Slow networks
  - Long text/content overflow
  - Empty states
  - Maximum bounds

**Rationale**: High test coverage ensures reliability and catches regressions early. Zero warnings maintain code quality. Extreme case testing ensures robustness for all users. See `decisions/visual-tests.md` and CODE_REVIEW_GUIDELINES.md.

### IX. Documentation Standards

All components MUST have:

- README.md with clear usage examples
- Storybook stories in `examples/` directory
- JSDoc/TSDoc comments for all public APIs
- Figma Code Connect integration (`.figma.tsx` files)

**Documentation Guidelines**:
- Use British English for prose, US English for code interfaces
- Use sentence case for titles
- Keep titles singular (e.g., "Bar chart" not "Bar charts")
- Keep descriptions under 100 words
- Describe purpose, not configuration details
- Keep platform-agnostic unless component is platform-specific

**Rationale**: Consistent documentation enables easy discovery and correct usage. See `decisions/writing-docs.md`.

### X. Design-Anchored Development (NON-NEGOTIABLE)


Backpack is an encoding of Skyscanner's visual design language. All component changes MUST be design-approved before implementation:

**Design Approval Requirements**:
- Changes MUST go through design review with wider design community, OR
- Be reviewed and approved by a Backpack designer
- For non-trivial changes, reach out to Backpack squad on Slack (#backpack) BEFORE starting work

**Design Deliverables Required**:
- Figma designs with ALL states documented (default, hover, focus, active, disabled, loading, error)
- Visual examples for each state
- Responsive behavior specifications (mobile, tablet, desktop)
- Accessibility annotations (using Figma accessibility annotation kit)

**Implementation Requirements**:
- Components MUST match design specifications exactly
- Visual parameters MUST use design tokens, not magic numbers
- Design changes require separate token update in `backpack-foundations`

**Rationale**: Backpack starts with design. Design-first ensures consistency across all Skyscanner products and prevents implementation drift from the design system. See CODE_REVIEW_GUIDELINES.md and CONTRIBUTING.md.

### XI. API Encapsulation & Developer Experience



Component APIs MUST prioritize developer experience and ensure visual consistency:

**API Design Principles**:
- APIs MUST be delightful and intuitive to use
- Components MUST be closed for modification of look and feel
- **NEW components MUST restrict `className` and `style` props** to prevent style overwriting
- Existing components may grandfather these props but discourage their use
- Prop names MUST be clear, unambiguous, and follow React conventions

**Accessibility-First API Design**:
- Accessibility props MUST be required when needed (not optional)
- Example: `accessibilityLabel` required (not optional) forces consumers to build accessible products
- Encourage accessible defaults through API design

**Rationale**: Restricting `className` and `style` prevents consumers from breaking visual consistency. Required accessibility props enforce accessible development practices. Delightful APIs improve adoption and reduce support burden. See CODE_REVIEW_GUIDELINES.md and CONTRIBUTING.md.

### XII. Experimentation Lifecycle


Experimental features MUST follow a controlled lifecycle to enable A/B testing while maintaining codebase quality:

**When Component is Experimental**:
- Component or change is not stable
- Depends on experiment results
- May be removed if experiment fails

**Experimentation Guidelines by Change Type**:

**Patch/Minor Changes** (existing component):
- Use JSDoc `@experimental` annotations
- Example:
  ```typescript
  type Props = {
    text: string;
    /**
     * @experimental This prop is experimental and subject to change.
     * Use with caution.
     */
    sparkles?: boolean;
  }
  ```
- Update API documentation to indicate experimental status

**Major Changes** (new V2 component):
- Create experimental V2 component following V2 naming: `BpkComponentNameV2`
- Path: `packages/bpk-component-[name]/src/Bpk[Name]V2/`
- If experiment succeeds: V1 deprecated, V2 becomes default in next MAJOR version
- If experiment fails: V2 removed

**Documentation Requirements**:
- Experimental components MUST have README marking experimental status
- Do NOT publish to [skyscanner.design](https://www.skyscanner.design) until stable
- Update documentation when experiment completes

**Cleanup Timeline**:
- Experimentation code MUST be cleaned up **within 2 weeks** of experiment completion
- Successful experiment: Remove `@experimental` annotations, publish documentation
- Unsuccessful experiment: Remove code entirely

**Follow-up Changes**:
- Changes to experimental components are NOT considered breaking

**Rationale**: Structured experimentation enables data-driven decisions without accumulating technical debt. 2-week cleanup ensures codebase stays clean. See CONTRIBUTING.md "Experimenting with Backpack components".

### XIII. Performance Standards


Components MUST be built with performance in mind:

**Performance Requirements**:
- Follow Skyscanner's [browserslist-config-skyscanner](https://github.skyscannertools.net/web-engineering/browserslist-config-skyscanner) for transpilation targets
- Minimize bundle size - avoid unnecessary dependencies
- Use dynamic imports for large dependencies when possible
- Optimize images (see Skyscanner Web Documentation: "performance/performant-images.md")
- Consider performance impact of third-party libraries

**Performance Testing**:
- Performance budgets enforced via CI where applicable
- Monitor bundle size changes in PRs
- Test on slow networks and low-end devices

**Polyfills**:
- Polyfills provided via internal Express polyfill-middleware
- Do NOT include polyfills in component code
- See Skyscanner Web Documentation: "browser-support.md"

**Rationale**: Skyscanner is a global product serving diverse users with varying network speeds and device capabilities. Performance directly impacts user experience and conversion rates. See Skyscanner Web Documentation: "performance/performance-guidance.md" and "browser-support.md".

## Technology Constraints

### Supported Platforms & Browsers

- **Node.js**: >=18.20.4
- **npm**: >=10.7.0
- **React**: 18.3.1
- **TypeScript**: 5.9.2
- **Browsers** (from [browserslist-config-skyscanner](https://github.skyscannertools.net/web-engineering/browserslist-config-skyscanner)):
  - Chrome >= 109
  - Edge >= 129
  - Firefox >= 131
  - Safari >= 15
  - Samsung >= 26

### Build Tools & Testing

- **Build**: Webpack 5, Babel 7, Gulp 5, npm-run-all
- **Testing**: Jest 30, Testing Library, jest-axe, Percy
- **Linting**: ESLint (@skyscanner/eslint-config-skyscanner with jsx-a11y plugin), Stylelint
- **Formatting**: Prettier
- **CI/CD**: GitHub Actions, Dependabot, Danger

### Package Structure (Monorepo)

Each component package MUST follow this structure:

```
packages/bpk-component-[name]/
├── README.md                     # Component documentation
├── index.ts                      # Export entry point
├── docs/                         # Documentation assets
└── src/
    ├── [ComponentName]/          # V1 component
    │   ├── [ComponentName].tsx         # Component implementation
    │   ├── [ComponentName].module.scss # CSS Modules styles
    │   ├── [ComponentName]-test.tsx    # Unit tests
    │   ├── accessibility-test.tsx      # Accessibility tests
    │   ├── [ComponentName].figma.tsx   # Figma Code Connect
    │   └── __snapshots__/              # Jest snapshots
    ├── [ComponentName]V2/        # V2 component (if exists)
    │   └── [ComponentName].tsx
    └── themeAttributes.ts        # Theme attributes (if applicable)
```

## Development Workflow

### Pre-Implementation Checklist

Before starting work on non-trivial changes:

1. **Familiarize** with `decisions/` folder conventions
2. **Review** start guidance at [skyscanner.design](https://www.skyscanner.design/latest/getting-started)
3. **Discuss** with Backpack squad on #backpack Slack
4. **Obtain design approval** from Backpack designer or design community
5. **Reference** existing components for code style (e.g., `bpk-component-chip`, `bpk-component-button`)

### Code Quality Gates

Before any code can be merged:

1. **Design approval**: Changes match approved Figma designs
2. **Linting**: ESLint and Stylelint MUST pass
3. **Type checking**: TypeScript MUST compile without errors
4. **Tests**: All tests MUST pass with required coverage
5. **Accessibility**: Accessibility tests MUST pass
6. **Visual regression**: Percy tests MUST pass (no unexpected visual changes)
7. **Zero warnings**: No compilation or linting warnings allowed
8. **Pre-commit hooks**: Husky + lint-staged MUST pass

### Review Process

All changes MUST:

- Be reviewed by at least one team member
- Pass all automated checks (CI/CD)
- Follow the constitution principles
- Match the design specifications
- Include tests for new functionality
- Update documentation as needed
- Verify compliance with relevant architecture decisions in `decisions/`
- Follow SemVer, erring on side of more breaking changes rather than fewer

### Release Process

1. Changes are merged to `main` branch
2. Version is bumped according to SemVer rules (using PR labels: major/minor/patch/skip-changelog)
3. Changelog is updated (automatic via Release Drafter)
4. Package is published to npm as `@skyscanner/backpack-web`
5. Storybook is deployed for visual documentation
6. Notify #backpack Slack channel

## Governance

### Amendment Procedure

Constitution amendments require:

1. Documentation of proposed changes with rationale
2. Review and approval from Backpack maintainers
3. Migration plan for existing code (if applicable)
4. Update to this constitution file with version bump
5. Propagation of changes to all templates and documentation

### Version History

- **Version**: 1.0.1
- **Ratified**: 2025-12-22
- **Last Amended**: 2026-01-19

**Changelog**:
- v1.0.1 (2026-01-19): Clarified license header requirements for CSS/SCSS files with explicit file type list and code examples for both multi-line comment and bash script formats
- v1.0.0 (2025-12-22): Initial comprehensive constitution integrating all Backpack standards from decisions/, CONTRIBUTING.md, CODE_REVIEW_GUIDELINES.md, and Skyscanner Web Documentation

### Compliance

- All PRs and code reviews MUST verify compliance with this constitution
- Any deviation MUST be explicitly justified and documented
- Constitution supersedes all other practices unless explicitly exempted
- Architecture decisions in `decisions/` directory provide detailed guidance
- When Backpack repository conflicts with Skyscanner Web Documentation, Backpack repository takes precedence

### Decision Documentation

All architectural decisions MUST be documented in `decisions/` directory following the TEMPLATE.md format:

- **Title**: Clear, descriptive heading
- **Decision**: What was decided
- **Thinking**: Why this decision was made
- **Anything else**: Additional context (optional)

Existing decisions cover:

- accessibility-tests.md
- component-scss-filenames.md
- deprecated-api.md
- future-api.md
- js-filenames.md
- modern-sass-api.md
- packages.md (dependency notes)
- release-schedule.md
- sizing-in-rem.md
- ts-deprecating-props.md
- versioning-rules.md
- visual-tests.md
- writing-docs.md

When making significant architectural changes, create a new decision document following TEMPLATE.md.

## References

- **Backpack Documentation**: https://www.skyscanner.design
- **Backpack Foundations**: https://github.com/Skyscanner/backpack-foundations
- **Skyscanner Web Documentation**: Internal web-documentation repository
- **Contribution Guidelines**: CONTRIBUTING.md
- **Code Review Guidelines**: CODE_REVIEW_GUIDELINES.md
- **Architecture Decisions**: `decisions/` directory
- **Slack Channel**: #backpack
