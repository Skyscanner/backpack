---
name: backpack-code-review-checklist
description: |
  Comprehensive code review checklist for Backpack design system components. Use when:
  (1) Reviewing PRs for new or modified Backpack components, (2) Validating component
  compliance with Constitution and design system rules, (3) Checking if component follows
  Backpack conventions before merge, (4) Identifying violations in API design, token usage,
  accessibility, or documentation. Covers Constitution principles (I-XIII), decisions/
  guidelines, API encapsulation rules, private token restrictions, design approval workflow,
  icon alignment helpers, hover mixin usage, token semantic correctness, snapshot
  currency, and enum/variant prop typing conventions. Essential for maintaining Backpack
  quality standards and catching non-obvious violations like className props in new
  components, wrong icon alignment wrapper, raw :hover instead of bpk-hover mixin,
  cross-component private token usage, or bare string union types that should be
  expressed as `as const` constant objects.
author: Claude Code
version: 1.3.0
date: 2026-03-23
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

### Phase 0: Detect Review Mode

**Before doing anything else**, check whether the user provided a GitHub PR URL.

- **PR mode**: user message contains a `github.com/.../pull/NNN` URL
  - Extract the PR number
  - Run `gh pr view NNN --json headRefOid,files` to get the head commit SHA and changed files
  - Proceed with review; at the end **post the review body as a PR comment** using:
    ```bash
    gh pr review NNN --comment --body "$(cat <<'EOF'
    [review body here]
    EOF
    )"
    ```
  - Each issue in the output must link to the offending lines using the **GitHub permalink format**:
    `https://github.com/Skyscanner/backpack/blob/[HEAD_COMMIT_SHA]/[FILE_PATH]#L[START]-L[END]`

- **Local mode**: no PR URL in the user message
  - Review the current branch's uncommitted / committed changes locally (`git diff main...HEAD`)
  - Output the review to the conversation only — **do not post to GitHub**
  - Each issue in the output must cite the file using a **local VSCode-clickable link**:
    `[FILE_PATH:LINE](FILE_PATH#LLINE)` (relative to repo root, e.g.
    `[packages/bpk-component-thumb-button/src/BpkThumbButton.module.scss:29](packages/bpk-component-thumb-button/src/BpkThumbButton.module.scss#L29)`)

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

#### ✅ 4a. Investigation method: for any CSS property written directly, search bpk-mixins for an existing abstraction

**Principle:** Backpack provides mixins in `bpk-mixins/` for common interactive and layout
patterns. Writing raw CSS that looks correct may silently break cross-platform behaviour
(e.g. hover on touch devices, inconsistent animation timing). When you see a CSS property
written directly in a new component, treat it as a question mark, not a given.

**How to investigate:**
1. For each CSS property/selector written directly (`:hover`, `transition:`, `border-radius:`,
   `z-index:`, `::before` pseudo-elements, etc.), grep `bpk-mixins/` to find if a mixin exists:
   ```bash
   rg "mixin bpk-" packages/bpk-mixins/ --include="*.scss" -l
   cat packages/bpk-mixins/_utils.scss
   ```
2. Grep 2–3 similar existing components to see how they handle the same pattern:
   ```bash
   rg ":hover\|transition:\|border-radius:" packages/bpk-component-chip/src/
   rg ":hover\|transition:\|border-radius:" packages/bpk-component-card-button/src/
   ```
3. If a mixin exists and the new component bypasses it, that is a violation — regardless
   of whether the raw CSS value happens to produce the same visual result.

**Known examples of this pattern (not exhaustive):**
- `:hover` → should use `@include utils.bpk-hover { }` (gates behind `.bpk-no-touch-support`)
- `transition: ... 0.2s` → `tokens.$bpk-duration-sm` token exists
- `::before` touch-target expansion → `@include utils.bpk-touch-tappable` exists

#### ✅ 4b. Investigation method: for any imported package helper, read its index to find the full API

**Principle:** Backpack packages often export multiple variants of a helper (size-specific,
context-specific, etc.). Code compiles fine with the wrong variant but produces incorrect
visual or functional results. Never assume a package only exports what is currently imported.

