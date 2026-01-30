---
name: nx-setup-infrastructure
description: Install and configure NX infrastructure (Phase 1). Use when starting NX adoption, setting up new monorepo, or recreating NX configuration from scratch.
argument-hint: [--force]
disable-model-invocation: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

## User Input

```text
$ARGUMENTS
```

## Overview

**Phase 1: NX Installation & Setup**

This skill installs NX and creates all required base configuration files to prepare the repository for component migration (Phase 2).

## When to Use

- **Starting NX adoption** - First time setting up NX in repository
- **Fresh setup** - Setting up NX in a new monorepo
- **Recreating infrastructure** - Rebuilding NX config after issues
- **New repository** - Cloning workflow to another project

## When NOT to Use

- If NX is already installed and configured (use `/nx-plan-migration` to check)
- If only updating existing NX configuration (manually edit config files)
- For component migration (use `/nx-migrate-component` or `/nx-migrate-batch`)

## Prerequisites Check

Before starting, verify:

```bash
# Check if project has package.json
test -f package.json && echo "✅ package.json exists" || echo "❌ Need package.json first"

# Check if already has NX
npx nx --version 2>/dev/null && echo "⚠️ NX already installed" || echo "✅ Ready for NX installation"
```

If NX is already installed, ask user if they want to continue (--force flag required).

## Steps

### 1. Pre-Installation Check

**Verify prerequisites:**

```bash
# Ensure we're in project root (has package.json)
if [ ! -f package.json ]; then
  echo "❌ Error: No package.json found. Are you in the project root?"
  exit 1
fi

# Check if NX already installed
if npx nx --version 2>/dev/null && [ "$FORCE" != "true" ]; then
  echo "⚠️ NX is already installed!"
  echo "Current version: $(npx nx --version)"
  echo ""
  echo "If you want to reinstall/reconfigure, run:"
  echo "  /nx-setup-infrastructure --force"
  exit 0
fi
```

**Check for existing config files:**

```bash
# List any existing NX config files
for file in nx.json jest.preset.js .eslintrc.base.js tsconfig.base.json; do
  if [ -f "$file" ]; then
    echo "⚠️ Found existing: $file"
  fi
done
```

If any config files exist and not --force, ask user if they want to backup/overwrite.

### 2. Install NX Packages

**Install core NX packages:**

```bash
npm install -D nx@latest @nx/jest@latest @nx/eslint@latest @nx/workspace@latest
```

**Verify installation:**

```bash
npx nx --version
```

Should output version number (e.g., "v22.4.2").

### 3. Create nx.json

**Read existing package.json to get project name:**

```bash
PROJECT_NAME=$(node -pe "require('./package.json').name || 'monorepo'")
```

**Create nx.json:**

```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "defaultBase": "main",
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "production": [
      "default",
      "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)",
      "!{projectRoot}/tsconfig.spec.json",
      "!{projectRoot}/.eslintrc.json",
      "!{projectRoot}/jest.config.[jt]s",
      "!{projectRoot}/src/test-setup.[jt]s"
    ],
    "sharedGlobals": []
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"],
      "cache": true
    },
    "test": {
      "inputs": ["default", "^production", "{workspaceRoot}/jest.preset.js"],
      "cache": true
    },
    "lint": {
      "inputs": ["default", "{workspaceRoot}/.eslintrc.base.js"],
      "cache": true
    }
  },
  "nxCloudAccessToken": null,
  "parallel": 3,
  "cacheDirectory": ".nx/cache"
}
```

**Key configuration:**
- `defaultBase: "main"` - Base branch for affected commands
- `parallel: 3` - Run up to 3 tasks in parallel
- `cache: true` - Enable caching for build/test/lint
- `dependsOn` - Build dependencies before building dependents

### 4. Create jest.preset.js

**Create shared Jest configuration:**

```javascript
const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  testEnvironment: 'jsdom',

  // Test discovery pattern (will be overridden by components)
  testRegex: 'packages/.*-test\\.[jt]sx?$',

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/test-utils/**',
  ],

  coverageThreshold: {
    global: {
      statements: 75,
      branches: 70,
      functions: 75,
      lines: 75,
    },
  },

  // Module resolution
  moduleNameMapper: {
    '^.+\\.scss$': '<rootDir>/scripts/stubs/styleStub.js',
    '^.+\\.(svg|png)$': '<rootDir>/scripts/stubs/fileStub.js',
  },

  // Transform configuration
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', { rootMode: 'upward' }],
  },

  transformIgnorePatterns: [
    'node_modules/(?!bpk|@skyscanner|d3-.*|internmap)',
  ],
};
```

