# NX Migration Learnings

This document captures corrections, patterns, and insights discovered during the NX migration.

---

## Correction Patterns

### Pattern 1: [Name of Pattern]

**Discovered in**: Spec X.X
**Issue**: [Description of what went wrong]
**Solution**: [How it was fixed]
**Applied to**: Specs X.X, X.X, X.X

**Example**:
```
[Code or description example]
```

---

## Common Failures

### Failure Type 1: Missing Dependencies

**Symptoms**: `Cannot find module 'X'`

**Root Cause**: Component depends on internal packages not listed in package.json

**Solution Pattern**:
```
1. Check component's import statements
2. Add missing dependencies to package.json
3. For local dev, copy from node_modules if needed
```

**Affected Specs**: [List specs that had this issue]

---

### Failure Type 2: Circular Dependencies

**Symptoms**: madge reports cycle or imports fail at runtime

**Root Cause**: Component A → Component B → Component A

**Solution Pattern**:
```
1. Use madge to identify cycle
2. Either:
   - Move shared code to separate util
   - Use dependency injection (pass via props)
   - Inline constants/types
3. Create fix spec before migrating component
```

**Affected Specs**: [List specs that were deferred]

---

### Failure Type 3: Path Mapping Issues

**Symptoms**: TypeScript can't resolve imports even though path mapping exists

**Root Cause**: Path mapping added AFTER files were moved

**Solution Pattern**:
```
1. Add path mapping to tsconfig.base.json FIRST
2. Then move files with git mv
3. Then create re-export
4. Then validate imports
```

**Affected Specs**: [List specs that needed reordering]

---

## Spec Corrections Log

### Spec X.X: [Spec Name] (Version 2)

**Date**: [DATE]
**Attempts**: 2
**Final Status**: ✅ PASSED

**Version 1 (Failed)**:
```
[Original spec description]
```

**Error**:
```
[Error message]
```

**Version 2 (Passed)**:
```
[Corrected spec description]
```

**What Changed**:
- [List specific changes]
- [Why the changes fixed the issue]

**Lessons Learned**:
- [Key takeaways]
- [Whether to apply to other specs]

---

## Batch Corrections

### Correction Batch 1: [Name]

**Date**: [DATE]
**Reason**: Spec 3.5 failed, same pattern affects all batch migration specs
**Specs Updated**: 3.1 through 3.30 (30 specs)

**Change Made**:
```diff
- Move files with git mv
+ 1. Add path mapping first
+ 2. Move files with git mv
+ 3. Create re-export
+ 4. Validate imports before committing
```

**Impact**: Prevented 29 potential failures

---

## Performance Issues

### Issue 1: CI Timeouts

**Discovered**: Phase X
**Problem**: NX plugins timeout in CI even though tests pass locally

**Solution**:
```yaml
# .github/workflows/test.yml
env:
  NX_PLUGIN_NO_TIMEOUTS: true
```

**References**: [banana docs/03-how-to-guides/nx-debug.md:27]

---

### Issue 2: Local Test Performance

**Discovered**: Phase X
**Problem**: `nx affected -t test` causes test timeouts on local machine

**Solution**:
```bash
# Reduce parallel tasks
pnpm nx affected -t test --parallel=2

# Or reduce Jest maxWorkers in project.json
"maxWorkers": "20%"  # instead of 50%
```

**References**: [banana docs/03-how-to-guides/nx-debug.md:160-197]

---

## Tool Configuration Insights

### TypeScript Path Mappings

**Key Learning**: Path mappings must be in `tsconfig.base.json`, not `tsconfig.json`

**Reason**: NX uses tsconfig.base.json as the root for all projects

**Correct Location**:
```json
// tsconfig.base.json
{
  "compilerOptions": {
    "paths": {
      "@skyscanner/backpack-web/*": ["libs/*/src/index.ts"]
    }
  }
}
```

---

### NX Version Management

**Key Learning**: ALL @nx/* packages must have matching versions

**Reason**: NX packages are released in lockstep and have strict peer dependencies

**Correct Update Method**:
```bash
# WRONG: Let Dependabot update individual packages
# RIGHT: Use nx migrate
NX_SKIP_PROVENANCE_CHECK=true pnpm nx migrate 21.2.1
NX_SKIP_PROVENANCE_CHECK=true pnpm nx migrate --run-migrations
```

**Action Taken**: Disable Dependabot for @nx/* packages

---

## Deferred Components Analysis

### Component: [Component Name]

**Reason for Deferral**: Circular dependency with [Other Component]

**Dependency Chain**: ComponentA → ComponentB → ComponentC → ComponentA

**Resolution Plan**:
1. [Steps to resolve]
2. [Estimated effort]
3. [Who owns resolution]

**Tracking**: [Link to issue/ticket]

---

## Questions & Answers

### Q: Should we migrate tests with the component or separately?

**A**: Migrate together. Tests help validate the migration worked correctly.

**Context**: Spec 2.3 - discovered tests caught import path issues early

---

### Q: What to do with deprecated components?

**A**: [Answer TBD - discuss with team]

**Context**: Found X components marked as deprecated in code

---

## Best Practices Discovered

1. **Run madge first**: Always check for circular dependencies before migrating a batch
2. **Small commits**: Each component migration should be one commit
3. **Test immediately**: Run tests after each component migration, not at end of batch
4. **Path mappings first**: Add to tsconfig.base.json before moving files
5. **Document deferrals**: Immediately add deferred components to tracker with reason

---

## References to External Documentation

### Banana NX Adoption
- [Circular dependency resolution](file://../../banana/docs/04-directory-structure/project-dependency-rules.md)
- [NX troubleshooting guide](file://../../banana/docs/03-how-to-guides/nx-debug.md)

### Global Components NX Adoption
- [AGENTS.md workflow](file://../../global-components/AGENTS.md)

### NX Official Documentation
- [Project dependency rules](https://nx.dev/concepts/decisions/project-dependency-rules)
- [Affected commands](https://nx.dev/nx-api/nx/documents/affected)

---

## Templates for Future Corrections

### Template: Spec Correction Entry

```markdown
### Spec X.X: [Spec Name] (Version N)

**Date**: YYYY-MM-DD
**Attempts**: N
**Final Status**: ✅ PASSED / ❌ FAILED / ⏸️ DEFERRED

**Version N-1 (Failed)**:
[Previous spec description]

**Error**:
[Error message]

**Version N (Current)**:
[Corrected spec description]

**What Changed**:
- Change 1
- Change 2

**Lessons Learned**:
- Lesson 1
- Lesson 2

**Apply to Other Specs**: Yes/No - [Which specs]
```

---

## Migration Health Metrics

Track these throughout migration:

- **Average attempts per spec**: [Calculate from retry history]
- **Most common failure type**: [Track which failure types occur most]
- **Deferred rate**: [% of specs deferred vs completed]
- **Velocity**: [Specs completed per day]
- **Correction batch size**: [How many specs updated in batch corrections]

These metrics help identify systemic issues early.
