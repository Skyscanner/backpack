**Fixed:**

- `bpk-react-utils`
  - Updated `isDeviceIphone`, `isDeviceIpad` and `isDeviceIOS` to use `window.navigator.userAgent` instead of `window.navigator.platform` to determine the device type. This is because `window.navigator.platform` has implementation between browsers and is not reliable.