# Pre-Migration Package Structure Snapshot

**Date**: 2026-01-27
**Branch**: impl/phase1-setup
**Purpose**: Document current monorepo structure before Nx migration

## Package Count

**Total Packages**: 96 packages in `packages/` directory

## Package List

### Component Packages (85 packages)

All prefixed with `bpk-component-*`:

1. bpk-component-accordion
2. bpk-component-aria-live
3. bpk-component-autosuggest
4. bpk-component-badge
5. bpk-component-banner-alert
6. bpk-component-barchart
7. bpk-component-blockquote
8. bpk-component-boilerplate
9. bpk-component-bottom-sheet
10. bpk-component-breadcrumb
11. bpk-component-breakpoint
12. bpk-component-bubble
13. bpk-component-button
14. bpk-component-calendar
15. bpk-component-card
16. bpk-component-card-button
17. bpk-component-card-list
18. bpk-component-carousel
19. bpk-component-checkbox
20. bpk-component-chip
21. bpk-component-chip-group
22. bpk-component-close-button
23. bpk-component-code
24. bpk-component-content-cards
25. bpk-component-datatable
26. bpk-component-datepicker
27. bpk-component-description-list
28. bpk-component-dialog
29. bpk-component-drawer
30. bpk-component-fieldset
31. bpk-component-flare
32. bpk-component-floating-notification
33. bpk-component-form-validation
34. bpk-component-graphic-promotion
35. bpk-component-grid-toggle
36. bpk-component-horizontal-nav
37. bpk-component-icon
38. bpk-component-image
39. bpk-component-infinite-scroll
40. bpk-component-info-banner
41. bpk-component-input
42. bpk-component-inset-banner
43. bpk-component-journey-arrow
44. bpk-component-label
45. bpk-component-link
46. bpk-component-list
47. bpk-component-loading-button
48. bpk-component-map
49. bpk-component-mobile-scroll-container
50. bpk-component-modal
51. bpk-component-navigation-bar
52. bpk-component-navigation-tab-group
53. bpk-component-nudger
54. bpk-component-overlay
55. bpk-component-page-indicator
56. bpk-component-pagination
57. bpk-component-panel
58. bpk-component-phone-input
59. bpk-component-popover
60. bpk-component-price
61. bpk-component-price-range
62. bpk-component-progress
63. bpk-component-radio
64. bpk-component-rating
65. bpk-component-rtl-toggle
66. bpk-component-scrollable-calendar
67. bpk-component-section-header
68. bpk-component-section-list
69. bpk-component-segmented-control
70. bpk-component-select
71. bpk-component-skeleton
72. bpk-component-skip-link
73. bpk-component-slider
74. bpk-component-snippet
75. bpk-component-spinner
76. bpk-component-split-input
77. bpk-component-star-rating
78. bpk-component-swap-button
79. bpk-component-switch
80. bpk-component-table
81. bpk-component-text
82. bpk-component-textarea
83. bpk-component-theme-toggle
84. bpk-component-ticket
85. bpk-component-tooltip

### Utility Packages (5 packages)

1. **bpk-animate-height** - Animation utility for height transitions
2. **bpk-mixins** - Sass mixins and utilities (SPECIAL CASE: Sass-only, no TypeScript)
3. **bpk-react-utils** - React utility functions
4. **bpk-scrim-utils** - Scrim/overlay utilities
5. **bpk-theming** - Theming utilities

### Core Packages (2 packages)

1. **bpk-stylesheets** - Base stylesheets (SPECIAL CASE: Custom build script)
2. **packages/package.json** - Shared package.json for published package (SPECIAL CASE: Not a package, skip project.json)

### Other Files in packages/

- `node_modules/` - Workspace node_modules (from postinstall)
- `package-lock.json` - Workspace lock file
- `package.json` - Shared package.json for @skyscanner/backpack-web
- `react-version-test.js` - React version test utility
- `README.md` - Package documentation

## Special Cases for Nx Migration

### 1. bpk-stylesheets
**Location**: `packages/bpk-stylesheets/`
**Issue**: Uses custom build script (`node build`)
**Nx Strategy**: Wrap custom build command with nx:run-commands executor

### 2. bpk-mixins
**Location**: `packages/bpk-mixins/`
**Issue**: Sass-only package, no TypeScript compilation
**Nx Strategy**: May not need build target, or minimal target for Sass validation

### 3. packages/package.json
**Location**: `packages/package.json`
**Issue**: This is the shared package.json for the published npm package, not a component package
**Nx Strategy**: Skip project.json generation for this file

## Current npm Scripts

### Build Scripts
```json
{
  "build": "run-s build:*",
  "build:copy-normal_css": "./scripts/scss/copy-normal_css.sh",
  "build:gulp": "gulp",
  "build:sass": "node scripts/scss/styles-prod.js && rm packages/bpk-stylesheets/index.css",
  "build:stylesheets": "(cd packages/bpk-stylesheets && node build)"
}
```