**How to investigate:**
1. For each `import X from '../../bpk-component-Y'`, open the full export list:
   ```bash
   cat packages/bpk-component-Y/index.tsx
   # or
   cat packages/bpk-component-Y/index.ts
   ```
2. Look for other exports with similar names — especially size/variant suffixes
   (`Large`, `Small`, `OnDark`, `V2`, etc.)
3. Verify the imported variant matches the context: icon size, button size, theme, etc.

**Known examples of this pattern (not exhaustive):**
- `bpk-component-icon` exports both `withButtonAlignment` (for `sm/` icons) and
  `withLargeButtonAlignment` (for `lg/` icons) — wrong choice compiles but misaligns
- Icon path `sm/` vs `lg/` must match the alignment wrapper used

#### ✅ 5. Token Usage (Constitution III)

**Rules:**
- [ ] All visual parameters use design tokens (no magic numbers)
- [ ] Do NOT use `$bpk-private-*` tokens from other components
- [ ] Token changes require separate PR to backpack-foundations
- [ ] Token names match their **semantic meaning** — the token name must describe the UI state, not just produce the right colour value

**Investigation method: for every token used, verify semantic intent matches usage context**

A token value match is not enough. Ask: "Does the *name* of this token describe what this
element *is* in this state?" Token categories encode semantic meaning:

| Token prefix | Intended for |
|---|---|
| `$bpk-text-disabled-*` | Disabled / non-interactive elements |
| `$bpk-text-secondary-*` | Active but de-emphasised interactive elements |
| `$bpk-surface-hero-*` | Hero/prominent background areas |
| `$bpk-status-danger-*` | Error / destructive states |
| `$bpk-core-accent-*` | Selected / primary action states |

