# Plans & Roadmap

## Active Execution Plans

See [`exec-plans/active/`](./exec-plans/active/) for currently in-progress initiatives.

## Completed Plans

See [`exec-plans/completed/`](./exec-plans/completed/) for archived execution plans.

## Architectural Decision Records

All architectural decisions are documented in [`decisions/`](../decisions/). See the [template](../decisions/TEMPLATE.md) for the format.

Key active decisions:
- [Modern Sass API](../decisions/modern-sass-api.md) - `@use`/`@forward` migration
- [Versioning Rules](../decisions/versioning-rules.md) - Semantic versioning policy
- [Release Schedule](../decisions/release-schedule.md) - Quarterly major releases

## Release Schedule

Major versions are released quarterly (starting Q4 2024):

| Quarter | Version | Target |
|---------|---------|--------|
| Q1 2025 | v37 | March 2025 |
| Q2 2025 | v38 | June 2025 |
| Q3 2025 | v39 | September 2025 |

## Proposing New Plans

1. Create a new markdown file in `exec-plans/active/`
2. Include: goal, scope, timeline, affected packages, migration path
3. Reference any related ADRs in `decisions/`
4. Move to `exec-plans/completed/` when done

## Tech Debt

See [`exec-plans/tech-debt-tracker.md`](./exec-plans/tech-debt-tracker.md) for tracked technical debt items.
