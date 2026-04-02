# Typography Reference

> **Load this doc when:** using `BpkText`, setting text colours, choosing `textStyle` values,
> implementing any text, heading, or label in a component, or mapping a design spec to a
> text component. This is the authoritative reference for all text rendering in Backpack.

---

# Typography & text color

## BpkText

```tsx
import BpkText from '@skyscanner/backpack-web/bpk-component-text';

<BpkText textStyle="heading-3" tagName="h2">Section title</BpkText>
<BpkText textStyle="body-default" tagName="p">Paragraph text.</BpkText>
<BpkText textStyle="label-1" tagName="span">Label</BpkText>
<BpkText textStyle="footnote" tagName="span">Fine print</BpkText>
```

## Props

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `children` | `ReactNode` | required | Text content |
| `textStyle` | `TextStyle` | `body-default` | Visual size and weight |
| `tagName` | `Tag` | — | HTML element to render |
| `color` | `TextColor` | `null` (inherit) | Semantic text color |
| `className` | `string` | `null` | Additional CSS class (avoid) |
| `id` | `string` | — | HTML id attribute |

## textStyle values

### Body & labels
- `caption` — smallest text
- `footnote` — fine print, legal
- `label-3` — small label
- `label-2` — medium label
- `label-1` — large label
- `body-default` — standard body copy (default)
- `body-longform` — longer reading content
- `subheading` — section subheading

### Headings
- `heading-5` — smallest heading
- `heading-4`
- `heading-3`
- `heading-2`
- `heading-1` — largest heading

### Hero & editorial
- `hero-1` through `hero-6` — large display text
- `editorial-1` through `editorial-3` — editorial/magazine style

### Legacy (avoid in new code)
- `xs`, `sm`, `base`, `lg`, `xl`, `xxl`, `xxxl`, `xxxxl`, `xxxxxl`

## tagName values

`p`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `span`, `text`

**Rule**: Always set `tagName` to match the semantic meaning. Use `textStyle` for visual size and `tagName` for document structure. A visually small heading can still be `<h2>`.

## Setting text color

Use the `color` prop to apply semantic text colors. Never use inline styles or custom CSS classes for text color.

```tsx
<BpkText textStyle="body-default" tagName="p" color="textPrimary">Default body text</BpkText>
<BpkText textStyle="body-default" tagName="p" color="textSecondary">Muted/secondary text</BpkText>
<BpkText textStyle="label-1" tagName="span" color="textHero">Brand blue text</BpkText>
<BpkText textStyle="label-1" tagName="span" color="textLink">Link-colored text</BpkText>
<BpkText textStyle="body-default" tagName="p" color="textError">Error message text</BpkText>
<BpkText textStyle="body-default" tagName="p" color="textSuccess">Success message text</BpkText>
<BpkText textStyle="heading-3" tagName="h2" color="textOnDark">Heading on dark surface</BpkText>
<BpkText textStyle="body-default" tagName="p" color="textOnLight">Text on light surface</BpkText>
<BpkText textStyle="body-default" tagName="p" color="textPrimaryInverse">Inverse text (white on dark)</BpkText>
<BpkText textStyle="body-default" tagName="p" color="textDisabled">Disabled state text</BpkText>
<BpkText textStyle="body-default" tagName="p" color="textDisabledOnDark">Disabled text on dark</BpkText>
```

### color prop values (type `TextColor`)

| Value | Use for | Day mode color |
|-------|---------|----------------|
| `textPrimary` | Default body text | rgb(22, 22, 22) |
| `textSecondary` | Muted/supplementary text | rgb(98, 105, 113) |
| `textHero` | Brand-blue emphasis | rgb(0, 98, 227) |
| `textLink` | Link-styled text | blue (matches `BpkLink`) |
| `textError` | Error/validation messages | rgb(231, 8, 102) |
| `textSuccess` | Success messages | rgb(12, 131, 138) |
| `textOnDark` | Text on dark backgrounds (`surfaceContrastDay`, `surfaceHeroDay`) | rgb(255, 255, 255) |
| `textOnLight` | Text on light backgrounds | rgb(22, 22, 22) |
| `textPrimaryInverse` | Inverse of primary (white) | rgb(255, 255, 255) |
| `textDisabled` | Disabled UI elements | rgba(0, 0, 0, 0.2) |
| `textDisabledOnDark` | Disabled elements on dark backgrounds | rgba(255, 255, 255, 0.5) |

### Color rules

- Default is `null` (inherits from parent). Set `color` explicitly when you need a specific semantic color.
- Always pair the color with its intended surface:
  - `textPrimary` / `textSecondary` on `canvasDay` or `surfaceDefaultDay`
  - `textOnDark` / `textPrimaryInverse` on `surfaceContrastDay` or `surfaceHeroDay`
  - `textOnLight` on light surfaces
- Use `textSecondary` for supplementary content only, never for primary content — it has reduced contrast.
- Use `textError` alongside `BpkFormValidation` for form errors, or with an error icon for inline messages.
- The `color` prop handles light/dark mode switching automatically. Never use raw CSS color values.

## Common patterns

### Page heading with subtitle
```tsx
<BpkStack gap="sm">
  <BpkText textStyle="heading-1" tagName="h1">Flights to London</BpkText>
  <BpkText textStyle="body-default" tagName="p" color="textSecondary">
    Find the best deals from your city
  </BpkText>
</BpkStack>
```

### Label with value
```tsx
<BpkStack gap="sm">
  <BpkText textStyle="label-2" tagName="span" color="textSecondary">Departure</BpkText>
  <BpkText textStyle="heading-4" tagName="span">15 March 2026</BpkText>
</BpkStack>
```

### Text on dark hero surface
```tsx
<BpkBox padding="xl" backgroundColor="surfaceHeroDay">
  <BpkText textStyle="hero-3" tagName="h1" color="textOnDark">
    Explore the world
  </BpkText>
</BpkBox>
```
