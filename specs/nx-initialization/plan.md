<!--
==============================================================================
DOCUMENT PURPOSE: Design HOW to implement Nx initialization (Implementation)
==============================================================================

This is an infrastructure/tooling plan, not a UI component plan.
It describes the technical approach for initializing Nx workspace.

FOCUS: HOW
- How to configure Nx workspace
- How to set up npm workspaces
- How to modify CI workflows
- How to configure TypeScript project references
==============================================================================
-->

# Implementation Plan: Nx Initialization for Backpack Web

**Branch**: `WOODPECKER-4039` | **Date**: 2026-01-26 | **Spec**: [spec.md](./spec.md)
**Research**: [research.md](./research.md)

## Summary

Initialize Nx workspace (v22.4.0-beta.4) in the Backpack monorepo as a prerequisite for merging into Banana. This involves:
1. Installing Nx and configuring nx.json (aligned with Banana)
2. Setting up npm workspaces
3. Configuring TypeScript project references (merge-compatible structure)
4. Removing custom node_modules caching from CI

**Strategic Goal**: This Phase 1 initialization prepares Backpack for future merge into Banana monorepo at `libs/design-system/`.

## Technical Context

**Infrastructure Type**: Build tooling / Monorepo management
**Nx Version**: 22.4.0-beta.4 (aligned with Banana repository)
**Package Manager**: npm >=10.7.0 (keeping existing, pnpm migration separate)
**Node Version**: >=18.20.4 (current: 22.19.0 per .nvmrc)
**TypeScript Version**: 5.9.2
**CI Platform**: GitHub Actions
**Constraints**: Must not break existing npm scripts, tests, or publishing workflow

## Constitution Check

*GATE: Infrastructure changes must not break existing functionality.*

- [x] **Non-Breaking**: All existing npm scripts must continue to work
- [x] **CI Compatibility**: GitHub Actions workflows must pass
- [x] **Publishing**: `@skyscanner/backpack-web` publishing workflow unchanged
- [x] **TypeScript**: Type checking must continue to work
- [x] **Testing**: All tests must pass
- [x] **Versioning**: PATCH bump (no breaking changes)

## Project Structure Changes

### Files to Create

```
backpack/
├── nx.json                   # NEW: Nx workspace configuration
└── tsconfig.base.json        # NEW: Shared TypeScript options
```

### Files to Modify

```
backpack/
├── package.json              # ADD: workspaces field, nx devDependency
├── tsconfig.json             # MODIFY: extend tsconfig.base.json
├── .github/workflows/
│   ├── main.yml              # MODIFY: remove node_modules cache, add nx-set-shas
│   ├── pr.yml                # MODIFY: remove node_modules cache, add nx-set-shas
│   └── _build.yml            # MODIFY: remove node_modules cache
```

### Files to Delete

```
backpack/
└── packages/
    └── package-lock.json     # DELETE: npm workspaces uses root lockfile
```

---

## Phase 1: Package Configuration

### 1.1 Install Nx

Add Nx as a dev dependency in root `package.json`:

```json
{
  "devDependencies": {
    "nx": "22.4.0-beta.4",
    "@nx/js": "22.4.0-beta.4"
  }
}
```

**Rationale**: Using exact version to match Banana repository for future merge compatibility.

### 1.2 Configure npm Workspaces

Add workspaces configuration to root `package.json`:

```json
{
  "workspaces": [
    "packages"
  ]
}
```

**Note**: The `packages` directory contains all 96+ Backpack packages. npm workspaces will hoist shared dependencies to root `node_modules/`.

### 1.3 Remove Postinstall Script

**Current** (`package.json` line 43):
```json
"postinstall": "(cd packages && npm install)"
```

**Action**: Remove this script. npm workspaces handles installation automatically.

### 1.4 Delete packages/package-lock.json

```bash
rm packages/package-lock.json
```

**Rationale**: npm workspaces uses single root `package-lock.json` for all workspace dependencies.

---

## Phase 2: Nx Configuration

