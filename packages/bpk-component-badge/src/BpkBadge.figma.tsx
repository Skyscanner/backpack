import figma from "@figma/code-connect"

import BpkBadge, { BADGE_TYPES } from './BpkBadge';

figma.connect(
  BpkBadge,
  "https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=37974%3A344",
  {
    props: {
      style: figma.enum('Style', {
        "Normal": BADGE_TYPES.normal,
        "Success": BADGE_TYPES.success,
        "Warning": BADGE_TYPES.warning,
        "Critical": BADGE_TYPES.critical,
        "Inverse": BADGE_TYPES.inverse,
        "Outline": BADGE_TYPES.outline,
        "Brand": BADGE_TYPES.brand,
        "Strong": BADGE_TYPES.strong
      }),
    },
    example: ({ style }) => <BpkBadge type={style}>My badge</BpkBadge>,
  },
)
