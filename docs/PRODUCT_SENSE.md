# Product Sense

## Who Backpack Serves

**Primary consumers**: Skyscanner product engineering teams building web experiences.

**Secondary consumers**: Designers using Figma components that map 1:1 to code.

## Problems Backpack Solves

1. **Consistency**: Users experience the same UI patterns across flights, hotels, car hire — regardless of which team built it
2. **Speed**: Teams ship faster by composing pre-built, tested components instead of building from scratch
3. **Accessibility**: Product teams get WCAG 2.2 AA compliance out of the box
4. **Quality**: Shared components are tested more thoroughly than any single team could afford
5. **Design-Dev Alignment**: Figma Code Connect ensures what designers spec is what developers ship

## Adoption Principles

### Make the Right Thing Easy
- Sensible defaults: components work well with minimal props
- Good TypeScript types: autocompletion guides consumers to correct usage
- Clear error messages when props are misused

### Make the Wrong Thing Hard
- Restricted `className`/`style` to prevent visual divergence
- Opinionated component APIs that guide towards accessible patterns
- Limited customization forces conversations about whether a variant should exist

### Migration Must Be Painless
- 3-month deprecation windows
- Codemods where possible
- Clear migration guides in component `docs/` directories
- Quarterly major release cadence so teams can plan upgrades

## Thinking About New Components

When evaluating whether to add a component to Backpack:

1. **Is it used across 2+ products?** One-off patterns don't belong in the design system
2. **Is the design stable?** Don't codify something still being explored
3. **Does it have accessibility implications?** If yes, centralizing it in Backpack ensures consistent a11y
4. **Can it be composed from existing components?** Prefer composition over new primitives
5. **Is there a Figma design?** Components need design approval before implementation

## Measuring Success

- **Adoption rate**: % of Skyscanner pages using Backpack components
- **Component coverage**: % of UI patterns covered by Backpack
- **Upgrade velocity**: Time for teams to adopt new major versions
- **Bug density**: Defects per component (should decrease over time)
- **Accessibility score**: Automated a11y test pass rate
