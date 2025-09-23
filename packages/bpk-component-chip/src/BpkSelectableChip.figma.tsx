
import figma from "@figma/code-connect"

import BpkSelectableChip from "./BpkSelectableChip"

figma.connect(
  BpkSelectableChip,
  "https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=6730%3A6807",
  {
    props: {
      label: figma.string("Label"),
      type: figma.enum("Style", {
        Default: "default",
        "On Dark": "on-dark",
        "On Image": "on-image",
      }),
      icon: figma.boolean("Icon"),
      disabled: figma.enum("State", {
        Disabled: true,
        Default: false,
      }),
    },
    example: ({ disabled, label, type }) =>
      <BpkSelectableChip onClick={() => {}} accessibilityLabel={label} type={type} disabled={disabled} >{label}</BpkSelectableChip>
  },
)
