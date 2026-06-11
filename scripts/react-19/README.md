# React 19 migration scripts

One-shot tooling used during the LOOM-2442 migration. Kept in the repo for
reproducibility; not part of the normal build/test pipeline.

## `transforms/strip-proptypes.js`

Custom jscodeshift transform that:

- **Phase A** (`.ts`/`.tsx` only): removes `Identifier.propTypes = { ... }`
  expression statements, `static propTypes` class fields, and the
  `import PropTypes from 'prop-types'` import (only when no other references
  to `PropTypes` remain in the file).
- **Phase B** (all files): converts function-component
  `Identifier.defaultProps = <ObjectExpression>` into ES6 destructure
  defaults at the function's parameter or top-of-body destructure point.
- **Phase C** (all files): reports class components with `static defaultProps`
  to stderr — manual migration required for consistency. Class-component
  `defaultProps` still apply in React 19 (only function-component
  `defaultProps` are ignored), but we want to remove them for future-proofing.

`.js`/`.jsx` files keep their `prop-types` in place because the project's
`react/prop-types` lint rule requires either prop-types or types for prop
validation, and most `.js` Flow components rely on prop-types. React 19
ignores `propTypes` silently, so leaving them is safe; full removal will
happen during the parallel TS migration.

## Running the transform

The codemod toolchain isn't installed by default — install it on demand:

```bash
npm install --save-dev --save-exact codemod@1.9.1 types-react-codemod@3.5.3
```

(types-react-codemod transitively pulls in jscodeshift, which is what we
actually need.)

Then run two passes:

```bash
# .ts / .tsx files
node ./node_modules/types-react-codemod/node_modules/jscodeshift/bin/jscodeshift.js \
  --transform scripts/react-19/transforms/strip-proptypes.js \
  --parser=tsx \
  --no-babel \
  --extensions=ts,tsx \
  --ignore-pattern '**/{node_modules,dist,build,storybook-static}/**' \
  packages libs/backpack-storybook-host/.storybook

# .js / .jsx files (Flow)
node ./node_modules/types-react-codemod/node_modules/jscodeshift/bin/jscodeshift.js \
  --transform scripts/react-19/transforms/strip-proptypes.js \
  --parser=babylon \
  --no-babel \
  --extensions=js,jsx \
  --ignore-pattern '**/{node_modules,dist,build,storybook-static}/**' \
  packages libs/backpack-storybook-host/.storybook
```

Skip messages (Phase B couldn't safely merge defaults; Phase C class
components; PropTypes-as-const-export files) go to stderr — capture with
`2>/tmp/skips.txt` for review.

When done, uninstall the codemod packages:

```bash
npm uninstall codemod types-react-codemod
```

## Tests

`transforms/strip-proptypes.test.js` covers phase routing, skip-paths, and
the stderr key annotations. Run with the built-in node test runner — no
Jest/dev-deps needed:

```bash
node scripts/react-19/transforms/strip-proptypes.test.js
```

The "happy-path" output of Phase B (rewriting `Foo.defaultProps = { x: 1 }`
into `{ x = 1 }`) is intentionally not asserted by the tests because it
depends on the recast version bundled with the jscodeshift used to invoke
the transform. The migration commit itself is the source of truth for that
output.

## Future home

This transform should ultimately move to
`web-migration-scripts/migrations/2026-05-react-19/transforms/`
once that migration directory is set up. Kept locally for now to give
LOOM-2442 reviewers a clear lineage of how the diff was generated.
