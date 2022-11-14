# Storybook visual testing

## Decision
Components which use images (e.g. `BpkImage` or `BpkContentCards`) should not be visually tested. That is due to the fact that loading images on CI is flaky and will sometimes fail with differences which are not visible to the naked eye.