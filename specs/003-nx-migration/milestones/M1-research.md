# M1: Nx Initialization - Research

**Created**: 2026-01-27
**Phase**: Research & Discovery

## Current State Analysis

### Repository Structure

The Backpack repository is a monorepo with the following characteristics:

| Metric | Value |
|--------|-------|
| Total packages | 97 (in `packages/` directory) |
| Published package | `@skyscanner/backpack-web` (v21.0.1) |
| Node version | >=18.20.4 |
| npm version | >=10.7.0 |

### Existing Tooling

| Tool | Version | Purpose |
|------|---------|---------|
| Babel | ^7.28.3 | Transpilation |
| Webpack | ^5.103.0 | Bundling (Storybook) |
| Gulp | ^5.0.0 | Build tasks (SVG, CSS) |
| Jest | ^30.2.0 | Testing |
| ESLint | @skyscanner/eslint-config-skyscanner ^22.6.0 | Linting |
| Stylelint | @skyscanner/stylelint-config-skyscanner ^14.2.0 | SCSS linting |
| TypeScript | ^5.9.2 | Type checking |
| Storybook | ^10.1.2 | Component documentation |
| npm-run-all | ^4.1.5 | Script orchestration |

### Build Scripts Analysis

Current npm scripts in `package.json`:

```
build         → run-s build:* (sequential)
build:copy-normal_css → Shell script
build:gulp    → Gulp tasks
build:sass    → Sass compilation
build:stylesheets → Stylesheet bundling
```

Key observations:
- Build uses `npm-run-all` with sequential execution (`run-s`)
- No parallel execution currently (could benefit from Nx)
- Gulp handles SVG processing and code generation

### CI Pipeline Analysis

Current GitHub Actions workflow (`pr.yml`, `_build.yml`):

1. **Create-NPM-Cache**: Caches `node_modules/` and `packages/node_modules/`
2. **Create-Build-Cache**: Caches `dist-storybook/`
3. **Build**: Runs `npm run build`, `npm run typecheck`, `npm run test`
4. **Danger**: Code review automation
5. **PercyTests**: Visual regression testing
6. **StorybookDeploy**: Deploys Storybook to GitHub Pages

Observations:
- Uses GitHub Actions cache (not Nx cache yet)
- Build cache key based on `packages/**` and `examples/**` hashes
- All tests run on every PR (no affected-based filtering)

### Package Structure

The `packages/` directory contains a flat structure:
- No `project.json` files (not Nx-aware yet)
- Single `package.json` at `packages/package.json` for the published package
- Individual component folders (e.g., `bpk-component-button/`)
- Shared utilities (e.g., `bpk-react-utils/`, `bpk-mixins/`)

### Existing Nx Artifacts

Found `.nx/` directory with:
- `.nx/cache/` - Indicates Nx may have been partially initialized
- `.nx/workspace-data/` - Workspace metadata

**No `nx.json` found at root** - Full initialization not complete.

---

## Research Findings

### 1. Nx Initialization Command

**Decision**: Use `npx nx@latest init` for initialization

**Rationale**:
- Official Nx command that analyzes existing workspace
- Automatically detects npm, detects scripts, creates appropriate config
- Non-invasive - doesn't restructure existing folders
- Creates minimal `nx.json` with sensible defaults

**Command sequence**:
```bash
npx nx@latest init
```

**Expected outputs**:
- `nx.json` at repository root
- `nx` added to `devDependencies`
- Potentially `@nx/js` or `@nx/workspace` plugins

### 2. TypeScript `composite` Mode Consideration

**Decision**: Do NOT enable `composite: true` initially

**Rationale**:
- Backpack uses Babel for transpilation (`babel.config.js`)
- TypeScript is only for type checking (`npm run typecheck`)
- Enabling composite could conflict with Babel-based `.d.ts` generation
- Can investigate in separate spike if needed for project references

**Current tsconfig.json approach**:
- Keep existing TypeScript configuration unchanged
- Nx can work without TypeScript project references initially

### 3. Plugin Selection

**Decision**: Start with minimal plugins

**Recommended initial setup**:
```json
{
  "plugins": []
}
```

**Rationale**:
- Adding `@nx/js` or `@nx/react` adds complexity
- Start with vanilla Nx and add plugins in later milestones
- Reduces risk of peer dependency conflicts

### 4. Nx Version Strategy

**Decision**: Use latest stable Nx version

**Rationale**:
- Nx has good backwards compatibility
- Latest version includes bug fixes and improvements
- Can pin version in `package.json` after initialization

### 5. Caching Strategy for M1

**Decision**: Rely on default local caching only

**Rationale**:
- Remote caching (Nx Cloud) is an optional future enhancement
- Local caching provides immediate benefits
- Verify local caching works before adding remote

---

## Compatibility Analysis

### Known Potential Conflicts

| Concern | Risk Level | Mitigation |
|---------|------------|------------|
| npm-run-all with Nx | Low | Nx wraps npm scripts, doesn't replace them |
| Gulp tasks | Low | Nx can invoke existing gulp tasks |
| Babel transpilation | Low | Nx doesn't require changing transpilation |
| Jest configuration | Low | Nx can use existing Jest config |
| Storybook | Low | Nx has Storybook support for later milestones |

### Peer Dependency Check

Current React ecosystem:
- React 18.3.1
- React DOM 18.3.1
- TypeScript 5.9.2

Nx compatibility:
- Nx supports React 18.x
- Nx supports TypeScript 5.x
- No known conflicts with current dependencies

---

## Implementation Recommendations

### Pre-Initialization Checklist

- [ ] Create feature branch from `main`
- [ ] Ensure clean working directory (`git status`)
- [ ] Verify Node/npm versions match requirements
- [ ] Run existing tests to establish baseline

### Initialization Steps

1. Run `npx nx@latest init`
2. Answer prompts (accept defaults or customize)
3. Review generated `nx.json`
4. Review changes to `package.json`
5. Run `nx graph` to verify installation
6. Run existing `npm run build` to verify compatibility
7. Run existing `npm run test` to verify tests pass
8. Commit changes

### Post-Initialization Verification

- [ ] `nx.json` exists at root
- [ ] `nx graph` produces output
- [ ] `npm run build` succeeds
- [ ] `npm run test` succeeds
- [ ] `npm run lint` succeeds
- [ ] `npm run typecheck` succeeds

---

## Alternatives Considered

### 1. Turborepo Instead of Nx

**Rejected because**:
- Nx is Skyscanner Web's strategic choice
- Nx has more comprehensive dependency graph analysis
- Nx provides module boundaries enforcement (future milestone)

### 2. Manual Task Orchestration

**Rejected because**:
- Doesn't provide caching benefits
- Doesn't enable affected-based execution
- More maintenance burden

### 3. Full Nx Conversion (All Milestones at Once)

**Rejected because**:
- Higher risk of breaking changes
- Harder to roll back
- Milestone-based approach allows incremental adoption

---

## References

- [Nx: Adding Nx to Existing Project](https://nx.dev/docs/getting-started/start-with-existing-project)
- [Nx: React Monorepo Tutorial](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial)
- [Backpack Confluence: Nx Adoption One Pager](https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432)
- [TypeScript Monorepos Production Standard](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1388484149)
