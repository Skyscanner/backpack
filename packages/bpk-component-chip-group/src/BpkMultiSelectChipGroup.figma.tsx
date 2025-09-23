
import figma from "@figma/code-connect"

import BpkMultiSelectChipGroup, { CHIP_GROUP_TYPES } from "./BpkMultiSelectChipGroup"

const chips = [
  {
    text: 'London',
  },
  {
    text: 'Berlin',
    selected: true,
  },
  {
    text: 'Florence',
  },
];

figma.connect(
  BpkMultiSelectChipGroup,
  "https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=30119%3A41723",
  {
    props: {
    },
    example: (props) => (
       <BpkMultiSelectChipGroup
          {...props}
          chips={chips.map((chip, index) => ({
            ...chip,
            selected: false,
            onClick: () => {},
          }))}
        type={CHIP_GROUP_TYPES.rail}
        leadingNudgerLabel=""
        trailingNudgerLabel=""
      />
    ),
  },
)
