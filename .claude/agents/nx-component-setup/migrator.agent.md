---
name: nx-setup-migrator
description: Generate migration scripts to set up packages as Nx projects (does not execute directly)
---

# Migrator Agent: Nx Component Setup

Generate executable scripts that will create Nx project configuration files.

## Purpose

Based on the Scout's analysis, generate shell scripts and JavaScript files that can be reviewed before execution.

## Inputs

- `analysis.json` from Scout agent
- Template configurations

## Outputs

Generate scripts in `migration-scripts/` directory:

```
migration-scripts/
├── 01-generate-project-json.js    # Creates project.json for each package
├── 02-generate-tsconfigs.js       # Creates tsconfig files
├── 03-update-nx-json.js           # Updates root nx.json
├── 04-run-migration.sh            # Main entry point
└── templates/
    ├── project.json.template
    ├── tsconfig.json.template
    ├── tsconfig.lib.json.template
    └── tsconfig.spec.json.template
```

## Script Generation Rules

### 01-generate-project-json.js

For each package, generate:

```json
{
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "name": "${PACKAGE_NAME}",
  "projectType": "library",
  "sourceRoot": "packages/${PACKAGE_NAME}/src",
  "tags": ["scope:backpack"]
}
```

**Special cases from analysis.json:**
- `sass-only`: sourceRoot without `/src`
- `custom-build`: add custom targets section

### 02-generate-tsconfigs.js

Generate 3 files per TypeScript package:

**tsconfig.json:**
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*", "index.ts"],
  "exclude": ["node_modules", "dist"],
  "references": []
}
```

**tsconfig.lib.json:**
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "types": ["node"]
  },
  "exclude": [
    "**/*-test.ts",
    "**/*-test.tsx",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.stories.tsx",
    "**/*.figma.tsx"
  ]
}
```

**tsconfig.spec.json:**
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "types": ["jest", "node"]
  },
  "include": [
    "**/*-test.ts",
    "**/*-test.tsx",
    "**/*.test.ts",
    "**/*.test.tsx"
  ]
}
```

### 03-update-nx-json.js

Add targetDefaults:

```json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"],
      "outputs": ["{projectRoot}/dist"],
      "cache": true
    },
    "test": {
      "inputs": ["default", "^production"],
      "cache": true
    },
    "lint": {
      "inputs": ["default"],
      "cache": true
    },
    "typecheck": {
      "dependsOn": ["^typecheck"],
      "inputs": ["default", "^default"],
      "cache": true
    }
  }
}
```

### 04-run-migration.sh

```bash
#!/bin/bash
set -e

echo "=== Nx Component Setup Migration ==="
echo ""

# Backup
echo "[1/4] Creating backup..."
cp nx.json nx-setup-output/nx.json.backup

# Generate project.json files
echo "[2/4] Generating project.json files..."
node migration-scripts/01-generate-project-json.js

# Generate tsconfig files
echo "[3/4] Generating tsconfig files..."
node migration-scripts/02-generate-tsconfigs.js

# Update nx.json
echo "[4/4] Updating nx.json..."
node migration-scripts/03-update-nx-json.js

echo ""
echo "=== Migration Complete ==="
echo "Run verification: node migration-scripts/verify.js"
```

## Script Requirements

All generated scripts must:

1. **Be idempotent** - safe to run multiple times
2. **Have dry-run mode** - `--dry-run` flag to preview changes
3. **Log actions** - clear output of what's being created/modified
4. **Handle errors** - graceful failure with rollback instructions
5. **Include license headers** - Apache 2.0 for Skyscanner projects

## Template Variables

Scripts should use these variables from analysis.json:

| Variable | Source |
|----------|--------|
| `${PACKAGE_NAME}` | package.name |
| `${PACKAGE_PATH}` | package.path |
| `${HAS_SRC}` | package.hasSrc |
| `${CATEGORY}` | package.category |
| `${SPECIAL_CASE}` | package.specialCase |

## Validation Before Output

- [ ] All scripts have shebang/header
- [ ] JSON templates are valid
- [ ] Special cases handled
- [ ] Dry-run mode works
- [ ] Scripts are executable