**Notes:**
- Uses `@nx/jest/preset` as base
- `testEnvironment: 'jsdom'` for React component testing
- `testRegex` matches common test file patterns
- `transformIgnorePatterns` transforms ESM packages
- Adjust `moduleNameMapper` paths to match your project structure

### 5. Create .eslintrc.base.js

**Create base ESLint configuration:**

```javascript
module.exports = {
  root: true,
  ignorePatterns: [
    '**/*',
    '!**/*.js',
    '!**/*.jsx',
    '!**/*.ts',
    '!**/*.tsx',
  ],
  plugins: ['@nx'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
          },
        ],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@nx/typescript'],
      rules: {},
    },
    {
      files: ['*.js', '*.jsx'],
      extends: ['plugin:@nx/javascript'],
      rules: {},
    },
  ],
};
```

**Key features:**
- `@nx/enforce-module-boundaries` - Prevents circular dependencies
- Separate rules for TypeScript and JavaScript
- Ready for project-specific overrides

### 6. Configure tsconfig.base.json

**Check if tsconfig.base.json exists:**

```bash
if [ -f tsconfig.base.json ]; then
  echo "✅ tsconfig.base.json already exists"
else
  echo "Creating tsconfig.base.json..."
fi
```

**If doesn't exist, create it:**

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "rootDir": ".",
    "sourceMap": true,
    "declaration": false,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "ES2015",
    "module": "esnext",
    "lib": ["ES2020", "dom"],
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "baseUrl": ".",
    "paths": {}
  },
  "exclude": ["node_modules", "tmp", "dist", "coverage"]
}
```

**If exists, ensure it has `paths` field:**

```bash
# Check if paths field exists
if ! grep -q '"paths"' tsconfig.base.json; then
  echo "Adding paths field to tsconfig.base.json..."
  # Add paths: {} to compilerOptions
fi
```

**Key configuration:**
- `baseUrl: "."` - Root for path mappings
- `paths: {}` - Will be populated during component migration
- `skipLibCheck: true` - Faster type checking
- `module: "esnext"` - Modern module system

### 7. Add NX Scripts to package.json

**Read existing scripts:**

```bash
EXISTING_SCRIPTS=$(node -pe "JSON.stringify(require('./package.json').scripts || {}, null, 2)")
```

**Add NX scripts if not present:**

```json
{
  "scripts": {
    "nx": "nx",
    "affected:build": "nx affected -t build",
    "affected:test": "nx affected -t test",
    "affected:lint": "nx affected -t lint",
    "graph": "nx graph",
    "reset": "nx reset"
  }
}
```

Use the Edit tool to add these scripts to package.json if they don't exist.

### 8. Create NX Cache Directory

**Initialize cache directory:**

```bash
mkdir -p .nx/cache
echo "✅ Created .nx/cache directory"
```

**Add to .gitignore:**

```bash
if [ -f .gitignore ]; then
  if ! grep -q ".nx/cache" .gitignore; then
    echo "" >> .gitignore
    echo "# NX Cache" >> .gitignore
    echo ".nx/cache" >> .gitignore
    echo ".nx/workspace-data" >> .gitignore
    echo "✅ Added .nx to .gitignore"
  else
    echo "✅ .nx already in .gitignore"
  fi
fi
```

### 9. Create Stub Files (Optional)

**Check if stub files referenced in jest.preset.js exist:**

```bash
# Check for style stub
if [ ! -f scripts/stubs/styleStub.js ]; then
  echo "Creating scripts/stubs/styleStub.js..."
  mkdir -p scripts/stubs
  cat > scripts/stubs/styleStub.js << 'EOF'
module.exports = {};
EOF
fi

# Check for file stub
if [ ! -f scripts/stubs/fileStub.js ]; then
  echo "Creating scripts/stubs/fileStub.js..."
  mkdir -p scripts/stubs
  cat > scripts/stubs/fileStub.js << 'EOF'
module.exports = 'test-file-stub';
EOF
fi

# Check for CSS transition stub
if [ ! -f scripts/stubs/cssTransitionStub.js ]; then
  echo "Creating scripts/stubs/cssTransitionStub.js..."
  mkdir -p scripts/stubs
  cat > scripts/stubs/cssTransitionStub.js << 'EOF'
const React = require('react');

// Mock CSSTransition to render children immediately
module.exports = ({ children }) => children;
EOF
fi
```

### 10. Verify Installation

**Run infrastructure assessment:**

```bash
echo ""
echo "========================================="
echo "Verifying NX Installation..."
echo "========================================="
echo ""

# Check NX installed
echo "NX Version:"
npx nx --version

