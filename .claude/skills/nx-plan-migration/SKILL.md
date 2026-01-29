---
name: nx-plan-migration
description: Analyze infrastructure and create component migration plan for NX adoption. Use when planning component migrations, checking migration readiness, or tracking progress.
argument-hint: [filter-pattern]
disable-model-invocation: true
allowed-tools: Read, Bash, Glob, Grep
---

## User Input

```text
$ARGUMENTS
```

## Overview

Analyze the codebase and create an executable component migration plan:

**Phase 0: Infrastructure Assessment** - Check if NX is ready
**Phase 2: Component Migration Planning** - Analyze dependencies and create priorities

For the complete 5-phase NX adoption roadmap, see: `docs/nx-adoption-guide.md`

## Steps

### 1. Assess NX Infrastructure (Phase 0)

**Check if NX is installed and configured:**

```bash
# Check if NX is installed
npx nx --version 2>/dev/null || echo "NX not installed"

# Check for nx.json (workspace configuration)
test -f nx.json && echo "✅ nx.json exists" || echo "❌ nx.json missing"

# Check for base configuration files
test -f jest.preset.js && echo "✅ jest.preset.js exists" || echo "❌ missing"
test -f .eslintrc.base.js && echo "✅ .eslintrc.base.js exists" || echo "❌ missing"
test -f tsconfig.base.json && echo "✅ tsconfig.base.json exists" || echo "❌ missing"

# Check if tsconfig.base.json has paths configured
grep -q '"paths"' tsconfig.base.json && echo "✅ Path mappings configured" || echo "❌ No path mappings"

# Check for NX-related scripts in root package.json
grep -A 5 '"scripts"' package.json | grep -q 'nx' && echo "✅ NX scripts configured" || echo "⚠️ No NX scripts"
```

**Determine readiness:**
- If NX not installed → **NOT READY** - See Phase 1 in `docs/nx-adoption-guide.md`
- If NX installed but no components migrated → **READY** - Proceed with Phase 2
- If some components migrated → **IN PROGRESS** - Continue Phase 2
- If all migrated → **COMPLETE** - See Phases 3-5 in adoption guide

### 2. Count Migration Status

```bash
# Count total packages
total=$(find packages -maxdepth 1 -type d | tail -n +2 | wc -l)

# Find packages with NX config (have "nx" field in package.json)
migrated=$(find packages -name "package.json" -exec grep -l '"nx"' {} \; | wc -l)

# Calculate remaining
remaining=$((total - migrated))

echo "Total: $total, Migrated: $migrated, Remaining: $remaining"
```

### 3. List Unmigrated Components

```bash
# List unmigrated components (no package.json OR no "nx" field)
for dir in packages/*/; do
  pkg="$dir/package.json"
  if [ ! -f "$pkg" ] || ! grep -q '"nx"' "$pkg"; then
    basename "$dir"
  fi
done
```

### 4. Categorize by Type

```bash
# Find components (bpk-component-*)
ls -d packages/bpk-component-* 2>/dev/null | wc -l

# Find special build components (have gulp tasks)
ls -d gulpfile.js/bpk-component-* 2>/dev/null | sed 's|gulpfile.js/||'

# Find other packages (utilities, stylesheets, etc.)
ls -d packages/bpk-* 2>/dev/null | grep -v "bpk-component-"
```

### 5. Analyze Dependencies

For each unmigrated component, check what it imports:

```bash
# Example: Find imports from other packages
grep -r "from.*packages/" packages/bpk-component-example/src/ 2>/dev/null | \
  grep -o "packages/[^'\"]*" | sort -u
```

**Build dependency map:**
- Components with **no dependencies on unmigrated** → Priority 1
- Components depending **only on migrated** → Priority 2
- Components with **unmigrated dependencies** → Priority 3
- Components with **circular dependencies** → Flag as blocked

### 6. Check Special Requirements

**Identify gulp-based components:**
```bash
ls -d gulpfile.js/bpk-component-* 2>/dev/null
```

These need special build config (icon, spinner, flare).

**Find components without index.ts:**
```bash
for dir in packages/bpk-component-*/; do
  if [ ! -f "$dir/index.ts" ]; then
    echo "$(basename "$dir") - missing index.ts"
  fi
done
```

### 7. Generate Component Migration Plan

Create prioritized lists based on analysis:

#### Priority 1: Independent (Ready Now)
Components that:
- Don't import from unmigrated packages
- Have simple structure
- No special build requirements

**Action:** Migrate immediately in batches of 10-15

#### Priority 2: Waiting on Dependencies
Components that:
- Only import from already-migrated packages
- Become available after Priority 1

**Action:** Migrate after Priority 1 batches complete

#### Priority 3: Complex
Components that:
- Have gulp build tasks
- Are imported by many others (migrate early to unblock)
- Have many dependencies

**Action:** Handle with care, may need special configuration

#### Blocked
Components that:
- Have circular dependencies with unmigrated components
- Missing required files (index.ts)
- Other blockers

**Action:** Resolve issues before migrating

### 8. Recommend Batches

Suggest specific batches for migration:

**Week 1:**
- Batch 1: First 10 from Priority 1
- Batch 2: Next 10 from Priority 1

**Week 2:**
- Batch 3: Priority 2 components (dependencies now satisfied)
- Batch 4: High-impact components from Priority 3

**Week 3+:**
- Remaining components by priority
- Handle blocked components last

## Output Format

Present the plan in this structure:

