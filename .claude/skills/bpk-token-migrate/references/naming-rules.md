# Token Naming Transformation Rules

Source: `token-sync/src/style-dictionary-config.ts` — `kebabBpkName` and `kebabSegment` functions.

## Algorithm

Given a Figma variable path like `Component/Chip/Colour/bg-default-on`:

1. **Split on `/`**: `["Component", "Chip", "Colour", "bg-default-on"]`
2. **Rename Component → private**: `["private", "Chip", "Colour", "bg-default-on"]`
3. **Prepend bpk**: `["bpk", "private", "Chip", "Colour", "bg-default-on"]`
4. **kebab-case each segment**:
   - `bpk` → `bpk`
   - `private` → `private`
   - `Chip` → `chip`
   - `Colour` → `colour`
   - `bg-default-on` → `bg-default-on` (already kebab)
5. **Join with `-`**: `bpk-private-chip-colour-bg-default-on`
6. **Prepend `--`**: `--bpk-private-chip-colour-bg-default-on`

## kebabSegment rules

```
"CamelCase"      → "camel-case"      (insert hyphen before uppercase)
"onDark"         → "on-dark"
"OnContrast"     → "on-contrast"
"spaces here"    → "spaces-here"     (spaces → hyphens)
"under_score"    → "under-score"     (underscores → hyphens)
"ALL CAPS"       → "all-caps"
"(annotation)"   → "annotation"      (remove special chars)
"🚧 WIP"         → "wip"             (remove emoji)
```

## Non-Component tokens (no "private" prefix)

Paths not starting with `Component`:

| Figma path | CSS variable |
|---|---|
| `Spacing/md` | `--bpk-spacing-md` |
| `Spacing/base` | `--bpk-spacing-base` |
| `Spacing/xl` | `--bpk-spacing-xl` |
| `Radius/sm` | `--bpk-radius-sm` |
| `Radius/md` | `--bpk-radius-md` |
| `Canvas/Default` | `--bpk-canvas-default` |
| `Canvas/Contrast` | `--bpk-canvas-contrast` |
| `Text/Primary` | `--bpk-text-primary` |
| `Text/Secondary` | `--bpk-text-secondary` |
| `Text/Disabled` | `--bpk-text-disabled` |
| `Text/On Dark` | `--bpk-text-on-dark` |
| `Core/Primary` | `--bpk-core-primary` |
| `Line/Default` | `--bpk-line-default` |

## Component tokens (with "private" prefix)

| Figma path | CSS variable |
|---|---|
| `Component/Chip/Colour/bg-default-on` | `--bpk-private-chip-colour-bg-default-on` |
| `Component/Chip/Colour/bg-on-dark-off` | `--bpk-private-chip-colour-bg-on-dark-off` |
| `Component/Chip/Dimension/radius` | `--bpk-private-chip-dimension-radius` |
| `Component/Badge/Colour/bg-default` | `--bpk-private-badge-colour-bg-default` |
| `Component/Button/Dimension/padding-h` | `--bpk-private-button-dimension-padding-h` |

## Where variables live

- **Component colours**: `token-sync/css/theme-backpack-light.css` and `theme-backpack-dark.css`
- **Primitive spacing/radius**: `token-sync/css/primitives.css`
- **Semantic non-component tokens** (Canvas, Text, Core): `theme-backpack-light.css`

## iOS/Android exclusion

Paths with a standalone `ios` or `android` segment are excluded from CSS output. No CSS variable will exist for them.
