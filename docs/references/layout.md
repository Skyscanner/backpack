# Layout Reference

> **Load this doc when:** implementing layout, spacing between elements, responsive behaviour,
> or any structural composition using Backpack layout components. This covers component selection
> (`BpkStack` vs `BpkFlex` vs `BpkGrid`), responsive props, and spacing token names for layout props.

---

# Layout

All layout components from `@skyscanner/backpack-web/bpk-component-layout`. `BpkProvider` must wrap the app root.

## Component selection

| Need | Component | When to use |
|------|-----------|-------------|
| Vertical/horizontal arrangement with gap | `BpkStack` | 80% of layouts. Rows, columns, form groups. |
| Flex with wrap, grow, shrink | `BpkFlex` | Wrapping card grids, inline elements with flex control. |
| Two-dimensional grid | `BpkGrid` + `BpkGridItem` | Dashboard layouts, multi-column pages. |
| Low-level CSS property control | `BpkBox` | Last resort. One-off positioning overrides. |
| Render as a different element | `BpkVessel` | Semantic HTML needs (`<section>`, `<article>`, `<nav>`). |

Prefer `BpkStack` over `BpkFlex` when you just need items in a row or column with spacing.

## BpkStack

```tsx
import { BpkStack } from '@skyscanner/backpack-web/bpk-component-layout';

// Vertical stack
<BpkStack direction="column" gap="base">
  <Header />
  <Content />
  <Footer />
</BpkStack>

// Horizontal row
<BpkStack direction="row" gap="md" align="center">
  <Icon />
  <Label />
</BpkStack>

// Responsive direction
<BpkStack direction={{ base: 'column', md: 'row' }} gap="lg">
  <Sidebar />
  <Main />
</BpkStack>
```

**Semantic props:** `direction`, `align`, `justify`, `wrap`, `gap`.

## BpkFlex

```tsx
import { BpkFlex } from '@skyscanner/backpack-web/bpk-component-layout';

<BpkFlex direction="row" wrap="wrap" justify="space-between" gap="md">
  <Card />
  <Card />
  <Card />
</BpkFlex>

// Inline flex
<BpkFlex inline direction="row" align="center" gap="sm">
  <Icon />
  <Text />
</BpkFlex>
```

**Semantic props:** `direction`, `align`, `justify`, `wrap`, `grow`, `shrink`, `basis`, `inline`.

## BpkGrid + BpkGridItem

```tsx
import { BpkGrid, BpkGridItem } from '@skyscanner/backpack-web/bpk-component-layout';

// Three-column layout
<BpkGrid templateColumns="1fr 2fr 1fr" gap="lg">
  <BpkGridItem>Sidebar</BpkGridItem>
  <BpkGridItem>Main</BpkGridItem>
  <BpkGridItem>Aside</BpkGridItem>
</BpkGrid>

// Responsive grid
<BpkGrid
  templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }}
  gap="base"
>
  <BpkGridItem colSpan={{ base: 1, lg: 2 }}>Wide item</BpkGridItem>
  <BpkGridItem>Regular item</BpkGridItem>
</BpkGrid>
```

**BpkGrid props:** `templateColumns`, `templateRows`, `autoColumns`, `autoFlow`, `autoRows`, `align`, `justify`, `inline`.

**BpkGridItem props:** `area`, `colSpan`, `colStart`, `colEnd`, `rowSpan`, `rowStart`, `rowEnd`.

## BpkBox

Low-level primitive. Uses full CSS property names (`flexDirection`, `alignItems`, `gridTemplateColumns`).

```tsx
import { BpkBox } from '@skyscanner/backpack-web/bpk-component-layout';

<BpkBox padding="base" marginBottom="lg" display="flex" alignItems="center">
  <Content />
</BpkBox>
```

## Responsive values

All layout props accept `BpkResponsiveValue`:

```tsx
// Single value (all breakpoints)
<BpkStack gap="md" />

// Responsive object
<BpkStack gap={{ base: 'sm', md: 'base', lg: 'xl' }} />
```

Breakpoints: `base` (mobile-first default), `sm`, `md`, `lg`, `xl`.

## Spacing tokens for layout props

Spacing props (`margin*`, `padding*`, `gap`) accept these token names:

| Token | Value |
|-------|-------|
| `none` | 0 |
| `sm` | 0.25rem (4px) |
| `md` | 0.5rem (8px) |
| `base` | 1rem (16px) |
| `lg` | 1.5rem (24px) |
| `xl` | 2rem (32px) |
| `xxl` | 2.5rem (40px) |
| `xxxl` | 4rem (64px) |
| `xxxxl` | 6rem (96px) |

Use token names, not raw values.

## Shared prop groups

### Spacing (19 props)
`margin`, `marginTop`, `marginBottom`, `marginLeft`, `marginRight`, `marginStart`, `marginEnd`, `marginInline`, `padding`, `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`, `paddingStart`, `paddingEnd`, `paddingInline`, `gap`, `columnGap`, `rowGap`

### Sizing (6 props)
`width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`

### Positioning (4–5 props)
`top`, `bottom`, `left`, `right`, `order`

Use logical props (`marginStart`, `paddingEnd`) for RTL compatibility.