### 2.1 Create nx.json

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
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "production": [
      "default",
      "!{projectRoot}/**/*.test.tsx",
      "!{projectRoot}/**/*-test.tsx",
      "!{projectRoot}/**/*.stories.tsx",
      "!{projectRoot}/**/*.figma.tsx"
    ],
    "sharedGlobals": []
  },
  "targetDefaults": {}
}
```

**Design Decisions**:
- **Minimal plugins**: Only `@nx/js/typescript` for project references. Other plugins (eslint, jest, storybook) can be added later.
- **No Nx Cloud**: Not configured in Phase 1 (can be added later).
- **Named inputs**: Define production vs test file patterns for affected commands.

### 2.2 Nx Plugin Comparison with Banana

| Plugin | Banana | Backpack Phase 1 | Notes |
|--------|--------|------------------|-------|
| @nx/js/typescript | ✅ | ✅ | Required for project references |
| @nx/eslint | ✅ | ❌ | Add in Phase 2 |
| @nx/jest | ✅ | ❌ | Add in Phase 2 |
| @nx/storybook | ✅ | ❌ | Add in Phase 2 |
| @nx/cypress | ✅ | ❌ | Not applicable |
| nx-stylelint | ✅ | ❌ | Add in Phase 2 |

---

## Phase 3: TypeScript Project References

### 3.1 Create tsconfig.base.json

Extract shared compiler options to new base configuration, **aligned with Banana's structure**:

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
    "jsx": "react-jsx",
    "allowJs": false,
    "composite": true,
    "declaration": true
  }
}
```

**Banana Alignment Notes**:
- `composite: true` - Required for TypeScript project references (matches Banana)
- `declaration: true` - Required for .d.ts generation (matches Banana)
- `moduleResolution: bundler` - Matches Banana configuration
- These settings ensure tsconfig can be merged into Banana without conflicts

### 3.2 Modify tsconfig.json

Update root tsconfig.json to extend base and support project references:

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "noEmit": true
  },
  "include": ["packages", "@types", "examples"],
  "exclude": ["**/**/*.figma.tsx"],
  "references": []
}
```

**Note**: The `references` array will be automatically managed by `nx sync` command.

### 3.3 TypeScript Project References Behavior

After running `nx sync`:
- Nx analyzes package dependencies
- Updates `tsconfig.json` `references` array
- Enables IDE "Go to Definition" across packages
- Enables incremental TypeScript compilation

---

## Phase 4: CI Workflow Modifications

### 4.1 Remove node_modules Caching

**Principle**: Replace custom `actions/cache` for `node_modules` with `actions/setup-node` built-in caching.

#### main.yml Changes

**DELETE** (lines 35-41):
```yaml
- name: Upload to Cache
  uses: actions/cache@v4
  with:
    path: |
      node_modules
      packages/node_modules
    key: ...
```

**DELETE** all `actions/cache/restore` for node_modules (lines 61-67, 106-112, 145-151)

**KEEP** dist-storybook caching (lines 70-75) - this is build output, not dependencies.

#### pr.yml Changes

Same pattern as main.yml:
- **DELETE** node_modules caching
- **KEEP** dist-storybook caching

#### _build.yml Changes

**DELETE** all `actions/cache/restore` for node_modules (lines 36-42, 87-93, 136-142)
**KEEP** dist-storybook restore (lines 145-149)

### 4.2 Add nrwl/nx-set-shas

Add after `actions/setup-node` in jobs that may run Nx commands:

```yaml
- name: Set SHAs for Nx affected commands
  uses: nrwl/nx-set-shas@v4
```

**Purpose**: Determines base and head SHAs for `nx affected` commands in CI.

### 4.3 Update npm ci

**Current** (runs in Create-NPM-Cache job, then subsequent jobs restore cache):
```yaml
- name: npm ci
  run: npm ci
```

**After**: Each job runs `npm ci` directly. With `actions/setup-node` caching, this is efficient.

```yaml
- uses: actions/setup-node@v4
  with:
    node-version-file: '.nvmrc'
    cache: 'npm'

- name: Install dependencies
  run: npm ci
```

---

## Phase 5: Verification

### 5.1 Local Verification Steps

```bash
# 1. Clean install
rm -rf node_modules packages/node_modules
npm ci

# 2. Verify nx commands work
npx nx graph                    # Should open dependency graph
npx nx sync                     # Should update tsconfig references

# 3. Verify existing scripts work
npm run build                   # Build scripts
npm run test                    # Test scripts
npm run lint                    # Lint scripts
npm run typecheck               # TypeScript compilation

