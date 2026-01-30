---
name: nx-setup
description: Set up all packages as individual Nx projects. Use when migrating a monorepo to use Nx project configuration.
---

# Nx Component Setup

Set up all packages in this monorepo as individual Nx projects to enable `nx affected`, dependency graph, and caching.

## Workflow

Execute the 3-phase workflow defined in `.claude/agents/nx-component-setup/`:

### Phase 1: Scout
Read and follow `.claude/agents/nx-component-setup/scout.agent.md`
- Analyze the repository structure
- Identify all packages and special cases
- Output: `nx-setup-output/analysis.json`

### Phase 2: Migrator
Read and follow `.claude/agents/nx-component-setup/migrator.agent.md`
- Generate migration scripts based on analysis
- Output: `nx-setup-output/migration-scripts/`
- **IMPORTANT**: Show generated scripts to user for review before execution

### Phase 3: Verifier
Read and follow `.claude/agents/nx-component-setup/verifier.agent.md`
- Run verification commands
- Output: `nx-setup-output/verification-report.md`

## Important

1. Always create `nx-setup-output/` directory first
2. Each phase must complete before the next begins
3. Ask user confirmation before executing migration scripts
4. Generate scripts instead of directly modifying files
