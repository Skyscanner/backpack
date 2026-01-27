# Backpack Nx Migration Documentation

Complete documentation for the Nx migration project.

## Quick Start

**New to Nx?** Start here:
1. [Getting Started](guides/getting-started.md) - 5 minute quick start
2. [Quick Reference](guides/quick-reference.md) - Command cheat sheet
3. [User Guide](guides/user-guide.md) - Complete usage guide

## Documentation

### 📚 Guides
- **[Getting Started](guides/getting-started.md)** - Quick start guide
- **[User Guide](guides/user-guide.md)** - Complete Nx usage guide
- **[Quick Reference](guides/quick-reference.md)** - Command cheat sheet
- **[CI/CD Guide](guides/cicd-guide.md)** - Using Nx in GitHub Actions
- **[Troubleshooting](guides/troubleshooting.md)** - Common issues and solutions

### 🏗️ Technical Decisions
- **[Architecture Decisions](decisions/architecture-decisions.md)** - Why we made certain choices (AD-001 to AD-007)
- **[Nx Cloud Decision](decisions/nx-cloud-guide.md)** - Why we don't use Nx Cloud (yet)

### 📁 Archive
- **[Migration Report](archive/migration-report.md)** - Complete project summary
- **[Milestone Reports](archive/milestones/)** - M1-M4 detailed reports
- **[Historical Docs](archive/)** - Implementation notes and snapshots

---

## Key Results

- ✅ **96 packages** migrated to Nx
- ✅ **81% faster** full builds (5m 14s → 59s)
- ✅ **99%+ cache hit rate** on repeat builds
- ✅ **60-80% faster** PR validation
- ✅ **Zero breaking changes**

## Common Commands

```bash
# Build
npx nx build bpk-component-button       # Single package
npx nx run-many --target=build --all    # All packages
npx nx affected --target=build          # Only changed

# Test
npx nx test bpk-component-button        # Single package
npx nx affected --targets=lint,test     # Changed packages

# Utilities
npx nx graph                            # Dependency graph
npx nx reset                            # Clear cache
```

See [Quick Reference](guides/quick-reference.md) for all commands.

---

## Getting Help

1. Check [User Guide](guides/user-guide.md) or [Troubleshooting](guides/troubleshooting.md)
2. Search [GitHub Issues](https://github.com/Skyscanner/backpack/issues)
3. Ask in #backpack Slack
4. External: [Nx Documentation](https://nx.dev)

---

**Last Updated**: 2026-01-27 | **Status**: Migration complete