# 4. Verify transpile workflow (publishing)
npm run transpile
```

### 5.2 CI Verification

1. Create PR with changes
2. Verify all CI jobs pass:
   - Create-NPM-Cache (if kept) or removed entirely
   - Build
   - Danger
   - PercyTests (if applicable)
   - StorybookDeploy
   - SassDocDeploy

### 5.3 Success Criteria Checklist

| Criterion | Verification Command |
|-----------|---------------------|
| nx.json exists | `test -f nx.json` |
| Nx installed | `npx nx --version` |
| nx graph works | `npx nx graph` |
| nx sync works | `npx nx sync` |
| tsconfig.base.json exists | `test -f tsconfig.base.json` |
| npm scripts work | `npm run build && npm run test` |
| CI passes | GitHub Actions green |
| No node_modules caching | Grep CI files for `actions/cache.*node_modules` |
| npm workspaces configured | `npm pkg get workspaces` |

---

## Migration Sequence

**All changes will be submitted in a single PR** (8 files total - all tightly coupled configuration changes).

**Order of operations within the PR:**

1. **Create tsconfig.base.json** (no impact)
2. **Modify tsconfig.json** to extend base (no impact)
3. **Add nx devDependency** to package.json (no impact until install)
4. **Add workspaces field** to package.json
5. **Remove postinstall script** from package.json
6. **Delete packages/package-lock.json**
7. **Create nx.json**
8. **Update CI workflows** (remove node_modules caching, add nx-set-shas)

**Files changed summary:**

| Operation | Files |
|-----------|-------|
| Create | `tsconfig.base.json`, `nx.json` |
| Modify | `package.json`, `tsconfig.json` |
| Modify | `.github/workflows/main.yml`, `pr.yml`, `_build.yml` |
| Delete | `packages/package-lock.json` |
| **Total** | **8 files** |

**Why single PR:**
- All changes are tightly coupled for one goal: Nx initialization
- Splitting would risk intermediate broken states
- Configuration-only changes, low review burden
- Atomic: single revert restores everything

---

## Rollback Plan

If issues occur after merge:

1. **Revert commit**: `git revert <commit-sha>`
2. **Restore packages/package-lock.json** from git history
3. **Remove nx.json and tsconfig.base.json**
4. **Restore postinstall script**
5. **Remove workspaces field from package.json**
6. **Run npm ci** to restore dual install behavior

---

## Dependencies

### New Dependencies (devDependencies)

| Package | Version | Purpose |
|---------|---------|---------|
| nx | 22.4.0-beta.4 | Monorepo build system |
| @nx/js | 22.4.0-beta.4 | TypeScript project references plugin |

### GitHub Actions

| Action | Version | Purpose |
|--------|---------|---------|
| nrwl/nx-set-shas | v4 | Set SHAs for affected commands |
| actions/setup-node | v4 | Node setup with npm caching |

---

## Notes

### What Changes

1. Single npm install at root (instead of root + packages)
2. Dependency graph available via `nx graph`
3. TypeScript project references managed by Nx
4. CI uses `actions/setup-node` caching instead of custom caching

### What Stays the Same

1. All npm scripts (`build`, `test`, `lint`, `typecheck`)
2. Package publishing workflow (`npm run transpile`)
3. Storybook build and deployment
4. Sass compilation
5. Jest test execution

### Future Phases (Out of Scope)

Per spec.md "Phase 1 Scope Boundaries", the following are explicitly out of scope:

- **pnpm migration** - Required before Banana merge, separate ticket
- **Additional Nx plugins** - @nx/eslint, @nx/jest, @nx/storybook (Phase 2)
- **Nx Cloud configuration** - Can inherit from Banana post-merge
- **Actual Backpack-Banana merge** - Depends on pnpm migration

---

## References

- [Spec: Nx Initialization](./spec.md)
- [Research: CI and TypeScript Analysis](./research.md)
- [Banana Repository](https://github.com/Skyscanner/banana) (merge target)
- [Phase 1 Initialization Guide](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1365838884)
- [Nx Manual Migration](https://nx.dev/recipes/adopting-nx/manual)
- [TypeScript Project References](https://nx.dev/concepts/typescript-project-linking)
- [nrwl/nx-set-shas](https://github.com/nrwl/nx-set-shas)
