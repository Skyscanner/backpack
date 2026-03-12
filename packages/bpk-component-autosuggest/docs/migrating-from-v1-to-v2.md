## Autosuggest (legacy) → Autosuggest (V2) migration guide (Web)

This guide is for consumers of `@skyscanner/backpack-web/bpk-component-autosuggest`. It helps you migrate from **Autosuggest (legacy)** (named export `BpkAutosuggestLegacy`, based on `react-autosuggest`) to **Autosuggest (V2)** (**default export `BpkAutosuggest`**, based on `downshift`).

**Autosuggest (V2) is a modern redesign**: it significantly improves accessibility (a11y), maintainability, and alignment with modern React/web platform patterns. As a result, it **does not preserve legacy (react-autosuggest-style) callback signatures** — this is an intentional breaking change.

Most consumers can migrate with minimal code changes by **removing external input control** and **updating a small number of callbacks**.

## 1. Which version are you using today?

- **Legacy (v1)**: named export

```js
import { BpkAutosuggestLegacy } from '@skyscanner/backpack-web/bpk-component-autosuggest';
```

- **V2**: default export

```js
import BpkAutosuggest from '@skyscanner/backpack-web/bpk-component-autosuggest';
```

> The first migration step is usually changing the import from named → default.
>
> This change is also an intentional API signal: **V2 is the new default**.

---

## 2. Key differences (common pitfalls)

### 2.1 Controlled vs uncontrolled: V2 manages the input value internally

**TL;DR:** **Autosuggest (V2) owns the input value.** You no longer control it via `inputProps.value`.

- **Legacy**: consumers typically control the input via `inputProps`:
  - `inputProps.value`
  - `inputProps.onChange(event, { newValue })`

- **V2**: the input value is **managed internally**. `inputProps.value` is no longer the primary mechanism.
  - To observe input changes: `onInputValueChange({ method, newValue })`
  - To observe selection: `onSuggestionSelected({ inputValue, suggestion })`
  - To set an initial value: `defaultValue`

> **Key idea (this is the migration “fork in the road”):** V2 is designed around “Autosuggest owns the input value; consumers provide/update `suggestions` and subscribe to changes”.
>
> If you strongly depend on fully controlling the input value externally, evaluate this upfront.
>
> `defaultValue` only sets the **initial** input value (uncontrolled). Subsequent updates should be driven by user input and callbacks.

### 2.2 `onSuggestionsFetchRequested` argument changed

- **Legacy**: `onSuggestionsFetchRequested({ value })`
- **V2**: `onSuggestionsFetchRequested(value: string)`

### 2.3 `onChange` is no longer react-autosuggest-style

- **Legacy**: `inputProps.onChange(event, { newValue })`
- **V2**: prefer `onInputValueChange({ method, newValue })`

### 2.4 Suggestion list rendering location: desktop uses a portal by default

With `isDesktop={true}` (default), V2 renders the suggestions list into `document.body` (via a portal) to avoid stacking context / overflow issues.

If you have:
- tests that query within the component container (e.g. `container.querySelector(...)`)
- styles/layout that rely on parent overflow clipping

you may need to adjust (e.g. query from `document.body`, or use `isDesktop={false}`).

> `isDesktop={false}` can be an **escape hatch** for specific layouts/tests, but it is **not recommended as the default** just to make tests easier.
>
> Testing tips:
> - React Testing Library: prefer `screen.getByRole('listbox')` / `screen.getByText(...)` (these query the whole document by default).
> - Cypress: use `cy.get('body').find('[role="listbox"]')` / `cy.get('body').contains(...)`.

---

## 3. Minimal migration (based on the README example)

Below is a typical “type → fetch suggestions → render → select” flow.

### 3.1 Legacy (example)

