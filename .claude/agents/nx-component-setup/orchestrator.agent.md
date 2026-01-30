---
name: nx-setup
description: Set up components as Nx projects in a monorepo. Orchestrates scout, migrator, and verifier agents.
---

# Orchestrator: Nx Component Setup

Coordinate the full workflow to set up all packages in a monorepo as individual Nx projects.

## Usage

```
/nx-setup [packages-dir] [--dry-run] [--skip-verify]
```

**Arguments:**
- `packages-dir`: Directory containing packages (default: `packages/`)
- `--dry-run`: Generate scripts but don't execute
- `--skip-verify`: Skip verification phase

## Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                     Orchestrator                            │
│                                                             │
│  ┌─────────┐     ┌─────────┐     ┌──────────┐              │
│  │  Scout  │ ──▶ │Migrator │ ──▶ │ Verifier │              │
│  └─────────┘     └─────────┘     └──────────┘              │
│       │               │               │                     │
│       ▼               ▼               ▼                     │
│  analysis.json   scripts/      report.md                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Phase 1: Scout

**Goal**: Analyze repository structure

**Invoke**: `scout.agent.md`

**Input**:
- Repository root path
- Packages directory

**Output**: `nx-setup-output/analysis.json`

**Gate**: Must complete successfully before proceeding

```
✓ Found 98 packages
✓ Identified 1 sass-only package
✓ Identified 1 custom-build package
✓ Mapped dependencies
```

## Phase 2: Migrator

**Goal**: Generate migration scripts

**Invoke**: `migrator.agent.md`

**Input**:
- `nx-setup-output/analysis.json`

**Output**: `nx-setup-output/migration-scripts/`

**Gate**: Scripts must be generated and valid

```
✓ Generated 01-generate-project-json.js
✓ Generated 02-generate-tsconfigs.js
✓ Generated 03-update-nx-json.js
✓ Generated 04-run-migration.sh
```

### User Checkpoint (if not --dry-run)

```
=== Migration Scripts Ready ===

Generated scripts in: nx-setup-output/migration-scripts/

Please review:
  - 01-generate-project-json.js (creates 98 project.json files)
  - 02-generate-tsconfigs.js (creates 291 tsconfig files)
  - 03-update-nx-json.js (updates nx.json targetDefaults)

Run migration? [y/N]
```

### Execute Migration

```bash
cd nx-setup-output/migration-scripts
bash 04-run-migration.sh
```

## Phase 3: Verifier

**Goal**: Validate setup is correct

**Invoke**: `verifier.agent.md`

**Input**:
- `nx-setup-output/analysis.json` (expected values)
- Executed migration

**Output**: `nx-setup-output/verification-report.md`

**Gate**: All checks must pass

```
✓ Project count: 98/98
✓ Config files: complete
✓ nx graph: loads
✓ nx affected: works
✓ Regression tests: pass
```

## Output Structure

```
nx-setup-output/
├── analysis.json              # Scout output
├── migration-scripts/         # Migrator output
│   ├── 01-generate-project-json.js
│   ├── 02-generate-tsconfigs.js
│   ├── 03-update-nx-json.js
│   ├── 04-run-migration.sh
│   └── templates/
└── verification-report.md     # Verifier output
```

## Error Handling

### Scout Fails

```
Problem: Cannot analyze repository
Action: Check packages directory exists and contains valid packages
Recovery: Fix directory structure, re-run
```

### Migrator Fails

```
Problem: Cannot generate scripts
Action: Check analysis.json is valid
Recovery: Re-run Scout, then Migrator
```

### Migration Fails

```
Problem: Scripts fail during execution
Action: Check error output, restore from backup
Recovery:
  1. cp nx.json.backup nx.json
  2. find packages -name "project.json" -delete
  3. Fix issue, re-run migration
```

### Verifier Fails

```
Problem: Verification checks fail
Action: Review verification-report.md for details
Recovery:
  - Minor issues: Fix manually
  - Major issues: Rollback and re-run from Scout
```

## Rollback

If anything goes wrong after migration:

```bash
# Restore nx.json
cp nx.json.backup nx.json

# Remove generated project.json files
find packages -name "project.json" -delete

# Remove generated tsconfig files (careful - don't delete root ones)
find packages/bpk-* -name "tsconfig.json" -delete
find packages -name "tsconfig.lib.json" -delete
find packages -name "tsconfig.spec.json" -delete
```

## Customization

### Adding Special Cases

Edit `analysis.json` before running Migrator:

```json
{
  "specialCases": [
    {
      "name": "my-custom-package",
      "reason": "custom-build",
      "handling": "customBuildTarget",
      "config": {
        "buildCommand": "node custom-build.js"
      }
    }
  ]
}
```

### Modifying Templates

Edit files in `migration-scripts/templates/` before running migration.

### Skipping Packages

Add to `analysis.json`:

```json
{
  "skip": ["package-to-skip"]
}
```

## Success Criteria

Migration is complete when:

- [ ] All packages have `project.json`
- [ ] TypeScript packages have `tsconfig.json`, `tsconfig.lib.json`, `tsconfig.spec.json`
- [ ] `nx show projects` lists all packages
- [ ] `nx graph` displays correct dependency edges
- [ ] `nx affected` correctly identifies changed packages
- [ ] All existing npm scripts (`build`, `test`, `lint`) pass
- [ ] verification-report.md shows all checks PASS

## Example Run

```
$ claude /nx-setup

=== Nx Component Setup ===

[Phase 1/3] Scout
  Analyzing repository...
  ✓ Found 98 packages
  ✓ analysis.json saved

[Phase 2/3] Migrator
  Generating scripts...
  ✓ Scripts generated in migration-scripts/

  Review scripts? [Y/n] y
  (opens scripts for review)

  Execute migration? [y/N] y
  ✓ Migration complete

[Phase 3/3] Verifier
  Running verification...
  ✓ All checks passed
  ✓ Report saved to verification-report.md

=== Setup Complete ===

Next steps:
  1. Review verification-report.md
  2. Test: npx nx graph
  3. Test: npx nx affected --target=test
  4. Commit changes
```
