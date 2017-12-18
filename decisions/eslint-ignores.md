# How we ignore `eslint` rules

## Decision
When ignoring `eslint` rules inside files, specify the rules being ignored. Where appropriate,
add a comment to explain why it's being ignored.

### Examples
* `// eslint-disable-line max-len`
* `// eslint-disable-next-line no-alert`
* `/* eslint-disable no-console */` followed by `/* eslint-enable no-console */`

## Thinking

It's preferable to know exactly which rules are being ignored.