**Build Pipeline**:
1. Copy normal CSS files
2. Run Gulp tasks (asset processing, SVG minification)
3. Compile Sass to CSS
4. Build stylesheets package

### Test Scripts
```json
{
  "test": "npm run lint && npm run check-react-versions && npm run check-bpk-dependencies && npm run jest",
  "jest": "TZ=Etc/UTC jest --coverage",
  "jest:watch": "TZ=Etc/UTC jest --watch",
  "jest:accessibility": "jest --testRegex accessibility-test"
}
```

### Lint Scripts
```json
{
  "lint": "npm run lint:js && npm run lint:scss",
  "lint:js": "eslint . .storybook --ext .js,.jsx,.ts,.tsx",
  "lint:js:fix": "eslint . .storybook --ext .js,.jsx,.ts,.tsx --fix",
  "lint:scss": "stylelint 'packages/**/*.scss'",
  "lint:scss:fix": "stylelint 'packages/**/*.scss' --fix"
}
```

### Development Scripts
```json
{
  "start": "npm run build && npm run storybook",
  "storybook": "storybook dev -p 9001",
  "storybook:dist": "storybook build -c .storybook -o dist-storybook"
}
```

### Utility Scripts
```json
{
  "check-bpk-dependencies": "node scripts/npm/check-bpk-dependencies.js",
  "check-react-versions": "node scripts/npm/check-react-versions.js",
  "fix-bpk-dependencies": "node scripts/npm/check-bpk-dependencies.js --fix",
  "upgrade-foundations": "node scripts/npm/check-bpk-dependencies.js --fix --upgrade-foundations"
}
```

### Transpile Scripts (for publishing)
```json
{
  "transpile": "npm run build && run-s transpile:*",
  "transpile:clean": "rm -rf ./dist",
  "transpile:js": "BABEL_ENV=dev babel packages --ignore ./packages/bpk-stylesheets --out-dir dist --extensions \".ts,.tsx,.js,.jsx\" --config-file ./babel.config.js",
  "transpile:dts": "tsc --project tsconfig.declaration.json",
  "transpile:imports": "node scripts/transpilation/transform-js-scss-css-imports.js",
  "transpile:copy-css": "node scripts/transpilation/copy-css.js",
  "transpile:copy-utils": "node scripts/transpilation/copy-utils.js",
  "transpile:copy-package-json": "cp ./packages/package.json ./dist/",
  "transpile:copy-readme": "cp packages/README.md ./dist/"
}
```

## Package Dependencies

### Implicit npm Workspaces (Same as banana/global-components)
- Uses **implicit workspaces** via `packages/` directory
- **No explicit "workspaces" field** in root package.json (same approach as banana and global-components)
- postinstall script: `(cd packages && npm install)` handles package installation
- This approach is fully compatible with Nx - explicit workspaces field is NOT required

### Inter-Package Dependencies
- Components depend on `bpk-mixins` for Sass utilities
- Components may depend on `bpk-react-utils` for React utilities
- Many components use `@skyscanner/bpk-foundations-web` for design tokens
- Dependency graph not explicitly defined (Nx will infer from package.json)

## Directory Structure

```
backpack/
├── packages/               # 96 packages (95 actual packages + 1 shared config)
│   ├── bpk-component-*/   # 85 component packages
│   ├── bpk-mixins/        # Sass utilities
│   ├── bpk-react-utils/   # React utilities
│   ├── bpk-scrim-utils/   # Scrim utilities
│   ├── bpk-stylesheets/   # Base stylesheets
│   ├── bpk-theming/       # Theming utilities
│   ├── bpk-animate-height/# Animation utility
│   ├── package.json       # Shared package.json (not a package)
│   └── node_modules/      # Workspace dependencies
├── examples/              # Storybook examples
├── scripts/               # Build and utility scripts
├── .storybook/           # Storybook configuration
├── package.json          # Root workspace config
└── gulpfile.js           # Gulp tasks
```

## Key Files to Preserve

- `package.json` (root) - Workspace configuration
- `packages/package.json` - Published package configuration
- `babel.config.js` - Babel configuration
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.js` - ESLint configuration
- `.stylelintrc.json` - Stylelint configuration
- `jest.config.js` (if exists) or jest config in package.json
- `.storybook/` - Storybook configuration
- `gulpfile.js` - Gulp tasks

## Migration Approach

For Nx migration:
1. **Preserve Structure**: Keep all packages in `packages/` directory
2. **Add Nx Layer**: Add project.json to each package (95 files, skip packages/package.json)
3. **Wrap Commands**: Use nx:run-commands to wrap existing build scripts
4. **Handle Special Cases**: Custom handling for bpk-stylesheets, bpk-mixins
5. **Maintain Compatibility**: All npm scripts should continue to work
6. **No Breaking Changes**: Import paths, APIs, and workflows remain unchanged

## Next Steps

After Nx installation:
1. Generate project.json for all 95 packages
2. Configure special cases
3. Verify Nx project detection
4. Test builds with Nx
5. Compare output with npm builds