How to check: for each token used in the new component, look up its definition in
[backpack-foundations/base.common.js](https://github.com/Skyscanner/backpack-foundations/blob/main/packages/bpk-foundations-web/tokens/base.common.js)
and read its comments/category. If the category doesn't match the UI state, it is wrong
even if the hex value happens to match the design.

```scss
// ❌ WRONG: disabled token on an active, interactive element (name mismatch)
color: tokens.$bpk-text-disabled-day;

// ✅ CORRECT: secondary text for unselected-but-interactive state
color: tokens.$bpk-text-secondary-day;
```

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

# Flag disabled token in non-disabled context (read surrounding code to judge)
rg "text-disabled" packages/bpk-component-*/src/*.scss
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
- [ ] Variant/enum props expressed as `as const` constant objects, NOT bare string union types

**Enum/variant prop pattern (`as const` object + derived type) — REQUIRED for all new variant/enum props:**

Bare string union types force consumers to memorise string literals and get no import-time
constant to reference. Every variant or enum prop MUST be expressed as an exported `as const`
object so consumers can write `type={BUTTON_TYPES.primary}` instead of `type="primary"`.

Real-world example from `packages/bpk-component-button/src/common-types.tsx`:

```typescript
// ✅ CORRECT — exported constants let consumers avoid magic strings
export const BUTTON_TYPES = {
  primary: 'primary',
  primaryOnDark: 'primary-on-dark',
  secondary: 'secondary',
  destructive: 'destructive',
  // ...
} as const;

export const SIZE_TYPES = {
  small: 'small',
  large: 'large',
} as const;

export type ButtonType = (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];
export type SizeType = (typeof SIZE_TYPES)[keyof typeof SIZE_TYPES];

// ❌ WRONG — bare union: consumers must memorise 'primary' | 'secondary' strings
export type ButtonType = 'primary' | 'secondary' | 'destructive';
```

The constant must also be exported from the package `index.ts` so consumers can import it:
```typescript
// packages/bpk-component-foo/index.ts
export { BUTTON_TYPES, SIZE_TYPES } from './src/common-types';
```

**Check:**
```bash
# Find bare string union types that are candidates for as-const objects
# (look for export type with string literal unions)
rg "export type Bpk\w+(Variant|Type|Size|Color|Mode)\s*=\s*'" packages/bpk-component-*/src/
```

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

**Snapshot currency (NON-OBVIOUS — commonly missed):**

After ANY change to rendered output (prop added/removed, attribute removed, HTML structure changed),
snapshots MUST be regenerated. Stale snapshots silently pass even if they contain attributes
or markup that the component no longer produces. Always read the `.snap` file and verify it
matches the current component output.

```bash
# Common signs of a stale snapshot:
# - snap contains attributes no longer set (e.g. title="..." after aria-label was added)
# - snap references class names that were renamed
# - snap structure doesn't match current JSX
```

**Check:**
```bash
# Run with coverage
npm run jest -- --coverage packages/bpk-component-[name]

# Check coverage thresholds
npm run jest -- --coverage --collectCoverageFrom='packages/bpk-component-[name]/src/**'

# Update stale snapshots
npm run jest -- --updateSnapshot packages/bpk-component-[name]
```

### Phase 3: Review Output Format

The output format is a **flat numbered list**. No section headers, no priority emoji blocks,
no compliance score. Each entry: one sentence for the issue title, then the explanation
(what is wrong, why it matters, what to use instead, with a reference to a correct example
in the codebase). Finish with a link to the offending lines — format depends on mode.

**Template (shared structure for both modes):**

```markdown
### Code review

Found N issues:

1. [Concise issue title] — [explanation: what is wrong, why, what the correct approach is,
   reference to where in the codebase the correct pattern is used]

   [link to offending lines — see format rules below]

2. [Next issue] — [explanation]

   [link]

[repeat for all issues]

🤖 Generated with [Claude Code](https://claude.ai/code)
```

**Link format rules:**

- **PR mode** — GitHub permalink anchored to the PR's head commit SHA:
  ```
  https://github.com/Skyscanner/backpack/blob/[HEAD_COMMIT_SHA]/[FILE_PATH]#L[START]-L[END]
  ```
  Get the SHA from `gh pr view NNN --json headRefOid -q .headRefOid`.

  After generating the review body, post it to the PR:
  ```bash
  gh pr review NNN --comment --body "$(cat <<'EOF'
  [full review body]
  EOF
  )"
  ```
  Then confirm to the user that the comment was posted.

- **Local mode** — VSCode-clickable markdown link using the repo-relative path:
  ```markdown
  [packages/bpk-component-foo/src/BpkFoo.module.scss:29](packages/bpk-component-foo/src/BpkFoo.module.scss#L29)
  ```
  For a range:
  ```markdown
  [packages/bpk-component-foo/src/BpkFoo.module.scss:29-31](packages/bpk-component-foo/src/BpkFoo.module.scss#L29-L31)
  ```
  Output the review to the conversation only — do **not** post to GitHub.

**General output rules:**
- Count real issues only — do not pad with style nits
- Each title is at most ~10 words; the dash separates it from the explanation
- The explanation must include: (a) what is wrong, (b) why it matters, (c) what to use instead
- Always link to a correct precedent file in the repo when one exists
- Do NOT include a "strengths" section, compliance score table, or required-actions checklist

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
- Did I read the snapshot `.snap` file and verify it matches current component output?
- Did I run the actual tests, not just look at code?
- For every CSS property written directly in the new SCSS — did I grep `bpk-mixins/` to confirm no mixin exists for it?
- For every package import — did I open that package's `index.tsx` to see the full API and confirm the right variant is used?
- For every token used — did I verify the token *name* semantically matches the UI state (not just the colour value)?
- For every variant/enum prop type — is it a bare string union that should instead be an `as const` constant object with a derived type? Is the constant exported from `index.ts`?

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
- ❌ Leaving snapshot files stale after removing/changing rendered attributes
- ❌ Accepting that a CSS value looks right without checking if `bpk-mixins/` already abstracts it
- ❌ Accepting that an import compiles without checking the full package API for a better-fitting variant
- ❌ Accepting that a token produces the right colour without checking if the token name fits the UI state
- ❌ Defining variant/enum prop types as bare string unions (`'primary' | 'secondary' | 'destructive'`) instead of `as const` constant objects like `BUTTON_TYPES` — consumers lose autocomplete and must memorise string literals
- ❌ Defining a constant object like `BUTTON_TYPES` but forgetting to export it from the package `index.ts`

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
