# Storybook Integration with Nx

Guide to using Storybook with Nx caching and task orchestration in Backpack.

## Overview

Backpack's Storybook is now integrated with Nx, providing:
- **Fast dev server**: Start Storybook with Nx
- **Cached builds**: Build once, reuse everywhere
- **Percy integration**: Visual regression testing with automatic rebuilds

## Starting Storybook

### Development Server

```bash
# Using npm scripts (recommended)
npm run dev

# Using Nx directly
npx nx storybook

# Storybook runs on http://localhost:9001
```

The dev server:
- Starts in ~10-15 seconds
- Hot module replacement (HMR) enabled
- Auto-reloads on file changes
- No caching (always fresh)

### Building Storybook

```bash
# Using npm scripts
npm run dev:build

# Using Nx directly
npx nx storybook:build

# Output: dist-storybook/
```

Build performance:
- **Cold build**: ~60-90 seconds
- **Cached build**: <1 second
- **Output size**: ~19 MB

## Caching

### How Storybook Caching Works

Nx caches Storybook builds based on:
- Source files in all packages
- Storybook configuration (.storybook/*)
- Dependencies (package.json, package-lock.json)

**Cache hit criteria**:
- No source files changed
- No config changed
- No dependencies changed

**Cache outputs**:
- `dist-storybook/` directory
- Build logs and warnings

### Cache Examples

```bash
# First build (cold - no cache)
npx nx storybook:build
# Takes ~60-90 seconds

# Second build (warm - cache hit)
npx nx storybook:build
# Output: "Nx read the output from the cache"
# Takes <1 second

# After changing a component
vim packages/bpk-component-button/src/BpkButton.tsx
npx nx storybook:build
# Cache invalidated, rebuilds (~60-90 seconds)
```

### Managing Cache

```bash
# Clear Storybook build cache
npx nx reset

# Force fresh build (skip cache)
npx nx storybook:build --skip-nx-cache

# View cache status
ls .nx/cache  # Nx cache directory
```

## Percy Integration

### How Percy Works with Nx

Percy target depends on Storybook build:

```json
{
  "percy": {
    "dependsOn": ["storybook:build"]
  }
}
```

**Workflow**:
1. Run `npx nx percy`
2. Nx checks if Storybook build is cached
3. If cached: Skip build, run Percy immediately
4. If not cached: Build Storybook first, then run Percy

### Running Percy

```bash
# Percy automatically builds Storybook if needed
npx nx percy

# If Storybook already built:
# - Storybook build: <1s (cache hit)
# - Percy snapshots: ~30s
# Total: ~30s

# If Storybook needs rebuild:
# - Storybook build: ~60-90s
# - Percy snapshots: ~30s
# Total: ~90-120s
```

### Performance Benefits

Without Nx caching:
```
storybook:dist + percy-test = 60-90s + 30s = 90-120s
```

With Nx caching (after first run):
```
nx percy = <1s (cached) + 30s = ~30s
```

**Savings**: 70-75% faster with cache

## Configuration

### Storybook Configuration Files

Located in `.storybook/`:
- `main.ts` - Core configuration
- `preview.tsx` - Preview settings
- `webpack.config.js` - Webpack customization

Changing these files invalidates Storybook build cache.

### Nx Target Configuration

In `project.json`:

```json
{
  "storybook": {
    "executor": "nx:run-commands",
    "options": {
      "command": "storybook dev -p 9001",
      "cwd": "{workspaceRoot}"
    }
  },
  "storybook:build": {
    "executor": "nx:run-commands",
    "options": {
      "command": "storybook build -c .storybook -o dist-storybook",
      "cwd": "{workspaceRoot}"
    },
    "outputs": ["{workspaceRoot}/dist-storybook"],
    "cache": true
  },
  "percy": {
    "executor": "nx:run-commands",
    "options": {
      "command": "percy storybook ./dist-storybook",
      "cwd": "{workspaceRoot}"
    },
    "dependsOn": ["storybook:build"]
  }
}
```

## Development Workflows

### Adding New Stories

1. Create story file in component package:
   ```tsx
   // packages/bpk-component-button/src/BpkButton.stories.tsx
   export default {
     title: 'Components/Button',
     component: BpkButton,
   };
   ```

2. Dev server auto-reloads:
   ```bash
   npm run dev  # Already running
   # New story appears automatically
   ```

3. Test changes:
   - View in browser (http://localhost:9001)
   - Verify accessibility
   - Check responsive behavior

4. Build and verify:
   ```bash
   npx nx storybook:build
   # New story included in build
   ```

### Modifying Existing Stories

1. Edit story file
2. Storybook HMR reloads automatically
3. Verify changes in browser
4. Build for Percy if needed:
   ```bash
   npx nx storybook:build
   npx nx percy
   ```

### Testing Storybook Locally

```bash
# Build Storybook
npx nx storybook:build

# Serve locally
npx http-server dist-storybook -p 8080

# Open http://localhost:8080
```

## CI/CD Integration

### GitHub Actions Example

```yaml
- name: Build Storybook
  run: npx nx storybook:build

- name: Run Percy Tests
  run: npx nx percy
  env:
    PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

### Optimization for CI

```bash
# Use affected for faster builds
npx nx affected --target=build --base=origin/main

# Then build Storybook (includes all components)
npx nx storybook:build

# Run Percy
npx nx percy
```

## Troubleshooting

### Storybook Won't Start

**Problem**: Port 9001 already in use

**Solution**:
- Storybook will prompt for alternative port
- Or stop existing process: `lsof -ti:9001 | xargs kill`

### Build Fails

**Problem**: Storybook build fails with errors

**Solutions**:
1. Clear cache:
   ```bash
   npx nx reset
   ```

2. Clean build:
   ```bash
   rm -rf dist-storybook
   npx nx storybook:build --skip-nx-cache
   ```

3. Check for TypeScript errors:
   ```bash
   npm run typecheck
   ```

### Cache Not Working

**Problem**: Build always takes full time

**Solutions**:
1. Verify cache enabled in `project.json`:
   ```json
   "cache": true
   ```

2. Check outputs defined:
   ```json
   "outputs": ["{workspaceRoot}/dist-storybook"]
   ```

3. Clear and rebuild:
   ```bash
   npx nx reset
   npx nx storybook:build  # Creates cache
   npx nx storybook:build  # Uses cache
   ```

### Percy Issues

**Problem**: Percy fails or skips stories

**Solutions**:
1. Verify Storybook built:
   ```bash
   ls dist-storybook/
   ```

2. Check Percy token:
   ```bash
   echo $PERCY_TOKEN
   ```

3. Run locally:
   ```bash
   npx nx storybook:build
   npx percy storybook ./dist-storybook --dry-run
   ```

## Performance Tips

### 1. Cache Storybook Builds

Always run Storybook build through Nx for caching:

```bash
# Good: Uses cache
npx nx storybook:build

# Avoid: No cache
npm run storybook:dist
```

### 2. Reuse Builds for Percy

Don't rebuild unnecessarily:

```bash
# Good: Uses cached build
npx nx storybook:build
npx nx percy  # Reuses build

# Avoid: Rebuilds every time
npm run storybook:dist
npm run percy-test
```

### 3. Clean Builds When Needed

If seeing stale content:

```bash
# Clear cache and rebuild
npx nx reset
npx nx storybook:build
```

## Resources

- **Quick Reference**: `docs/nx-migration/quick-reference.md`
- **Developer Workflow**: `docs/nx-migration/developer-workflow.md`
- **Storybook Documentation**: https://storybook.js.org/
- **Percy Documentation**: https://docs.percy.io/
- **Nx Documentation**: https://nx.dev/
