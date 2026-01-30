---
name: nx-setup
description: Set up components as Nx projects in a monorepo. Spawns scout, migrator, and verifier as parallel sub-agents.
---

# Orchestrator: Nx Component Setup

This orchestrator uses the **Task tool** to spawn real sub-agents for each phase.

## Execution Instructions

When this agent is invoked, you MUST use the Task tool to spawn sub-agents. Follow these steps exactly:

### Step 0: Setup

```bash
mkdir -p nx-setup-output
```

### Step 1: Spawn Scout Agent

Use the Task tool to spawn the Scout agent:

```
Tool: Task
Parameters:
  subagent_type: "general-purpose"
  description: "Scout: analyze repo for Nx setup"
  prompt: |
    You are the Scout agent for Nx component setup.

    Read and follow the instructions in: .claude/agents/nx-component-setup/scout.agent.md

    Your task:
    1. Analyze the packages/ directory
    2. Identify all packages, their types, and special cases
    3. Map dependencies between packages
    4. Write output to: nx-setup-output/analysis.json

    Output format for analysis.json:
    {
      "summary": { "totalPackages": N, "withTypeScript": N, "sassOnly": N },
      "packages": [{ "name": "...", "path": "...", "hasTypeScript": true, "category": "component" }],
      "specialCases": [{ "name": "...", "reason": "...", "handling": "..." }]
    }

    When complete, confirm the analysis.json file was created.
```

**WAIT** for Scout to complete before proceeding.

### Step 2: Spawn Migrator Agent

After Scout completes, use the Task tool to spawn the Migrator agent:

```
Tool: Task
Parameters:
  subagent_type: "general-purpose"
  description: "Migrator: generate Nx setup scripts"
  prompt: |
    You are the Migrator agent for Nx component setup.

    Read and follow the instructions in: .claude/agents/nx-component-setup/migrator.agent.md

    Input: nx-setup-output/analysis.json (created by Scout)

    Your task:
    1. Read the analysis.json file
    2. Generate migration scripts in nx-setup-output/migration-scripts/
    3. Scripts should create project.json and tsconfig files for each package
    4. Include a main runner script: 04-run-migration.sh

    IMPORTANT: Generate scripts, do NOT execute them directly.

    Output files:
    - nx-setup-output/migration-scripts/01-generate-project-json.js
    - nx-setup-output/migration-scripts/02-generate-tsconfigs.js
    - nx-setup-output/migration-scripts/03-update-nx-json.js
    - nx-setup-output/migration-scripts/04-run-migration.sh

    When complete, list the generated scripts.
```

**WAIT** for Migrator to complete.

### Step 3: User Review Checkpoint

After Migrator completes, **ASK THE USER** before proceeding:

```
Migration scripts have been generated in nx-setup-output/migration-scripts/

Files:
- 01-generate-project-json.js
- 02-generate-tsconfigs.js
- 03-update-nx-json.js
- 04-run-migration.sh

Would you like to:
1. Review the scripts first
2. Execute the migration now
3. Cancel
```

### Step 4: Execute Migration (if user approves)

```bash
cd nx-setup-output/migration-scripts && bash 04-run-migration.sh
```

### Step 5: Spawn Verifier Agent

After migration executes, use the Task tool to spawn the Verifier agent:

```
Tool: Task
Parameters:
  subagent_type: "general-purpose"
  description: "Verifier: validate Nx setup"
  prompt: |
    You are the Verifier agent for Nx component setup.

    Read and follow the instructions in: .claude/agents/nx-component-setup/verifier.agent.md

    Input: nx-setup-output/analysis.json (expected values)

    Your task:
    1. Run verification commands (nx show projects, nx graph, etc.)
    2. Compare actual results with expected values from analysis.json
    3. Run regression tests (npm test, npm run build, npm run lint)
    4. Generate verification report

    Output: nx-setup-output/verification-report.md

    Report format:
    # Verification Report

    | Check | Expected | Actual | Status |
    |-------|----------|--------|--------|
    | Project count | X | Y | ✅/❌ |
    ...

    When complete, summarize pass/fail status.
```

## Parallel Opportunities

While the main flow is sequential, these can run in parallel:

### During Scout Phase
```
Tool: Task (run_in_background: true)
  - Analyze TypeScript configs
  - Map import dependencies
```

### During Verification Phase
```
Tool: Task (parallel)
  - Task 1: Run "npm test"
  - Task 2: Run "npm run lint"
  - Task 3: Run "nx graph --file=graph.json"
```

## Error Handling

If any agent fails:

1. **Scout fails**: Check packages/ directory exists
2. **Migrator fails**: Re-run Scout, check analysis.json
3. **Migration fails**:
   ```bash
   cp nx.json.backup nx.json
   find packages -name "project.json" -delete
   ```
4. **Verifier fails**: Review report, fix issues manually

## Complete Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                      Orchestrator                            │
│                                                              │
│  Task(Scout)                                                 │
│      │                                                       │
│      ▼                                                       │
│  analysis.json                                               │
│      │                                                       │
│      ▼                                                       │
│  Task(Migrator)                                              │
│      │                                                       │
│      ▼                                                       │
│  migration-scripts/                                          │
│      │                                                       │
│      ▼                                                       │
│  [User Review] ──────────────────────────────────────────┐   │
│      │                                                   │   │
│      ▼ (approved)                              (cancel)  │   │
│  Execute Scripts                                    STOP │   │
│      │                                                   │   │
│      ▼                                                   │   │
│  Task(Verifier) ◄────────────────────────────────────────┘   │
│      │                                                       │
│      ▼                                                       │
│  verification-report.md                                      │
│      │                                                       │
│      ▼                                                       │
│  DONE                                                        │
└──────────────────────────────────────────────────────────────┘
```
