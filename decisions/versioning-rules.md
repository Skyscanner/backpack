<!-- Copy this to make your own decisions. -->

# Versioning approach for component releases

## TL;DR
<!-- Only if long enough to merit one. -->

## Decision
When we release Backpack packages, we use [semver](https://semver.org/) to ensure that changes made don't cause unexpected issues. The following reasoning should be followed.

### Major
For Major releases these would be changes that do the following:
- If changes are not backwards compatible.
- Breaking changes to components such as updating the API or visual changes.
- Changes to tokens such as changes to colours or changes to values such as padding/margins.
- Deprecation to tokens, components or API.
- Adding new functionality to a component.

### Minor
For Minor releases these would be changes that do the following:
- Changes where the updates are only in the Backpack component itself and not used publicly.
- Added new functionality to a component that didn't exist before and are not mandatory meaning there would be no impact on release.
- Adding a new icon that is not in used yet.
- Adding a new component to the Backpack library.

### Patch
- Only a dependency that a component uses needs an upgrade to improve functionality in the component.
- Bug fixes.
- Quality fixes such as `flow`, `eslint` or `prettier`.

## Thinking
The thinking behind this will align contributors on how to decide a release version for component development.
