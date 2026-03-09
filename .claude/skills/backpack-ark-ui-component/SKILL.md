---
name: backpack-ark-ui-component
description: |
  Build a new Backpack V2 component that wraps an Ark UI primitive as a slot-based component
  family. Use when: (1) Building a new Bpk 2.0 component backed by an Ark UI primitive,
  (2) Requirements mention Ark UI, slot composition, or BpkX.Root / BpkX.Control patterns,
  (3) Component needs composable layout support (title+subtitle, inline links, custom content).
  Covers: clarification of vague requirements, Figma MCP token extraction, Ark UI MCP API
  discovery, slot component API design principles, SCSS token mapping rules, accessibility
  verification criteria, Storybook composition coverage, and full test suite verification.
author: Claude Code
version: 1.2.0
date: 2026-03-05
changelog: |
  v1.2.0 (2026-03-05):
  - Added Figma MCP known limitations: cannot identify icon SVG geometry inside components
  - Added Figma MCP troubleshooting: call get_metadata first when get_design_context fails
  - Added SCSS icon rule: prefer existing bpk-mixins over writing inline SVG
  - Added Playwright MCP visual verification workflow (viewport, wait, iframe URL pattern)
  - Added new Common Issues: Figma MCP "nothing selected", display:flex + [hidden] conflict
  - Updated SCSS import order: forms mixin needed when reusing existing form mixins

  v1.1.0 (2026-03-05):
  - Replaced component-specific code templates with workflow rules and decision principles

  v1.0.0 (2026-03-05):
  - Initial creation from BpkCheckbox V2 implementation planning
---

# Backpack Ark UI Component

## Problem

Building a new Backpack V2 component that wraps an Ark UI primitive requires coordinating
three information sources (requirements, Figma design, Ark UI API) before writing a single
line of code. Requirements are often vague — missing Figma URLs, unclear state coverage,
unspecified slot composition needs. This skill encodes how to identify those gaps early,
extract the right information from MCP tools, and produce a correct, accessible, token-exact
slot component family.

## Context / Trigger Conditions

Use this skill when:
- User asks to build a "Bpk 2.0" or "V2" component
- Requirements mention Ark UI, slot composition, or `BpkX.Root` / `BpkX.Control` patterns
- Component needs composable label/description layout (not just a single string prop)
- Migrating a Chakra UI component example to Ark UI + Backpack tokens

**Common indicators in requirements:**
- "wrap Ark UI's X primitive"
- "slot-based component family"
- "BpkX.Root is the primary entry point"
- "support title + subtitle layouts"
- "links inside label must remain clickable"

---

## Phase 0: Input Assessment & Clarification (ALWAYS run first)

Before doing anything else, evaluate what the user has provided against the mandatory checklist below.
Output a structured gap report and ask for missing mandatory items before proceeding.

### 0.1 Mandatory Information Checklist

| # | Item | Why mandatory | How to detect if missing |
|---|------|--------------|--------------------------|
| M1 | **Figma URL** | Single source of truth for ALL visual values — spacing, color, sizing, states | No `figma.com` URL in requirements |
| M2 | **Ark UI primitive name** | Determines available parts, props, and accessibility semantics | Not stated (e.g. "checkbox", "tabs", "select") |
| M3 | **Component name** | `BpkX.Root` naming — must be confirmed | Not stated or ambiguous |
| M4 | **Required slot components** | Drives TypeScript structure | Not listed, or only partially listed |
| M5 | **Component placement** | Determines file structure and import paths | Not stated — always ask explicitly |

#### M5 — Component Placement (always ask the user)

A V2 component can live in two places. Ask the user to choose before starting:

**Option A — Standalone new package** (`packages/bpk-component-[name]-v2/`)
- Use when there is no V1 to co-locate with
- Consumers import from `@skyscanner/backpack-web/bpk-component-[name]-v2`

**Option B — Subfolder inside the existing V1 package** (`packages/bpk-component-[name]/src/Bpk[Name]V2/`)
- Use when a V1 already exists and the goal is a smooth future V1 deprecation
- V2 is exported as a named export (`BpkCheckboxV2`) from `bpk-component-[name]/index.ts`
- The old `bpk-component-[name]-v2` package (if it exists) re-exports from the new canonical location for backwards compatibility
- Consumers import from `@skyscanner/backpack-web/bpk-component-[name]` — no path change needed when V1 is deprecated
- When using Option B, relative imports in the V2 source files need one extra `../` level (e.g. `../../bpk-react-utils` → `../../../bpk-react-utils`)

