---
name: backpack-v42-migration
description: Migrate a codebase from @skyscanner/backpack-web v41.x to v42.0. Handles BpkButtonV2 → BpkButton rename, deep import removal, and BpkAutosuggest legacy → V2 API migration. Use when upgrading Backpack to v42.
metadata:
  version: 1.0.0
  date: 2026-03-13
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
- In v41, the default export already resolved to `BpkButtonV2`, so teams can migrate to the supported import pattern **before** adopting v42.

### 2. BpkAutosuggest — V2 becomes default

**What changed:**
- The legacy `BpkAutosuggest` API is replaced by what was previously `BpkAutosuggestV2`.
- The import path and name stay the same, but the **API/props are different**.
- The component now **owns the input value** internally (uncontrolled pattern).
- Core implementation switches from `react-autosuggest` to `downshift` + `@floating-ui/react`.
- Desktop dropdown renders via `FloatingPortal` (outside the DOM tree, `fixed` positioning).

**Key API changes (summary — see Phase 3 for full detail):**

| Legacy API (v41) | V2 API (v42) |
|---|---|
| `inputProps={{ value, onChange: (e, { newValue }) => ... }}` | Remove value control. Use `defaultValue` + `onInputValueChange={({ method, newValue }) => ...}` |
| `onSuggestionsFetchRequested={({ value }) => ...}` | `onSuggestionsFetchRequested={(value: string) => ...}` |
| `onSuggestionSelected={(event, { suggestion, suggestionValue }) => ...}` | `onSuggestionSelected={({ inputValue, suggestion }) => ...}` |
| `inputProps.inputRef` | `ref` prop directly on the component |
| `containerProps`, `valid` (top-level) | Removed — see Phase 3 |

**Two migration paths:**
- **Using V2 already** (`BpkAutosuggestV2`) → rename to default import: `import BpkAutosuggest from '@skyscanner/backpack-web/bpk-component-autosuggest'`
- **Still on V1** → either migrate to V2 API (see Phase 3), or temporarily keep legacy behavior: `import { BpkAutosuggestLegacy } from '@skyscanner/backpack-web/bpk-component-autosuggest'`

**Autosuggest migration is complex and context-dependent.** Each file needs careful analysis.

> ⚠️ **Global Components dependency**: If your app consumes Global Components that include Autosuggest, you must upgrade **Backpack v42 + Global Components v16 together in the same PR**, on both server and client, to avoid runtime mismatch.

## Execution Workflow

### Phase 1: Discovery

Scan the codebase to find all affected files. Run these searches:

1. **BpkButtonV2 JSX usage** — most accurate count of affected files:
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

7. **Deep imports into other Backpack components** (not just button):
   ```
   Grep: from.*bpk-component-.*/src/
   ```
   Common example: `import type { InputProps } from '@skyscanner/backpack-web/bpk-component-input/src/common-types'`

**IMPORTANT discovery notes:**
- The JSX grep (`<BpkButtonV2`) gives the true file count. Import-line greps will undercount because multi-line imports split `BpkButtonV2` and `from '...'` across lines.
- Expect a large gap between single-line import matches (~60) and JSX matches (~260). The difference is multi-line imports.
- Not all files importing from `bpk-component-autosuggest` need API changes — files that only import `BpkAutosuggestSuggestion` are unaffected. Triage before counting.

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
- **Always use `--exclude-dir=node_modules`** when grepping for files. Without this, `grep -rl` will hang scanning node_modules.
- `import type { ButtonType } from '...'` statements must NOT be converted to default imports — they stay as named type imports.
- When a file already has `import BpkButton from '...'` AND `import { BpkButtonV2 } from '...'`, consolidate into one import and rename all JSX references.

After completing all button files, run verification and report what was changed.

### Phase 3: Autosuggest Migration (High complexity)

#### Architecture Differences

