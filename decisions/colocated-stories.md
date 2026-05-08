# Colocated Storybook Stories

## TL;DR

Storybook stories live alongside their component source code in `packages/bpk-component-{name}/src/` rather than in a separate `examples/` directory.

## Decision

Stories are colocated with the component source at `packages/bpk-component-{name}/src/{ComponentName}.stories.tsx`. The Storybook config discovers stories via the glob `../packages/*/src/**/*.stories.@(ts|tsx|js|jsx)`.

Stories are excluded from the published npm package using `files` in each component's `package.json` (which only includes `src/**/*.ts`, `src/**/*.tsx`, etc. — not story files) or via `.npmignore`.

## Thinking

- **Discoverability**: developers find stories immediately next to the component they document, without navigating a parallel directory tree.
- **Maintenance**: renaming or moving a component naturally moves its stories too, reducing the chance of stale or orphaned story files.
- **Consistency**: tests are already colocated in `src/`; colocating stories follows the same convention.
- **Simpler imports**: story helper SCSS and component imports use shorter relative paths from the same directory.

## Anything else

The previous convention placed stories in `examples/bpk-component-{name}/`. Existing stories are being migrated in batches. When writing new stories, always use the colocated pattern.
