// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A122
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/hotel-flexible.d.ts
// component=BpkSmallHotelFlexibleIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallHotelFlexibleIcon",
    imports: [
      "import BpkSmallHotelFlexibleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/hotel-flexible';",
    ],
    example: figma.code`<BpkSmallHotelFlexibleIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeHotelFlexibleIcon",
    imports: [
      "import BpkLargeHotelFlexibleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/hotel-flexible';",
    ],
    example: figma.code`<BpkLargeHotelFlexibleIcon />`,
  }
} else {
  template = {
    id: "BpkLargeHotelFlexibleIcon",
    imports: [
      "import BpkLargeHotelFlexibleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/hotel-flexible';",
    ],
    example: figma.code`<BpkLargeHotelFlexibleIcon />`,
  }
}

export default template