Ask the user:
```
Where should this V2 component live?
A) New standalone package: packages/bpk-component-[name]-v2/
B) Inside the existing V1 package: packages/bpk-component-[name]/src/Bpk[Name]V2/
   (recommended if a V1 exists and you want consumers to keep the same import path after V1 deprecation)
```

### 0.2 Important Information (proceed with stated assumption if absent)

| # | Item | Default assumption if missing |
|---|------|-------------------------------|
| I1 | **Design states** | Will extract from Figma: default, hover, focus, disabled. Flag if indeterminate/error not visible |
| I2 | **V1 reference component** | None — build fresh |
| I3 | **Indeterminate state** | Include only if Figma shows it AND Ark primitive supports it |
| I4 | **HiddenInput slot** | Include only if Ark exposes it cleanly in current version |
| I5 | **Custom behavior beyond Ark defaults** | None — delegate all state to Ark |

### 0.3 Gap Report Template

When mandatory items are missing, output this before proceeding:

```
## Clarification needed before I start

### ❌ Blocking (cannot proceed without these)
- **Figma URL missing** — I need the Figma link to extract spacing, colors, sizing, and state
  styles. Without it I would have to guess values, which violates Backpack's token requirements.
  → Please share the Figma design URL.

- **Ark UI primitive unclear** — Which Ark UI primitive does this wrap?
  (checkbox / tabs / select / dialog / accordion / …)
  → Please confirm the primitive name.

### ⚠️ Assumptions I will proceed with (correct me if wrong)
- Component name: `BpkX` → slots will be `BpkX.Root`, `BpkX.Control`, etc.
- Slot components: [list inferred from requirements or Ark UI primitive]
- Design states: will extract default, hover, focus, active, disabled from Figma
- Indeterminate state: will include only if Figma shows it
```

### 0.4 When requirements ARE complete

When all mandatory items are present, output a brief confirmation and proceed:

```
## Starting BpkX implementation
- Figma: [URL]
- Ark primitive: checkbox
- Slots: Root, Control, Indicator, Label, Description
- States to extract from Figma: default, hover, focus, disabled, [indeterminate if shown]
```

---

## Phase 1: Pre-flight Checks

### 1.1 Verify Ark UI is installed and get current version

```bash
cat node_modules/@ark-ui/react/package.json | grep '"version"' | head -1
```

If not installed or outdated:
```bash
npm install @ark-ui/react@latest
```

Record the installed version — all API usage must match this version exactly.

### 1.2 Check for existing V1 or reference component

```bash
ls packages/ | grep -i [component-name]
```

If a V1 exists, read it to understand existing prop patterns before designing V2 API.

---

## Phase 2: Information Extraction (run Figma MCP + Ark UI MCP in parallel)

### 2.1 Figma MCP — Design Context

#### Known Limitations

**Figma MCP cannot identify icon geometry inside components.** If the component contains an icon (checkmark, chevron, close, etc.), `get_design_context` will return the surrounding frame but not the SVG path data of the icon. Do not attempt to reconstruct the icon from Figma output.

→ **Always check these sources first for icons:**
1. The existing V1 component in `packages/bpk-component-[name]/src/` — look for `background-image` SVG data URIs or inline SVG
2. `packages/bpk-mixins/_forms.scss` — contains shared mixins like `bpk-checkbox__checkmark` for standard form control icons
3. `packages/bpk-icons/` — for named Backpack icons

#### Troubleshooting: `get_design_context` fails with "nothing selected"

Call `get_metadata` first to discover valid node IDs, then pass the specific `nodeId` to `get_design_context`:
```
1. get_metadata(fileKey, pageNodeId)         → lists all child nodes with IDs
2. get_design_context(fileKey, specificNodeId) → succeeds with valid node
```

#### What to extract

Call `get_design_context` with the provided Figma URL. Extract:

