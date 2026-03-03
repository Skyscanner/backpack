---
name: backpack-code-review-checklist
description: |
  Comprehensive code review checklist for Backpack design system components. Use when:
  (1) Reviewing PRs for new or modified Backpack components, (2) Validating component
  compliance with Constitution and design system rules, (3) Checking if component follows
  Backpack conventions before merge, (4) Identifying violations in API design, token usage,
  accessibility, or documentation. Covers Constitution principles (I-XIII), decisions/
  guidelines, API encapsulation rules, private token restrictions, design approval workflow,
  and priority classification (blocking vs optional). Essential for maintaining Backpack
  quality standards and catching non-obvious violations like className props in new
  components or cross-component private token usage.
author: Claude Code
version: 1.0.0
date: 2026-02-23
---

# Backpack Code Review Checklist

## Problem

Backpack components must adhere to strict quality standards defined across multiple documents
(Constitution, decisions/, CODE_REVIEW_GUIDELINES.md). Reviewers need a systematic way to
validate compliance and identify violations that may not be obvious from casual inspection.

## Context / Trigger Conditions

Use this skill when:
- Reviewing a PR that adds or modifies a Backpack component
- Performing a compliance audit on an existing component
- User requests "review this component" or "check Backpack compliance"
- Validating component before merge or release
- Teaching someone Backpack review standards

**Common review scenarios:**
- New component addition (e.g., `bpk-component-thinking`)
- Component migration from external repos
- API changes to existing components
- Visual or styling updates
- Accessibility improvements

## Solution

### Phase 1: Document Review Setup

**Key reference documents (read these first):**

1. **Constitution** (`.specify/memory/constitution.md`):
   - Core principles I-XIII
   - Non-negotiable requirements
   - Technology constraints

2. **Decisions** (`decisions/` directory):
   - `modern-sass-api.md` - Sass patterns
   - `accessibility-tests.md` - Testing requirements
   - `component-scss-filenames.md` - Naming
   - `versioning-rules.md` - SemVer rules
   - `deprecated-api.md` - Deprecation cycle
   - Other relevant decisions

3. **Guidelines**:
   - `CODE_REVIEW_GUIDELINES.md` - Quality standards
   - `CONTRIBUTING.md` - Workflow

### Phase 2: Core Compliance Checks

#### ✅ 1. Naming & File Conventions (Constitution II)

**Check:**
- [ ] Component files: PascalCase (e.g., `BpkThinking.tsx`)
- [ ] Style files: Match component with `.module.scss` (e.g., `BpkThinking.module.scss`)
- [ ] Test files: `*-test.tsx` and `accessibility-test.tsx`
- [ ] Package names: `bpk-component-[name]` (kebab-case)
- [ ] CSS classes: BEM with `bpk-` prefix (e.g., `bpk-thinking__bubble`)

**Check:**
```bash
# Verify file naming
ls packages/bpk-component-*/src/

# Check CSS class naming
rg "className.*bpk-" packages/bpk-component-*/src/*.module.scss
```

#### ✅ 2. License Headers (Constitution II - NON-NEGOTIABLE)

**Check:**
- [ ] ALL source files have Apache 2.0 header (`.ts`, `.tsx`, `.scss`, `.js`)
- [ ] Bash scripts have `#` comment format after shebang

**Example header:**
```typescript
/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * ...
 */
```

**Check:**
```bash
# Find files missing license headers
rg -L "Copyright 2016 Skyscanner" packages/bpk-component-*/src/
```

#### ✅ 3. API Design & Encapsulation (Constitution XI - CRITICAL)

**NEW COMPONENTS RULE (NON-NEGOTIABLE):**

New components MUST restrict `className` and `style` props to prevent style overwriting.

**Check:**
```typescript
// ❌ WRONG for new components
type Props = {
  content: string;
} & ComponentPropsWithoutRef<'div'>; // Includes className

// ✅ CORRECT for new components
type Props = {
  content: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className' | 'style'>;
```

**Existing components:** May grandfather these props but discourage use.

**Accessibility props:**
- [ ] Required when needed (not optional)
- [ ] Example: `accessibilityLabel: string` (not `accessibilityLabel?: string`)

**Check in code:**
```bash
# Find components accepting className
rg "className\?" packages/bpk-component-*/src/*.tsx

# Find new components with className in props
rg "ComponentPropsWithoutRef.*>" packages/bpk-component-*/src/*.tsx
```

#### ✅ 4. Modern Sass API (Constitution III - NON-NEGOTIABLE)

