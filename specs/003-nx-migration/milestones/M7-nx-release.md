# M7: Publishing with Nx

**Priority**: P3
**Est. Effort**: Medium
**Complexity**: Medium
**Status**: ⚠️ OPTIONAL

> **Note**: This milestone is optional and can be deferred. The existing release process works and can continue to be used. Adopt this when Production Standard compliance is required or when the benefits of `nx release` outweigh migration effort.

## Overview

Migrate from the current `npm publish` release workflow to `nx release` for automated versioning, changelog generation, and publishing.

## Why This Milestone?

### Strategic Context

The Production Standard mandates that all Web libraries use Nx to manage releases. `nx release` provides:

- **Conventional Commits**: Automatic version bumping based on commit messages
- **Changelog Generation**: Auto-generated changelogs in GitHub Releases
- **Git Tags**: Version stored in git tags rather than package.json
- **Audit Trail**: Clear, automated release process

### Why We Need Each Step

| Step | Why It's Needed |
|------|-----------------|
| Configure `nx.json` release settings | Tells Nx how to version, tag, and publish the package |
| Enforce conventional commits | Required for automatic version determination (feat → minor, fix → patch, BREAKING → major) |
| Run `nx release --dry-run` | Validates configuration without actually publishing |
| Shadow release workflow | Tests the full release process on a non-critical branch |
| Update production workflow | Replaces `npm publish` with `nx release` in GitHub Actions |

### What Happens If We Skip This?

Without `nx release`:
- Current release process continues working
- Not compliant with Production Standard for npm library releases
- Manual changelog maintenance required
- No automatic version bumping

### Why It's Optional

This milestone is marked optional because:
- Existing release workflow is functional
- Migration requires careful configuration to avoid broken releases
- Production Standard compliance may have flexible timeline
- Can be done independently of other Nx features

---

## User Story

As a Backpack maintainer, I want releases to be managed by `nx release` so that versioning, changelog generation, and publishing align with the Production Standard requirements.

---

## Acceptance Scenarios

1. **Given** `nx.json` is configured with release settings, **When** `nx release` is run, **Then** version is bumped based on conventional commits

2. **Given** commits follow conventional format, **When** `nx release` generates changelog, **Then** changes are correctly categorized (feat, fix, breaking)

3. **Given** a release is triggered, **When** `nx release` completes, **Then** git tags are created and package is published to npm

4. **Given** shadow release workflow exists, **When** run on non-critical branch, **Then** release process validates without actual publication

---

## Verification Criteria

- [ ] `nx.json` includes release configuration
- [ ] Conventional commits enforced (commitizen/husky or CI checks)
- [ ] `nx release --dry-run` produces expected output
- [ ] Shadow release workflow validates on test branch
- [ ] Production workflow updated to use `nx release`
- [ ] Changelogs generated correctly
- [ ] Git tags created on release
- [ ] npm publication successful

---

## Current vs Target Release Process

### Current Process

```
Developer → PR Merged → GitHub Actions → npm publish → Done
                            │
                            └── Manual: Update version in package.json
                            └── Manual: Write changelog entry
```

### Target Process with `nx release`

```
Developer → PR Merged → GitHub Actions → nx release → Done
                            │
                            └── Auto: Version from commits
                            └── Auto: Changelog from commits
                            └── Auto: Git tag created
                            └── Auto: npm publish
```

---

## Configuration Example

In `nx.json`:
```json
{
  "release": {
    "projectsRelationship": "independent",
    "changelog": {
      "workspaceChangelog": {
        "file": false,
        "createRelease": "github"
      }
    },
    "version": {
      "conventionalCommits": true
    },
    "git": {
      "commit": true,
      "tag": true
    }
  }
}
```

---

## Conventional Commit Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

| Type | Version Bump | Example |
|------|--------------|---------|
| `feat` | Minor | `feat(button): add loading state` |
| `fix` | Patch | `fix(card): correct border radius` |
| `BREAKING CHANGE` | Major | `feat(api)!: change prop interface` |
| `chore`, `docs`, etc. | None | `chore: update dependencies` |

---

## Migration Steps

1. **Configure Nx release** in `nx.json`
2. **Set up commitlint** to enforce conventional commits
3. **Create shadow release workflow** on test branch
4. **Validate** changelog and version output
5. **Update production workflow** to use `nx release`
6. **Document** new release process for contributors

---

## Risks to Monitor

| Risk | Impact | Mitigation |
|------|--------|------------|
| Misconfigured version bumping | Wrong version published | Test extensively with `--dry-run` |
| Missing changelog entries | Incomplete release notes | Verify commit format before merge |
| Git tag conflicts | Release fails | Use unique tag format; clean up stale tags |
| npm auth issues | Publish fails | Verify token configuration in CI |

---

## Rollback Plan

If issues arise:
1. Revert GitHub Actions to use `npm publish`
2. Remove `nx release` configuration from `nx.json`
3. Continue with manual versioning process

---

## Dependencies

- M1: Nx Initialization (Nx must be installed)
- M5: Static Checks via Nx (recommended for consistency)

## Blocks

- None (this is an optional leaf milestone)
