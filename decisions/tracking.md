# Support for Tracking

Type-ramp system has following values for tracking

font size | letter Spacing
|--------|-------|
10	| 0.4
12	| 0
14	| 0
16	| -0.2
20	| -0.4
24	| -0.6
30	| -0.8
36	| -1.0
42	| -1.2
52  | -1.4
62  | -1.6
74  | -1.8

## Android

For android the value for `letterSpacing` is calculated as

`letterSpacing` = `letterSpacing` / `font-size`

It does not produce 100% accurate results but the results are more maintainable and work independent of screen resolution than using pre-calculated values.

This [Sketch file](tracking-android.md) can be used to verify any changes to the values by changing the device screenshot.
