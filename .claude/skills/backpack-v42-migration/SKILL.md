---
name: backpack-v42-migration
description: Migrate a codebase from @skyscanner/backpack-web v41.x to v42.0. Handles BpkButtonV2 → BpkButton rename, deep import removal, and BpkAutosuggest legacy → V2 API migration. Use when upgrading Backpack to v42.
allowed-tools: Bash, Glob, Grep, Read, Write, Edit, AskUserQuestion
---

# Backpack Web v42.0 Migration

This skill migrates a codebase from `@skyscanner/backpack-web` v41.x to v42.0.0. It handles all breaking changes introduced in the major version bump.

## Breaking Changes in v42

### 1. BpkButton — rename and deep import removal

**What changed:**
- `BpkButtonV2` is removed from the public API. `BpkButton` is the canonical export.
- Deep imports using internal `src/...` paths no longer work.

**Migration patterns:**

| Before (v41.x) | After (v42) |
|---|---|
| `import { BpkButtonV2 } from '@skyscanner/backpack-web/bpk-component-button'` | `import BpkButton from '@skyscanner/backpack-web/bpk-component-button'` |
| `import { BpkButtonV2, BUTTON_TYPES } from '...'` | `import BpkButton, { BUTTON_TYPES } from '...'` |
| `import type { ButtonType } from '.../bpk-component-button/src/BpkButtonV2/common-types'` | `import type { ButtonType } from '@skyscanner/backpack-web/bpk-component-button'` |
| Any `@skyscanner/backpack-web/bpk-component-button/src/...` deep import | Use public API from `@skyscanner/backpack-web/bpk-component-button` |
| `<BpkButtonV2 ...>` in JSX | `<BpkButton ...>` in JSX |

**Notes:**
- Files that already use `import BpkButton from '@skyscanner/backpack-web/bpk-component-button'` are already compliant — no changes needed.
- Named exports like `BUTTON_TYPES` and `SIZE_TYPES` remain available from the package root.

### 2. BpkAutosuggest — V2 becomes default

**What changed:**
- The legacy `BpkAutosuggest` API is replaced by what was previously `BpkAutosuggestV2`.
- The import path and name stay the same, but the **API/props are different**.
- The component now **owns the input value** internally (uncontrolled pattern).

**Key API changes:**

| Legacy API (v41) | V2 API (v42) |
|---|---|
| `inputProps={{ value, onChange: (e, { newValue }) => ... }}` | Remove external value control. Use `defaultValue` for initial value, `onInputValueChange={({ method, newValue }) => ...}` to subscribe to changes |
| `onSuggestionsFetchRequested={({ value }) => ...}` (receives object) | `onSuggestionsFetchRequested={(value: string) => ...}` (receives string directly) |
| `onSuggestionSelected={(event, { suggestion, suggestionValue }) => ...}` | `onSuggestionSelected={({ inputValue, suggestion }) => ...}` (no event param, `inputValue` replaces `suggestionValue`) |
| `inputProps.inputRef` for ref access | Use `ref` prop directly on the component |
| Suggestions render inside the component container | With `isDesktop={true}` (default), suggestions render via portal into `document.body` |

**Critical architectural shift:** Legacy Autosuggest is a controlled input — the consumer manages `inputProps.value` and syncs state. V2 owns the value internally. Consumers:
- Set initial value with `defaultValue` prop
- React to changes via `onInputValueChange({ method, newValue })` callback
- Track selections via `onSuggestionSelected({ inputValue, suggestion })` callback
- Do NOT pass `value` or `onChange` via `inputProps` anymore

**Autosuggest migration is complex and context-dependent.** Each component wrapping BpkAutosuggest manages state differently, so automated find-and-replace is insufficient. Each file needs careful analysis.

## Execution Workflow

### Phase 1: Discovery

Scan the codebase to find all affected files. Run these searches:

1. **BpkButtonV2 JSX usage** — this is the most accurate count of affected files:
   ```
   Grep: <BpkButtonV2
   ```

2. **Button deep imports** (any src/ path under bpk-component-button):
   ```
   Grep: from.*bpk-component-button/src/
   ```

3. **Multi-line import detection** — many imports span multiple lines where `BpkButtonV2` is on a different line than `from`, so single-line grep misses them:
   ```
   Grep: ^\s+BpkButtonV2,
   ```
   This catches multi-line imports like `import {\n  BpkButtonV2,\n  BUTTON_TYPES,\n} from '...'`.

4. **Single-line import detection:**
   ```
   Grep: import \{ BpkButtonV2 \} from
   ```

