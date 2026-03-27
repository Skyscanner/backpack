# Backpack Architecture

> For AI agent-specific instructions, see [AGENTS.md](./AGENTS.md).

## Monorepo Layout

```
packages/                    # 103 packages (components, mixins, tokens, utilities)
├── bpk-component-{name}/   # Individual React components (~80+)
├── bpk-mixins/              # SCSS mixins, tokens, typography (modern Sass API)
├── bpk-stylesheets/         # Compiled CSS output
├── bpk-theming/             # Theme provider and utilities
├── bpk-react-utils/         # Shared React utilities (portal, transitions, data attributes)
└── bpk-scrim-utils/         # Scrim/overlay utilities

examples/                    # Storybook stories and examples (mirrors packages/)
scripts/                     # Build tooling (SCSS compilation, transpilation, webpack config)
decisions/                   # 20 architectural decision records (ADRs)
.github/workflows/           # CI/CD (main, PR, release, Figma sync, label check, security)
.storybook/                  # Storybook 10 configuration
```

## Component Package Structure

Each component follows a consistent structure:

```
packages/bpk-component-{name}/
├── src/
│   ├── BpkComponent.tsx            # Main component (TypeScript, functional)
│   ├── BpkComponent.module.scss    # Styles (CSS Modules + BEM)
│   ├── BpkComponent-test.tsx       # Unit tests (Jest + RTL)
│   ├── accessibility-test.tsx      # Accessibility tests (jest-axe)
│   ├── BpkComponent.figma.tsx      # Figma Code Connect mapping
│   ├── common-types.ts             # Shared TypeScript types
│   └── index.ts                    # Public API exports
├── index.ts                        # Package entry point
└── package.json                    # Package metadata
```

## Token Architecture

Design tokens flow through a clear pipeline:

```
@skyscanner/bpk-foundations-web     # Source of truth (design tokens)
        ↓
bpk-mixins/_tokens.scss             # Forwards all tokens via @use/@forward
bpk-mixins/_typography.scss         # Typography mixins consuming tokens
bpk-mixins/_borders.scss            # Border mixins
bpk-mixins/_shadows.scss            # Shadow mixins
bpk-mixins/_breakpoints.scss        # Responsive breakpoints
        ↓
bpk-component-{name}/              # Components consume via @use
```

Components import tokens using the modern Sass API (`@use`/`@forward`, not `@import`):
```scss
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/typography';
```

## Build Pipeline

| Tool | Version | Purpose |
|------|---------|---------|
| TypeScript | 5.9 | Type checking, declaration generation |
| Babel | 7.28 | Transpilation to ES5 |
| Webpack | 5.103 | Storybook bundling |
| Gulp | 5.0 | SCSS compilation orchestration |
| sass-embedded | 1.90 | SCSS to CSS compilation |
| Storybook | 10.3 | Component development and documentation |

### Build Commands
- `npm run build` - Build all packages (SCSS + transpilation)
- `npm run transpile` - Babel transpile TypeScript to JavaScript
- `npm run build:sassdoc` - Generate Sass documentation

## Component Lifecycle

```
1. Development     → Write component in TypeScript with SCSS modules
2. Unit Tests      → Jest + React Testing Library
3. A11y Tests      → jest-axe accessibility assertions
4. Stories         → Storybook examples showing all variants
5. Visual Tests    → Percy visual regression (stories prefixed "VisualTest")
6. Code Review     → PR checks via GitHub Actions + Danger CI
7. Publish         → npm under @skyscanner/ scope
```

## Integrations

- **Figma Code Connect**: `.figma.tsx` files map components to Figma designs. Sync via `npm run figma:generate` and the `sync-figma-code-connect.yml` workflow.
- **Percy**: Visual regression testing. Config in `.percy.yml`. Stories prefixed with "VisualTest" are captured.
- **GitHub Actions**: 7 workflows covering CI, PR validation, releases, Figma sync, label checks, and security scanning (zizmor).
- **Danger CI**: PR automation via `dangerfile.ts` with the Skyscanner toolbox plugin.

## Versioning

- **Semantic versioning**: Major (breaking), Minor (new features), Patch (bug fixes)
- **Quarterly major releases**: Every 3 months (aligned to Q4 2024 onwards)
- **Deprecation window**: Minimum 3 months before removal (see `decisions/deprecated-api.md`)
- **Future API pattern**: Opt-in breaking changes via `V{number}` prefix (see `decisions/future-api.md`)

## Key Design Decisions

All architectural decisions are documented in `decisions/`:

| Decision | Summary |
|----------|---------|
| `modern-sass-api.md` | Use `@use`/`@forward` (Dart Sass), not `@import` |
| `versioning-rules.md` | Semantic versioning with clear major/minor/patch rules |
| `deprecated-api.md` | 3-month minimum deprecation window |
| `future-api.md` | `V{number}` prefix for opt-in breaking changes |
| `sizing-in-rem.md` | All sizing in rem units |
| `accessibility-tests.md` | jest-axe for automated a11y testing |
| `visual-tests.md` | Percy for visual regression |
| `component-scss-filenames.md` | PascalCase SCSS files with `.module.scss` |

## Runtime Dependencies

- **React 18.3** - Component framework
- **@skyscanner/bpk-foundations-web** - Design tokens
- **@skyscanner/bpk-svgs** - SVG icon library
- **date-fns** - Date utilities (calendar components)
- **d3-scale** - Scales (chart components)
