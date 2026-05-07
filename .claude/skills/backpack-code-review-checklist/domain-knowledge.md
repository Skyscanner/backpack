# Domain Knowledge Reference

Reference material for edge cases. Agent prompts include the key rules inline;
consult this file for additional detail.

## API Design: New vs Existing Components

**New components (after Constitution ratification):**
- MUST NOT accept `className` or `style` props
- Correct: `Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className' | 'style'>`

**Existing components (grandfathered):**
- MAY keep `className`/`style` for backward compatibility
- Discourage use in documentation

## Token Hierarchy

**Token Reference**: [backpack-foundations/base.common.js](https://github.com/Skyscanner/backpack-foundations/blob/main/packages/bpk-foundations-web/tokens/base.common.js)

| Category | Pattern | Example |
|----------|---------|---------|
| Core | `$bpk-core-*` | `$bpk-core-primary-day` |
| Surface | `$bpk-surface-*` | `$bpk-surface-default-day` |
| Text | `$bpk-text-*` | `$bpk-text-primary-day` |
| Status | `$bpk-status-*` | `$bpk-status-danger-spot-day` |
| Line | `$bpk-line-*` | `$bpk-line-day` |
| Spacing | functions | `tokens.bpk-spacing-base()` |
| Private | `$bpk-private-[component]-*` | DO NOT use cross-component |

## Color Value Matching

Backpack tokens use RGB notation (`rgb(239, 243, 248)`). When matching Figma/design colours:
1. Convert HEX to RGB
2. Search in backpack-foundations `base.common.js`
3. Use the matching token, not the raw value
4. If no semantic token exists, flag need for a new foundations token rather than raw colour fallback

## Design Approval Workflow

1. Design review completed before implementation, or explicit Backpack designer approval
2. Figma design artefacts cover all component states
3. Responsive behaviour and accessibility notes are documented
4. PR description links or references the approval evidence

## Common Traps

- Assuming existing component patterns are correct (they may be grandfathered)
- Copying private tokens from other components
- Using px because "it's just one value"
- Making `accessibilityLabel` optional "to be flexible"
- Leaving snapshot files stale after changing rendered output
- Accepting CSS values without checking if `bpk-mixins/` abstracts them
- Accepting imports without checking the full package API for a better variant
- Accepting token colour match without verifying the token name fits the UI state
