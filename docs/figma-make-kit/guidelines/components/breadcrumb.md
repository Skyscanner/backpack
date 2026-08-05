# BpkBreadcrumb

`BpkBreadcrumb` — shows the page hierarchy/path as a `nav` + list of links, with optional schema.org structured-data output.

## When to use

Use `BpkBreadcrumb` for hierarchical wayfinding on deep pages (e.g. Home > Hotels > Amsterdam).

## Variants

No type/variant enum — purely structural.

## Props

**`BpkBreadcrumb`**: `label` (string, required — `aria-label` on the `<nav>`), `children` (required, `BpkBreadcrumbItem`s), `schemaMetaData` (optional `{url, label}[]` — renders a JSON-LD BreadcrumbList).

**`BpkBreadcrumbItem`**:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | required | Item label |
| `active` | `boolean` | `false` | Marks the current page — renders as plain text with `aria-current="page"`, ignores `href` |
| `href` | `string` | `'#'` | Link target (non-active items only) |

## Examples

```tsx
import BpkBreadcrumb, { BpkBreadcrumbItem } from '@skyscanner/backpack-web/bpk-component-breadcrumb';

{/* CORRECT — exactly one active item, at the end */}
<BpkBreadcrumb label="Breadcrumb">
  <BpkBreadcrumbItem href="/">Home</BpkBreadcrumbItem>
  <BpkBreadcrumbItem href="/hotels">Hotels</BpkBreadcrumbItem>
  <BpkBreadcrumbItem active>Amsterdam</BpkBreadcrumbItem>
</BpkBreadcrumb>
```

```tsx
{/* WRONG — giving href to the active item; it's ignored, active items always render as text */}
<BpkBreadcrumbItem href="/amsterdam" active>Amsterdam</BpkBreadcrumbItem>
```

## Rules

- Exactly one item should be `active`, typically the last.
- Don't add your own separator between items — non-active items render a trailing arrow separator automatically (RTL-aware).
