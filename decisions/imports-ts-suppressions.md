# Untyped import statements TypeScript suppressions

## TL;DR

When using TypeScript in a file that imports from any untyped add a suppression like the below:

```ts
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { cssModules } from 'bpk-react-utils';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { helper } from 'some-external-untyped-package';
```

## Decision

Use `@ts-expect-error` inside of Backpack for untyped  imports.

Don't ask consumers to add suppressions where they consume Backpack.

For these suppression when the that file being suppressed is written in TypeScript `ts-expect-error` will error saying it is not needed, and the suppression should be removed.

## Thinking

At the time of this decision:

1. Backpack is dual published as a multi and single package library
2. Backpack is migrating from JS-with-Flow to TypeScript incrementally
3. Backpack is published non-transpiled
4. Backpack uses inline types, rather than emitting a declaration file along with a transpiled output

As Backpack is non-transpiled `backpack-react-scripts` (BRS) will transpile it at build time for consumers even though it is inside node modules. BRS also runs a type check at this time for any files it detects are using TypeScript, including in these non-transpiled node modules.

With no action `npm run build` or `npm run start` fail on this type check due to `noImplicitAny` in consumers picking up paths inside of Backpack that have no type declarations.

Two options exist here:

1. Suppress inside of consumers
2. Suppress inside of Backpack

### Option 1: Suppress inside of consumers

For (1) consumers can suppress by adding a stub declaration file per import like:

```ts
declare module '*/bpk-component-text';
declare module 'some-external-untyped-package';
```

This is more toil for consumers, and Backpack itself still also has to do this locally to pass its own repo's type check.

### Option 2: Suppress inside of Backpack

For (2) the ideal would be for consumers to benefit from Backpack's own declaration stubs, but unfortunately local testing does not show this to work, no matter where they are placed.

A secondary, temporary, solution is to use `ts-expect-error` to suppress per line inside Backpack.

```ts
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { cssModules } from 'bpk-react-utils';
```

This is read by TypeScript in consumers, and so all consumers benefit. It is ugly inside Backpack but is only temporary while Backpack is published non-transpiled, and will reduce even before then as more local files are migrated to TypeScript. `ts-expect-error` will error when a suppression is no longer required, prompting us to remove the suppression as all files are migrated to TypeScript.

While publishing non-transpiled, and still mid migration, Option 2 is preferred.

## Anything else

The path of `declare module '*/bpk-component-text'` is needed due to the fact that when published Backpack imports look different that what is in the Backpack repo in GitHub, while dual publishing as a multi and single package library. The code in GitHub is for the multi package variant, while the single package is transformed before publish.

Imports such as:

```ts
import { cssModules } from 'bpk-react-utils'`
```

get transformed to relative paths for Single Package consumers:

```ts
import { cssModules } from '../../bpk-react-utils';
```