```js
import { Component } from 'react';
import BpkLabel from '@skyscanner/backpack-web/bpk-component-label';
import { BpkAutosuggestLegacy, BpkAutosuggestSuggestion } from '@skyscanner/backpack-web/bpk-component-autosuggest';

class MyComponent extends Component {
  state = { value: '', suggestions: [] };

  onChange = (e, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ suggestions: getSuggestions(value) });
  };

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      id: 'my-autosuggest',
      name: 'my-autosuggest',
      placeholder: 'Enter an office name',
      value,
      onChange: this.onChange,
    };

    return (
      <div>
        <BpkLabel htmlFor="my-autosuggest">Office</BpkLabel>
        <BpkAutosuggestLegacy
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}
```

### 3.2 V2 (recommended)

This example uses hooks for clarity; **class components can be migrated in the same way**.

```tsx
import { useState } from 'react';
import BpkLabel from '@skyscanner/backpack-web/bpk-component-label';
import BpkAutosuggest, {
  BpkAutosuggestSuggestion,
} from '@skyscanner/backpack-web/bpk-component-autosuggest';

type Office = { name: string; code: string; country: string };

export function MyComponent() {
  const [suggestions, setSuggestions] = useState<Office[]>([]);

  const getSuggestionValue = (s: Office) => `${s.name} (${s.code})`;
  const renderSuggestion = (s: Office) => (
    <BpkAutosuggestSuggestion
      value={getSuggestionValue(s)}
      subHeading={s.country}
      tertiaryLabel="Airport"
    />
  );

  const inputProps = {
    placeholder: 'Enter an office name',
    name: 'my-autosuggest',
    // Do not control value/onChange here in V2
    autoComplete: 'off',
  };

  return (
    <div>
      <BpkLabel htmlFor="my-autosuggest">Office</BpkLabel>
      <BpkAutosuggest<Office>
        id="my-autosuggest"
        inputProps={inputProps}
        suggestions={suggestions}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        ariaLabels={{
          label: 'Office',
          resultsList: 'Office suggestions',
          clearButton: 'Clear input',
        }}
        getA11yResultsMessage={(count) =>
          `${count} result${count === 1 ? '' : 's'}`
        }
        onSuggestionsFetchRequested={(value) => {
          setSuggestions(getSuggestions(value));
        }}
        onSuggestionsClearRequested={() => setSuggestions([])}
        onInputValueChange={({ newValue }) => {
          // Optional: e.g. analytics/logging/state sync
          // console.log('query:', newValue);
        }}
        onSuggestionSelected={({ inputValue, suggestion }) => {
          // Selected display value (inputValue) + entity (suggestion)
          // console.log('selected:', inputValue, suggestion);
        }}
      />
    </div>
  );
}
```

---

## 4. API mapping table (v1 → v2)

> v1 is a thin wrapper around `react-autosuggest`, so you may be using many upstream props. V2 does not guarantee a 1:1 mapping. This table covers the most common migration points.

| Scenario | Autosuggest (legacy) | Autosuggest (V2) | Migration notes |
|---|---|---|---|
| Import | `import { BpkAutosuggestLegacy } from ...` | `import BpkAutosuggest from ...` | **Change import** |
| Input value control | `inputProps.value` + `inputProps.onChange(e, { newValue })` | internally managed; use `defaultValue` / subscribe via `onInputValueChange` | Remove external control of `value`; **subscribe instead** |
| Fetch suggestions | `onSuggestionsFetchRequested({ value })` | `onSuggestionsFetchRequested(value: string)` | argument becomes **string** |
| Clear suggestions | `onSuggestionsClearRequested()` | `onSuggestionsClearRequested()` | usually unchanged |
| Selection callback | `onSuggestionSelected(event, data)` (react-autosuggest-style) | `onSuggestionSelected({ inputValue, suggestion })` | logic relying on legacy fields must be rewritten |
| Render suggestion | `renderSuggestion(s)` | `renderSuggestion(s)` | usually unchanged |
| `getSuggestionValue` | `getSuggestionValue(s)` | `getSuggestionValue(s)` | usually unchanged |
| Clear button | depends on consumer wiring of `BpkInput` clear props | built-in clear button support (see props for the exact API) | more “out of the box” in V2 |
| Multi-section | `multiSection` + `getSectionSuggestions` + `renderSectionTitle` | same prop names (V2 behaviour applies) | usually portable |
| Theme | `theme` (react-autosuggest theme keys) | `theme` (common keys + extra keys like input/label/etc) | compare against `defaultTheme` |

