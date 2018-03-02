# How we ignore `eslint` rules

## Decision
When ignoring `eslint` rules inside files, specify the rules being ignored. Where appropriate,
add a comment to explain why it's being ignored.

Disabling rules for entire files is discouraged. If it's necessary to do so, include a comment to explain the rationale.

### Examples
* `// eslint-disable-line max-len`
* `// eslint-disable-next-line no-alert`
* `/* eslint-disable no-console */` followed by `/* eslint-enable no-console */`

## Thinking

It's preferable to know exactly which rules are being ignored.
