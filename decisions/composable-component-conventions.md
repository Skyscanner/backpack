# Composable component conventions

## TL;DR

Exported sub-component API uses short names (`BpkBlurb.Header`); internal files use the full name (`BpkBlurbHeader.tsx`). SCSS is shared for simple components, split for complex ones.

## Decision

### Sub-component naming

**Exported API (public):** use the short form.

```
BpkBlurb.Header
BpkCheckboxV2.Root
```

**Internal component names and filenames:** use the full descriptive form.

```
BpkBlurbHeader.tsx
BpkCheckboxV2Root.tsx
```

Because internal names are already fully qualified, an explicit `displayName` is not required. If one is needed (e.g. when using `forwardRef` or HOCs, which produce anonymous components), use the short API form:

```ts
const BpkBlurbHeader = forwardRef<HTMLDivElement, BpkBlurbHeaderProps>((props, ref) => ...);
BpkBlurbHeader.displayName = 'BpkBlurb.Header';
```

### SCSS structure

**Simple components** → single shared SCSS file:

```
BpkBlurb.module.scss   ← styles for all sub-components
```

**Complex components** → split per sub-component:

```
BpkBlurbHeader.module.scss
BpkBlurbFooter.module.scss
```

Start with a single file and split only when the file becomes large, sub-components have very distinct styles, or splitting meaningfully improves maintainability.

### Folder structure

A flat structure is recommended by default inside the component package. When using a single shared SCSS file:

```
bpk-component-blurb/
  index.ts
  src/
    BpkBlurb.tsx
    BpkBlurbHeader.tsx
    BpkBlurbFooter.tsx
    BpkBlurb.module.scss
```

When SCSS is split per sub-component:

```
bpk-component-blurb/
  index.ts
  src/
    BpkBlurb.tsx
    BpkBlurbHeader.tsx
    BpkBlurbHeader.module.scss
    BpkBlurbFooter.tsx
    BpkBlurbFooter.module.scss
```

Avoid deep nesting unless the component's complexity requires it.

## Thinking

The short exported API (`BpkBlurb.Header`) aligns with Ark UI and modern composable patterns, and is consistent with newer Backpack components such as `BpkCheckboxV2`. Using the full name internally (`BpkBlurbHeader.tsx`) keeps files explicit and easy to search without ambiguity.

A single SCSS file is preferred for simple components to avoid over-engineering. Splitting is available when complexity warrants it.

## Anything else

This convention applies to new composable components going forward. Existing components should be aligned opportunistically when files are changed for other reasons.
