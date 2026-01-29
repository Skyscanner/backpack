# NX Component Migration Skill

This Claude skill automates the migration of Backpack components to the NX monorepo structure following Skyscanner production standards.

## Usage

Invoke the skill with the component name:

```bash
/nx-migrate-component bpk-component-your-component
```

## What It Does

The skill performs a complete NX migration:

1. **Verifies** the component exists in `packages/`
2. **Creates** NX configuration files:
   - `package.json` with NX targets (build, test, lint)
   - `tsconfig.json` for type-checking
   - `jest.config.js` for testing
   - `.eslintrc.json` for linting
3. **Updates** `tsconfig.base.json` with path mapping
4. **Updates** all import paths across the codebase to use NX aliases
5. **Tests** the migration (build, test, lint)

## Key Features

- **Production Standards**: Follows Skyscanner's NX configuration standards
- **Package.json Configuration**: NX config in package.json (not project.json)
- **Source-First**: Components reference source files directly (no dist build)
- **Special Component Handling**: Detects and configures gulp-based components (icon, spinner, flare)
- **Import Path Updates**: Automatically updates relative imports to NX path aliases
- **Validation**: Tests build, test, and lint commands after migration

## Configuration

The skill uses these frontmatter settings:

- **`disable-model-invocation: true`**: Manual invocation only (prevents accidental triggers)
- **`allowed-tools`**: Read, Write, Edit, Bash, Glob, Grep
- **`argument-hint`**: Shows `<component-name>` in autocomplete

## Example Output

```
✓ Created package.json with NX configuration
✓ Created tsconfig.json
✓ Created jest.config.js
✓ Created .eslintrc.json
✓ Updated tsconfig.base.json path mapping
✓ Updated 5 imports across 3 files
✓ Build passed (type-checking)
✓ Tests passed (19/19)
✓ Lint passed (1 pre-existing warning)
```

## Files Created

For component `bpk-component-example`:

```
packages/bpk-component-example/
├── package.json          # NX configuration with build/test/lint targets
├── tsconfig.json         # TypeScript config (type-checking only)
├── jest.config.js        # Jest configuration
└── .eslintrc.json        # ESLint configuration
```

Plus updates to:
- `tsconfig.base.json` (adds path mapping)
- All files importing the component (updates import paths)

## Special Components

The skill automatically detects these components that require special build steps:

- **bpk-component-icon**: Runs `gulp generateIcons` before type-checking
- **bpk-component-spinner**: Runs `gulp generateSpinners` before type-checking
- **bpk-component-flare**: Runs `gulp generateFlare` before type-checking

These use a modified build target with sequential commands.

## Architecture Notes

### NX Configuration Location

Per Skyscanner standards, NX configuration is defined in `package.json` using the `nx` field:

```json
{
  "name": "@backpack/component",
  "nx": {
    "tags": ["type:component", "scope:ui"],
    "targets": { ... }
  }
}
```

**DO NOT** create a separate `project.json` file.

### Build Strategy

Components use **source-first** architecture:

- `main` and `types` point to `./index.ts` (source file)
- No `dist/` folder is generated
- Build target performs type-checking only (`tsc --noEmit`)
- Components are consumed directly from source

### Import Path Updates

The skill runs `scripts/nx/update-import-paths.js` to update all imports:

**Before:**
```typescript
import { Badge } from '../../packages/bpk-component-badge';
```

**After:**
```typescript
import { Badge } from '@backpack/badge';
```

This ensures:
- NX can track dependencies correctly
- Caching works properly
- All imports use consistent aliases

## Related

- [NX Documentation](https://nx.dev)
- [Backpack Component Guidelines](../../docs/components.md)
- [Import Path Update Script](../../scripts/nx/update-import-paths.js)
