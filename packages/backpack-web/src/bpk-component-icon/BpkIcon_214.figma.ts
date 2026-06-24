// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A211
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/single-booking.d.ts
// component=BpkSmallSingleBookingIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallSingleBookingIcon",
    imports: [
      "import BpkSmallSingleBookingIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/single-booking';",
    ],
    example: figma.code`<BpkSmallSingleBookingIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeSingleBookingIcon",
    imports: [
      "import BpkLargeSingleBookingIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/single-booking';",
    ],
    example: figma.code`<BpkLargeSingleBookingIcon />`,
  }
} else {
  template = {
    id: "BpkLargeSingleBookingIcon",
    imports: [
      "import BpkLargeSingleBookingIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/single-booking';",
    ],
    example: figma.code`<BpkLargeSingleBookingIcon />`,
  }
}

export default template
