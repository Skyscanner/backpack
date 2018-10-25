# Unreleased

**Added:**

- react-native-bpk-component-text:
  - Added `weight` prop to control font weight. `emphasize` is now deprecated and will be removed in a future version. Use `weight="emphasized"` to emphasise text from now on.

**Breaking:**

- bpk-svgs:
  - Icons renamed:
  - bws--call-back => call-back
  - bws--end-call => end-call
  - bws--keypad => keypad
  - bws--mute => mute
  - bws--phone-call => phone-call
  - bws--send-message => send-message
  - bws--un-mute => unmute
  - send-message icon replaced with new version

- bpk-tokens:
  - Token values updated to support new type scale.

**Added:**

- bpk-component-infinite-scroll:
  - Added possibility to have different number of elements loaded on load and on scroll