echo ""
echo "Configuration Files:"
for file in nx.json jest.preset.js .eslintrc.base.js tsconfig.base.json; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (MISSING)"
  fi
done

echo ""
echo "NX Commands Available:"
npx nx list

echo ""
echo "Cache Directory:"
test -d .nx/cache && echo "  ✅ .nx/cache" || echo "  ❌ .nx/cache"
```

**Test NX graph:**

```bash
echo ""
echo "Testing NX graph (should not error)..."
npx nx graph --file=.nx/graph.html 2>&1 | head -5
```

### 11. Generate Summary Report

**Create setup summary:**

```markdown
## NX Infrastructure Setup Complete! 🎉

### Installation Summary

✅ **NX Packages Installed:**
- nx@X.X.X
- @nx/jest@X.X.X
- @nx/eslint@X.X.X
- @nx/workspace@X.X.X

✅ **Configuration Files Created:**
- `nx.json` - NX workspace configuration
- `jest.preset.js` - Shared Jest configuration
- `.eslintrc.base.js` - Base ESLint configuration
- `tsconfig.base.json` - TypeScript configuration with path mappings

✅ **Scripts Added to package.json:**
- `npm run nx` - Run NX commands
- `npm run affected:build` - Build affected projects
- `npm run affected:test` - Test affected projects
- `npm run affected:lint` - Lint affected projects
- `npm run graph` - View dependency graph

✅ **Infrastructure:**
- `.nx/cache` directory created
- Stub files created (style, file, cssTransition)
- `.gitignore` updated

---

### Next Steps

#### 1. Verify Setup
Run the infrastructure assessment:
```bash
/nx-plan-migration
```

Should show: ✅ **READY FOR MIGRATION**

#### 2. Plan Component Migration
Use the planning tool to identify which components to migrate first:
```bash
/nx-plan-migration
```

This will:
- Count migrated vs unmigrated components
- Analyze dependencies
- Create prioritized migration plan

#### 3. Start Migrating Components
Follow the plan's recommended batches:
```bash
# Single component
/nx-migrate-component bpk-component-accordion

# Or batch migration
/nx-migrate-batch bpk-component-accordion bpk-component-badge ...
```

---

### Useful NX Commands

```bash
# View dependency graph
npm run graph

# List all projects
npx nx show projects

# Show project details
npx nx show project <name>

# Run specific target
npx nx <target> <project>

# Clear NX cache
npx nx reset
```

---

### Documentation

- **NX Adoption Plan:** See complete roadmap in `docs/nx-adoption-guide.md`
- **Component Migration:** `.claude/skills/nx-migrate-component/README.md`
- **NX Documentation:** https://nx.dev

---

### Troubleshooting

**Issue:** NX commands not working
**Fix:** Ensure `node_modules/.bin` is in PATH or use `npx nx`

**Issue:** Cache issues
**Fix:** Clear cache with `npx nx reset`

**Issue:** TypeScript errors
**Fix:** Ensure `tsconfig.base.json` has correct `paths` configuration

---

## Phase 1 Complete! ✅

Your repository is now ready for Phase 2 (Component Migration).

Run `/nx-plan-migration` to create your migration plan.
```

## Error Handling

### If NX installation fails:

```bash
echo "❌ NX installation failed!"
echo ""
echo "Common causes:"
echo "1. Network issues - Check internet connection"
echo "2. npm registry issues - Try: npm config set registry https://registry.npmjs.org/"
echo "3. Permissions issues - Try: sudo chown -R $(whoami) ~/.npm"
echo ""
echo "Try manual installation:"
echo "  npm install -D nx@latest @nx/jest@latest @nx/eslint@latest @nx/workspace@latest"
```

### If config file creation fails:

```bash
echo "⚠️ Warning: Failed to create <filename>"
echo "Manual creation required."
echo "See template in .claude/skills/nx-setup-infrastructure/templates/"
```

### If verification fails:

```bash
echo "⚠️ Setup completed with warnings"
echo "Some files may need manual creation or fixing"
echo ""
echo "Run verification again:"
echo "  /nx-plan-migration"
```

## Notes

- **Idempotent**: Can run multiple times safely (checks existing files)
- **Non-destructive**: Backs up existing files before overwriting (if --force)
- **Verification**: Always runs assessment at the end
- **Documented**: Generates comprehensive summary

## Related Skills

- `/nx-plan-migration` - Verify setup and plan migrations (Phase 0 + 2)
- `/nx-migrate-component` - Migrate single component (Phase 2)
- `/nx-migrate-batch` - Batch migration (Phase 2)
- `/nx-validate-migration` - Validate migrated components (Phase 2)
