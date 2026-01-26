# Research Report: Nx Initialization for Backpack

**Date**: 2026-01-26
**Branch**: WOODPECKER-4039
**Spec**: [spec.md](./spec.md)

## Summary

This document consolidates research findings for initializing Nx in the Backpack monorepo. The research covers CI workflow analysis, TypeScript configuration, npm workspaces compatibility, and alignment with the Banana repository.

---

## 1. CI Workflow Analysis - node_modules Caching

### Files Requiring Modification

#### `.github/workflows/main.yml`

| Line | Action | Path | Status |
|------|--------|------|--------|
| 35-41 | `actions/cache` | `node_modules/` + `packages/node_modules/` | **DELETE** |
| 61-67 | `actions/cache/restore` | `node_modules/` + `packages/node_modules/` | **DELETE** |
| 70-75 | `actions/cache` | `dist-storybook/` | **KEEP** (build cache) |
| 106-112 | `actions/cache/restore` | `node_modules/` + `packages/node_modules/` | **DELETE** |
| 145-151 | `actions/cache/restore` | `node_modules/` + `packages/node_modules/` | **DELETE** |

#### `.github/workflows/pr.yml`

| Line | Action | Path | Status |
|------|--------|------|--------|
| 35-41 | `actions/cache` | `node_modules/` + `packages/node_modules/` | **DELETE** |
| 61-67 | `actions/cache/restore` | `node_modules/` + `packages/node_modules/` | **DELETE** |
| 70-75 | `actions/cache` | `dist-storybook/` | **KEEP** (build cache) |
| 107-113 | `actions/cache/restore` | `node_modules/` + `packages/node_modules/` | **DELETE** |
| 116-120 | `actions/cache/restore` | `dist-storybook/` | **KEEP** (build cache) |

#### `.github/workflows/_build.yml`

| Line | Action | Path | Status |
|------|--------|------|--------|
| 36-42 | `actions/cache/restore` | `node_modules/` + `packages/node_modules/` | **DELETE** |
| 87-93 | `actions/cache/restore` | `node_modules/` + `packages/node_modules/` | **DELETE** |
| 136-142 | `actions/cache/restore` | `node_modules/` + `packages/node_modules/` | **DELETE** |
| 145-149 | `actions/cache/restore` | `dist-storybook/` | **KEEP** (build cache) |

### Summary

- **DELETE**: 13 cache operations targeting `node_modules/`
- **KEEP**: 4 cache operations for `dist-storybook/` (build artifacts, not dependencies)
- **ADD**: `nrwl/nx-set-shas@v4` GitHub Action after `actions/setup-node`

---

## 2. Current TypeScript Configuration

### `tsconfig.json` (Main)

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "allowJs": false
  },
  "include": ["packages", "@types", "examples"],
  "exclude": ["**/**/*.figma.tsx"]
}
```

### `tsconfig.declaration.json` (For .d.ts generation)

```json
{
  "compilerOptions": {
    // ... same base options ...
    "moduleResolution": "node",
    "emitDeclarationOnly": true,
    "declaration": true,
    "outDir": "dist"
  }
}
```

### Required Changes for Nx Project References

1. **Create `tsconfig.base.json`**: Extract shared compiler options
2. **Modify `tsconfig.json`**:
   - Extend `tsconfig.base.json`
   - Add empty `references` array (managed by `nx sync`)
3. **Enable @nx/js/typescript plugin**: Manages project references automatically

---

## 3. npm Workspaces Compatibility

### Current Structure (Dual Install)

```
backpack/
├── package.json              # Root devDependencies
├── package-lock.json         # Root lockfile
├── node_modules/             # Root dependencies
└── packages/
    ├── package.json          # Publishing config + dependencies
    ├── package-lock.json     # Separate lockfile (36KB) ← DELETE
    └── node_modules/         # Separate dependencies ← DELETE
```

### Postinstall Script Conflict

**Current** (`package.json` line 43):
```json
"postinstall": "(cd packages && npm install)"
```

**Issue**: npm workspaces expects single installation. This script causes double install.

**Solution**: Remove or modify postinstall script after npm workspaces configuration.

### Target Structure (Single Install)

```
backpack/
├── package.json              # Root + workspaces config
├── package-lock.json         # Single lockfile for all
├── node_modules/             # All dependencies (hoisted)
├── nx.json                   # Nx configuration
├── tsconfig.base.json        # Shared TS options
└── packages/
    ├── package.json          # Publishing config only (no lockfile)
    └── bpk-component-*/      # Component packages
```

---

## 4. Package Statistics

- **Total packages**: 96+
- **Component packages**: 91 `bpk-component-*`
- **Utility packages**: `bpk-react-utils`, `bpk-scrim-utils`, `bpk-theming`, `bpk-mixins`, `bpk-stylesheets`
- **Publishing**: Single npm package `@skyscanner/backpack-web`

---

## 5. Banana Repository Alignment

### Nx Configuration Comparison

| Aspect | Backpack (Current) | Banana (Target) | Phase 1 Action |
|--------|-------------------|-----------------|----------------|
| Nx Version | None | 22.4.0-beta.4 | Install 22.4.0-beta.4 |
| Package Manager | npm | pnpm | Keep npm (separate migration) |
| Nx Plugins | None | @nx/eslint, @nx/jest, @nx/storybook, @nx/cypress, @nx/js/typescript, nx-stylelint | Start minimal, add later |
| Nx Cloud | None | Configured | Not configured in Phase 1 |

### Minimal nx.json for Phase 1

```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "plugins": [
    {
      "plugin": "@nx/js/typescript",
      "options": {
        "typecheck": {
          "targetName": "typecheck"
        }
      }
    }
  ],
  "targetDefaults": {},
  "namedInputs": {
    "default": ["{projectRoot}/**/*"],
    "production": [
      "default",
      "!{projectRoot}/**/*.test.tsx",
      "!{projectRoot}/**/*-test.tsx",
      "!{projectRoot}/**/*.stories.tsx"
    ]
  }
}
```

---

## 6. Environment Compatibility

| Tool | Current Version | Nx 22.4.0 Compatible |
|------|-----------------|---------------------|
| Node.js | 22.19.0 (.nvmrc) | ✅ Yes |
| npm | >=10.7.0 | ✅ Yes |
| TypeScript | 5.9.2 | ✅ Yes |
| React | 18.3.1 | ✅ Yes |

---

## 7. Key Decisions

| Decision | Rationale |
|----------|-----------|
| Use Nx 22.4.0-beta.4 | Align with Banana for future merge |
| Start without Nx plugins | Minimize initial changes, add incrementally |
| Keep npm (not pnpm) | Separate migration scope |
| Remove packages/package-lock.json | npm workspaces requirement |
| Remove postinstall script | Incompatible with npm workspaces |
| Keep dist-storybook caching | Build artifact, not dependency |

---

## 8. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| CI breaks after changes | High | Test all workflows in PR before merge |
| npm install fails | High | Test locally with clean clone first |
| Existing scripts break | High | Verify all npm scripts work post-migration |
| TypeScript errors | Medium | Run `npm run typecheck` after changes |
| Package publishing breaks | High | Test `npm run transpile` workflow |

---

## References

- [Phase 1 Initialization Guide](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1365838884)
- [Nx Manual Migration](https://nx.dev/recipes/adopting-nx/manual)
- [TypeScript Project References](https://nx.dev/concepts/typescript-project-linking)
- [nrwl/nx-set-shas Action](https://github.com/nrwl/nx-set-shas)
