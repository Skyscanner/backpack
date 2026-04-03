# Pure Backpack Adoption Definition

## Default definition

A component or section qualifies as **Pure Backpack** when it meets ALL of the following conditions.

---

## Required conditions

### 1. No raw HTML layout elements
All layout structure is handled by Backpack layout primitives (e.g. `BpkBox`, `BpkStack`, `BpkGrid`,
`BpkSectionLayout`). Raw `<div>`, `<section>`, `<main>` used only for semantic HTML purposes, not
for layout wiring.

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

### 6. No manual token arithmetic
Computed values like `tokens.bpk-spacing-sm() * 1.5` or `calc(var(--bpk-spacing-base) + 4px)`
are non-pure. Use layout primitive props (`gap`, `padding`) with standard Backpack spacing values.

### 7. No Backpack version pinning or forked component imports
Importing from a local fork or a pinned pre-release Backpack version to work around missing
functionality is non-pure.

---

## Non-compliant patterns

The following are always non-pure:

| Pattern | Why |
|---|---|
| `.some-wrapper .bpk-button { color: red }` | Overrides internal Backpack styles |
| `<BpkCard className={styles.myOverride} />` where override changes visual | Bypasses component contract |
| `<div style={{ marginTop: '12px' }}>` wrapping a Backpack component | Manual token arithmetic equivalent |
| `!important` in any stylesheet targeting Backpack components | Forces specificity override |
| Custom layout grid built with `display: grid` instead of `BpkGrid` | Non-primitive layout |
| Hardcoded `#1e1e1e` or `rgba(...)` colors where a token exists | Bypasses token system |
| `calc(tokens.bpk-spacing-base() - 2px)` | Token arithmetic |
| Wrapping a `BpkButton` in a `<div>` to adjust its size | Layout workaround |

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
// Layout via primitives, no overrides
<BpkSectionLayout>
  <BpkStack gap={BpkSpacing.Md}>
    <BpkText tagName="h2" textStyle={TEXT_STYLES.heading3}>Title</BpkText>
    <BpkButton onClick={handleClick}>Book</BpkButton>
  </BpkStack>
</BpkSectionLayout>
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

### Borderline — semantic wrapper (review needed)

```tsx
// <article> is semantic HTML — acceptable if no layout influence
<article>
  <BpkCard>...</BpkCard>
</article>
```

Classify as pure only if `<article>` carries no styling that affects the `BpkCard` layout.
