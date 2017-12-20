# Adding types

## Decision
All components should have Flow types _as well as_ `prop-types`. If you come across a file or component that isn't Flow
typed, submit a separate PR to add types to it (alongside any associated tests, `index.js` entry points or `stories.js`
files). Don't include the type changes in the same PR as the original work.

## Thinking
Consumers might not have adopted Flow yet, meaning we still want them to benefit from `prop-types` run time warnings.

Regarding the idea behind separate PRs - this is simply because we want to keep them small and we feel that including
type changes in the same PR will bloat them.

## Anything else
**Note:** You don't need to add `prop-types` for internal-only components - we can rely on Flow solely in this case.
