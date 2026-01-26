# Phase 5: TypeScript

**Purpose**: Enable NX TypeScript checking with project references

**Total Specs**: 1+ (expected 2-5 attempts based on historical data)
**Prerequisites**: Phase 4 complete
**Risk Level**: Medium (can be deferred if too difficult)

---

## ⚠️ Expectation Setting

Based on the banana and global-components repositories' experience:

- **Expected attempts**: 2-5
- **Common issues**: Out of memory, circular type references, project reference misconfigurations
- **Time investment**: Can be significant
- **Can be deferred**: Yes - this is an optimization, not a blocker

---

## Spec 5.1: Enable NX TypeScript checking (Attempt 1)

**Description for Spec Kit**:

```
Enable the NX TypeScript plugin and configure project references for type checking.

Tasks:
1. Install the NX TypeScript plugin:
   pnpm add -D @nx/js

2. Add TypeScript checking to nx.json targetDefaults:
   "targetDefaults": {
     "typecheck": {
       "cache": true,
       "inputs": [
         "{projectRoot}/**/*.ts",
         "{projectRoot}/**/*.tsx",
         "{projectRoot}/tsconfig*.json",
         "{workspaceRoot}/tsconfig.base.json"
       ],
       "outputs": []
     }
   }

3. For each library in libs/, add a typecheck target to project.json:
   "targets": {
     "typecheck": {
       "executor": "@nx/js:tsc",
       "options": {
         "tsConfig": "libs/[component]/tsconfig.json",
         "mode": "noEmit"
       },
       "outputs": []
     }
   }

4. Update each library's tsconfig.json to use project references:
   {
     "extends": "../../tsconfig.base.json",
     "compilerOptions": {
       "outDir": "../../dist/out-tsc",
       "composite": true,
       "declaration": true
     },
     "files": [],
     "include": ["src/**/*"],
     "exclude": ["**/*.spec.ts", "**/*.test.ts"]
   }

5. Create a root-level tsconfig.typecheck.json that references all projects:
   {
     "extends": "./tsconfig.base.json",
     "files": [],
     "references": [
       { "path": "./libs/bpk-component-badge" },
       { "path": "./libs/bpk-component-button" },
       // ... all other libs
     ]
   }

6. Increase Node.js memory for type checking:
   Add to package.json scripts:
   "typecheck": "NODE_OPTIONS='--max-old-space-size=8192' nx run-many -t typecheck",
   "typecheck:affected": "NODE_OPTIONS='--max-old-space-size=8192' nx affected -t typecheck"

7. Run type checking on a single library first:
   npx nx typecheck bpk-component-badge

8. If successful, run on all libraries:
   pnpm typecheck

9. Document any errors in docs/nx-migration/typecheck-errors-attempt1.md:
   ## TypeCheck Attempt 1

   **Date**: [DATE]
   **Result**: [PASS / FAIL]

   ### Errors Encountered:
   [List errors]

   ### Error Categories:
   - Out of memory: [yes/no]
   - Circular type references: [yes/no]
   - Project reference issues: [yes/no]
   - Other: [describe]

   ### Next Steps:
   [If failed, what to try next]

10. If type checking passes, commit with message: "feat: Enable NX TypeScript checking"
    If it fails, commit the configuration anyway with message: "chore: Add TypeScript checking configuration (attempt 1 - errors present)"

Acceptance Criteria:
- @nx/js is installed
- All libraries have typecheck target in project.json
- All libraries have updated tsconfig.json with composite: true
- tsconfig.typecheck.json references all projects
- Type checking runs (even if errors exist)
- Errors are documented if present
- Changes are committed to git

Context:
TypeScript type checking with NX project references can be challenging. The first attempt may fail due to:
- Memory issues (increase NODE_OPTIONS max-old-space-size)
- Circular type references (need to refactor types)
- Misconfigured project references (need to adjust paths)

If this attempt fails, document the errors thoroughly. We'll create Spec 5.2 to address the specific issues found.
```

**Status**: ⬜ Not Started

