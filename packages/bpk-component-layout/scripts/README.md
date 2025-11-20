# Layout Component Utility Classes Generator

## Overview

This directory contains scripts for generating utility classes for `bpk-component-layout`. The utility classes are automatically generated with the `bpk-` prefix to maintain consistency with Backpack's naming conventions.

## Automatic Generation via SCSS Mixins

The utility classes are primarily generated using SCSS mixins in `layoutMixins.scss`:

- **Spacing utilities**: Generated via `generate-spacing-utilities()` mixin
- **Color utilities**: Generated via `generate-color-utilities()` mixin
- **Layout utilities**: Generated via `generate-layout-utilities()` mixin

### How It Works

1. **Token Definitions**: Tokens are defined in `layoutMixins.scss`:
   - `$spacing-map`: Spacing tokens (none, sm, md, base, lg, xl, xxl, xxxl, xxxxl)
   - `$color-map`: Color tokens (text colors, background colors, status colors)

2. **Mixin Generation**: Mixins automatically generate classes with `bpk-` prefix:
   ```scss
   @include layoutMixins.generate-spacing-utilities(padding, 'padding');
   // Generates: .bpk-padding-none, .bpk-padding-sm, .bpk-padding-base, etc.
   ```

3. **Responsive Variants**: Mixins also generate responsive variants for all breakpoints:
   ```scss
   // Generates: .bpk-padding-base-smallMobile, .bpk-padding-base-mobile, etc.
   ```

## Adding New Tokens

When adding new spacing or color tokens:

1. **Update Token Maps**: Add the new token to the appropriate map in `layoutMixins.scss`:
   ```scss
   $spacing-map: (
     // ... existing tokens
     'newToken': tokens.bpk-spacing-new-token(),
   );
   ```

2. **Classes Auto-Generated**: The mixins will automatically generate all utility classes for the new token:
   - Base classes: `.bpk-padding-newToken`, `.bpk-margin-newToken`, etc.
   - Responsive classes: `.bpk-padding-newToken-smallMobile`, etc.

3. **No Manual Updates Needed**: Since classes are generated via mixins, you don't need to manually update SCSS files.

## Build Integration

The utility classes are automatically generated during the SCSS compilation process:

- **`npm run build:sass`**: Compiles all SCSS files, including `BpkBox.module.scss`, which uses the mixins to generate all utility classes
- **No additional scripts needed**: The mixins handle all class generation automatically

## Class Naming Convention

All utility classes follow the pattern:
```
.bpk-{property}-{token}[{-breakpoint}]
```

Examples:
- `.bpk-padding-base` - Base padding utility
- `.bpk-bg-canvasContrast` - Background color utility
- `.bpk-padding-base-mobile` - Responsive padding utility for mobile breakpoint

## Files

- `layoutMixins.scss`: Contains mixins and token definitions
- `BpkBox.module.scss`: Uses mixins to generate all utility classes during SCSS compilation

## Build Process

When you run `npm run build:sass`:
1. All SCSS files are compiled (including `BpkBox.module.scss`)
2. Mixins in `layoutMixins.scss` are executed
3. All utility classes are automatically generated with `bpk-` prefix
4. No additional scripts or manual steps are required

