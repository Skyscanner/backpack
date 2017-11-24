# Naming convention for theme attributes

## Decision
Theme attributes for components are named in the format `componentSubcomponentTypeStateProperty`. The default state is implicit, so can be omitted. Subcomponent and type aren't always necessary, only include if applicable.

### Examples
* `buttonPrimaryColor` (component - type - property)
* `buttonSecondaryHoverBackgroundColor` ( component - type - state - property)
* `barchartBarColor` ( component - subcomponent - property)

## Thinking

This is for consistency and predictability for consumers.
