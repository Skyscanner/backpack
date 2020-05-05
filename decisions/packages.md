# `package.json`

Sometimes a dependency is in `package.json` and it's not immediately clear why, or maybe it's locked to a particular version.

As we can't add comments to `package.json` to explain these things, this file is a place to add any notes about dependencies.

## [`eslint_d`](https://www.npmjs.com/package/eslint_d)

We have this as a dependency to speed up `eslint`. It isn't called directly by any code, but it automatically integrates with some editors to make linting faster.
