---
description: Migrate existing UI code to use Backpack components. Use when replacing HTML elements with Backpack components, upgrading to design system components, or when user asks to migrate to Backpack.
---

# Migrate to Backpack Component

Migrate existing UI implementations to use Backpack design system components, ensuring consistency with Skyscanner design patterns.

**⚠️ CRITICAL REQUIREMENT: The visual appearance MUST remain IDENTICAL before and after migration. This is a refactoring task, not a redesign. Only the underlying implementation changes, not the UI/UX.**

## Prerequisites

**IMPORTANT: Always check if backpack-mcp is connected before starting:**

If backpack-mcp is available, you MUST use it to get accurate, up-to-date component information:
- Component props and API
- Usage examples
- Styling guidelines
- Component variants

If backpack-mcp is NOT available, ask the user to connect it or search for Backpack documentation online.

## How to Use

Provide two pieces of information:
1. **Target Backpack component**: Which component to migrate to (e.g., `bpk-component-list`, `bpk-component-button`)
2. **Target code** (one of):
   - Screenshot of the UI area (I'll locate the code)
   - Selected code in IDE
   - File path

Example invocations:
- `/migrate-to-backpack bpk-component-list` (with code selected in IDE)
- `/migrate-to-backpack bpk-component-button src/components/Header.tsx`
- `/migrate-to-backpack bpk-component-card` (after sharing a screenshot)

## Migration Process

### Step 1: Identify Target Code

**If screenshot provided:**
1. Analyze the screenshot to identify UI patterns and elements
2. Search codebase for corresponding components using Grep/Glob
3. Present findings and ask user to confirm identified files

**If code selected or file path provided:**
- Use the provided code/file directly

### Step 2: Gather Context

Use TodoWrite to create a migration plan with these tasks:
- Gather Backpack component information
- Analyze current implementation
- Plan the migration steps
- Execute the migration
- Update tests
- Run validation (tests + linting)

Then gather information:

1. **Read target file(s)** to understand:
   - Current component structure
   - Props and state management
   - Styling approach
   - Related dependencies

2. **Get Backpack component details** using backpack-mcp (REQUIRED):

   **IMPORTANT: You MUST use backpack-mcp if it's connected. Do NOT rely on cached knowledge as Backpack components may have been updated.**

   ```
   Call mcp__backpack-mcp__list_components with platform: "web"
   Call mcp__backpack-mcp__get_component_details with platform: "web", name: [target-component]
   Call mcp__backpack-mcp__get_component_example with platform: "web", name: [target-component]
   ```

   This ensures you have:
   - Latest component API and props
   - Current styling approach
   - Official usage examples
   - Component variants and options

3. **Identify related files**:
   - Test files (*.test.js, *.test.tsx, *.spec.js)
   - Style files (*.scss, *.css)
   - Related components that may be affected

### Step 3: Execute Migration

Mark "Execute the migration" as in_progress and follow these steps:

#### 3.1 Update Imports

Add Backpack component imports at the top of the file:
```tsx
import { BpkComponentName } from '@skyscanner/backpack-web/bpk-component-name';
```

Remove imports for components being replaced.

#### 3.2 Replace Component Implementation

**⚠️ CRITICAL: Preserve the EXACT visual appearance. Compare the Backpack component's default styling with your current implementation.**

Before replacing, understand:
1. What styles does Backpack provide by default?
2. What custom styles need to be preserved?
3. Are there spacing, colors, or layouts that must remain unchanged?

Follow the pattern from the migrate-to-bpkList example:

**Before:**
```tsx
<ul role="list" className={styles.list}>
  <li className={styles.item}>
    {content}
  </li>
</ul>
```

**After:**
```tsx
<BpkList ariaLabel="Descriptive label" className={styles.list}>
  <BpkListItem className={styles.item}>
    {content}
  </BpkListItem>
</BpkList>
```

Key transformations:
- Replace HTML elements with Backpack components
- Map accessibility attributes (e.g., `role="list"` → `ariaLabel="..."`)
- **Preserve ALL existing className** for custom styling that maintains visual appearance
- Maintain all business logic and data flow
- Keep conditional rendering intact
- Extract inline content to separate BpkListItem when needed
- **DO NOT remove any styles** unless you've verified Backpack provides the exact same styling

#### 3.3 Update Styling (VISUAL PRESERVATION REQUIRED)

**⚠️ CRITICAL: Compare before/after screenshots or descriptions to ensure visual identity is preserved.**

- **Keep ALL custom CSS** that affects visual appearance (colors, spacing, sizes, layouts)
- Only remove CSS that duplicates Backpack's default styling if you've verified it's identical
- If in doubt, KEEP the custom styling
- Compare the Backpack component's rendered output with your original implementation
- Ask user to verify if visual changes are acceptable

**Example of what to keep:**
```scss
// Keep: Custom spacing specific to this feature
.ResultListDisplay {
  margin-bottom: 16px;
  padding: 12px;
}

// Keep: Custom colors for business logic
.ResultListDisplay--highlighted {
  background-color: var(--highlighted-bg);
}

// Can remove ONLY if Backpack provides identical styling:
.ResultListDisplay {
  list-style: none; // BpkList already removes list styles
}
```

#### 3.4 Update Tests

Mark "Update tests" as in_progress:

1. Update component queries to match new structure:
   ```js
   // Before
   const list = screen.getByRole('list');

   // After
   const list = screen.getByLabelText('Descriptive label');
   ```

2. Update snapshots if using snapshot tests
3. Add tests for Backpack-specific props if needed
4. Ensure test coverage remains ≥80%

### Step 4: Validation

Mark "Run validation" as in_progress:

#### 4.1 Find Affected Project

Use nx to identify which project contains the modified files:
```bash
nx show project [project-name] --web
```

Or search for the project using:
```bash
nx list
```

#### 4.2 Run Tests

Run tests for the affected project:
```bash
nx test [project-name]
```

If tests fail:
- Analyze the failure
- Fix the issues
- Re-run tests
- Do NOT mark task complete until all tests pass

#### 4.3 Run Linting

Run ESLint and Stylelint:
```bash
nx lint [project-name]
```

If using stylelint separately:
```bash
nx stylelint [project-name]
```

Fix all linting issues before marking complete.

#### 4.4 Manual Verification (REQUIRED)

**⚠️ CRITICAL: User MUST verify visual appearance before marking migration complete.**

Ask the user to verify:
- **Visual appearance is IDENTICAL to before migration** (this is the most important check)
- Layout, spacing, colors, fonts match exactly
- All interactive states work (hover, focus, active, disabled)
- Accessibility is maintained (screen reader testing if applicable)
- No console errors in browser
- Interactive behavior works correctly
- Responsive behavior at different screen sizes (if applicable)

If ANY visual differences exist, you MUST:
1. Identify what changed
2. Add CSS to restore the original appearance
3. Re-test until visuals match exactly

## Key Principles

1. **PRESERVE VISUAL APPEARANCE**: The UI must look IDENTICAL before and after. This is refactoring, not redesigning.
2. **Use backpack-mcp**: Always query backpack-mcp for component details if it's connected. Never rely on outdated knowledge.
3. **Preserve Functionality**: All existing behavior must be maintained
4. **Follow Backpack Conventions**: Use component APIs as designed, but maintain visual consistency
5. **Maintain Accessibility**: Keep or improve ARIA attributes and keyboard navigation
6. **Clean Up Cautiously**: Only remove code that is genuinely redundant after verifying visual impact
7. **Test Rigorously**: Ensure ≥80% coverage and all tests pass
8. **Use Nx**: Always run tests and linting through nx commands

## Example: List Migration

Based on the actual migrate-to-bpkList branch:

**Changes in imports:**
```tsx
// Added
import {
  BpkList,
  BpkListItem,
} from '@skyscanner/backpack-web/bpk-component-list';
```

**Changes in JSX:**
```tsx
// Before: HTML list
<ul id={DOMID_RESULTS_LIST_CONTAINER} className={STYLES.ResultListDisplay} role="list">
  <li className={STYLES.ResultListDisplay}>
    {getInlineAd(index)}
    <CarGroupContainer {...props} />
  </li>
</ul>

// After: Backpack List
<BpkList id={DOMID_RESULTS_LIST_CONTAINER} className={STYLES.ResultListDisplay} ariaLabel="Car hire results">
  {inlineAd && (
    <BpkListItem className={STYLES.ResultListDisplay}>
      {inlineAd}
    </BpkListItem>
  )}
  <BpkListItem className={STYLES.ResultListDisplay}>
    <CarGroupContainer {...props} />
  </BpkListItem>
</BpkList>
```

Note:
- Extracted inline ad to conditional BpkListItem
- Removed `role="list"` (replaced with `ariaLabel`)
- Preserved all className and id attributes
- Maintained component hierarchy and logic

## Project Guidelines Reference

Per CLAUDE.md:
- Always use Backpack components for UI
- Use backpack-mcp for component information
- Test coverage must reach 80%+
- Run all tasks through nx (not direct tooling)

## Completion Checklist

Before marking the migration complete, ensure:
- [ ] backpack-mcp was consulted for component details (if available)
- [ ] All imports updated correctly
- [ ] All component instances replaced
- [ ] Accessibility attributes properly migrated
- [ ] **Visual appearance is IDENTICAL to original** (user verified)
- [ ] All custom styles preserved that affect appearance
- [ ] Tests updated and passing (80%+ coverage)
- [ ] ESLint passes
- [ ] Stylelint passes (if applicable)
- [ ] User verified visual appearance matches exactly
- [ ] No console errors
- [ ] All TODOs marked complete

**If visual appearance differs in ANY way, the migration is NOT complete.**

## Troubleshooting

**If backpack-mcp is not available:**
- Ask user to connect backpack-mcp for accurate component information
- Or search for official Backpack documentation online
- Do NOT proceed with outdated knowledge

**If Backpack component not found:**
- Verify component name with `mcp__backpack-mcp__list_components`
- Check if component exists in the web platform

**If visual appearance changes:**
- Identify which styles Backpack is overriding
- Add custom CSS to restore original appearance
- Check if Backpack component has props to control styling
- Consult backpack-mcp for styling options

**If tests fail:**
- Check test queries match new component structure
- Update snapshots if using snapshot tests
- Verify accessibility attributes in tests

**If linting fails:**
- Check for unused imports
- Verify prop types match Backpack API
- Fix style issues in modified files

## Additional Resources

- **Backpack documentation**: ALWAYS use backpack-mcp tools when available for up-to-date information
- **backpack-mcp tools**:
  - `mcp__backpack-mcp__list_components` - List all available components
  - `mcp__backpack-mcp__get_component_details` - Get component props and API
  - `mcp__backpack-mcp__get_component_example` - Get usage examples
  - `mcp__backpack-mcp__styling_guide` - Get styling guidelines
- Project guidelines: See CLAUDE.md in repository root
- Nx documentation: Use `nx` MCP server tools

**Remember: Always verify backpack-mcp is connected before starting migration. It provides the most accurate and current component information.**
