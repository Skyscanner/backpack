---
name: bpk-token-migrate
description: Re-implement a Backpack component's styles using Figma as the source of truth. Figma defines what each variant/state looks like and which design variables are used — the SCSS must match that exactly. Use this skill whenever the user mentions migrating a Backpack component to new VDL tokens, or types "/bpk-token-migrate <component> <figma-url>". This is NOT a mechanical variable rename — it is a Figma-driven style rewrite.
---

# bpk-token-migrate

Re-implement a Backpack component's styles by reading the Figma design and writing SCSS that implements exactly what Figma specifies, using the new CSS custom properties from the token-sync pipeline.

**Figma is the source of truth.** The current SCSS may be incomplete, semantically wrong, or missing states that now exist in the design. Don't map old code to new names — read the design and implement it.

## Input

Arguments: `<component-name> <figma-url>`

---

## Step 1 — Read the Figma design

Call `mcp__figma-remote-mcp__get_variable_defs` with the `fileKey` and `nodeId` from the URL. This returns all Figma variables used by the component node in `{ "Figma/Path/name": value }` format — these are the source of truth.

Also call `mcp__figma-remote-mcp__get_design_context` to get the screenshot and understand the visual structure (variants, states).

Build the design spec **internally as reasoning** (do not output a long table). For each Figma variable, determine:
- Which CSS property it maps to (background, color, border, border-radius, etc.)
- Which variant/state uses it
- The resulting CSS custom property name (computed in Step 2)

If a property has no Figma variable (hardcoded), note that for use in Step 4.

---

## Step 2 — Convert Figma variable paths to CSS custom property names

Apply the **kebabBpkName** rule (from `token-sync/src/style-dictionary-config.ts`):

```
Component/Chip/Colour/bg-default-on
  → split: ["Component", "Chip", "Colour", "bg-default-on"]
  → "Component" → "private": ["private", "Chip", "Colour", "bg-default-on"]
  → prepend "bpk": ["bpk", "private", "Chip", "Colour", "bg-default-on"]
  → kebab-case each, join: bpk-private-chip-colour-bg-default-on
  → prefix --:  --bpk-private-chip-colour-bg-default-on
```

See `references/naming-rules.md` for full rules and edge cases.

Verify every computed name exists in:
- `token-sync/css/theme-backpack-light.css`
- `token-sync/css/theme-backpack-dark.css`
- `token-sync/css/primitives.css`

Flag any name that doesn't exist — don't invent variables.

---

## Step 3 — Read the current SCSS mixin

File: `packages/backpack-web/src/bpk-mixins/_{component}.scss`

Understand the current structure (selectors, pseudo-classes, nested modifiers) — you'll reuse the selector architecture. Note what the current code does differently from the Figma design.

---

## Step 4 — Rewrite the SCSS

Write the mixin from scratch based on what Figma says, not from what the old code says.

**Core principle:** For each (variant, state, property) tuple in the Figma design spec, emit exactly the CSS that implements it using `var(--bpk-private-…)`.

**Patterns to use:**

```scss
// Color property → direct var()
background-color: var(--bpk-private-chip-colour-bg-default-on);
color: var(--bpk-private-chip-colour-text-on);

// Border (Backpack uses inset box-shadow for borders):
box-shadow: 0 0 0 tokens.$bpk-border-size-sm var(--bpk-private-chip-colour-border-default-off) inset;

// Dimension (radius, height, padding):
border-radius: var(--bpk-private-chip-dimension-radius);
height: var(--bpk-private-chip-dimension-min-height-width);

// Generic primitive (spacing, not chip-specific):
padding: 0 var(--bpk-spacing-base);

// No Figma variable (hardcoded in design):
cursor: pointer;
display: inline-flex;
```

**What NOT to do:**
- Don't use `bpk-themeable-property` — that was the old public theming API. The new tokens are private and should be referenced directly.
- Don't keep old `--bpk-chip-*` variable names anywhere.
- Don't keep old SCSS token variables (`tokens.$bpk-core-primary-day`, etc.) for anything that has a Figma-synced equivalent.
- Don't add fallback values to `var()` unless the Figma design explicitly has no token and you're using a hardcoded value.

**Preserve what Figma doesn't specify:**
- Layout properties (display, align-items, flex, etc.) if not in the Figma spec — keep from current SCSS.
- Cursor styles, user-select, etc. — keep from current code.
- SCSS structure (BEM selectors, hover/focus/active pseudo-classes, RTL margin helpers) — keep the selector architecture, just update the property values.

---

## Step 5 — Write the file and verify

Write the updated mixin SCSS file directly — no confirmation step needed.

Then run:
```bash
npm run lint
npm run jest -- --testPathPattern=<component>
```

Fix any lint errors before reporting done.

---

## Notes

- **Dark mode is automatic**: `theme-backpack-dark.css` overrides the same CSS vars at `[data-theme="dark"]`. Once you reference `var(--bpk-private-chip-*)`, dark mode works without any extra SCSS.
- **Missing states in Figma**: If the design doesn't specify a state (e.g. no "bg-default-off"), that state has no fill — use `transparent` or omit the property.
- **Figma variables on non-colour properties**: Dimension variables (radius, padding, min-height) come from `Component/Chip/Dimension/*` → `--bpk-private-chip-dimension-*`.
- **Component name pluralisation in file paths**: chip → `_chips.scss`, badge → `_badges.scss` or `_badges-v2.scss`, button → `_buttons.scss`.
