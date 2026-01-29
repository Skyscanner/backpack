# NX Infrastructure Setup Skill (Phase 1)

Install and configure NX infrastructure from scratch. This is **Phase 1** of the NX adoption workflow.

## Usage

```bash
# Standard installation
/nx-setup-infrastructure

# Force reinstall (if NX already exists)
/nx-setup-infrastructure --force
```

## What It Does

This skill performs complete NX infrastructure setup:

### 1. Package Installation
- Installs `nx`, `@nx/jest`, `@nx/eslint`, `@nx/workspace`
- Verifies installation with version check

### 2. Configuration Files
Creates all required base configuration files:
- **`nx.json`** - NX workspace configuration (caching, targets, parallel)
- **`jest.preset.js`** - Shared Jest configuration for all packages
- **`.eslintrc.base.js`** - Base ESLint configuration with NX rules
- **`tsconfig.base.json`** - TypeScript config with path mappings

### 3. Package.json Scripts
Adds NX convenience scripts:
- `npm run nx` - Run NX CLI
- `npm run affected:build` - Build affected projects
- `npm run affected:test` - Test affected projects
- `npm run affected:lint` - Lint affected projects
- `npm run graph` - View dependency graph
- `npm run reset` - Clear NX cache

### 4. Infrastructure Setup
- Creates `.nx/cache` directory
- Creates stub files for Jest (style, file, CSS transition)
- Updates `.gitignore` with `.nx/` entries

### 5. Verification
- Tests NX installation
- Verifies all config files exist
- Checks NX commands work
- Generates comprehensive summary report

## When to Use

✅ **Use this skill when:**
- Starting NX adoption in a new repository
- Setting up monorepo for the first time
- Recreating NX configuration after issues
- Sharing NX setup workflow with other projects

❌ **Don't use this skill when:**
- NX is already installed (check with `/nx-plan-migration` first)
- Only updating existing NX configuration
- Migrating components (use `/nx-migrate-component` instead)

## Prerequisites

Before running this skill:

1. **Have a package.json** - Must be in project root
2. **Node.js installed** - Needs npm to install packages
3. **Git repository** - Recommended for version control

## Output

After completion, you'll have:

```
your-repo/
├── nx.json                      # NX workspace config
├── jest.preset.js              # Shared Jest config
├── .eslintrc.base.js          # Base ESLint config
├── tsconfig.base.json         # TypeScript config
├── package.json               # Updated with NX scripts
├── .gitignore                 # Updated with .nx/
├── .nx/
│   └── cache/                 # NX cache directory
└── scripts/
    └── stubs/
        ├── styleStub.js       # Mock for .scss imports
        ├── fileStub.js        # Mock for .svg/.png imports
        └── cssTransitionStub.js  # Mock for CSSTransition
```

## Configuration Details

### nx.json
Key settings:
- **`defaultBase: "main"`** - Base branch for affected commands
- **`parallel: 3`** - Run 3 tasks concurrently
- **Cache enabled** for build/test/lint targets
- **`dependsOn`** - Build dependencies before dependents

### jest.preset.js
Key settings:
- **`testEnvironment: 'jsdom'`** - For React component testing
- **`testRegex`** - Matches `*-test.[jt]sx?` files
- **Coverage thresholds** - 75% statements, 70% branches
- **Transform ESM packages** - d3, @skyscanner packages

### .eslintrc.base.js
Key settings:
- **`@nx/enforce-module-boundaries`** - Prevents circular dependencies
- **Separate configs** for TypeScript and JavaScript
- **Ready for customization** - Override in component configs

### tsconfig.base.json
Key settings:
- **`baseUrl: "."`** - Root for path mappings
- **`paths: {}`** - Populated during component migration
- **`skipLibCheck: true`** - Faster type checking
- **Modern target** - ES2015+

## Example Workflow

### Starting Fresh

```bash
# 1. Setup infrastructure (Phase 1)
/nx-setup-infrastructure

# Output: ✅ NX Infrastructure Setup Complete!

# 2. Verify setup (Phase 0 check)
/nx-plan-migration

# Output: ✅ READY FOR MIGRATION

# 3. Create migration plan (Phase 2 planning)
/nx-plan-migration

# Output: Priority 1: 23 components ready to migrate

# 4. Start migrating
/nx-migrate-component bpk-component-accordion
```

### Reinstalling (with --force)

```bash
# If NX already exists but needs reset
/nx-setup-infrastructure --force

# Backs up existing files and recreates configuration
```

## Safety Features

### Pre-flight Checks
- Verifies package.json exists
- Checks if NX already installed
- Warns about existing config files

### Non-destructive
- Won't overwrite existing files without --force
- Creates backups before overwriting
- Can run multiple times safely (idempotent)

