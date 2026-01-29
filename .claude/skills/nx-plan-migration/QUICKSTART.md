# Quick Start: NX Migration Planning

## Run the Skill

```bash
/nx-plan-migration
```

## What You'll Get

A comprehensive migration plan including:

1. **Summary** - Total packages, migrated count, remaining count
2. **Priority 1** - Independent components ready to migrate now (23+ components)
3. **Priority 2** - Components waiting on dependencies (18+ components)
4. **Priority 3** - Complex components needing special handling
5. **Blocked** - Components needing resolution before migration
6. **Week-by-week plan** - Suggested batches and timeline

## Next Steps After Planning

### Option 1: Migrate Single Component
```bash
/nx-migrate-component bpk-component-example
```

### Option 2: Migrate Batch (Recommended)
```bash
/nx-migrate-batch component1 component2 component3 ...
```

### Option 3: Deep Analysis (For Complex Cases)
```bash
"Use nx-dep-analyzer sub-agent to analyze dependencies"
```

## Example Session

```
You: /nx-plan-migration

Claude: [Analyzes all 94 unmigrated components...]

Claude: Created migration plan!
        - Priority 1: 23 independent components (ready now)
        - Priority 2: 18 components (after P1)
        - Priority 3: 8 complex components
        - Blocked: 2 circular dependencies

        Recommendation: Start with these 10 from Priority 1:
        - bpk-component-accordion
        - bpk-component-aria-live
        - bpk-component-avatar
        ...

You: /nx-migrate-batch [paste list]

Claude: [Migrates 10 components...]
        ✅ 9/10 succeeded, 1 failed

You: /nx-plan-migration

Claude: Updated plan! 84 remaining, 32 new components in Priority 1
```

## When to Use

- **Before migration starts** - Create initial plan
- **After each batch** - Update priorities
- **When blocked** - Re-assess what's available
- **Weekly** - Track overall progress

## Tips

✅ **DO:**
- Start with Priority 1 (independent components)
- Migrate in batches of 10-15
- Re-run plan after each batch
- Test after each batch

❌ **DON'T:**
- Jump to Priority 3 first (complex components)
- Migrate circular dependencies separately
- Ignore special build requirements
- Skip validation

## Current Status

As of now:
- **Total:** 97 packages
- **Migrated:** 3 (badge, chip, chip-group)
- **Remaining:** 94
- **Your next step:** Run `/nx-plan-migration` to get the full plan!
