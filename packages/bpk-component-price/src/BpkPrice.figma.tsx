import figma from "@figma/code-connect"

import BpkPrice from "./BpkPrice"
import { SIZES, ALIGNS } from './common-types'


figma.connect(
  BpkPrice,
  "https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=16470%3A17021",
  {
    props: {
      price: figma.string("Price"),
      size: figma.enum("Size", {
        "X-Small": SIZES.xsmall,
        Small: SIZES.small,
        Large: SIZES.large,
      }),
      align: figma.enum("Alignment", {
        Left: ALIGNS.left,
        Right: ALIGNS.right,
      }),
      trailingText: figma.string('Trailing text'),
    },
    example: ({ align, price, size, trailingText }) => (
      <BpkPrice price={price} size={size} align={align} trailingText={trailingText} />
    ),
  },
)