**Required from every Figma extraction:**
- [ ] Container dimensions and spacing (padding, gap, min-height)
- [ ] Control box: size, border width, border-radius, border color per state
- [ ] Indicator (checkmark/icon): size, color, geometry
- [ ] Label typography: font-size, line-height, color per state
- [ ] Description typography (if slot exists): same as label
- [ ] Color per state:
  - default (unchecked)
  - checked
  - hover (unchecked + checked)
  - focus (keyboard only)
  - disabled (unchecked + checked)
  - indeterminate (if shown)
- [ ] Focus ring: offset, width, color

**Flag and record if not visible in Figma:**
- Indeterminate state
- Error/invalid state
- Loading state

### 2.2 Map Figma values → Backpack tokens

For EVERY color/spacing value extracted from Figma:

1. Convert hex → RGB if needed:
   ```js
   // #054184 → rgb(5, 65, 132)
   parseInt('05', 16), parseInt('41', 16), parseInt('84', 16)
   ```

2. Search backpack-foundations for the token:
   ```bash
   curl -s https://raw.githubusercontent.com/Skyscanner/backpack-foundations/main/packages/bpk-foundations-web/tokens/base.common.js \
     | grep "rgb(R, G, B)"
   ```

3. Record the mapping:
   ```
   Figma "border/default" #CBD5E1 → rgb(203, 213, 225) → tokens.$bpk-line-day
   Figma "fill/checked"   #0062E3 → rgb(0, 98, 227)   → tokens.$bpk-core-primary-day
   ```

4. If no token match: flag it, ask design team, do NOT use raw hex.

### 2.3 Ark UI MCP — Primitive API

Call `mcp__ark-ui__get_component_props` for the target primitive (react framework).
Also call `mcp__ark-ui__list_examples` + `mcp__ark-ui__get_example` for the "basic" example.

Record from the result:
- Which sub-parts does the primitive expose? (these become slot candidates)
- What props does Root accept? Which are state-owning vs pass-through?
- What are the callback signatures? (pay attention to the exact shape of the detail object)
- What data attributes does Ark set for state? (`data-state`, `data-disabled`, `data-focus-visible`, etc.) — these drive all SCSS state styling
- Does Root support `ref` forwarding?
- Are there any parts documented as "internal use only" or not cleanly exported?

---

## Phase 3: API Design

### 3.1 Slot Decision Rules

For each Ark primitive part discovered in Phase 2.3, decide:

