# Future API

## What is it?

Future API is a part of the library that is expected to become the default **AND BREAKING** in a following major version. It is available for consumption on opt-in basis.

The main purpose of the Future API is to allow for breaking changes to be contributed in a backwards-compatible way, providing consumers with enough time to adopt these changes before they become the default.

## How to add/modify/delete?

* You **MUST** always introduce breaking changes in a backwards-compatible way via the `future` flags (or [deprecated flags](deprecated-api.md) if applicable).
* Future props and arguments **MUST** always be optional
* Future API **MUST** follow the naming convention below
* Future flags will be removed by the owners of backpack repository when preparing for a major release.
* Future API **MUST NOT** introduce any breaking change to the default behaviour or appearance of any part of the Stable API
* There **SHOULD** always be a minimum of 3 months between marking and releasing a feature under a `future` flag and releasing it as the default behaviour in a major version; until then both behaviours should coexist simultaneously.

## How to use?
* You **SHOULD** aim to opt in to Future API as soon as possible

## Naming Convention

* We use `v{number}__` prefix with two underscores (where applicable) to mark functions, tokens and properties as part of the Future API, and
* We use `V{number}` prefix to mark React components and props as part of the Future API, where `number` represents the GC library version in which the change will be released as a breaking change.
    * **Component**: `BpkButton` -> `<V10BpkButton />`
        * For any major changes to an existing component where creating a separate component is easier (from consumer or owner perspective) than making the changes directly to the old component e.g. major API rewrite, default style or behaviour of a component changes etc.
    * **Function**: `v10__functionName`
    * **Props**: `v10__propertyName?: value;` for a prop that will be required in the next major version
