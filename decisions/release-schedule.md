# Release Schedule

## Decision
Starting Q4 2024, a major version of the @skyscanner/backpack-web package is released approximately every 3 months, typically at the end of each quarter.

### Current Release Schedule

### 2024-2025

| Major Changes Window | Release Window | Backpack-web      |
|----------------------|----------------|-------------------|
| Sep 2024 and before  | December 2024  | 36.x              |
| Sep - Dec 2024       | March 2025     | 37.x              |
| Jan - March 2025     | June 2025      | 38.x              |
| Apr - June 2025      | Sep 2025       | 39.x              |
| July - Sep 2025      | December 2025  | 40.x              |

!!! note
    The first column of the table above indicates the period during which a major change might be introduced into the code in a backwards-compatible way before being released in a major version. However, this period may vary depending on the complexity of the change, and a change might be introduced *before* the specified period, allowing consumers a longer adoption period.

## FAQ

### What about minor and patch releases?

Minor and patch versions are released throughout the year whenever requested by consumers.

### I want to contribute a breaking change to a backpack component. What should I do?

Major changes **MUST** always be introduced in a backwards-compatible manner using [future](future-api.md) or a [deprecated](deprecated-api.md) flags. These changes **MUST** only be released as part of a major release during the designated time for major releases.

### I want to contribute a breaking change to a backpack component  and start using it immediately. What should I do?

You can use [future flags](future-api.md) to contribute your change and adopt it without waiting for the next major release.

### When will these changes become the default?

There **MUST** be a minimum of 3 months between the introduction of a change under a `future` or `deprecated` flag and its release in a major version.