---

## 5. Common migration snippets

### 5.1 `onSuggestionsFetchRequested`: object argument → string

**Before (v1)**

```js
onSuggestionsFetchRequested = ({ value }) => {
  this.setState({ suggestions: getSuggestions(value) });
};
```

**After (v2)**

```ts
onSuggestionsFetchRequested={(value) => setSuggestions(getSuggestions(value))}
```

### 5.2 Input changes: `inputProps.onChange` → `onInputValueChange`

**Before (v1)**

```js
onChange = (e, { newValue }) => this.setState({ value: newValue });
const inputProps = { value, onChange: this.onChange };
```

**After (v2)**

```ts
<BpkAutosuggest
  // ...
  onInputValueChange={({ newValue }) => {
    // newValue is the current input value
  }}
/>
```

> In V2, `inputProps` is still useful for `placeholder/name/autoComplete/...`, but it’s no longer recommended for controlling the input value.

### 5.2.1 If you still use `inputProps.onChange`: the signature becomes a standard ChangeEvent

> **Legacy edge case:** Most consumers should be able to skip this section and use `onInputValueChange` instead.

In v1 (`react-autosuggest`), many apps do:

```js
const inputProps = {
  value,
  onChange: (e, { newValue }) => {
    this.setState({ value: newValue });
  },
};
```

In V2, if you still pass `inputProps.onChange`, it receives a standard `React.ChangeEvent<HTMLInputElement>` (no `{ newValue }` second argument). So read from `e.target.value`:

```ts
const inputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value ?? '';
    // ...your logic
  },
};
```

Prefer moving “input value subscription” logic to `onInputValueChange`, and only use `inputProps.onChange` when you truly need the raw change event.

### 5.3 Selection: use `onSuggestionSelected`

**After (v2)**

```ts
onSuggestionSelected={({ inputValue, suggestion }) => {
  // inputValue: the display value (from getSuggestionValue)
  // suggestion: the selected entity
}}
```

### 5.3.1 Migrating legacy handlers that expected `event`

> **Legacy edge case:** Most consumers should be able to skip this section if they don’t rely on the event parameter.

Legacy (react-autosuggest-style) code often looks like:

```js
onSuggestionSelected = (e, { suggestion }) => {
  // e: Event (often unused)
  // suggestion: selected entity
  this.props.onSuggestionSelected(e, { suggestion });
};
```

V2 does not pass an `event`. Rewrite the handler to the V2 signature:

```ts
onSuggestionSelected={({ suggestion }) => {
  if (!suggestion) return;
  // Handle selection here (V2 does not provide event)
}}
```

### 5.4 Input ref: `inputProps.inputRef` → component ref

**Before (v1)**

```js
<BpkAutosuggestLegacy inputProps={{ inputRef: (el) => (this.input = el), ... }} />
```

**After (v2)**

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);

<BpkAutosuggest ref={inputRef} /* ... */ />
```

---

## 6. Theme migration notes

V2 still supports `theme` for overriding classNames. It also exports `defaultTheme` for extending:

```ts
import BpkAutosuggest, { defaultTheme } from '@skyscanner/backpack-web/bpk-component-autosuggest';

<BpkAutosuggest
  // ...
  theme={{
    ...defaultTheme,
    suggestion: 'my-suggestion',
    suggestionHighlighted: 'my-suggestion--highlighted',
    input: 'my-input',
  }}
/>
```

If you heavily relied on `react-autosuggest` theme keys (e.g. `suggestionsContainerOpen`), verify each key. V2 also supports extra keys (non-exhaustive):

- `input`
- `label`
- `inputTextWrapper`
- `inputWrapper`
- `desktopSuggestionsContainer`
- `desktopSuggestionsList`
- `visuallyHidden`

---

