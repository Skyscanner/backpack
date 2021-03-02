# We can't use SVGs that include `fill-rule`

Whenever our icons contain the `fill-rule` property, they don't render correctly on iOS. This is because the process we use to convert SVGs into an icon font seems to strip out `fill-rule`.

We've updated the icons build process to strip out `fill-rule`. If the icon looks wrong after this is stripped out, you'll need to adjust the icon manually.

Using Illustrator, Inkscape or any other good tool for manipulating SVGs, select the inner sub-path of the SVG and reverse its winding order. For example, if the SVG is a mug, the inner sub-path would be the hole created by the mug's handle.

Be sure to feed any changes to the SVG back into the icon library on Figma so that the source of truth for icons contains this fix, for any future tweaks.

For more information on fill rules for SVGs, see [this article from O'Reilly](https://oreillymedia.github.io/Using_SVG/extras/ch06-fill-rule.html).
