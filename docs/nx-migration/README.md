# Backpack Nx Migration Documentation

Complete documentation for the Nx migration project.

## Quick Navigation

### 🚀 Getting Started
- **[Getting Started Guide](guides/getting-started.md)** - Quick start for new developers
- **[User Guide](guides/user-guide.md)** - Complete guide for daily Nx usage
- **[Quick Reference](references/quick-reference.md)** - Command cheat sheet

### 📚 Usage Guides
- **[User Guide](guides/user-guide.md)** - Daily workflow, common tasks, Nx concepts
- **[CI/CD Guide](guides/cicd-guide.md)** - Using Nx in GitHub Actions
- **[Troubleshooting](guides/troubleshooting.md)** - Common issues and solutions

### 📖 References
- **[Quick Reference](references/quick-reference.md)** - Command cheat sheet
- **[Architecture Decisions](decisions/architecture-decisions.md)** - Technical decisions (AD-001 to AD-007)
- **[Nx Cloud Decision](decisions/nx-cloud-guide.md)** - Why we don't use Nx Cloud (yet)

### 📊 Reports
- **[Migration Report](reports/migration-report.md)** - Complete migration summary with all milestones

### 📁 Archive
- **[Milestone Reports](archive/milestones/)** - Individual milestone reports (M1-M4)
- **[Historical Docs](archive/)** - Pre-migration snapshots and intermediate docs

---

## Documentation Structure

```
docs/nx-migration/
├── README.md                           # This file (navigation)
│
├── guides/                             # User guides (how to use)
│   ├── getting-started.md              # Quick start
│   ├── user-guide.md                   # Complete user guide
│   ├── cicd-guide.md                   # CI/CD usage
│   └── troubleshooting.md              # Problem solving
│
├── references/                         # Reference docs (quick lookup)
│   └── quick-reference.md              # Command cheat sheet
│
├── reports/                            # Project reports (summary)
│   └── migration-report.md             # Complete migration summary
│
├── decisions/                          # Technical decisions (why)
│   ├── architecture-decisions.md       # Architecture decisions
│   └── nx-cloud-guide.md              # Nx Cloud decision
│
└── archive/                            # Historical docs (reference)
    ├── milestones/                     # Milestone reports
    │   ├── milestone-1-report.md
    │   ├── milestone-2-report.md
    │   ├── milestone-3-report.md
    │   └── milestone-4-report.md
    └── ...                             # Other historical docs
```

---

## For Different Audiences

### 👨‍💻 New Developers
Start here:
1. [Getting Started Guide](guides/getting-started.md) - 5 minutes
2. [Quick Reference](references/quick-reference.md) - Bookmark this
3. [User Guide](guides/user-guide.md) - Read when you have time

### 🔧 Daily Users
Frequently used:
- [Quick Reference](references/quick-reference.md) - Command cheat sheet
- [Troubleshooting](guides/troubleshooting.md) - When things go wrong
- [CI/CD Guide](guides/cicd-guide.md) - Understanding CI behavior

### 🏗️ Technical Leads / Architects
Deep dives:
- [Migration Report](reports/migration-report.md) - Complete project summary
- [Architecture Decisions](decisions/architecture-decisions.md) - Why we made certain choices
- [Milestone Reports](archive/milestones/) - Detailed implementation history

### 👔 Managers / Stakeholders
Executive summary:
- [Migration Report - Executive Summary](reports/migration-report.md#executive-summary)
- [Performance Improvements](reports/migration-report.md#performance-improvements)
- [Business Impact](reports/migration-report.md#team-impact)

---

## Key Achievements

✅ **96 packages** successfully migrated to Nx
✅ **81% faster** full builds (5m 14s → 59s)
✅ **99%+ cache hit rate** on repeat builds
✅ **60-80% faster** PR validation for small changes
✅ **Zero breaking changes** to all packages

---

## Migration Timeline

- **M1** (Nx Foundation) - ✅ Complete
- **M2** (Testing & Linting) - ✅ Complete
- **M3** (Storybook & Percy) - ✅ Complete
- **M4** (CI/CD Integration) - ✅ Complete
- **M5** (Polish & Documentation) - ⏳ In Progress

---

## Performance Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Full build (cold) | 5m 14s | 59s | **81%** ⚡ |
| Full build (cached) | 5m 14s | <5s | **99%+** 🚀 |
| Storybook build (cached) | 60-90s | <1s | **99%+** 🚀 |
| Percy workflow | 90-120s | 30s | **75%** ⚡ |
| PR validation (small) | 5-10min | 1-2min | **60-80%** ⚡ |
| PR validation (medium) | 5-10min | 2-4min | **40-60%** ⚡ |
| Main branch build | 10-15min | 8-12min | **20-30%** ⚡ |

---

## Common Commands

```bash
# Build
npx nx build bpk-component-button           # Single package
npx nx run-many --target=build --all        # All packages
npx nx affected --target=build              # Only changed

# Test
npx nx test bpk-component-button            # Single package
npx nx affected --targets=lint,test         # Changed packages
npm test                                    # All packages

# Storybook
npx nx storybook                            # Start dev server
npx nx storybook:build                      # Build (cached)
npx nx percy                                # Percy tests

# Utilities
npx nx graph                                # Dependency graph
npx nx reset                                # Clear cache
npx nx show projects --affected             # See affected packages
```

See [Quick Reference](references/quick-reference.md) for complete command list.

---

## Getting Help

1. **Check documentation** - Start with [User Guide](guides/user-guide.md)
2. **Search issues** - [GitHub Issues](https://github.com/Skyscanner/backpack/issues)
3. **Troubleshooting** - [Troubleshooting Guide](guides/troubleshooting.md)
4. **Ask in Slack** - #backpack channel
5. **Office hours** - Check team calendar

---

## External Resources

- **Nx Documentation**: https://nx.dev
- **Nx CLI Reference**: https://nx.dev/nx-api/nx/documents/cli
- **Nx Concepts**: https://nx.dev/concepts
- **Nx GitHub**: https://github.com/nrwl/nx

---

## Contributing to Docs

Found an issue or want to improve the documentation?

1. Create a GitHub issue with [DOCS] prefix
2. Submit a PR with documentation updates
3. Ask in #backpack Slack

---

**Last Updated**: 2026-01-27
**Status**: Migration complete, documentation finalized
**Contributors**: Roger Tang, Claude Sonnet 4.5