| Concern | V1 (legacy) | V2 (v42 default) |
|---|---|---|
| Core library | `react-autosuggest` | `downshift` + `@floating-ui/react` |
| Desktop dropdown | Inline DOM | **FloatingPortal** (outside DOM tree, `fixed` positioning) |
| Input value | Externally controlled via `inputProps.value` | Internally managed by downshift state |
| `ref` | None | `forwardRef` — passes `ref` to `renderInputComponent` |

**IMPORTANT: Process one file at a time. Show the user the before/after for each component and ask for confirmation before moving to the next.** (Or offer batch mode after the first 1–2 files — see Lessons.)

For each file, read it fully to understand state management, then apply the changes below.

---

#### Breaking Changes Reference

**BC-1. `onSuggestionsFetchRequested` signature**

```typescript
// V1 — receives object with optional reason
onSuggestionsFetchRequested({ value, reason }: { value: string; reason: string }) => void

// V2 — receives string only
onSuggestionsFetchRequested(value: string) => void
```

The `reason` field is gone. V2 only calls this for user input changes. If you used `reason` to distinguish pre-fetch from user-input, simplify — V2 already calls `onSuggestionsFetchRequested` on mount when `alwaysRenderSuggestions` is set or `inputValue` has a value. Note: `onLoad` is **not** a mount prefetch hook on desktop (it fires on click interaction); on mobile it fires on mount.

```typescript
// Before
const onSuggestionsFetchRequested = ({ reason, value }) => {
  const isCurrentFetch = ['input-changed', 'input-focused'].includes(reason);
  throttledFetch(value, !isCurrentFetch);
};
// After
const onSuggestionsFetchRequested = (value: string) => {
  throttledFetch(value, false);
};
```

---

**BC-2. `onSuggestionSelected` signature**

```typescript
// V1 — has event, suggestionIndex, sectionIndex, method
onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => void

// V2 — no event, no index; suggestionValue → inputValue
onSuggestionSelected({ suggestion, inputValue }) => void
```

`suggestionIndex` is missing in V2. Recovery: pass `suggestions` array into your handler and use `findIndex`:

```typescript
clickItemIndex = suggestions.findIndex((s) => s === suggestion);
```

---

**BC-3. `inputProps.value` is silently ignored**

V2 manages input value internally. `inputProps.value` is extracted and discarded by downshift, which then passes its own internal `inputValue`.

**Pattern for showing an expanded value after selection** (e.g., "Statue of Liberty, New York, USA"):

Use `defaultValue` + React `key` tied to the selected suggestion. Changing the key triggers a remount with the new `defaultValue`:

```tsx
<BpkAutosuggest
  key={`${selectedSuggestion?.entityId ?? 'no-selection'}-${selectedSuggestionValue}`}
  defaultValue={shouldDisplayExpandedValue ? expandedValue : getInputValue()}
  {...autosuggestProps}
/>
```

Include both `entityId` **and** the suggestion value in the key — if only `entityId` is used, POI sub-items with the same `entityId` as the parent won't trigger a remount (see BC-11).

---

**BC-4. Removed props**

| Removed prop | How to handle |
|---|---|
| `containerProps` | Remove entirely |
| `valid` (top-level) | Remove from autosuggest; keep `valid` only inside `inputProps` if needed by the input component |
| `onClear` (top-level) | V2 passes `onClear: clearSuggestions` directly to `renderInputComponent` — **do not** put your handler in `inputProps.onClear` as it will be overwritten. If you have clear side-effects (analytics, state resets), wrap them inside `renderInputComponent`'s own `onClear` prop handler instead |

---

**BC-5. `id` is now required**

V2 uses `id` for `useCombobox` internals. Add it to autosuggest props if not already present:

```typescript
const commonProps = { id, suggestions, ... };
```

---

**BC-6. `inputProps.onChange` / `inputProps.onBlur` V1 signature crash (frozen input)**

**Symptom**: Input is completely frozen after migration — user cannot type or delete.

**Root cause**: If your `onChange`/`onBlur` hooks use the `react-autosuggest` two-argument format, they will throw when V2 calls them with a single React event:

```typescript
// V1 expected signature — crashes in V2
onChange(_event, { newValue }: { newValue: string }) => void
onBlur(_event, { highlightedSuggestion }) => void
```

