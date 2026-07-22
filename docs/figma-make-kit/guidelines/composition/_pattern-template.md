<!-- NOTE: COPY this file to composition/{pattern}.md for each page-level pattern
     (e.g. buy-box.md, dashboard.md). Spell out the component order and layout explicitly —
     Make assembles compositions literally from this. Model: a reference kit's composition/buy-box.md. -->

# <Pattern Name>

<!-- NOTE: One sentence on what this pattern is and where it appears. -->

The <Pattern Name> is <description>. It is a composition of existing components arranged in a specific layout.

## Structure

<!-- NOTE: Ordered list of the components, top-to-bottom (or by region). Be explicit about order. -->

Build a <Pattern Name> by arranging the following:

1. **`<ComponentA>`** — <role>
2. **`<ComponentB>`** — <role>
3. **`<ComponentC>`** — <role>

## Example

```tsx
import { <ComponentA>, <ComponentB>, <ComponentC> } from '<@scope/package-name>'

function <PatternName>() {
  return (
    <div className="<layout classes / spacing tokens>">
      <<ComponentA> />
      <<ComponentB> />
      <<ComponentC> />
    </div>
  )
}
```

## Layout guidelines

<!-- NOTE: Placement, max width, spacing, responsive behavior, which element is most prominent. -->

- <Placement, e.g. "Right of the gallery on desktop, below on mobile.">
- <Spacing, e.g. "Consistent 16px vertical spacing between sections.">
- <Hierarchy, e.g. "The primary CTA is always the most prominent element.">

## Rules

- Use the component order above; do not omit required chrome.
- <Add pattern-specific rules.>