5. **Autosuggest imports** (default or named imports):
   ```
   Grep: from.*bpk-component-autosuggest
   ```

6. **BpkAutosuggestV2 imports** (explicit V2 imports, if any):
   ```
   Grep: BpkAutosuggestV2
   ```

**IMPORTANT discovery notes:**
- The JSX grep (`<BpkButtonV2`) gives the true file count. Import-line greps will undercount because multi-line imports split `BpkButtonV2` and `from '...'` across lines.
- Expect a large gap between single-line import matches (~60) and JSX matches (~260). The difference is multi-line imports, not re-exports or local wrappers.

Present a summary table to the user:

```
## Migration Discovery Summary

| Category | Files affected | Complexity |
|---|---|---|
| BpkButtonV2 → BpkButton rename | N files | Low (mechanical) |
| Button deep imports | N files | Low (mechanical) |
| BpkButtonV2 JSX usage | N files | Low (mechanical) |
| Autosuggest API migration | N files | HIGH (manual review) |
| BpkAutosuggestV2 rename | N files | Low (mechanical) |
```

Ask the user which categories to proceed with. Default: all.

### Phase 2: Button Migration (Low complexity)

**Use a scripted approach.** With 200+ files, editing one-by-one is impractical. Write and run a Node.js migration script.

**CRITICAL: Use a line-by-line parser for import syntax changes, NOT regex.** Multi-line imports like `import {\n  BpkButtonV2,\n  BUTTON_TYPES,\n} from '...'` are common (~75% of imports in this codebase). Regex approaches with `[\s\S]*?` are unreliable for matching these — they silently skip files. A line-by-line approach that finds `from '...bpk-component-button'` and walks backwards to `import {` is robust.

The migration script should perform these steps **in order** for each file:

1. **Fix deep imports first** (before renaming, so the path `BpkButtonV2` is still matchable):
   - Replace `@skyscanner/backpack-web/bpk-component-button/src/BpkButtonV2/common-types` → `@skyscanner/backpack-web/bpk-component-button`
   - For any other deep `src/` import, map to the public API equivalent

2. **Rename `BpkButtonV2` → `BpkButton` globally** in the file (covers JSX, types, variables, import names):
   - Simple string replacement: `content.replace(/BpkButtonV2/g, 'BpkButton')`

3. **Fix import syntax** — convert named `BpkButton` import to default import:
   - Use a line-by-line parser (NOT regex) that:
     a. Scans for lines containing `from '...bpk-component-button'`
     b. Walks backwards to find the `import {` start line
     c. Skips `import type` statements (these stay as named imports)
     d. Extracts `BpkButton` from the named imports list
     e. Reconstructs as `import BpkButton from '...'` or `import BpkButton, { REMAINING } from '...'`
   - Single-line: `import { BpkButton } from '...'` → `import BpkButton from '...'`
   - Single-line with others: `import { BpkButton, BUTTON_TYPES } from '...'` → `import BpkButton, { BUTTON_TYPES } from '...'`
   - Multi-line: `import {\n  BpkButton,\n  BUTTON_TYPES,\n} from '...'` → `import BpkButton, {\n  BUTTON_TYPES,\n} from '...'`

**Script gotchas:**
- **Always use `--exclude-dir=node_modules`** when grepping for files, or target source directories specifically. Without this, `grep -rl` will hang scanning node_modules.
- `import type { ButtonType } from '...'` statements must NOT be converted to default imports — they stay as named type imports.
- When a file already has `import BpkButton from '...'` (pre-existing correct import), skip it.

**Important:** When a file already has an existing `import BpkButton from '...'` (the correct default import), and ALSO has `import { BpkButtonV2 } from '...'`, you need to consolidate into one import and rename all JSX references.

After completing all button files, run verification and report what was changed.

### Phase 3: Autosuggest Migration (High complexity)

**IMPORTANT: Process one file at a time. Show the user the before/after for each component and ask for confirmation before moving to the next.**

For each file using BpkAutosuggest:

1. **Read the entire file** to understand:
   - How `inputProps` is constructed (what value/onChange/onBlur it carries)
   - How `onSuggestionsFetchRequested` is called (destructured `{ value }` vs direct string)
   - How `onSuggestionSelected` is called (event + destructured object vs new signature)
   - Whether there's external state management for the input value
   - Whether the component is a wrapper that other components depend on

2. **Classify the migration difficulty** for this specific file:
   - **Simple**: Component uses BpkAutosuggest with minimal state management
   - **Medium**: Component has controlled input with clear state mapping
   - **Complex**: Component has intricate state management, multiple effects syncing value, or is a shared wrapper used by many consumers