```markdown
# NX Component Migration Plan

## Infrastructure Status

✅ **READY FOR MIGRATION**
- NX installed: version X.X.X
- Base configs: ✅ nx.json, jest.preset.js, .eslintrc.base.js, tsconfig.base.json
- Path mappings: ✅ 3 configured

OR

❌ **NOT READY - Infrastructure Setup Needed**
- See Phase 1 in `docs/nx-adoption-guide.md`
- Required: Install NX and create base configs

---

## Migration Progress

- **Total packages:** 97
- **Already migrated:** 3 (3%)
  - badge ✅
  - chip ✅
  - chip-group ✅
- **Remaining:** 94 (97%)
  - Standard components: 83
  - Special build (gulp): 3
  - Utility packages: 8

---

## Priority 1: Independent Components (Ready Now)

**23 components with no dependencies** - Can migrate immediately

1. bpk-component-accordion
2. bpk-component-aria-live
3. bpk-component-avatar
4. bpk-component-banner-alert
5. bpk-component-blockquote
... (list all 23)

**Recommended Action:**
```bash
# Migrate first batch of 10
/nx-migrate-component bpk-component-accordion
/nx-migrate-component bpk-component-aria-live
... (or use /nx-migrate-batch when available)
```

**Estimated Time:** 10 components = 2-3 hours
**Risk:** Low (no dependencies)

---

## Priority 2: Depends on Migrated Only

**18 components** - Available after Priority 1

1. bpk-component-card (imports: badge, chip)
2. bpk-component-dialog (imports: chip)
3. bpk-component-modal (imports: badge)
... (list all 18)

**Recommended Action:** Migrate after Priority 1 complete

---

## Priority 3: Complex Components

### Special Build Requirements (3 components)
⚠️ These require gulp tasks in build config:

1. **bpk-component-icon** (gulp generateIcons)
2. **bpk-component-spinner** (gulp generateSpinners)
3. **bpk-component-flare** (gulp generateFlare)

**Note:** Use special build configuration (see `/nx-migrate-component` skill docs)

### High-Impact Components
🎯 Migrate these early to unblock others:

1. **bpk-component-button** (imported by 32 components)
2. **bpk-component-text** (imported by 28 components)
3. **bpk-component-link** (imported by 20 components)

**Recommended Action:** Migrate in Week 2-3, handle carefully

---

## Blocked Components

### Circular Dependencies
⚠️ **bpk-component-X ↔ bpk-component-Y**
- These import each other
- **Action:** Migrate together in same session

### Missing Files
❌ **bpk-component-Z** (no index.ts)
- **Action:** Create index.ts before migration

---

## Recommended Migration Schedule

### Week 1: Quick Wins (20 components)
- [ ] **Batch 1:** Components 1-10 from Priority 1
  - Estimated: 2-3 hours
  - Risk: Low

- [ ] **Batch 2:** Components 11-20 from Priority 1
  - Estimated: 2-3 hours
  - Risk: Low

**Commands:**
```bash
/nx-migrate-component bpk-component-accordion
/nx-migrate-component bpk-component-aria-live
... (repeat for each)
```

### Week 2: Building Momentum (20 components)
- [ ] **Batch 3:** Remaining Priority 1 (3 components)
- [ ] **Batch 4:** Priority 2 components (10 components)
- [ ] **Batch 5:** High-impact Priority 3 (7 components: button, text, link, etc.)

### Week 3: Complex Components (20 components)
- [ ] **Batch 6:** Special build components (icon, spinner, flare)
- [ ] **Batch 7:** Remaining Priority 2 (17 components)

### Week 4: Final Push (34 components)
- [ ] **Batch 8-10:** Remaining components
- [ ] **Handle blocked:** Resolve circular deps and missing files

---

## Next Steps

### 1. If Infrastructure NOT Ready
📚 See `docs/nx-adoption-guide.md` Phase 1 for setup instructions

### 2. If Ready to Migrate
Start with Batch 1:
```bash
/nx-migrate-component bpk-component-accordion
```

Repeat for all 10 components in Batch 1

### 3. After Each Batch
- Validate: `npx nx build @backpack/<name>` for each
- Track progress: Re-run `/nx-plan-migration`
- Commit changes

### 4. For Full Adoption Plan
📚 See `docs/nx-adoption-guide.md` for:
- Phase 1: Infrastructure setup
- Phase 3: Validation & optimization
- Phase 4: CI/CD integration
- Phase 5: Documentation & team onboarding

---

## Resources

- **Migration Tools:**
  - `/nx-migrate-component <name>` - Migrate single component
  - `/update-import-paths <name> <alias>` - Fix import paths
  - `/nx-validate-migration <name>` - Validate migration (when available)

- **Documentation:**
  - [Complete NX Adoption Guide](../../../docs/nx-adoption-guide.md)
  - [NX Migration Skill Docs](.claude/skills/nx-migrate-component/README.md)

- **Tracking Progress:**
  - Re-run this command after each batch
  - Watch Priority 2 list grow as dependencies satisfied
  - Track completion percentage
```

## Notes

- **Focus on Phase 0 + Phase 2** - This skill is for infrastructure check and component planning
- **Phase 1, 3, 4, 5** - See `docs/nx-adoption-guide.md` for complete roadmap
- **Actionable** - Provides exact commands to run
- **Prioritized** - Based on dependencies, not alphabetically
- **Realistic** - Includes time estimates and risk assessment
- **Trackable** - Re-run after batches to see progress

## Tips

- **Start with Priority 1** - Independent components are low-risk quick wins
- **Batch size 10-15** - Manageable chunks, easier to validate
- **Validate frequently** - After each batch, not at the end
- **Track progress** - Re-run `/nx-plan-migration` to see updated priorities
- **High-impact early** - Migrate components used by many others early to unblock
