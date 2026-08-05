<!-- NOTE: COPY this file to components/{name}.md for each component (e.g. button.md, text-input.md). Fill every section.
     Cover: when to use, purpose, props, variants, examples (correct + incorrect), do/don't.
     Start with your 10–20 most-used components. Model: a native React DS kit's per-component files. -->

# <ComponentName>

`<ExportName>` — <one-line description>.

## When to use

<!-- NOTE: When to reach for this component, and which components it's commonly used with/within. -->

Use `<ComponentName>` for <use case>. Always use the component from `<@scope/package-name>`, never a raw `<html-element>`.

## Variants

<!-- NOTE: List variants with guidance on frequency/when to use each. Delete if no variants. -->

| Variant       | Use for       |
| ------------- | ------------- |
| `<variant-a>` | <When to use> |
| `<variant-b>` | <When to use> |

IMPORTANT: Valid variants are `<list>` — nothing else. Do NOT invent variant names.

## Props

| Prop        | Type      | Default     | Description            |
| ----------- | --------- | ----------- | ---------------------- |
| `<prop>`    | `<type>`  | `<default>` | <description>          |
| `className` | `string`  | —           | Additional CSS classes |
| `disabled`  | `boolean` | `false`     | Disable the component  |

## Examples

```tsx
import { <ExportName> } from '<@scope/package-name>'

{/* CORRECT — common usage */}
<<ExportName> variant="<variant-a>">Label</<ExportName>>
```

```tsx
{
  /* WRONG — <explain the anti-pattern, e.g. raw HTML or invalid variant> */
}
<button className="...">Label</button>;
```

## Rules

<!-- NOTE: Imperative do/don't specific to this component. -->

- <Rule 1, e.g. "Only one primary button per visible section.">
- <Rule 2, e.g. "Use iconStart/iconEnd for icons — not children.">
- Do not style this component with typography or font utility classes — it manages its own type.
