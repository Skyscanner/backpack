---
name: backpack-external-component-migration
description: |
  Migrate React components from external Skyscanner repositories (e.g., carhire-homepage)
  into Backpack design system components. Use when: (1) Component exists in app-specific
  repo with "unstable_backpack" or similar prefix, (2) Component needs to be promoted to
  official Backpack component, (3) Converting app code to follow Backpack constitution,
  (4) Extracting reusable UI patterns from product repos. Covers GitHub API access,
  Backpack naming conventions, modern Sass API, TypeScript patterns, license headers,
  accessibility testing, and Storybook integration. MANDATORY: Component must pass full
  test suite (npm run lint && npm run check-react-versions && npm run check-bpk-dependencies
  && npm run jest) with 0 errors before acceptance.
author: Claude Code
version: 1.1.0
date: 2026-02-12
changelog: |
  v1.1.0 (2026-02-12):
  - Added mandatory full test suite acceptance criteria
  - Enhanced verification phase with comprehensive debugging steps
  - Added common acceptance failure patterns and solutions
  - Clarified that 100% component coverage is required
  - Added detailed lint failure troubleshooting
  - Documented proper handling of generated directories in .eslintignore
  - Added guidance for undefined Sass token errors
  - Expanded verification checklist with accessibility requirements

  v1.0.0 (2026-02-12):
  - Initial skill creation from BpkThinking component migration
  - Complete workflow from external repo to Backpack standards
---

# Backpack External Component Migration

## Problem
Components developed in product-specific repositories (like carhire-homepage) need to be
converted into proper Backpack design system components that follow strict architectural
conventions, accessibility standards, and design system patterns.

## Context / Trigger Conditions

Use this workflow when:
- Component exists in another Skyscanner repo with path like `unstable_backpack/ComponentName`
- Product team wants to contribute component back to Backpack
- Component has been validated in production and ready for design system inclusion
- Need to standardize an existing component to Backpack standards
- Converting one-off UI patterns into reusable design system components

**Common indicators:**
- Component has `unstable_backpack` in its path
- Uses basic Backpack components but doesn't follow full Backpack structure
- Has product-specific dependencies that need to be removed
- Missing required Backpack files (accessibility tests, proper documentation)
- Not following Backpack naming conventions or file structure

## Prerequisites

1. **GitHub CLI access** configured (`gh auth status`)
2. **Backpack repository** cloned locally
3. **Repository documentation access**:
   - `CLAUDE.md` and `AGENTS.md` for project context
   - `constitution.md` (in `.specify/memory/`)
   - `decisions/` directory for architectural decisions
4. **Design approval** from Backpack squad (required before starting)

## Solution

### Phase 1: Discovery & Research (15-20 mins)

#### 1.1 Extract External Component

```bash
# Get directory structure
gh api "repos/Skyscanner/[repo-name]/contents/[path-to-component]" \
  --jq '.[] | {name: .name, type: .type, path: .path}'

# Download all component files
for file in Component.tsx Component.module.scss Component.test.tsx \
            Component.stories.tsx index.ts; do
  gh api "repos/Skyscanner/[repo-name]/contents/[path]/$file" \
    --jq '.content' | base64 -d > /tmp/$file
done
```

#### 1.2 Review Backpack Standards

```bash
# Read constitution for requirements
cat .specify/memory/constitution.md

# Review relevant architectural decisions
ls decisions/
cat decisions/modern-sass-api.md
cat decisions/component-scss-filenames.md
cat decisions/accessibility-tests.md
```

#### 1.3 Find Reference Component

```bash
# Look for similar existing Backpack component
ls packages/bpk-component-*/

# Study the reference component structure
# Good references: bpk-component-chip, bpk-component-button
```

### Phase 2: Component Creation (30-45 mins)

#### 2.1 Create Package Structure

```bash
mkdir -p packages/bpk-component-[name]/src
mkdir -p examples/bpk-component-[name]
```