3. **Apply the migration:**

   a. **Remove controlled input pattern:**
      - Remove `value` from `inputProps` (or the `inputProps` object entirely if only `value`/`onChange` remain)
      - Add `defaultValue` prop if there's an initial value
      - Convert `inputProps.onChange(e, { newValue })` handler to `onInputValueChange={({ method, newValue }) => ...}`
      - Keep other inputProps that are still supported (e.g., `placeholder`, `id`, `name`, `clearButtonMode`, `clearButtonLabel`, `onClear`, `className`, `disabled`, `aria-*`)

   b. **Fix `onSuggestionsFetchRequested`:**
      - Change `({ value }) => ...` to `(value) => ...` (parameter is the string directly)
      - If the handler destructures `value` from an object, unwrap it

   c. **Fix `onSuggestionSelected`:**
      - Remove the first `event` parameter
      - Change `{ suggestion, suggestionValue }` to `{ inputValue, suggestion }`
      - Update any references to `suggestionValue` → `inputValue`

   d. **Fix `inputRef`:**
      - Move `inputProps.inputRef` → `ref` prop on the BpkAutosuggest component

   e. **Update related state management:**
      - Remove `useState` for the input value if it was only used for the controlled pattern
      - If value state was used elsewhere (e.g., to restore on blur), refactor to work with the uncontrolled pattern
      - If the component had a `handleSearchChange` that set state + called onChange, simplify to just use `onInputValueChange`

4. **Show the user the diff** and explain what changed and why.

5. **Flag files that need manual review** — especially:
   - Shared/wrapper components that other components import from
   - Components with complex multi-effect state synchronisation
   - Components that read the input value for purposes beyond passing it to BpkAutosuggest (e.g., debounced search, URL params)

### Phase 4: Test Migration

After code changes, search for affected test files:

```
Grep: BpkAutosuggest|BpkButtonV2|bpk-component-autosuggest|bpk-component-button/src/
```

In test files:
- Update any mocked imports
- If tests query for suggestions inside a wrapper container, update to use `screen.getByRole('listbox')` or query `document.body` directly (V2 renders via portal with `isDesktop={true}`)
- Update any `inputProps.value` assertions to use the new uncontrolled pattern
- Update simulated onChange calls to match new callback signatures

### Phase 5: Verification

1. **Run typecheck** in each affected package to catch type errors:
   ```bash
   cd packages/webapp && npm run typecheck
   cd packages/common && npm run typecheck
   ```

2. **Report** any remaining type errors for manual resolution.

3. **Suggest running tests** for affected modules (ask the user before running).

### Phase 6: Capture Learnings & Contribute Back

**MANDATORY: Do not end the session without completing this phase.** Run this phase whenever:
- All migration work for a category is complete (even if other categories are skipped or deferred)
- The user asks a wrap-up or review question (e.g., "anything worth contributing?", "what did we learn?")
- The user signals they're done (e.g., "thanks", "that's all for now")
- Phase 5 is skipped or deferred — do not use incomplete verification as a reason to skip Phase 6

Do not wait for the user to ask. Announce that you're reviewing learnings and proceed.

#### Step 1: Identify new learnings

Ask yourself:
- Did any files require patterns not covered by the skill? (e.g., new import shapes, wrapper components, re-exports)
- Did the migration script need adjustments for this codebase? (e.g., different source directories, monorepo structure)
- Were there edge cases in autosuggest migration not documented? (e.g., new state management patterns, integration with other libraries)
- Did any phase take longer than expected or produce unexpected results?
- Were there false positives or files that matched greps but didn't need changes?

#### Step 2: Update the skill

For each learning identified:
1. Determine where it belongs — "Lessons from Prior Runs" for codebase-specific gotchas, or the relevant Phase section for workflow improvements
2. Update SKILL.md with the new information
3. If a lesson contradicts an existing one, update the existing entry rather than adding a duplicate

Format new lessons under "Lessons from Prior Runs" with:
- A descriptive `### heading`
- The problem encountered
- The solution or workaround
- Concrete examples where helpful

#### Step 3: Contribute back to Backpack

Present the user with:

```
## Contribute Migration Improvements

This skill lives in this repo but is designed to help all Skyscanner codebases upgrade to Backpack v42.
The learnings from this run could help other teams. Would you like to contribute them back?

**How:** Open a PR to https://github.com/Skyscanner/backpack adding or updating the v42 migration guide
with the new learnings from this run.

I can help you:
1. Draft the PR with the updated migration guidance
2. Format the learnings for the Backpack docs/migration guide style
```

