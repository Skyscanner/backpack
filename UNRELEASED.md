# Unreleased

> Place your changes below this line.

**Added:**
- `bpk-component-button`:
  - Added new theming props for `border-radius` on both `normal` and `lg` buttons.
- `bpk-component-theme-toggle`:
  - Added theming properties to apply `border-radius` theme to buttons.
- `bpk-tokens`:
  - Added new tokens for `borderRadius` and `borderRadiusLg` for each button type.

**Changed:**
- `bpk-mixins`:
  - Changed `border-radius` on `_buttons.scss` to allow theming for button types.
- `bpk-theming`:
  - Removed the check that would not apply theming if all theme attributes were not provided. This will enable partial theming to be applied.
  - Updated the warning message to tell users that partial theming has been applied and also show which props are missing.

## How to write a good changelog entry

1. Add 'Breaking', 'Added' or 'Fixed' in bold depending on if the change will be major, minor or patch according to [semver](semver.org).
2. Add the package name.
3. Detail the changes. Write with the consumer in mind, what do they need to know. If it's patch, tell them what's changed. If it's minor, tell them what you've added and what it does for them. If it's breaking, tell them what they need to change. Link to examples on the [Backpack docs site](backpack.github.io) where possible.

Don't worry about adding the specific version number or the date. This will be done by a Backpack squad member as part of the release process.

## Example of a good changelog entry

See [`CHANGELOG.md`](CHANGELOG.md) for real-world examples of good changelog entries.

**Breaking:**

- `bpk-svgs`:
  - Replaced `charmeleon` icon with new `charizard` icon. To upgrade, replace your references to `charmeleon` with `charizard`.
  - Upgraded `fire` dependency to `3.0.0`.

**Added:**

- `bpk-component-infinity-gauntlet`:
  - New `timeStone` prop for controlling time. See &lt;link to docs site&gt;.

**Fixed:**

- `bpk-component-horcrux`:
  - Fixed issue where `BpkHorcrux` would occasionally possess the living.
