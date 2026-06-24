// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6482%3A45
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/center-location.d.ts
// component=BpkSmallCenterLocationIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCenterLocationIcon",
    imports: [
      "import BpkSmallCenterLocationIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/center-location';",
    ],
    example: figma.code`<BpkSmallCenterLocationIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCenterLocationIcon",
    imports: [
      "import BpkLargeCenterLocationIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/center-location';",
    ],
    example: figma.code`<BpkLargeCenterLocationIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCenterLocationIcon",
    imports: [
      "import BpkLargeCenterLocationIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/center-location';",
    ],
    example: figma.code`<BpkLargeCenterLocationIcon />`,
  }
}

export default template