**Fix**: Add adapter functions before building `inputProps`:

```typescript
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  onChange(event as any, { newValue: event.target.value });
};
const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
  onBlur(event as any, { highlightedSuggestion: null });
};
// Use handleChange / handleBlur in inputProps, not onChange / onBlur directly
```

`highlightedSuggestion: null` is safe — V2 handles blur auto-select internally.

---

**BC-7. `renderInputComponent` must forward `ref`**

V2 passes `ref: setInputRef` to `renderInputComponent`. Without it, keyboard navigation, blur auto-select, and floating UI positioning break silently.

```typescript
const { inputRef, onBlur, onClear, onFocus, ref, value, ...rest } = inputProps;

<input
  {...rest}
  value={value}
  ref={(input) => {
    if (input) {
      currentRef.current = input;
      if (typeof ref === 'function') ref(input);  // ← required for V2
      inputRef?.(input);                           // ← project-specific callback ref
    }
  }}
/>
```

---

**BC-8. Theme: use `defaultTheme` as base**

V2 exports `defaultTheme`. Always spread it first when customising:

```typescript
import BpkAutosuggest, { defaultTheme } from '@skyscanner/backpack-web/bpk-component-autosuggest';

// Desktop
const desktopProps = { isDesktop: true, theme: defaultTheme, renderInputComponent };

// Mobile — override specific keys
const mobileProps = {
  isDesktop: false,
  alwaysRenderSuggestions: true,
  theme: {
    ...defaultTheme,
    container: cls('autosuggest__container'),
    suggestionsContainerOpen: cls('autosuggest__suggestions-container--open'),
    suggestionsList: cls('autosuggest__suggestions-list'),
    suggestion: cls('autosuggest__suggestion-item'),
    suggestionHighlighted: cls('autosuggest__suggestion-item--highlighted'),
  },
};
```

---

**BC-9. New props available in V2**

| Prop | Type | Use case |
|---|---|---|
| `isDesktop` | `boolean` (default: `true`) | Controls FloatingPortal vs inline dropdown |
| `onLoad` | `(inputValue) => void` | Pre-fetch on component mount |
| `showClear` | `boolean` | Built-in clear button |
| `ariaLabels` | `{ resultsList, label, clearButton }` | Unified aria labels |
| `getA11yResultsMessage` | `(count) => string` | Screen reader results count |
| `onInputValueChange` | `({ method, newValue }) => void` | Monitor internal value changes |
| `enterKeyHint` | `EnterKeyHintType` | Mobile keyboard hint |

---

**BC-10. `getSuggestionValue` must return a string**

Legacy code sometimes has `getSuggestionValue={(item) => item}` returning the full object. In V2, this value is displayed in the input after selection — it **must** be a string:

```typescript
// Before: getSuggestionValue={(hotel) => hotel}
// After:  getSuggestionValue={(hotel) => hotel.value}
```

If the old `onChange` used `typeof newValue === 'string'` to distinguish typing from selection, split it into separate handlers (see Lessons: split combined onChange handlers).

---

**BC-11. POI sub-item selection doesn't update input**

**Symptom**: Clicking a nested POI button leaves the input showing the parent suggestion name.

**Root cause**: Downshift selects the parent `<li>` item and sets `inputValue` to the parent name. If the POI's `entityId` matches the parent's, the component `key` doesn't change and V2 never remounts with the POI name.

**Fix**: Include suggestion value in the key (already shown in BC-3).

---

**BC-12. POI selection reverts to previous value (3-layer race condition)**

**Symptom**: Clicking a POI sub-item momentarily shows the correct value then reverts.

**Root cause — 3 compounding issues:**

1. **Blur before click** (`focusInputOnSuggestionClick: false`): blur fires *before* click, so selection refs are null at blur time.
2. **React 18 scheduler reversion**: blur's `setState` (lower priority) commits *after* click's `setState` (higher priority), overwriting the selection.
3. **Second blur from V2 remount**: after `onSelected` changes the `key`, V2 unmounts the focused input, triggering a second blur. By then `justSelectedRef` has been consumed.