**Check:**
- [ ] Uses `@use` syntax, NEVER `@import`
- [ ] Granular imports from `bpk-mixins` submodules
- [ ] Namespace prefixes (e.g., `tokens.bpk-spacing-md()`)
- [ ] CSS Modules (`.module.scss`)
- [ ] All sizing in `rem`, not `px` or `em`

**Correct pattern:**
```scss
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/utils';

.bpk-component {
  padding: tokens.bpk-spacing-md(); // ✅ Token function
  color: tokens.$bpk-color-white;    // ✅ Token variable
}
```

**Check:**
```bash
# Find deprecated @import usage
rg "@import" packages/bpk-component-*/src/*.scss

# Find px units (should be rem)
rg ":\s*\d+px" packages/bpk-component-*/src/*.scss

# Find magic numbers (no token)
rg ":\s*\d+\.?\d*rem;" packages/bpk-component-*/src/*.scss | grep -v "tokens\."
```

#### ✅ 5. Token Usage (Constitution III)

**Rules:**
- [ ] All visual parameters use design tokens (no magic numbers)
- [ ] Do NOT use `$bpk-private-*` tokens from other components
- [ ] Token changes require separate PR to backpack-foundations

**Common violations:**

```scss
// ❌ WRONG: Using another component's private token
background-color: tokens.$bpk-private-chip-on-dark-on-background-night;

// ❌ WRONG: Magic number
max-width: 17.5rem; // No token reference

// ✅ CORRECT: Public token
background-color: tokens.$bpk-surface-contrast-day;

// ✅ CORRECT: Documented magic number with TODO
max-width: 17.5rem; // TODO: Add to backpack-foundations (issue #XXX)
```

**Check:**
```bash
# Find private token usage across components
rg "\$bpk-private-" packages/bpk-component-*/src/*.scss

# Find hardcoded values
rg ":\s*#[0-9a-fA-F]{3,6}" packages/bpk-component-*/src/*.scss
rg ":\s*\d+\.?\d*rem" packages/bpk-component-*/src/*.scss | grep -v "tokens\."
```

#### ✅ 6. Accessibility (Constitution IV - NON-NEGOTIABLE)

**Automated testing:**
- [ ] `accessibility-test.tsx` file exists
- [ ] Uses `jest-axe` for automated checks
- [ ] Tests public interface (how component is actually used)
- [ ] All tests pass

**Manual testing requirements:**
- [ ] Keyboard-only navigation works
- [ ] Screen reader compatible
- [ ] 200% text magnification works
- [ ] 400% zoom without horizontal scroll
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets ≥ 44x44px on mobile

**Check:**
```bash
# Find components without accessibility tests
find packages/bpk-component-*/src -name "accessibility-test.tsx" | wc -l

# Run accessibility tests
npm run jest -- accessibility-test
```

#### ✅ 7. TypeScript & Type Safety (Constitution V)

**Check:**
- [ ] All new code in TypeScript
- [ ] Proper prop type interfaces
- [ ] JSDoc comments for public APIs
- [ ] `@deprecated` tags for deprecated APIs
- [ ] Console warnings for deprecated prop usage

**Example:**
```typescript
type MyCompProps = {
  stableProp: string;
  /** @deprecated deprecatedProp is deprecated. Use stableProp instead. */
  deprecatedProp?: string; // Must be optional
}
```

#### ✅ 8. Documentation (Constitution IX)

**Check:**
- [ ] README.md with usage examples
- [ ] Storybook stories in `examples/` directory
- [ ] JSDoc/TSDoc comments
- [ ] Props documented
- [ ] Accessibility guidelines included

**Standards:**
- [ ] British English for prose, US English for code
- [ ] Sentence case for titles
- [ ] Singular titles (e.g., "Bar chart" not "Bar charts")
- [ ] Descriptions < 100 words

#### ✅ 9. Design Approval (Constitution X - BLOCKING)

**NON-NEGOTIABLE requirement:**

All component changes MUST be design-approved before implementation.

**Check:**
- [ ] Design review completed OR Backpack designer approval
- [ ] Figma designs exist with ALL states documented
- [ ] Visual examples for each state (default, hover, focus, active, disabled, loading, error)
- [ ] Responsive behavior specs (mobile, tablet, desktop)
- [ ] Accessibility annotations in Figma

**Missing design approval = BLOCKING ISSUE**

**Check:**
```bash
# Look for design approval mention in PR description or commits
# Contact #backpack Slack if unclear
```

#### ✅ 10. Testing Coverage (Constitution VIII)