### Verification
- Tests all installations
- Validates configuration files
- Provides detailed summary report

## Troubleshooting

### Issue: NX installation fails
**Cause**: Network or npm registry issues
**Fix**:
```bash
# Check npm registry
npm config get registry

# Set to official registry
npm config set registry https://registry.npmjs.org/

# Clear npm cache
npm cache clean --force

# Try again
/nx-setup-infrastructure
```

### Issue: "NX already installed" warning
**Cause**: NX packages already in package.json
**Fix**:
```bash
# Use force flag to reinstall
/nx-setup-infrastructure --force

# Or skip and go straight to migration
/nx-plan-migration
```

### Issue: Config files not created
**Cause**: File permissions or write errors
**Fix**:
```bash
# Check file permissions
ls -la

# Ensure write permissions in directory
chmod u+w .

# Create files manually using templates from skill
```

### Issue: tsconfig.base.json already exists
**Cause**: Project already has TypeScript config
**Fix**: Skill will add `paths: {}` field without overwriting

## Related Skills

| Skill | Phase | Purpose |
|-------|-------|---------|
| `/nx-plan-migration` | Phase 0+2 | Check readiness, plan migrations |
| `/nx-migrate-component` | Phase 2 | Migrate single component |
| `/nx-migrate-batch` | Phase 2 | Batch migrate components |
| `/nx-validate-migration` | Phase 2 | Validate migrated components |
| `nx-test-analyzer` (sub-agent) | Phase 2 | Analyze test configuration |

## Complete Workflow

```
Phase 0: Infrastructure Assessment
└─> /nx-plan-migration (check if ready)
    │
    ├─> ❌ NOT READY
    │   └─> Phase 1: Infrastructure Setup
    │       └─> /nx-setup-infrastructure ← YOU ARE HERE
    │           └─> Re-run Phase 0 check
    │
    └─> ✅ READY
        └─> Phase 2: Component Migration
            ├─> /nx-plan-migration (create plan)
            ├─> /nx-migrate-component (single)
            ├─> /nx-migrate-batch (batch)
            ├─> /nx-validate-migration (validate)
            └─> nx-test-analyzer (fix issues)
```

## Next Steps After Setup

1. **Verify Installation**
   ```bash
   /nx-plan-migration
   ```
   Should show: ✅ READY FOR MIGRATION

2. **Create Migration Plan**
   ```bash
   /nx-plan-migration
   ```
   Generates prioritized component list

3. **Start Migrating**
   ```bash
   /nx-migrate-component bpk-component-accordion
   ```

## Documentation

- **Complete Adoption Guide**: `docs/nx-adoption-guide.md`
- **Migration Guide**: `.claude/skills/nx-migrate-component/README.md`
- **Official NX Docs**: https://nx.dev

## Architecture Notes

### Why These Configs?

**nx.json**: Central workspace configuration
- Defines caching strategy
- Configures parallel execution
- Sets up affected command base branch

**jest.preset.js**: Shared test configuration
- Avoids duplicating config in each component
- Enforces consistent test patterns
- Configures common mocks and transforms

**.eslintrc.base.js**: Base linting rules
- Enables NX module boundary enforcement
- Prevents circular dependencies
- Foundation for component-specific rules

**tsconfig.base.json**: TypeScript foundation
- Path mappings enable `@backpack/component` imports
- Shared compiler options
- Foundation for component-specific configs

### Why These Scripts?

**affected:*** commands**: Run only what changed
- Faster CI/CD pipelines
- Only test/build affected components
- Leverages git history

**graph**: Visualize dependencies
- Debug circular dependencies
- Understand component relationships
- Plan migration order

**reset**: Clear cache
- Fix cache corruption issues
- Start fresh when needed

## Customization

After initial setup, you may want to customize:

1. **Adjust parallel execution** (nx.json):
   ```json
   "parallel": 5  // Increase for more powerful machines
   ```

2. **Configure cache location** (nx.json):
   ```json
   "cacheDirectory": "/tmp/nx-cache"  // Use different location
   ```

3. **Update coverage thresholds** (jest.preset.js):
   ```javascript
   coverageThreshold: {
     global: {
       statements: 80,  // Increase for stricter coverage
       branches: 75,
     }
   }
   ```

4. **Add custom ESLint rules** (.eslintrc.base.js):
   ```javascript
   rules: {
     'no-console': 'warn',
     // Add project-specific rules
   }
   ```

## Success Criteria

Setup is successful when:

✅ All NX packages installed
✅ All config files created
✅ NX scripts added to package.json
✅ `.nx/cache` directory exists
✅ `npx nx --version` shows version
✅ `/nx-plan-migration` shows ✅ READY

If any criteria fails, review troubleshooting section or re-run with --force.