If the user agrees:
1. Ask which remote fork/branch to push to (they may not have write access to `Skyscanner/backpack` directly)
2. Prepare the content — adapt the learnings from SKILL.md into the format used by Backpack's migration documentation
3. Help create the PR targeting `Skyscanner/backpack`

**Note:** Even if the user declines the upstream contribution, always update the local SKILL.md. The local improvements compound across runs within this org.

## Important Notes

- **Autosuggest migration cannot be fully automated.** The shift from controlled to uncontrolled input fundamentally changes how parent components manage state. Each wrapper needs individual analysis.
- **Button migration is mechanical** and can be applied across all files safely via script.
- **Preserve existing functionality.** The goal is API compatibility, not refactoring. Don't change business logic.
- **BpkAutosuggestSuggestion** (the suggestion renderer sub-component) is NOT affected by this migration. Its API remains the same.
- If a file imports from `bpk-component-autosuggest` but only uses `BpkAutosuggestSuggestion` (not the main Autosuggest component), it does NOT need API migration — only import path changes if applicable.

## Lessons from Prior Runs

These are hard-won learnings from running the migration on a real codebase (~266 files):

### Multi-line imports are the majority
~75% of BpkButtonV2 imports in this codebase are multi-line:
```javascript
import {
  BpkButtonV2,
  BUTTON_TYPES,
} from '@skyscanner/backpack-web/bpk-component-button';
```
Single-line grep patterns like `import.*BpkButtonV2.*from.*bpk-component-button` only match ~25% of files. Always use the JSX grep (`<BpkButtonV2`) as the source of truth for file counts.

### Regex is unreliable for multi-line import rewriting
A `String.replace` with `[\s\S]*?` regex for multi-line import blocks silently skips files. In testing, it caught only 46 out of 264 imports. The line-by-line parser approach (find `from '...'`, walk backwards to `import {`) is 100% reliable.

### node_modules will hang your script
Always use `--exclude-dir=node_modules` with grep, or target specific source directories (`packages/webapp/src`, `packages/common/src`, `packages/server/app`). Without this, `grep -rl` will hang indefinitely scanning the dependency tree.

### Order of operations matters
The correct order for the migration script is:
1. Fix deep import **paths** first (while `BpkButtonV2` is still in the path string)
2. Rename `BpkButtonV2` → `BpkButton` globally (simple string replace)
3. Fix import **syntax** (named → default) — this step works on `BpkButton` after rename

If you do step 3 before step 2, the regex/parser needs to look for `BpkButtonV2` specifically. If you do step 2 first, step 3 looks for `BpkButton` instead. Either order works, but be consistent.

### Type imports stay as named imports
`import type { ButtonType } from '...'` must NOT be converted to a default import. The parser must skip lines starting with `import type`.

### Key-based re-mount is the core V2 pattern for programmatic resets
V2's uncontrolled input has no `setValue()` API. To programmatically clear or reset the input (e.g., after selecting a chip in multi-select, clearing on blur, resetting after `clearOnChange`), use a key-based re-mount:
```javascript
const [autosuggestKey, setAutosuggestKey] = useState(0);
const [currentDefault, setCurrentDefault] = useState(initialValue);

const resetAutosuggest = (newDefault) => {
  setCurrentDefault(newDefault);
  setAutosuggestKey((prev) => prev + 1);
};

// In JSX:
<BpkAutosuggest key={autosuggestKey} defaultValue={currentDefault} ... />
```
When `autosuggestKey` changes, React unmounts and remounts the component, picking up the new `currentDefault`. This pattern is needed in multi-select badge selectors, blur-restore wrappers, and clearOnChange components.

**Companion pattern — `skipNextInputChange` ref:** When a selection handler calls `resetAutosuggest` AND also triggers a parent `onChange` that syncs back via a `useEffect`, you get a double re-mount. Prevent it with:
```javascript
const skipNextSyncRef = useRef(false);

const handleSelection = (suggestion) => {
  skipNextSyncRef.current = true; // prevent useEffect from re-mounting
  onChange(suggestion);
  resetAutosuggest('');
};

useEffect(() => {
  if (skipNextSyncRef.current) { skipNextSyncRef.current = false; return; }
  resetAutosuggest(valueFromProps);
}, [valueFromProps]);
```

### `getSuggestionValue` MUST return a string in V2
Legacy code sometimes has `getSuggestionValue={(item) => item}` returning the full suggestion object. This "works" in v41 because the old `onChange(e, { newValue })` receives whatever `getSuggestionValue` returns, and handlers use `typeof newValue === 'string'` to distinguish typing from selection.