**Requirements:**
- [ ] Branches: ≥70%
- [ ] Functions/Lines/Statements: ≥75%
- [ ] Unit tests (Jest + Testing Library)
- [ ] Accessibility tests (jest-axe)
- [ ] Visual regression tests (Percy via Storybook)
- [ ] Snapshot tests

**Check:**
```bash
# Run with coverage
npm run jest -- --coverage packages/bpk-component-[name]

# Check coverage thresholds
npm run jest -- --coverage --collectCoverageFrom='packages/bpk-component-[name]/src/**'
```

### Phase 3: Priority Classification

Classify all issues by priority:

#### 🚨 **BLOCKING (Must fix before merge)**

1. **Missing design approval** (Constitution X)
2. **API violations** (className/style in new components - Constitution XI)
3. **License header missing** (Constitution II)
4. **Accessibility failures** (jest-axe errors - Constitution IV)
5. **Private token misuse** (using other component's private tokens)
6. **Test failures** (any test failing)

#### ⚠️ **HIGH PRIORITY (Should fix before merge)**

1. **Magic numbers** (hardcoded values without tokens)
2. **Missing accessibility tests**
3. **Deprecated Sass API** (@import usage)
4. **px units instead of rem**
5. **Low test coverage** (below thresholds)

#### ℹ️ **NICE TO HAVE (Can be follow-up)**

1. **Missing Figma Code Connect**
2. **Documentation improvements**
3. **Minor naming inconsistencies**
4. **Additional test cases**

### Phase 4: Review Output Template

```markdown
# [Component Name] Code Review

## 📋 Overview
[Brief description of what the component does]

## ✅ Strengths
- [List things done well]

## ⚠️ Issues Found

### 🚨 Blocking Issues
1. **[Issue name]** - [Description]
   - **Violates**: Constitution [section]
   - **Fix**: [Specific fix needed]

### ⚠️ High Priority
[Similar format]

### ℹ️ Nice to Have
[Similar format]

## 📊 Compliance Score

| Category | Score | Notes |
|----------|-------|-------|
| Naming | ✅ 100% | ... |
| Sass API | ⚠️ 70% | ... |
| ... | ... | ... |

**Overall: [score]/100** [status emoji]

## 🔧 Required Actions

1. [ ] [Specific action]
2. [ ] [Specific action]

## 📝 Recommendations

[Optional improvements]
```

## Verification

After completing review:

1. **All blocking issues identified** and documented
2. **Specific fixes provided** for each violation
3. **Constitution/decision references** cited
4. **Priority classification** assigned to each issue
5. **Compliance score** calculated

**Self-check questions:**
- Did I check for className/style props in new components?
- Did I verify design approval exists?
- Did I look for private token usage across components?
- Did I check for license headers in ALL files?
- Did I run the actual tests, not just look at code?

## Example

### Component: BpkThinking (new component)

**Issue found:** Component accepts `className` prop

```typescript
// Current code (WRONG)
export type BpkThinkingProps = {
  content?: string;
  accessibilityLabel: string;
} & ComponentPropsWithoutRef<'div'>; // Includes className!

// Constitution XI violation: New components MUST restrict className
```

**Fix:**
```typescript
// Correct code
export type BpkThinkingProps = {
  content?: string;
  accessibilityLabel: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className' | 'style'>;
```

**Priority:** 🚨 BLOCKING - Constitution XI is non-negotiable for new components

**Additional issues:**
- Uses private token: `$bpk-private-chip-on-dark-on-background-night` (⚠️ HIGH)
- Magic number: `max-width: 17.5rem` without token (⚠️ HIGH)
- Missing design approval (🚨 BLOCKING)

## Notes

### API Design: New vs Existing Components

**New components (after Constitution ratification):**
- MUST NOT accept `className` or `style` props
- Strict enforcement to maintain visual consistency

**Existing components (grandfathered):**
- MAY keep `className`/`style` for backward compatibility
- Discourage use in documentation
- Consider deprecation in future major versions

### Token Hierarchy

**Token Reference**: [backpack-foundations/base.common.js](https://github.com/Skyscanner/backpack-foundations/blob/main/packages/bpk-foundations-web/tokens/base.common.js)

#### Token Categories

Backpack tokens are organized into semantic categories:

1. **Core tokens** (`$bpk-core-*`): Foundational brand colors
   - `$bpk-core-primary-day`, `$bpk-core-accent-day`, `$bpk-core-eco-day`

2. **Surface tokens** (`$bpk-surface-*`): Layout backgrounds
   - `$bpk-surface-default-day`, `$bpk-surface-elevated-day`, `$bpk-surface-hero-day`

3. **Text tokens** (`$bpk-text-*`): Typography colors
   - `$bpk-text-primary-day`, `$bpk-text-secondary-day`, `$bpk-text-on-dark-day`

4. **Status tokens** (`$bpk-status-*`): Semantic states
   - `$bpk-status-success-spot-day`, `$bpk-status-danger-spot-day`, `$bpk-status-warning-spot-day`

5. **Line/Border tokens** (`$bpk-line-*`): Dividers and borders
   - `$bpk-line-day`, `$bpk-line-on-dark-day`

6. **Spacing tokens** (functions): Layout spacing
   - `tokens.bpk-spacing-xs()`, `tokens.bpk-spacing-base()`, `tokens.bpk-spacing-xl()`

7. **Typography tokens**: Font sizes, weights, line heights
   - `tokens.$bpk-font-size-base`, `tokens.$bpk-line-height-base`

#### Public vs Private Tokens

1. **Public tokens**: Use freely across all components
   - Pattern: `$bpk-core-*`, `$bpk-text-*`, `$bpk-surface-*`
   - Example: `$bpk-core-primary-day`, `tokens.bpk-spacing-md()`

2. **Private tokens**: Component-internal only, DO NOT use in other components
   - Pattern: `$bpk-private-[component]-*`
   - Example: `$bpk-private-chip-on-dark-on-background-night`, `$bpk-private-button-secondary-pressed-background-day`
   - **Violation**: Using `$bpk-private-chip-*` in `bpk-thinking` component

3. **Cross-component token needs**: Request new public token in backpack-foundations

#### Color Value Matching (Important for Figma Integration)

**Token color format**: All Backpack tokens use **RGB notation** (`rgb(239, 243, 248)`)

**Common issue**: Figma MCP or manual color input provides colors in different formats:
- Figma exports: HEX (`#EFF3F8`) or RGB objects (`{r: 239, g: 243, b: 248}`)
- Designer handoff: HEX codes (`#054184`)
- CSS: Various formats (HEX, RGB, RGBA, HSL)

**Solution - Color Conversion Required**:

When matching colors to tokens, you may need to convert formats:

```javascript
// HEX to RGB conversion
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Example: #054184 → rgb(5, 65, 132)
// Then search tokens: grep "rgb(5, 65, 132)" base.common.js
```

**Workflow for color matching**:

1. **Get color from Figma/design**: `#054184`
2. **Convert to RGB**: `rgb(5, 65, 132)`
3. **Search in backpack-foundations**:
   ```bash
   curl -s https://raw.githubusercontent.com/Skyscanner/backpack-foundations/main/packages/bpk-foundations-web/tokens/base.common.js | grep "rgb(5, 65, 132)"
   ```
4. **Find token**: `corePrimaryNight: 'rgb(5, 65, 132)'`
5. **Use token**: `tokens.$bpk-core-primary-night`

**If no match found**:
- Check with design team if color is correct
- Request new token in backpack-foundations PR
- Document the requirement in component PR

### Design Approval Workflow

1. Reach out to #backpack Slack BEFORE starting work
2. Get Figma designs with all states
3. Implement matching designs exactly
4. Visual regression tests will catch deviations

### Common Traps

- ❌ Assuming existing component patterns are correct (they may be grandfathered)
- ❌ Copying private tokens from other components
- ❌ Implementing first, seeking design approval later
- ❌ Using px because "it's just one value"
- ❌ Making `accessibilityLabel` optional "to be flexible"

### SemVer Impact

When reviewing changes, classify version impact:

- **MAJOR**: Breaking API changes, visual changes, token changes, removal, new mandatory functionality
- **MINOR**: New optional features, new components, deprecations
- **PATCH**: Bug fixes, dependency updates, code quality

Err on side of more breaking changes rather than fewer.

## References

- [Backpack Constitution](/.specify/memory/constitution.md) - Core principles
- [Modern Sass API Decision](/decisions/modern-sass-api.md)
- [Accessibility Tests Decision](/decisions/accessibility-tests.md)
- [Component SCSS Filenames Decision](/decisions/component-scss-filenames.md)
- [Versioning Rules](/decisions/versioning-rules.md)
- [Deprecated API](/decisions/deprecated-api.md)
- [Code Review Guidelines](/CODE_REVIEW_GUIDELINES.md)
- [Backpack Documentation](https://www.skyscanner.design/)