**Notes**:
- Expect this to fail - it's okay!
- Document errors thoroughly for the next attempt
- Don't spend more than a day troubleshooting - move to retry spec instead

---

## Spec 5.2+: TypeCheck Retry (Create as needed)

**If Spec 5.1 fails, create additional specs based on the errors encountered.**

### Template for TypeCheck Retry Spec:

**Description for Spec Kit**:

```
Retry TypeScript checking after addressing issues from Attempt [N].

Issues from Attempt [N]:
[List specific issues]

Tasks:
1. Review errors from docs/nx-migration/typecheck-errors-attempt[N].md
2. Address each category of errors:

   **If Out of Memory**:
   - Increase max-old-space-size to 16384
   - Or enable incremental builds: "incremental": true in tsconfig
   - Or split type checking into smaller batches

   **If Circular Type References**:
   - Use madge to identify circular type imports: madge --circular --extensions ts,tsx libs/
   - Break cycles by:
     - Moving shared types to libs/shared/types
     - Using type imports: import type { } from '...'
     - Inline types where appropriate

   **If Project Reference Issues**:
   - Verify all "references" in tsconfig.typecheck.json are correct
   - Check that all referenced paths exist
   - Ensure all referenced tsconfigs have "composite": true

   **If Other Errors**:
   - Address specific TypeScript errors
   - May need to fix actual type issues in code
   - May need to adjust tsconfig include/exclude patterns

3. Make corrections based on error analysis

4. Test type checking incrementally:
   - First test a small subset: npx nx run-many -t typecheck --projects=bpk-component-badge,bpk-component-button
   - Then expand: npx nx run-many -t typecheck --projects=bpk-*
   - Finally all: pnpm typecheck

5. Document results in docs/nx-migration/typecheck-errors-attempt[N+1].md

6. If successful, commit with message: "feat: Enable NX TypeScript checking (attempt [N+1] - success)"
   If still failing, commit with message: "chore: TypeScript checking attempt [N+1] - [status]"

Acceptance Criteria:
- Corrections address issues from previous attempt
- Type checking runs further than before (even if not completely successful)
- Results are documented
- Changes are committed to git

Context:
TypeScript checking often requires multiple iterations. Each attempt should make progress. Common patterns:
- Attempt 1: Configuration issues
- Attempt 2: Memory issues
- Attempt 3: Circular type dependencies
- Attempt 4: Actual type errors
- Attempt 5: Success!

Don't be discouraged - this is normal for large codebases.
```

---

## Alternative: Defer TypeScript Checking

**If after 3-5 attempts TypeScript checking is still failing:**

Consider deferring this phase and creating a follow-up issue:

```markdown
## Decision: Defer TypeScript Checking

**Attempts Made**: [N]
**Time Invested**: [X days]
**Remaining Issues**: [List]

**Rationale**:
The core NX migration is complete (Phases 1-4). TypeScript checking is an optimization that provides better type safety and IDE performance, but is not required for NX's core benefits (caching, affected detection, monorepo management).

**Recommendation**:
- Create issue to track TypeScript checking as future work
- Continue to Phase 6 for final polish
- Revisit TypeScript checking in 1-2 quarters

**Issue Created**: [Link to GitHub/Jira issue]
```

This is a valid decision. Banana and global-components both took multiple attempts over several weeks.

---

## Phase 5 Complete Checklist

Consider Phase 5 complete when **either**:

**Option A: TypeScript Checking Enabled**
- [ ] All libraries have typecheck target
- [ ] Running `pnpm typecheck` succeeds
- [ ] Running `pnpm typecheck:affected` works
- [ ] CI includes type checking
- [ ] All type errors are resolved
- [ ] Changes are committed

**Option B: TypeScript Checking Deferred**
- [ ] 3-5 attempts have been made
- [ ] Issues are documented
- [ ] Decision to defer is documented
- [ ] Follow-up issue is created
- [ ] Team is informed

**Either option is acceptable to proceed to Phase 6.**

**Next Phase**: [Phase 6: Final Polish](./phase-6-polish.md)
