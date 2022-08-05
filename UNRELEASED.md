**Breaking:**

- Deleted the following deprecated components:
  - `bpk-component-navigation-stack`
  - `PortalV1` (in `bpk-react-utils`)

- Dropped support for React versions < 17. No new functionality is introduced, but from this point forwards it should not be assumed React 16 will work.

**Changed:**

- bpk-component-badge:
  - Updated Badge styles to use `Caption` instead of bold.

- bpk-component-breakpoint:
  - Updated `react-responsive` dependency to 8.2.0. This requires `React` 16.8.0 or higher.