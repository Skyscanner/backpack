---
name: nx-setup
description: Set up all packages as individual Nx projects using sub-agents. Spawns Scout, Migrator, and Verifier agents.
---

# Nx Component Setup

Set up all packages in this monorepo as individual Nx projects.

## Instructions

Read and execute the orchestrator: `.claude/agents/nx-component-setup/orchestrator.agent.md`

The orchestrator will guide you to:

1. **Spawn Scout Agent** (via Task tool) → Analyze repo, output `analysis.json`
2. **Spawn Migrator Agent** (via Task tool) → Generate migration scripts
3. **User Checkpoint** → Ask user to review/approve scripts
4. **Execute Migration** → Run the generated scripts
5. **Spawn Verifier Agent** (via Task tool) → Validate and report

## Key Points

- Use `Task` tool with `subagent_type: "general-purpose"` to spawn each agent
- Each agent reads its instructions from `.claude/agents/nx-component-setup/*.agent.md`
- Output goes to `nx-setup-output/` directory
- Always ask user before executing migration scripts