**Fix** — in the consumer component:

```typescript
const justSelectedRef = useRef<Nullable<{ inputValue: string }>>(null);
const selectionHandledRef = useRef(false); // guards against second blur from remount

// In onSelected:
justSelectedRef.current = { inputValue };
selectionHandledRef.current = true;

// In onInputFocus — reset both guards:
selectionHandledRef.current = false;

// In onInputBlur — defer ALL side-effects inside setTimeout:
onInputBlur: (query, highlightedSuggestion) => {
  const suggestionsAtBlur = suggestions;
  setTimeout(() => {
    onUpdateUserAction(USER_ACTIONS.ON_BLUR); // must also be inside setTimeout
    if (!justSelectedRef.current && !selectionHandledRef.current) {
      // Genuine blur, no selection: auto-fill with first suggestion
      const autoFilled = suggestionsAtBlur[0] || {};
      onUpdateSelectedSuggestion(autoFilled);
    } else if (justSelectedRef.current) {
      // First blur after selection: trigger pre-fetch
      onFetch(justSelectedRef.current.inputValue, true);
    }
    // else: second blur from remount — skip
    justSelectedRef.current = null;
  }, 0);
},
```

**Critical**: `onUpdateUserAction(ON_BLUR)` must be inside the `setTimeout` too. Running it synchronously triggers a render with the old `selectedSuggestion` value, causing a visible flash.

---

#### Per-File Migration Workflow

For each autosuggest file:

1. **Read the entire file** to understand:
   - How `inputProps` is constructed (`value`/`onChange`/`onBlur` sources)
   - Whether `onSuggestionsFetchRequested` destructures `{ value }` vs receives string
   - Whether `onSuggestionSelected` uses `event` or `suggestionValue`
   - Whether the component is a shared wrapper used by many consumers

2. **Classify migration difficulty:**
   - **Simple**: Minimal state management, no external value syncing
   - **Medium**: Controlled input with clear state mapping
   - **Complex**: Multi-effect state sync, Redux connect HOC, class component, blur-restore logic

3. **Apply changes:**
   - Remove `value` from `inputProps`; add `defaultValue` if needed
   - Convert `onChange(e, { newValue })` to `onInputValueChange={({ newValue }) => ...}`
   - Fix `onSuggestionsFetchRequested` signature (BC-1)
   - Fix `onSuggestionSelected` signature (BC-2)
   - Move `inputProps.inputRef` → `ref` prop on component
   - Remove `containerProps`, top-level `valid` (BC-4)
   - Add `id` prop if missing (BC-5)
   - Check for frozen input risk (BC-6)
   - Check for `renderInputComponent` ref forwarding (BC-7)

4. **Show the diff** and explain changes; get user confirmation.

5. **Flag for manual review**: shared/wrapper components, complex multi-effect state, Redux-connected components, class components with `UNSAFE_componentWillReceiveProps`.

### Phase 4: Test Migration

After code changes, search for affected test files:

```
Grep: BpkAutosuggest|BpkButtonV2|bpk-component-autosuggest|bpk-component-button/src/
```

#### Button tests
- Update any mocked imports from `BpkButtonV2` → `BpkButton`.
- Snapshot tests will fail — run `npm run jest:update` to update.

#### Autosuggest tests — JSDOM patterns

**Mock `@floating-ui/react` for desktop tests**

V2 renders suggestions inside `FloatingPortal` and uses `FloatingArrow` which crashes with `context: {}` in jsdom. Mock all four exports:

```typescript
import type { ReactNode } from 'react';

jest.mock('@floating-ui/react', () => {
  const actual = jest.requireActual('@floating-ui/react');
  return {
    ...actual,
    FloatingPortal: ({ children }: { children: ReactNode }) => <>{children}</>,
    FloatingArrow: () => null,
    useFloating: () => ({
      x: 0, y: 0, strategy: 'fixed',
      refs: {
        setReference: jest.fn(), setFloating: jest.fn(),
        reference: { current: null }, floating: { current: null },
      },
      context: {}, floatingStyles: {}, middlewareData: {},
      placement: 'bottom', isPositioned: true, update: jest.fn(),
    }),
    autoUpdate: () => () => {},
  };
});
```

