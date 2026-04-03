---
name: bpk-js-to-ts-migration
description: |
  Migrate Backpack design system components from JavaScript (Flow) to TypeScript.
  Use when: (1) converting .js/.jsx files in packages/bpk-component-* or examples/ to .tsx/.ts,
  (2) removing Flow type annotations and @flow strict comments, (3) replacing PropTypes with
  TypeScript interfaces, (4) fixing "allowJs: false" errors after renaming files, (5) handling
  untyped third-party libraries (e.g. react-autosuggest) with ambient declarations,
  (6) cleaning up @ts-expect-error directives in consumer examples/stories after migration,
  (7) visually verifying all Storybook stories still work after migration.
  Covers: Flow→TS type mapping, ambient module declarations, class component constructor fix,
  defaultProps→destructuring, nullable prop types, @ts-expect-error cleanup, tsc verification,
  Playwright-based Storybook visual regression check.
metadata:
  version: 1.1.0
  date: 2026-03-20
---

# Backpack JS → TypeScript Migration

## Problem

Backpack components written in Flow/JavaScript need to be converted to TypeScript so they
compile under `allowJs: false` (strict mode in the repo's `tsconfig.json`).

---

## Step 0: Pre-flight checks

```bash
# 1. Find all JS files to convert in a package
find packages/bpk-component-<name> examples/bpk-component-<name>* -name "*.js" -o -name "*.jsx"

# 2. Check if any third-party dependency is untyped
ls node_modules/@types/<dep-name> 2>/dev/null || echo "No @types"
ls node_modules/<dep-name>/*.d.ts  2>/dev/null || echo "No bundled types"

# 3. Check for consumers with @ts-expect-error on this package
grep -rn "@ts-expect-error" examples/ --include="*.tsx" | grep "<package-name>"
```

---

## Step 1: Handle untyped third-party libraries

**Project rule** (`decisions/imports-ts-suppressions.md`): use `@ts-expect-error` at the
import site — do NOT add ambient declarations to `@types/`.

Backpack is published **non-transpiled**. When consumers build, TypeScript reads Backpack's
source files directly. `@ts-expect-error` is propagated to consumers; `@types/` ambient
declarations are not.

```typescript
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import Autosuggest from 'react-autosuggest';
```

After adding `@ts-expect-error`, the imported symbol becomes `any`. Define a local type
for the shape you actually use:

```typescript
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import Autosuggest from 'react-autosuggest';

type InputComponentProps = InputHTMLAttributes<HTMLInputElement> & {
  ref: (element: HTMLInputElement | null) => void;
  inputRef?: ((element: HTMLInputElement | null) => void) | null;
};

// Now type the callback params explicitly instead of relying on inference
Autosuggest.defaultProps.renderInputComponent = (
  inputProps: InputComponentProps,
): ReactElement => { ... };
```

> **`@types/` is only for module patterns** (e.g. `*.scss`), not for specific packages.
> The existing `@types/scss.d.ts` declares `declare module '*.scss'` — that is the only
> intended use of that directory in this repo.

---

## Step 2: Flow → TypeScript type mapping

| Flow | TypeScript |
|------|-----------|
| `/* @flow strict */` | delete |
| `?T` (nullable) | `T \| null` if consumers pass `null`; `T \| undefined` (or just `?`) if they don't |
| `Node` (from react) | `ReactNode` |
| `mixed` | `unknown` |
| `Function` (for icon/component) | `ComponentType` or `ComponentType<Props>` |
| `Array<any>` | concrete typed array, e.g. `Office[]` |
| `SyntheticEvent<any>` | `SyntheticEvent` or specific: `ChangeEvent<HTMLInputElement>` |
| `(%stateType) => void` (Flow exact obj) | `(state: StateType) => void` |

**Nullable props — preserve `null` when consumers pass it:**

```typescript
// Original Flow: icon: Function, subHeading: ?Node, className: ?string
// If examples pass null explicitly → accept null for backward compat
type Props = {
  icon?: ComponentType | null;       // not just ComponentType | undefined
  subHeading?: ReactNode | null;
  className?: string | null;
};
```

---

## Step 3: Convert source files

### 3a. Simple functional component (BpkAutosuggestSuggestion pattern)

```typescript
// BEFORE (Flow JS)
const BpkFoo = (props: Props) => { ... };
BpkFoo.propTypes = { value: PropTypes.node.isRequired, ... };
BpkFoo.defaultProps = { indent: false, className: null };

// AFTER (TypeScript)
// 1. Remove PropTypes import + block
// 2. Remove defaultProps block
// 3. Move defaults to destructuring
// 4. Extend HTML element attrs so ...rest spread stays valid

type Props = HTMLAttributes<HTMLElement> & {
  value: ReactNode;               // required
  indent?: boolean;               // default in destructuring
  className?: string | null;      // nullable for compat
};

const BpkFoo = ({
  className,
  indent = false,   // ← was defaultProps
  value,
  ...rest
}: Props) => { ... };
```

### 3b. Legacy wrapper that mutates defaultProps (BpkAutosuggest pattern)

When wrapping an untyped class component and mutating its `defaultProps`:

```typescript
import Autosuggest from 'react-autosuggest';     // ambient declaration handles types
import type { RenderInputComponentProps } from 'react-autosuggest';

Autosuggest.defaultProps.theme = { ... };        // compiles via ambient [key: string]: unknown

Autosuggest.defaultProps.renderInputComponent = (
  inputProps: RenderInputComponentProps,
): ReactElement => {
  const { autoComplete = 'off', inputRef, ref, ...rest } = inputProps;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <BpkInput
      inputRef={...}
      autoComplete={autoComplete as string}
      {...(rest as any)}   // ← untyped spread from untyped lib: cast to any is acceptable
    />
  );
};
```

### 3c. Class component (examples pattern)

```typescript
// BEFORE (Flow)
class Foo extends Component<Props, State> {
  constructor() {       // ← Flow allows, TS strict does NOT
    super();
    this.state = { ... };
  }
  onChange = (e: SyntheticEvent<any>, ...) => { ... }  // Flow SyntheticEvent

// AFTER (TypeScript)
class Foo extends Component<Props, State> {
  constructor(props: Props) {   // ← must pass props
    super(props);
    this.state = { ... };
  }
  onChange = (_e: SyntheticEvent, { newValue }: { newValue: string }) => { ... }
  // prefix unused params with _ to satisfy noUnusedLocals
}
```

> **Tip:** TypeScript will also catch missing class methods referenced in render.
> If `this.onSuggestionsClearRequested` is passed as a prop but never defined,
> TS errors — add the missing method with a sensible no-op implementation.

---

## Step 4: Rename + delete old files

Because `tsconfig.json` has `"allowJs": false`, keeping both `.js` and `.tsx` will cause
the JS file to be rejected. **Always delete the old JS file after creating the TS version.**

```bash
# Create TS version first, then delete JS
mv src/BpkFoo.js src/BpkFoo.tsx   # or Write new + rm old

# Delete all originals at once after conversion
rm src/BpkFoo.js src/BpkFoo-test.js src/accessibility-test.js index.js
```

---

## Step 5: Clean up consumer `@ts-expect-error` directives

When examples/stories had suppression comments like:

```typescript
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkFoo from '../../packages/bpk-component-foo';
```

After the package gains types, these become **errors** (`TS2578: Unused '@ts-expect-error'`).
Remove the suppression comment (and any explanatory comment above it):

```typescript
// BEFORE
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkFoo from '../../packages/bpk-component-foo';

// AFTER
import BpkFoo from '../../packages/bpk-component-foo';
```

---

## Step 6: Verify (TypeScript)

```bash
npx tsc --noEmit --project tsconfig.json 2>&1 | grep "<package-name>"
```

Zero output = clean. Fix any remaining errors before considering the migration complete.

---

## Step 7: Visual regression via Storybook

After the TypeScript build is clean, verify all Storybook stories for the migrated package
still render and behave correctly. Use the Playwright MCP tool to automate this.

### 7a. Identify all stories for the package

```bash
# List story IDs from the stories file
grep "^export const" examples/bpk-component-<name>*/stories.tsx
```

Story IDs follow the pattern: `bpk-component-<name>--<story-name-kebab-case>`
(e.g. `bpk-component-autosuggest-legacy--with-sub-headings`)

### 7b. Test each story with Playwright

For components with interactive suggestions/dropdowns, type into the input to trigger them:

```javascript
// Playwright MCP: browser_run_code
async (page) => {
  const stories = [
    { id: 'example', input: 'Lon' },
    { id: 'with-icons', input: 'Lon' },
    // ... add all exported stories
  ];

  const results = [];
  for (const story of stories) {
    await page.goto(
      `http://localhost:9001/iframe.html?id=bpk-component-<name>--${story.id}&viewMode=story`
    );
    await page.waitForTimeout(500);

    const input = await page.$('input');
    if (input) {
      await input.focus();
      await input.type(story.input, { delay: 50 });
      await page.waitForTimeout(300);
      const suggestions = await page.$$eval('li[role="option"], li.bpk-autosuggest__suggestion-item',
        els => els.map(el => el.textContent?.trim())
      );
      results.push({ story: story.id, rendered: true, suggestions });
    } else {
      results.push({ story: story.id, rendered: await page.$('body') !== null });
    }
  }
  return results;
}
```

### 7c. What to check in results

- `rendered: true` for every story — confirms the component mounts without crashing
- Expected suggestions appear — confirms interactive behaviour still works
- **Console warnings to ignore** (pre-existing from `react-autosuggest` itself):
  - `Warning: componentWillReceiveProps has been renamed` — internal to the lib
  - `Warning: A props object containing a "key"` — internal to the lib
- **Console errors to investigate** — any `TypeError`, `ReferenceError`, or React render
  errors are regressions introduced by the migration

### 7d. Storybook story ID format

| stories.tsx export | story ID |
|--------------------|----------|
| `export const Example` | `bpk-component-<name>--example` |
| `export const WithIcons` | `bpk-component-<name>--with-icons` |
| `export const HighlightFistSuggestion` | `bpk-component-<name>--highlight-fist-suggestion` |

The title in the default export (`title: 'bpk-component-autosuggest/legacy'`) maps to
`bpk-component-autosuggest-legacy` (slashes become hyphens, spaces become hyphens).

---

## Checklist

- [ ] All `.js`/`.jsx` files identified (src, tests, examples, stories, version-check tests)
- [ ] `@ts-expect-error Untyped import. See decisions/imports-ts-suppressions.md.` added for any untyped third-party dep (NOT `@types/`)
- [ ] `/* @flow strict */` removed from all files
- [ ] `PropTypes` import + block removed; replaced with TypeScript interface
- [ ] `defaultProps` removed; defaults moved to destructuring
- [ ] Flow nullable `?T` mapped to `T | null` where consumers pass `null`
- [ ] Class component `constructor()` → `constructor(props: Props)` + `super(props)`
- [ ] Missing class methods caught by TS added with sensible implementations
- [ ] Old `.js` files deleted
- [ ] `@ts-expect-error` directives removed from consumers
- [ ] `tsc --noEmit` passes with zero errors in this package
- [ ] All Storybook stories render (`rendered: true`) with correct interactive behaviour

---

## Notes

- **Scope creep**: Only convert the target package's files. Do not refactor logic,
  rename things, or fix unrelated issues found while reading the code.
- **`any` vs `unknown`**: Use `unknown` for truly unknown external data; use `any`
  only for untyped lib spreads (`...rest as any`) or generic params of untyped
  third-party components where typed callbacks must be assignable.
- **`ComponentType` vs `FC`**: Prefer `ComponentType` (accepts both class and function
  components) over `FC`/`FunctionComponent` for `icon`-style props.
- **Test files**: Test files (`.test.tsx`) follow the same rules. Type test-specific
  variables (e.g., `let inputRef: HTMLInputElement | undefined`) and cast
  `querySelector` results (`container.querySelector('input') as HTMLInputElement`).
- **`allowJs: false` gotcha**: If you forget to delete the old `.js` and tsc silently
  ignores it, the Jest test runner may still pick up the old file — always delete.
