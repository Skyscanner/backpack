# Sizing values are all specified in REM

## Decision
All spacing and sizing values should be defined using `rem`.

## Thinking
`px` is an absolute measure of size, so doesn't always respond well to changes in zoom level or font preferences.

`em` is based on the font-size of the parent element, so is not always consistent throughout a document.

`rem` provides the most consistent and flexible experience for travellers.

## More information

For more information please see the [blog post by Engage Interactive on EM, REM and PX](https://engageinteractive.co.uk/blog/em-vs-rem-vs-px) or [Snook's explanation](https://snook.ca/archives/html_and_css/font-size-with-rem).
