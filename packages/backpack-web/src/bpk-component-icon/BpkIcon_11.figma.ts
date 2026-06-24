// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A10
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/aircon.d.ts
// component=BpkSmallAirconIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAirconIcon",
    imports: [
      "import BpkSmallAirconIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/aircon';",
    ],
    example: figma.code`<BpkSmallAirconIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAirconIcon",
    imports: [
      "import BpkLargeAirconIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/aircon';",
    ],
    example: figma.code`<BpkLargeAirconIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAirconIcon",
    imports: [
      "import BpkLargeAirconIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/aircon';",
    ],
    example: figma.code`<BpkLargeAirconIcon />`,
  }
}

export default template