In V2, `getSuggestionValue` determines what's displayed in the input after selection — it MUST return a string. Fix by extracting the display field:
```javascript
// Before: getSuggestionValue={(hotel) => hotel}
// After:  getSuggestionValue={(hotel) => hotel.value}
```
Then split the combined `onChange` into separate handlers (see next lesson).

### Split combined onChange handlers into onInputValueChange + onSuggestionSelected
Legacy pattern — a single `onChange` that handles both typing and selection:
```javascript
// Legacy: combined handler
selectChange = (e, { newValue }) => {
  if (typeof newValue === 'string') { /* typing */ }
  else if (newValue.value) { /* selection */ }
};
```
V2 separates these concerns:
```javascript
// V2: separate handlers
handleInputChange = ({ newValue }) => { /* typing - always a string */ };
handleSelected = ({ suggestion }) => { /* selection - full suggestion object */ };
```
The `typeof newValue` check is a reliable indicator that a handler needs splitting.

### Redux connect() HOC wrapping BpkAutosuggest is incompatible with V2
Watch for this pattern:
```javascript
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(BpkAutosuggest);
```
This passes `value`/`onChange` via Redux's `mergeProps` directly to BpkAutosuggest. Since V2 doesn't accept `value`/`onChange` via `inputProps`, this pattern fundamentally breaks. **Solution:** Convert to a functional component that uses `useSelector`/`useDispatch` and renders `<BpkAutosuggest>` with V2 props explicitly.

### Class components with UNSAFE_componentWillReceiveProps need full rewrites
Class components commonly use `UNSAFE_componentWillReceiveProps` to sync input value from parent props — this has no V2 equivalent since `defaultValue` only applies on mount. The cleanest migration is converting to functional components with:
- `useState` + `useEffect` replacing lifecycle methods
- `useCallback`/`useRef` replacing instance methods
- The key-based re-mount pattern replacing imperative value updates

For class components with minimal state, this is straightforward. For components with complex state (blur-restore, async initial values), expect significant refactoring.

### Deep imports extend beyond bpk-component-button
Discovery should also check for deep imports into other Backpack components:
```
Grep: from.*bpk-component-.*/src/
```
Common example: `import type { InputProps } from '@skyscanner/backpack-web/bpk-component-input/src/common-types'` needs changing to `from '@skyscanner/backpack-web/bpk-component-input'`.

### Test file updates after autosuggest migration
Key patterns to watch for in test files:
- **`UNSAFE_componentWillReceiveProps` tests** using `rerender` to change the `value` prop no longer work. Replace with `defaultValue` initial render tests.
- **Snapshot tests** will fail — run `npm test -- -u` to update them.
- **RTL `screen` queries work with V2's portal rendering.** Since `screen` queries `document.body` by default, suggestions rendered via portal are still findable with `screen.getByText()`.
- **`fireEvent.change` and `userEvent.type`** continue to work for simulating typing in V2's uncontrolled input.

### Default import aliased as BpkButtonV2 is a distinct pattern
Some files already import from the public API but use `BpkButtonV2` as the **default import alias**:
```javascript
import BpkButtonV2, { BUTTON_TYPES, SIZE_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
```
Both import-line greps (`import \{ BpkButtonV2 \}` and `^\s+BpkButtonV2,`) miss this pattern entirely — they're written for named imports. Only the JSX grep (`<BpkButtonV2`) catches files like this. This is the concrete reason why the skill says "use JSX grep as source of truth."

The migration script handles this correctly without modification: step 2's global rename fixes the alias, and step 3's parser correctly skips it because `BpkButton` is not in the named imports list after the rename. No script change needed — just be aware during discovery that import-line counts will undercount these files.

### Batch workflow and context window management
The skill says "process one file at a time with user confirmation." In practice, users may prefer batch application: "apply all changes, I'll review at the end." This is viable and faster, but:
- **Large autosuggest migrations can exceed the context window.** Break into batches of ~8 files.
- Show the first 1-2 files with full analysis for user confidence, then ask if they want batch mode.
- At the end, provide a summary table of all changes for review.

### Discovery: not all autosuggest imports need API migration
Not all files importing from `bpk-component-autosuggest` need API changes. Files that don't need changes include:
- Files that only import `BpkAutosuggestSuggestion` (not the main component)
- Files already using V2-compatible patterns
- Files migrated in a prior Backpack upgrade

Add a triage step after discovery: read each file's BpkAutosuggest usage to filter the true migration list before counting affected files.
