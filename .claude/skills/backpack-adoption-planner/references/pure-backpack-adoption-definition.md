# Pure Backpack Adoption Definition

## Default definition

A component or section qualifies as **Pure Backpack** when it meets ALL of the following conditions.

---

## Required conditions

### 1. No raw HTML layout elements
All layout structure is handled by Backpack layout primitives (e.g. `BpkBox`, `BpkStack`, `BpkGrid`,
`BpkSectionLayout`). Unstyled semantic HTML elements such as `<main>`, `<section>`, and `<article>`
may be used for document structure, but raw `<div>` wrappers are considered layout wiring unless
there is a clearly non-layout reason for them.

### 2. No CSS overrides of Backpack component styles
No CSS rules that target internal Backpack class names (e.g. `.bpk-button`, `.bpk-card__header`).
No overrides via parent selectors, attribute selectors, or specificity tricks.

### 3. No `!important` declarations in component-adjacent styles
`!important` used to force layout or visual outcomes on Backpack components is non-pure.

### 4. No custom `className` that modifies Backpack defaults
Passing a `className` to a Backpack component solely to apply visual overrides is non-pure.
Additive `className` for spacing/layout in a wrapper context is borderline — see below.

### 5. No `style={{}}` on Backpack components
Inline style on a Backpack component to adjust its appearance or spacing is non-pure.

### 6. No arithmetic on Backpack token values
Computed values that perform arithmetic on Backpack tokens are non-pure —
e.g. `tokens.bpk-spacing-sm() * 1.5` or `calc(var(--bpk-spacing-base) + 4px)`.
Use layout primitive props (`gap`, `padding`) with standard Backpack spacing values instead.
Pure layout calculations that do not involve Backpack tokens (e.g. `calc(100% - 1px)`) are acceptable.

### 7. No use of deprecated or superseded Backpack components
Where a newer version of a component exists and is the recommended API (e.g. `BpkCardV2`
supersedes `BpkCard`), use of the older version is an adoption target even if no CSS override
is present. Classify as **Outdated**, not Non-pure, and record the migration target.

---

## Non-compliant patterns

The following are always non-pure or outdated:

| Pattern | Classification | Why |
|---|---|---|
| `.some-wrapper .bpk-button { color: red }` | Non-pure | Overrides internal Backpack styles |
| `<BpkCard className={styles.myOverride} />` where override changes visual | Non-pure | Bypasses component contract |
| `<div style={{ marginTop: '12px' }}>` wrapping a Backpack component | Non-pure | Manual spacing instead of layout primitive |
| `!important` in any stylesheet targeting Backpack components | Non-pure | Forces specificity override |
| Custom layout grid built with `display: grid` instead of `BpkGrid` | Non-pure | Non-primitive layout |
| Hardcoded `#1e1e1e` or `rgba(...)` colors where a token exists | Non-pure | Bypasses token system |
| `calc(tokens.bpk-spacing-base() - 2px)` | Non-pure | Arithmetic on token value |
| Wrapping a `BpkButton` in a `<div>` to adjust its size | Non-pure | Layout workaround |
| `<BpkCard>` where `BpkCardV2` is the recommended API | Outdated | Superseded component |

---

## Borderline / unclear cases

These require engineer review — do not auto-classify:

| Pattern | Status | Guidance |
|---|---|---|
| `className` added for spacing that doesn't override Backpack internals | May be acceptable | Check if a layout primitive prop covers the use case |
| Custom focus ring styles | May be acceptable | Check if it meets accessibility requirements without override |
| Wrapper `<div>` for semantic HTML (`<article>`, `<aside>`) | Acceptable if purely semantic | Must not influence Backpack component layout |
| `data-testid` on a Backpack component | Acceptable | Not a visual override |
| Local CSS variable declaration adjacent to Backpack use | Borderline | Only pure if the variable is not consumed by a Backpack component |
| Component written before relevant Backpack primitive existed | Review needed | May qualify for planned exemption with explicit justification |

---

## Finding classification reference

| Classification | Meaning | Next action |
|---|---|---|
| Non-pure | Not using Backpack primitives, or overriding them | Migrate to Backpack primitive |
| Outdated | Using Backpack but deprecated or superseded version | Migrate to latest version per component inventory map |
| Borderline | May or may not require migration — engineer decision needed | Discuss with engineer at Gate 2 |
| Unclear | Cannot be classified without more context | Flag for engineer review |
| Pure | Latest Backpack, no overrides | No action needed |

---

## Override handling

Engineers may provide project-specific adoption rules. When project rules exist:

1. **Read the project rules first.**
2. **Compare against this default definition.**
3. **If they conflict, call out the specific conflict explicitly** — do not silently apply one or the other.
4. **Ask the engineer which rule takes precedence** for the conflicting item before classifying.
5. Record the override and its justification in the planning output.

Example conflict format:
```
CONFLICT: Project rule allows className overrides for spacing adjustments.
Default definition classifies this as non-pure.
Engineer decision needed: apply project rule (borderline-pure) or default rule (non-pure)?
```

---

## Examples

### Pure — compliant

```tsx
// Layout via primitives, no overrides, latest component version
<BpkProvider>
  <BpkStack gap={BpkSpacing.Md}>
    <BpkText tagName="h2" textStyle={TEXT_STYLES.heading3}>Title</BpkText>
    <BpkButton onClick={handleClick}>Book</BpkButton>
  </BpkStack>
</BpkProvider>
```

```scss
// No Backpack class overrides, only layout for the section container
.hero-section {
  background-color: tokens.$bpk-canvas-day;
  padding: tokens.bpk-spacing-xl() 0;
}
```

---

### Non-pure — CSS override

```tsx
<BpkButton className={styles.customButton}>Book</BpkButton>
```

```scss
.customButton {
  border-radius: 0 !important; // Overrides Backpack button style
  padding: 8px 24px;           // Overrides internal spacing
}
```

---

### Non-pure — raw layout

```tsx
// Layout built with raw divs instead of Backpack primitives
<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
  <BpkText>Label</BpkText>
  <BpkButton>Action</BpkButton>
</div>
```

---

### Outdated — superseded component

```tsx
// BpkCard is superseded by BpkCardV2
// Classification: Outdated
// Migration target: BpkCardV2
<BpkCard>
  <BpkText>Content</BpkText>
</BpkCard>
```

---

### Borderline — semantic wrapper (review needed)

```tsx
// <article> is semantic HTML — acceptable if no layout influence
<article>
  <BpkCard>...</BpkCard>
</article>
```

Classify as pure only if `<article>` carries no styling that affects the `BpkCard` layout.