**Use `fireEvent.click` (not `element.focus()`) to open the menu**

V2's `onFocus: handleInputInteraction` is overridden by `...restInputProps` spreading the user's own `onFocus`. Only `onClick` is preserved and calls `openMenu()`:

```typescript
// ❌ Does NOT open the menu
inputElement.focus();

// ✅ Opens the menu
fireEvent.click(inputElement);
```

Mobile tests are unaffected (`alwaysRenderSuggestions: true` renders without `isOpen`).

**Assert expanded `defaultValue` on initial render, not after selection**

After a suggestion click, downshift replaces `defaultValue` with `getSuggestionValue(suggestion)`. The expanded value only returns after a key-triggered remount:

```typescript
// ✅ Assert BEFORE interaction
expect(inputElement).toHaveValue('Statue of Liberty, New York, USA');

// ❌ Don't assert toHaveValue after clicking a suggestion
```

**Mobile axe: pass suggestions to avoid `aria-controls` violation**

With `alwaysRenderSuggestions: true` and no suggestions, `aria-controls` points to a non-existent `<ul>`:

```typescript
// ❌ Fails axe
render(<AutoSuggest {...defaultProps} />);
// ✅
render(<AutoSuggest {...defaultProps} suggestions={mockSuggestions} />);
```

**`type` and `name` are stripped from `inputProps` in `renderInputComponent` path**

V2 destructures these before calling `getInputProps` — remove `type` and `name` attribute assertions for desktop tests using a custom `renderInputComponent`.

**`onInputBlur` fires twice in `userEvent.type` + `fireEvent.blur` tests**

```typescript
// ❌ Fails — actually called twice in V2
expect(defaultProps.onInputBlur).toHaveBeenCalledTimes(1);
// ✅
expect(defaultProps.onInputBlur).toHaveBeenCalledTimes(2);
```

**`UNSAFE_componentWillReceiveProps` tests** using `rerender` to change the `value` prop no longer work. Replace with `defaultValue` initial render tests.

### Phase 5: Verification

#### Step 1: Discover commands

Before running anything, inspect project documentation to find the correct typecheck and test commands for this codebase. Check in order:

1. `CLAUDE.md` / `AGENTS.md` — often lists exact commands and constraints (e.g. "run from package dir, not root", "confirm with user before running tests")
2. `README.md` — project-level docs
3. Each affected package's `package.json` `scripts` section — look for:
   - **typecheck**: `typecheck`, `tsc`, `type-check`
   - **tests**: `test`, `test:watch`, `test:ci`

**Never assume commands.** Projects vary widely. Record the exact commands to use in subsequent steps.

#### Step 2: Ask before running

**Always ask the user before running typecheck or tests.** Some projects have this as an explicit rule. Even when not explicit, these can be slow or have infrastructure requirements. State which commands you plan to run and ask for confirmation.

#### Step 3: Run typecheck

Run typecheck in each affected package using the commands discovered in Step 1. Typecheck is fast and catches regressions before spending time on test runs:

```bash
# Example — use the actual command discovered for this project
cd apps/webapp && npm run typecheck
cd apps/common && npm run typecheck
cd apps/server && npm run typecheck
```

Report any type errors. Fix type errors before proceeding to tests.

#### Step 4: Run tests for affected modules

Once typecheck is clean, run tests scoped to the changed modules using the commands discovered in Step 1. Avoid running the full test suite unless needed — it's slow and noisy:

```bash
# Example — use the actual command discovered for this project
# Run tests for a specific file
cd apps/webapp
npm test -- src/path/to/Component.test.tsx

# Run tests for a directory
cd apps/webapp
npm test -- src/modules/hotel-content/

# Run all tests in a package (only when no narrow scope is practical)
cd apps/webapp
npm test
```

