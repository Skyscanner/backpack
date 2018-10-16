# Support for Tracking

The type ramp system uses the following values for tracking:

font size | letter Spacing in sketch | letter Spacing Android
|--------|-------|-----|
10	| 0.4 |0.04000
12	| 0   |0
14	| 0   |0
16	| -0.2|-0.01250
20	| -0.4|-0.02000
24	| -0.6|-0.02500
30	| -0.8|-0.02666
36	| -1.0|-0.02778
42	| -1.2|-0.02857
52  | -1.4|-0.02692
62  | -1.6|-0.02580
74  | -1.8|-0.02432

## Android

For Android the value for `letterSpacing` is calculated as

`letterSpacing` = `letterSpacing(Sketch)` / `font-size`

It does not produce 100% accurate results but the results are more maintainable and work independent of screen resolution than using pre-calculated values.

This [Sketch file](tracking-android.md) can be used to verify any changes to the values by changing the device screenshot.
