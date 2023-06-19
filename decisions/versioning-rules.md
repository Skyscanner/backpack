# Versioning approach for component releases

## Decision
When we release Backpack packages, we use [semver](https://semver.org/) to ensure that changes made don't cause unexpected issues. The following reasoning should be followed.

### Major
A change is `major` if:
- Changes are not backwards compatible.
- Breaking changes to components such as updating the API or visual changes.
- Changes to tokens such as changes to colours or changes to values such as padding/margins.
- Removal of tokens, components or API.
- Adding new functionality to a component.

### Minor
A change is `minor` if:
- Changes where the updates are only in the Backpack component itself and not used publicly.
- Added new functionality to a component that didn't exist before and are not mandatory meaning there would be no impact on release.
- Adding a new icon that is not in used yet.
- Adding a new component to the Backpack library.
- Deprecation to tokens, components or API.

### Patch
A change is `patch` if:
- Only a dependency that a component uses needs an upgrade to improve functionality in the component.
- Bug fixes.
- Quality fixes such as `eslint` or `prettier`.

## Thinking
[You can find out more about the benefits of `semver` on `semver.org`](https://semver.org/#why-use-semantic-versioning)