**For button migration**: focus on components that import `BpkButton` — snapshot tests will need updating after the rename. Run `jest --updateSnapshot` (or project equivalent) for those.

**For autosuggest migration**: run test files alongside each migrated component. Watch for:
- `FloatingPortal` crash in jsdom (mock `@floating-ui/react` — see Phase 4)
- Snapshot mismatches from V2 rendering differences
- Tests using `inputElement.focus()` that need to be changed to `fireEvent.click()` to open the menu

#### Step 5: Report results

Summarise:
- Packages checked
- Any failing tests
- Snapshot updates applied (if any)

### Phase 6: Capture Learnings & Contribute Back

**MANDATORY: Do not end the session without completing this phase.** Run this phase whenever:
- All migration work for a category is complete (even if other categories are skipped)
- The user asks a wrap-up or review question
- The user signals they're done ("thanks", "that's all for now")

Do not wait for the user to ask. Announce that you're reviewing learnings and proceed.

#### Step 1: Identify new learnings

Ask yourself:
- Did any files require patterns not covered by the skill?
- Did the migration script need adjustments for this codebase?
- Were there edge cases in autosuggest migration not documented?
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

**How:** Open a PR to https://github.com/Skyscanner/backpack adding or updating the v42
migration guide with the new learnings from this run.

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
- **`BpkAutosuggestSuggestion`** (the suggestion renderer sub-component) is NOT affected by this migration. Its API remains the same.
- If a file imports from `bpk-component-autosuggest` but only uses `BpkAutosuggestSuggestion`, it does **NOT** need API migration.
- Desktop dropdown uses `FloatingPortal` (renders outside the component's DOM subtree). This can affect z-index stacking and `overflow: hidden` scroll containers.
- V2 auto-selects the highlighted suggestion on blur when `highlightFirstSuggestion: true` — test blur interactions carefully.
- V2 previews arrow-key-highlighted suggestions in the input field (temporarily replaces typed text). This is new V2 behaviour with no V1 equivalent.

## Lessons from Prior Runs

### Multi-line imports are the majority
~75% of BpkButtonV2 imports are multi-line:
```javascript
import {
  BpkButtonV2,
  BUTTON_TYPES,
} from '@skyscanner/backpack-web/bpk-component-button';
```
Single-line grep patterns only match ~25% of files. Always use the JSX grep (`<BpkButtonV2`) as the source of truth for file counts.

### Regex is unreliable for multi-line import rewriting
`String.replace` with `[\s\S]*?` silently skips files — in testing it caught only 46 out of 264 imports. The line-by-line parser (find `from '...'`, walk backwards to `import {`) is 100% reliable.

### node_modules will hang your script
Always use `--exclude-dir=node_modules` with grep, or target specific source directories. Without this, `grep -rl` will hang indefinitely.

### Order of operations matters
1. Fix deep import **paths** first (while `BpkButtonV2` is still in the path string)
2. Rename `BpkButtonV2` → `BpkButton` globally (simple string replace)
3. Fix import **syntax** (named → default)

### Type imports stay as named imports
`import type { ButtonType } from '...'` must NOT be converted to a default import.

### Default import aliased as BpkButtonV2 is a distinct pattern
Some files already use the correct default import but alias it:
```javascript
import BpkButtonV2, { BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
```
Both import-line greps miss this entirely — only `<BpkButtonV2` JSX grep catches it. The script handles it correctly without changes (step 2's global rename fixes the alias; step 3 skips it because `BpkButton` isn't in the named imports list).

### Key-based re-mount is the core V2 pattern for programmatic resets
V2's uncontrolled input has no `setValue()` API. To reset the input (after selection, clear, blur-restore):

```javascript
const [autosuggestKey, setAutosuggestKey] = useState(0);
const [currentDefault, setCurrentDefault] = useState(initialValue);

const resetAutosuggest = (newDefault) => {
  setCurrentDefault(newDefault);
  setAutosuggestKey((prev) => prev + 1);
};

<BpkAutosuggest key={autosuggestKey} defaultValue={currentDefault} ... />
```

**Companion pattern — `skipNextSyncRef`**: When selection handler calls `resetAutosuggest` AND triggers a parent `onChange` that syncs back via `useEffect`, you get a double re-mount:
```javascript
const skipNextSyncRef = useRef(false);

const handleSelection = (suggestion) => {
  skipNextSyncRef.current = true;
  onChange(suggestion);
  resetAutosuggest('');
};

useEffect(() => {
  if (skipNextSyncRef.current) { skipNextSyncRef.current = false; return; }
  resetAutosuggest(valueFromProps);
}, [valueFromProps]);
```

### Split combined onChange handlers into onInputValueChange + onSuggestionSelected
Legacy pattern — a single handler for both typing and selection:
```javascript
selectChange = (e, { newValue }) => {
  if (typeof newValue === 'string') { /* typing */ }
  else if (newValue.value) { /* selection */ }
};
```
V2 separates these:
```javascript
handleInputChange = ({ newValue }) => { /* typing — always a string */ };
handleSelected = ({ suggestion }) => { /* selection — full suggestion object */ };
```
The `typeof newValue` check is a reliable indicator that a handler needs splitting.

### Redux connect() HOC wrapping BpkAutosuggest is incompatible with V2
```javascript
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(BpkAutosuggest);
```
This passes `value`/`onChange` via Redux's `mergeProps` directly to BpkAutosuggest. Since V2 doesn't accept these, it fundamentally breaks. **Solution**: Convert to a functional component using `useSelector`/`useDispatch` and render `<BpkAutosuggest>` with V2 props explicitly.

### Class components with UNSAFE_componentWillReceiveProps need full rewrites
These components sync input value from parent props — there's no V2 equivalent since `defaultValue` only applies on mount. Convert to functional components with `useState`/`useEffect`/`useCallback`/`useRef` + the key-based re-mount pattern.

### Batch workflow for large autosuggest migrations
Users may prefer batch mode over per-file confirmation. Viable, but:
- Large autosuggest migrations can exceed the context window — batch in groups of ~8 files.
- Show the first 1–2 files with full analysis, then ask if they want batch mode.
- Provide a summary table of all changes at the end.

### Discovery: not all autosuggest imports need API migration
Files that only import `BpkAutosuggestSuggestion` don't need changes. Add a triage step after discovery: read each file's usage to filter the true migration list before counting.

### Deep imports extend beyond bpk-component-button
Discovery should also check:
```
Grep: from.*bpk-component-.*/src/
```
Common example: `import type { InputProps } from '@skyscanner/backpack-web/bpk-component-input/src/common-types'`

### Deep imports migration: not all types are re-exported at component roots
When migrating deep `src/` imports to public roots, many components only re-export a subset of their internal types. Classified by fix strategy:

**Simple path-only replacement** (same import structure works at root):
- `bpk-component-text/src/BpkText` → `bpk-component-text` (`BpkText` default, `TEXT_STYLES`, `TEXT_COLORS` named)
- `bpk-component-badge/src/BpkBadge` → `bpk-component-badge` (`BpkBadge` default, `BADGE_TYPES` named)
- `bpk-component-banner-alert/src/common-types` → `bpk-component-banner-alert` (`ALERT_TYPES` named)
- `bpk-component-input/src/common-types` → `bpk-component-input` (`INPUT_TYPES`, `CLEAR_BUTTON_MODES` named)
- `bpk-component-autosuggest/src/BpkAutosuggest` → `bpk-component-autosuggest` (`BpkAutosuggest` default)
- `bpk-component-calendar/src/custom-proptypes` → `bpk-component-calendar` (`CALENDAR_SELECTION_TYPE` named)

**Structure changes needed** (default at src, named at root):
- `import BpkCalendarNav from '...calendar/src/BpkCalendarNav'` → `import { BpkCalendarNav } from '...calendar'`
- `import SPINNER_TYPES from '...spinner/src/spinnerTypes'` → `import { SPINNER_TYPES } from '...spinner'`

**Namespace extraction** (namespace at root, not individual function):
- `import { format } from '...calendar/src/date-utils'` → `import { DateUtils } from '...calendar'` then `const { format } = DateUtils` after imports

**Types NOT at root — derive locally**:
- `Tag` from `bpk-component-text/src/BpkText` → inline: `type Tag = 'span' | 'p' | 'text' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'`
- `AlertTypeValue` from `bpk-component-banner-alert/src/common-types` or `bpk-component-info-banner/src/common-types` → `type AlertTypeValue = (typeof ALERT_TYPES)[keyof typeof ALERT_TYPES]`
- `OnDismissHandler` from `bpk-component-banner-alert/src/common-types` → `type OnDismissHandler = (() => void) | null | undefined`
- `BadgeType` from `bpk-component-badge/src/BpkBadge` → `type BadgeType = (typeof BADGE_TYPES)[keyof typeof BADGE_TYPES]`
- `ColumnType` from `bpk-component-datatable/src/common-types` → derive via `ComponentProps<typeof BpkDataTable>['columns'][number]`

**Renamed at root** (same values, new name):
- `SEGMENT_TYPES` from `bpk-component-segmented-control/src/BpkSegmentedControl` → `import { SEGMENT_TYPES_V2 as SEGMENT_TYPES } from '...segmented-control'` (identical runtime values)

### Simple path replacement script introduces out-of-order type declarations
A script that does `content.replace(deepPath, rootPath)` may transform `import type { Foo }` lines into pointing to the root. But if `Foo` isn't exported at root, this creates a new TS error. After running the script, always verify with typecheck — the errors will surface the exact files needing the "derive locally" pattern.

Also watch for type declarations that end up between `import` statements. Always place `type` declarations after all `import` lines.

### BpkButton.loading expects boolean, not string
The `loading` prop type is `boolean | undefined` on `BpkButton` in v42. A pre-existing pattern `loading={someBoolean.toString()}` will surface as a type error after migration. The fix is to drop `.toString()` and pass the boolean directly:

```typescript
// ❌ Before (masked bug in v41)
<BpkButton loading={loading.toString()}>

// ✅ After
<BpkButton loading={loading}>
```

Check for this pattern in any file that passes `loading` as a prop to the migrated button. The typecheck step will catch it.

### Class components can adopt V2 API without full functional rewrites

The skill says "Class components with UNSAFE_componentWillReceiveProps need full rewrites." This is specifically about that lifecycle method — class components that don't use `UNSAFE_componentWillReceiveProps` can be migrated in place. Apply the key-based re-mount pattern using class state:

```javascript
// In class component state:
state = { autosuggestKey: 0, searchValue: '' };

// Reset the autosuggest programmatically:
this.setState({ autosuggestKey: this.state.autosuggestKey + 1, searchValue: '' });

// In render:
<BpkAutosuggest
  key={this.state.autosuggestKey}
  defaultValue={this.state.searchValue}
  onInputValueChange={({ newValue }) => this.setState({ searchValue: newValue })}
  ...
/>
```

Full conversion to functional component is only required when `UNSAFE_componentWillReceiveProps` is the primary mechanism for resetting input from parent props.

### JSX-to-TSX conversion pairs well with autosuggest migration

When autosuggest files are `.jsx`, migrating to V2 API benefits from converting to `.tsx` in the same commit. The migration requires understanding prop types for `onSuggestionsFetchRequested`, `onSuggestionSelected`, and `onInputValueChange`, and TypeScript type annotations make these explicit. If files are already `.jsx` and the migration is mechanical enough to do safely, co-locate the `.jsx → .tsx` conversion with the autosuggest migration.

### Files with non-JSX BpkButtonV2 references are missed by the JSX grep
Two categories slip through the `<BpkButtonV2` grep:
1. Comments mentioning `BpkButtonV2` (e.g., JSDoc/inline docs)
2. Jest mocks: `jest.mock('...', () => ({ BpkButtonV2: ... }))`

After running the script, always do a final `grep -r "BpkButtonV2"` pass to catch stragglers.