1. **Expose as slot?** — Yes if the consumer needs to place it in the layout or put children inside it. No if it's purely internal (e.g. hidden accessibility node with no visual role).
2. **Backed by Ark or plain element?** — Prefer the Ark part for semantic correctness. Use a plain element only when Ark has no equivalent and the design requires it (e.g. a description/subtitle that Ark doesn't model).
3. **Required or optional?** — Required if omitting it breaks accessibility or layout. Optional if it adds capability but the component is valid without it.

Document the decision for each slot before writing code:
```
Root       → Ark.Root     — required — owns state, provides layout container
[Part]     → Ark.[Part]   — required / optional — [reason]
[Part]     → plain <div>  — optional — Ark has no equivalent, design requires it
```

### 3.2 TypeScript Interface Rules

For each slot's props interface, apply these rules derived from requirements and Ark API:

- **Root**: expose only props that own state or configure behaviour (controlled/uncontrolled value, callbacks, disabled, required, form fields). No `className`, no `style` (Constitution XI).
- **Leaf slots** (Control, Indicator, Label, etc.): in most cases `children: React.ReactNode` is sufficient. Only add extra props if the Ark part or the design explicitly requires them.
- **Callback signatures**: match the shape the consumer expects, not necessarily the shape Ark emits. Adapt inside the implementation (e.g. unwrap a `details` object if the public API should receive a plain value).
- **Never spread `ComponentPropsWithoutRef<'div'>` or similar** unless the slot is explicitly a thin native-element wrapper.

### 3.3 Namespace Export Pattern

All slots are assembled into a namespace object and exported as default:

```typescript
const BpkX = {
  Root: BpkXRoot,
  [SlotName]: Bpk[Name][SlotName],
  // … one entry per slot
};

export default BpkX;
```

The individual slot components are not exported separately unless there is an explicit requirement to do so.

---

## Phase 4: File Structure

```
packages/bpk-component-[name]/
├── README.md
├── index.ts
└── src/
    ├── Bpk[Name].tsx              # Namespace export (BpkX = { Root, Control, … })
    ├── Bpk[Name]Root.tsx          # Root slot
    ├── Bpk[Name]Control.tsx       # Control slot
    ├── Bpk[Name]Indicator.tsx     # Indicator slot
    ├── Bpk[Name]Label.tsx         # Label slot
    ├── Bpk[Name]Description.tsx   # Description slot
    ├── Bpk[Name].module.scss      # All styles (BEM)
    ├── Bpk[Name]-test.tsx         # Unit + interaction tests
    └── accessibility-test.tsx     # jest-axe tests

examples/bpk-component-[name]/
├── examples.tsx                   # All composition patterns
└── stories.tsx                    # Storybook stories
```

---

## Phase 5: Implementation

### 5.1 License Header (NON-NEGOTIABLE, every file)

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

### 5.2 Root Slot — Implementation Rules

The Root slot is the state owner. When implementing it:

- Import the Ark primitive from its scoped path (`@ark-ui/react/[primitive]`), not the barrel export
- Apply `cssModules(STYLES)` and `getDataComponentAttribute('[Name]')` to the Ark Root element — these are non-negotiable Backpack requirements
- Adapt Ark callback signatures to match the public prop interface defined in Phase 3 (e.g. unwrap `details.value` if the public prop expects a plain value)
- Pass only the props that belong to Ark Root — do not forward unrelated props

For every other slot, wrap the corresponding Ark part (or plain element if no Ark equivalent) and apply the appropriate `cssModules` class. Keep slot implementations minimal — they are thin wrappers, not logic containers.

### 5.3 SCSS — Rules and State Styling

Import conventions (always, in this order):
```scss
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/utils';        // only if bpk-hover or touch utilities are used
@use '../../bpk-mixins/typography';   // only if text elements are styled
@use '../../bpk-mixins/forms';        // only if reusing form control mixins (checkmark, etc.)
```

Remove any `@use` import that goes unused — the linter will error.

**Before writing any CSS property, check `bpk-mixins/` first.** Common traps:
- `:hover` → must use `@include utils.bpk-hover { }` — never raw `:hover` (gates hover on touch devices)
- `transition` → check if a duration token exists before writing a raw value
- Touch target expansion (`::before`) → check if `utils.bpk-touch-tappable` applies

#### Icon Rendering Rule: Prefer Mixins Over Inline SVG

**Do NOT write custom inline SVG components for icons that already exist in `bpk-mixins`.**

For form control icons specifically:
- **Checkmark** → `@include forms.bpk-checkbox__checkmark;` applied to the control element on `[data-state='checked']`
- **Indeterminate dash** → CSS `::before` pseudo-element on the control element (same approach as V1):
  ```scss
  &[data-state='indeterminate']::before {
    position: absolute;
    top: tokens.bpk-spacing-sm() + tokens.$bpk-one-pixel-rem;
    left: tokens.bpk-spacing-sm() * 0.5;
    content: '';
    width: tokens.bpk-spacing-xxl() * 0.25;
    height: tokens.bpk-spacing-sm() - tokens.$bpk-one-pixel-rem;
    border-radius: tokens.$bpk-border-size-lg;
    background-color: tokens.$bpk-surface-default-day;
  }
  ```

When icon rendering is done entirely via CSS on the Control element, the Indicator slot component can simply return `null` — no children needed.

**Consequence for `display` + `[hidden]`:** If you DO render children inside an Ark `Checkbox.Indicator` (or similar) that has CSS `display: flex`, you must add `&[hidden] { display: none; }` to override the browser UA stylesheet — `display: flex` wins over `[hidden]`'s implicit `display: none`. With CSS-only rendering this issue does not arise.

**State styling via Ark data attributes** (recorded in Phase 2.3):
- Use the data attributes Ark sets (`data-state`, `data-disabled`, `data-focus-visible`, etc.) as CSS selectors
- Prefer scoping from an ancestor: `[data-disabled] &` rather than `&[data-disabled]` when the attribute sits on Root but the style applies to a child element
- Focus ring must use `:focus-visible`, never `:focus`

**Token rules:**
- Every value that came from Figma must map to a Backpack token (from the mapping built in Phase 2.2)
- All sizes in `rem`, never `px`
- No `$bpk-private-*` tokens from other components

### 5.4 Storybook Stories — Coverage Rules

Stories are not for showcasing isolated props. For a slot-based component, stories demonstrate **compositions** — how slots are combined to achieve real use cases.

Required coverage:
1. **One story per usage pattern** explicitly listed in requirements (simple label, title+subtitle, inline link, custom layout, etc.)
2. **One story per relevant state** visible in Figma (default, disabled, checked/selected, indeterminate if designed)
3. **`VisualTest` export** pointing at the most representative story (used for Percy visual regression)

Story naming: use the pattern from the requirements as the story name (e.g. `TitleAndSubtitle`, `InlineLinkInLabel`). Do not create generic `Playground` or `Default` stories as the only entries.

---

## Phase 5.5: Visual Verification with Playwright MCP

After implementing SCSS, use Playwright MCP to compare against Figma before running the full test suite.

### Setup (do this once before any screenshot)

```
browser_resize(800, 600)    ← default viewport is too narrow; screenshots will be cropped
```

### Navigate to Storybook

Use the iframe URL directly (skips the Storybook chrome, loads faster):
```
http://localhost:9001/iframe.html?id=bpk-component-[name]--visual-test&viewMode=story
```

Wait 2 seconds after navigation before taking a screenshot — Storybook bundles load asynchronously:
```
browser_wait_for(time=2)
browser_take_screenshot(fullPage=true)
```

The `VisualTest` story is the best target because it renders all states at once.

### Comparing against Figma

1. Take the Storybook screenshot
2. Call `get_design_context` or `get_screenshot` for the Figma node showing all states
3. Compare side-by-side: check control size, border weight, gap between control and label, checkmark shape, text color per state
4. Fix any SCSS discrepancies, then re-screenshot to confirm

### Token value verification

Never trust AGENTS.md documentation for token values — it has been found to be incorrect. Always verify directly:
```bash
grep "bpk-spacing-md\|bpk-spacing-sm\|bpk-one-pixel-rem" \
  node_modules/@skyscanner/bpk-foundations-web/tokens/base.default.scss
```

Key confirmed values (as of 2026-03):
- `bpk-spacing-sm()` = 0.25rem = **4px**
- `bpk-spacing-md()` = 0.5rem = **8px**
- `bpk-spacing-base()` = 1rem = 16px
- `bpk-spacing-lg()` = 1.5rem = 24px
- `bpk-spacing-xxl()` = 2.5rem = 40px
- `$bpk-one-pixel-rem` = 0.0625rem → use `$bpk-one-pixel-rem * N` for pixel-exact sizes (e.g. `* 20` = 20px)

---

## Phase 6: Verification

### 6.1 Full Test Suite (acceptance gate)

```bash
npm run lint && npm run check-react-versions && npm run check-bpk-dependencies && npm run jest
```

All must pass with 0 errors. Component coverage must be 100%.

### 6.2 Individual Debug Commands

```bash
# TypeScript
npm run typecheck

# SCSS lint
npm run lint:scss

# Component tests only
npm run jest -- packages/bpk-component-[name]

# Update snapshots (new component, first run only)
npm run jest -- packages/bpk-component-[name] -u
```

### 6.3 Accessibility Verification

`accessibility-test.tsx` must test **each composition pattern** from the requirements using `jest-axe`, not just one default render. For a slot-based component this means: at minimum one test per distinct slot combination that appears in the requirements or Storybook.

Additionally test each relevant state (disabled, selected/checked, indeterminate if applicable).

Manual verification in Storybook — check these regardless of component type:
- [ ] Keyboard-only navigation works (Tab to focus, activation key triggers state change)
- [ ] Focus ring appears on keyboard focus, not on mouse click
- [ ] Clicking the label toggles the control
- [ ] If the label contains interactive elements (links, buttons), those remain independently clickable and do not accidentally trigger the control
- [ ] Disabled state: not focusable, not interactive, correctly announced by screen reader
- [ ] Screen reader announces the state change on interaction
- [ ] No console errors

---

## Common Issues & Solutions

### Ark UI `onCheckedChange` type mismatch

**Symptom:** `checked` from Ark's callback is `boolean | 'indeterminate'`, but prop expects `boolean`

**Solution:**
```typescript
onCheckedChange={(details) => onCheckedChange?.(details.checked as boolean)}
// Or if supporting indeterminate:
onCheckedChange={(details) => onCheckedChange?.(details.checked)}
```

### Figma color has no matching token

**Symptom:** Cannot find `rgb(X, Y, Z)` in backpack-foundations

**Solution:**
1. Double-check the hex → rgb conversion
2. Ask design team if the color is correct and intentional
3. If intentional and new: request a token in backpack-foundations, document the gap
4. Never commit raw hex values

### State styles not applying

**Symptom:** Checked/disabled styles not visible

**Solution:** Ark UI sets `data-state` and `data-disabled` on the Root. Use CSS attribute selectors from child elements:
```scss
// Inside .bpk-[name]__control:
[data-disabled] & { … }
[data-state='checked'] & { … }
```

### Figma MCP `get_design_context` returns "nothing selected" error

**Symptom:** `get_design_context` fails even with a valid Figma URL

**Solution:**
1. Call `get_metadata(fileKey, pageNodeId)` first (use `0:1` as the page node to list all top-level frames)
2. Find the specific component node ID in the result
3. Call `get_design_context(fileKey, specificNodeId)` — it will succeed

### `display: flex` on Ark Indicator overrides `[hidden]` — icon visible when unchecked

**Symptom:** Checkmark or indeterminate icon shows even in unchecked state

**Root cause:** Ark UI adds `hidden=""` attribute to hide the indicator. The browser UA stylesheet sets `[hidden] { display: none }` but a CSS class rule `display: flex` has higher specificity and overrides it.

**Solution A (preferred):** Use CSS-only rendering on the Control element (no React indicator children) — this issue never arises.

**Solution B (if children in Indicator are required):**
```scss
.bpk-[name]__indicator {
  display: flex;
  &[hidden] { display: none; }
}
```

### ESLint `@skyscanner/rules/forbid-component-props` — className on Ark UI parts

**Symptom:** ESLint error on `className` prop passed to Ark UI sub-parts (e.g. `[Primitive].Root`, `[Primitive].Control`)

**Solution:** Add each Ark part name used in the component to the `allowedFor` list in `.eslintrc`. The pattern is `"[Primitive].[Part]"` — one entry per sub-component that receives a `className` prop. See existing Slider entries in `.eslintrc` as a reference.

### `import/order` error — two imports from the same Ark module

**Symptom:** Separate `import { PrimitiveName }` and `import type { SomeType }` lines from the same `@ark-ui/react/[primitive]` path

**Solution:** Merge into one line:
```typescript
import { PrimitiveName, type SomeType } from '@ark-ui/react/[primitive]';
```

### Stylelint prettier mangles SCSS function call with inline comment

**Symptom:** `margin-top: tokens.bpk-spacing-sm(); // comment` gets rewritten as `margin-top: tokens.bpk-spacing-sm(\n\n);`

**Solution:** Move the comment to a separate line above the property:
```scss
// comment
margin-top: tokens.bpk-spacing-sm();
```

### Link click inside label also toggles checkbox

**Symptom:** Clicking `<a>` inside `BpkX.Label` toggles the checkbox

**Solution:** This is correct default behavior. If design requires that links NOT toggle, add:
```typescript
// In Label click handler
onClick={(e) => { if ((e.target as HTMLElement).tagName === 'A') e.preventDefault(); }
```
But check design intent first — usually toggling on link click is not desired.

---

## References

- [Ark UI Checkbox docs](https://ark-ui.com/docs/components/checkbox)
- [Backpack Constitution](/.specify/memory/constitution.md)
- [Modern Sass API Decision](/decisions/modern-sass-api.md)
- [Accessibility Tests Decision](/decisions/accessibility-tests.md)
- [backpack-external-component-migration skill](../backpack-external-component-migration/SKILL.md) — for shared Backpack conventions