**Required files:**
```
packages/bpk-component-[name]/
├── README.md
├── index.ts
└── src/
    ├── Bpk[ComponentName].tsx
    ├── Bpk[ComponentName].module.scss
    ├── Bpk[ComponentName]-test.tsx
    └── accessibility-test.tsx

examples/bpk-component-[name]/
├── examples.tsx
├── examples.module.scss
└── stories.tsx
```

#### 2.2 Convert Component TypeScript

**Key transformations:**

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

import type { ComponentPropsWithoutRef } from 'react';

import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './Bpk[ComponentName].module.scss';

const getClassName = cssModules(STYLES);

export type Bpk[ComponentName]Props = {
  /**
   * Accessibility label (REQUIRED for screen readers)
   */
  accessibilityLabel: string;
  // ... other props with JSDoc comments
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

const Bpk[ComponentName] = ({
  accessibilityLabel,
  className,
  ...rest
}: Bpk[ComponentName]Props) => {
  const classNames = getClassName('bpk-[component-name]', className);

  return (
    <div
      className={classNames}
      aria-label={accessibilityLabel}
      data-testid="bpk-[component-name]"
      {...rest}
    >
      {/* Component content */}
    </div>
  );
};

export default Bpk[ComponentName];
```

**Critical changes from external code:**
- ✅ Add Apache 2.0 license header (NON-NEGOTIABLE)
- ✅ Use relative imports (`../../bpk-component-*`)
- ✅ Remove product-specific dependencies (i18n, app utilities)
- ✅ Make `accessibilityLabel` required (not optional)
- ✅ Use `ComponentPropsWithoutRef` for proper HTML element props
- ✅ Use `cssModules(STYLES)` pattern, not custom CSS utility
- ✅ Add `data-testid` for testing
- ❌ NO `className` or `style` props for new components (API encapsulation)
- ❌ NO product-specific i18n hooks

#### 2.3 Convert Styles (Modern Sass API)

```scss
/*
 * Backpack - Skyscanner's Design System
 * [... full license header ...]
 */

@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/utils';

.bpk-[component-name] {
  display: flex;
  padding: tokens.bpk-spacing-base();
  background-color: tokens.$bpk-surface-contrast-day;
  color: tokens.$bpk-text-on-dark-day;
  border-radius: tokens.$bpk-border-radius-lg;
  gap: tokens.bpk-spacing-md();

  // RTL support
  @include utils.bpk-rtl {
    // RTL-specific overrides
  }

  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  &__element {
    // BEM naming: .bpk-[component]__[element]
  }

  &--modifier {
    // BEM naming: .bpk-[component]--[modifier]
  }
}

@keyframes bpk-[component]-animation {
  from { /* ... */ }
  to { /* ... */ }
}
```

**Critical patterns:**
- ✅ Use `@use` not `@import` (deprecated)
- ✅ Import specific mixins: `@use '../../bpk-mixins/tokens'`
- ✅ Use token functions: `tokens.bpk-spacing-md()`
- ✅ Use token variables: `tokens.$bpk-surface-contrast-day`
- ✅ All sizing in `rem`, never `px` (accessibility requirement)
- ✅ BEM naming: `.bpk-[name]`, `.bpk-[name]__[element]`, `.bpk-[name]--[modifier]`
- ✅ Support RTL with `@include utils.bpk-rtl`
- ✅ Support reduced motion preference
- ❌ NO magic numbers - use design tokens
- ❌ NO inline colors like `#FFFFFF` - use `tokens.$bpk-color-white`

#### 2.4 Write Unit Tests

```typescript
/*
 * Backpack - Skyscanner's Design System
 * [... license header ...]
 */

import { render, screen } from '@testing-library/react';

import Bpk[ComponentName] from './Bpk[ComponentName]';

describe('Bpk[ComponentName]', () => {
  it('should render correctly with default props', () => {
    const { asFragment } = render(
      <Bpk[ComponentName] accessibilityLabel="Label" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with custom props', () => {
    render(
      <Bpk[ComponentName]
        accessibilityLabel="Label"
        customProp="value"
      />,
    );
    expect(screen.getByTestId('bpk-[component-name]')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const customClass = 'custom-class';
    render(
      <Bpk[ComponentName]
        accessibilityLabel="Label"
        className={customClass}
      />,
    );
    const element = screen.getByTestId('bpk-[component-name]');
    expect(element).toHaveClass(customClass);
  });

  it('should have correct accessibility label', () => {
    const label = 'Accessible label';
    render(<Bpk[ComponentName] accessibilityLabel={label} />);
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });
});
```

#### 2.5 Write Accessibility Tests

```typescript
/*
 * Backpack - Skyscanner's Design System
 * [... license header ...]
 */

import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import Bpk[ComponentName] from './Bpk[ComponentName]';

describe('Bpk[ComponentName] accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <Bpk[ComponentName] accessibilityLabel="Label" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with custom content', async () => {
    const { container } = render(
      <Bpk[ComponentName]
        accessibilityLabel="Label"
        customProp="value"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

#### 2.6 Create Storybook Integration

**examples/bpk-component-[name]/examples.tsx:**
```typescript
/*
 * Backpack - Skyscanner's Design System
 * [... license header ...]
 */

import Bpk[ComponentName] from '../../packages/bpk-component-[name]/src/Bpk[ComponentName]';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

export const DefaultExample = () => (
  <div className={getClassName('examples')}>
    <Bpk[ComponentName] accessibilityLabel="Default" />
  </div>
);

export const CustomExample = () => (
  <div className={getClassName('examples')}>
    <Bpk[ComponentName]
      accessibilityLabel="Custom"
      customProp="value"
    />
  </div>
);
```

**examples/bpk-component-[name]/stories.tsx:**
```typescript
/*
 * Backpack - Skyscanner's Design System
 * [... license header ...]
 */

import Bpk[ComponentName] from '../../packages/bpk-component-[name]/src/Bpk[ComponentName]';

import {
  DefaultExample,
  CustomExample,
} from './examples';

export default {
  title: 'bpk-component-[name]',
  component: Bpk[ComponentName],
};

export const Default = DefaultExample;
export const Custom = CustomExample;

export const VisualTest = DefaultExample;
export const VisualTestWithZoom = {
  render: DefaultExample,
  args: {
    zoomEnabled: true,
  },
};
```

#### 2.7 Create Package Index

**packages/bpk-component-[name]/index.ts:**
```typescript
/*
 * Backpack - Skyscanner's Design System
 * [... license header ...]
 */

export { default } from './src/Bpk[ComponentName]';
export type { Bpk[ComponentName]Props } from './src/Bpk[ComponentName]';
```

#### 2.8 Create README

```markdown
# bpk-component-[name]

> Backpack [name] component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

\`\`\`tsx
import Bpk[ComponentName] from '@skyscanner/backpack-web/bpk-component-[name]';

export default () => (
  <Bpk[ComponentName] accessibilityLabel="Label" />
);
\`\`\`

## Props

| Property           | PropType | Required | Default Value |
| ------------------ | -------- | -------- | ------------- |
| accessibilityLabel | string   | true     | -             |
| className          | string   | false    | null          |

## Accessibility

[Describe accessibility features and best practices]

## Design tokens

[List tokens used by the component]
```

### Phase 3: Verification & Acceptance (15-20 mins)

**CRITICAL**: The component MUST pass the full test suite before being considered complete.

#### 3.1 Full Test Suite (Acceptance Criteria)

Run the complete Backpack verification suite:

```bash
npm run lint && npm run check-react-versions && npm run check-bpk-dependencies && npm run jest
```

**Success Criteria:**
- ✅ Linting passes (0 errors, warnings in new component code are acceptable if justified)
- ✅ React version checks pass
- ✅ Backpack dependency checks pass
- ✅ All Jest tests pass with 100% coverage for the new component
- ✅ No TypeScript compilation errors
- ✅ Accessibility tests pass (jest-axe)

**Note**: Global coverage may be low when testing a single component, but the component itself must have 100% coverage:
```
packages/bpk-component-[name]/src  | 100 | 100 | 100 | 100 |
```

#### 3.2 Individual Verification Steps

If the full suite fails, debug with individual commands:

**Type Check:**
```bash
npm run typecheck
# Should compile without errors or warnings
```

**Lint (JS/TS):**
```bash
npm run lint:js
# 0 errors in new component files
```

**Lint (SCSS):**
```bash
npm run lint:scss
# 0 errors in new component styles
```

**Component Tests Only:**
```bash
npm run jest -- packages/bpk-component-[name]
# All tests pass, 100% component coverage
```

#### 3.3 Storybook Visual Verification

```bash
npm run storybook
```

**Manual Checks:**
- [ ] Component renders correctly in all examples
- [ ] Animations work smoothly
- [ ] Component is responsive at different viewport sizes
- [ ] RTL mode works correctly (if applicable)
- [ ] No console errors or warnings
- [ ] Reduced motion preference is respected

#### 3.4 Common Acceptance Failures

**Failure: Lint errors in dist-sassdoc or generated files**

**Symptom:** Lint fails with errors in `dist-sassdoc/`, `dist/`, or other generated directories

**Solution:** Ensure `.eslintignore` includes all generated directories:
```
node_modules
dist
dist-storybook
dist-sassdoc
coverage
```

**Failure: Undefined Sass token errors**

**Symptom:** `Undefined variable: tokens.$bpk-border-radius-pill`

**Solution:** Check token exists in `@skyscanner/bpk-foundations-web`:
1. Search existing components for similar usage
2. Use standard CSS values for unavailable tokens (e.g., `50%` for circles instead of `$bpk-border-radius-pill`)
3. For pixel values, convert to rem: `10px` → `0.625rem`

**Failure: Module resolution errors**

**Symptom:** `Module not found: Can't resolve '../../bpk-component-*'`

**Solution:** Verify relative import paths:
- From component source: `../../bpk-component-text`
- From examples: `../../packages/bpk-component-text`
- From tests: Same as component source (tests are co-located)

**Failure: Global coverage threshold not met**

**Symptom:** `Jest: "global" coverage threshold for statements (75%) not met: 17.22%`

**Expected:** This is normal when testing a single component. Check that YOUR component has 100% coverage:
```
packages/bpk-component-[name]/src  | 100 | 100 | 100 | 100 |
Bpk[ComponentName].tsx             | 100 | 100 | 100 | 100 |
```

**Failure: Snapshot mismatch**

**Symptom:** `1 snapshot failed`

**Solution:** For new components, this is expected on first run:
```bash
npm run jest -- packages/bpk-component-[name] -u
# Updates snapshots, then re-run to verify they pass
```

## Common Issues & Solutions

### Issue 1: Token Import Errors

**Symptom:** `Error: Can't find module '@skyscanner/bpk-foundations-web'`

**Solution:**
```bash
npm install
npm run build  # Rebuild bpk-mixins package
```

### Issue 2: Wrong Import Paths

**Symptom:** `Module not found: Can't resolve '../../../bpk-component-text'`

**Solution:** Use correct relative paths:
- From component: `../../bpk-component-text`
- From examples: `../../packages/bpk-component-text`

### Issue 3: CSS Classes Not Applied

**Symptom:** Component renders but no styles visible

**Solution:** Check:
1. `.module.scss` extension used (not just `.scss`)
2. Styles imported correctly: `import STYLES from './Component.module.scss'`
3. `cssModules(STYLES)` pattern used correctly
4. Class names follow BEM: `.bpk-[name]`

### Issue 4: Accessibility Test Failures

**Symptom:** `jest-axe` reports violations

**Common fixes:**
- Ensure `accessibilityLabel` is used: `aria-label={accessibilityLabel}`
- Decorative elements have `aria-hidden="true"`
- Interactive elements have proper `role` attributes
- Color contrast meets WCAG AA standards

### Issue 5: Snapshot Mismatches

**Symptom:** Snapshot tests fail on first run

**Solution:** This is expected for new components:
```bash
npm test -- packages/bpk-component-[name] -u
# Updates snapshots for new component
```

## Verification Checklist

**MANDATORY ACCEPTANCE TEST** (must pass before merge):
- [ ] **Full test suite passes**: `npm run lint && npm run check-react-versions && npm run check-bpk-dependencies && npm run jest`
  - [ ] 0 lint errors (warnings acceptable if justified)
  - [ ] All React version checks pass
  - [ ] All dependency checks pass
  - [ ] All Jest tests pass
  - [ ] Component has 100% code coverage

**Code Quality:**
- [ ] All files have Apache 2.0 license headers (NON-NEGOTIABLE)
- [ ] Component follows naming convention: `Bpk[ComponentName]`
- [ ] File names match component name exactly
- [ ] Modern Sass API used (`@use`, not `@import`)
- [ ] All spacing/colors use design tokens, no magic numbers
- [ ] Sizing in `rem` units, not `px` (accessibility requirement)
- [ ] TypeScript compiles without errors or warnings
- [ ] No product-specific dependencies remain

**Accessibility (WCAG 2.1 AA):**
- [ ] `accessibilityLabel` prop is required (not optional)
- [ ] Accessibility tests pass (jest-axe with 0 violations)
- [ ] Decorative elements have `aria-hidden="true"`
- [ ] Interactive elements have proper roles and labels
- [ ] Component respects `prefers-reduced-motion`
- [ ] Color contrast meets WCAG AA standards

**Testing:**
- [ ] Unit tests pass with 100% component coverage
- [ ] Tests cover all props and states
- [ ] Snapshot tests generated and passing
- [ ] Edge cases tested (long content, empty state, etc.)

**Documentation & Examples:**
- [ ] README documentation complete with usage examples
- [ ] Storybook examples render correctly
- [ ] All component states visible in Storybook
- [ ] Props table documented with types and defaults

**RTL & Responsiveness:**
- [ ] Component handles RTL languages (uses `@include utils.bpk-rtl`)
- [ ] Component is responsive at different viewport sizes
- [ ] Component works on mobile and desktop

## Notes

### Design Approval Required

**CRITICAL**: Before starting migration, component MUST have:
- Design approval from Backpack squad (#backpack Slack)
- Figma designs with all states documented
- Accessibility annotations in Figma
- Token specifications (no magic numbers in designs)

Do NOT proceed without design approval - this is non-negotiable per constitution.

### When to Skip Migration

Don't migrate if:
- Component is too product-specific (not reusable)
- Component doesn't meet accessibility standards
- Design patterns don't align with Backpack philosophy
- Component has unstable API still under experimentation

Consider creating as experimental V2 component instead if uncertain.

### API Encapsulation for New Components

Per constitution principle XI:
- NEW components should NOT expose `className` or `style` props
- Prevents consumers from breaking visual consistency
- Forces proper composition through Backpack patterns
- Existing components may grandfather these props

If migrating component has `className`, keep it for backward compatibility,
but document as discouraged and don't add to new components.

### Dependency Removal

Common product-specific dependencies to remove:
- `@skyscanner-web/*/src/services/i18n` → Use `content` prop instead
- Product-specific utility functions → Use Backpack utilities
- Custom CSS modules patterns → Use `cssModules(STYLES)`
- App-specific types → Use standard React types

### Performance Considerations

- Minimize bundle size - avoid unnecessary dependencies
- Use dynamic imports for large dependencies
- Follow `browserslist-config-skyscanner` for transpilation
- No polyfills in component code (handled by app layer)

## References

- [Backpack Constitution](../../.specify/memory/constitution.md)
- [Backpack Documentation](https://www.skyscanner.design/)
- [Modern Sass API Decision](../../decisions/modern-sass-api.md)
- [Accessibility Testing Decision](../../decisions/accessibility-tests.md)
- [Component SCSS Filenames Decision](../../decisions/component-scss-filenames.md)
- [Sizing in Rem Decision](../../decisions/sizing-in-rem.md)
- [GitHub CLI Authentication](https://cli.github.com/manual/gh_auth_login)
