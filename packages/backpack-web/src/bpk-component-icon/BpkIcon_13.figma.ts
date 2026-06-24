// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A12
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/airline.d.ts
// component=BpkSmallAirlineIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAirlineIcon",
    imports: [
      "import BpkSmallAirlineIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/airline';",
    ],
    example: figma.code`<BpkSmallAirlineIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAirlineIcon",
    imports: [
      "import BpkLargeAirlineIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/airline';",
    ],
    example: figma.code`<BpkLargeAirlineIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAirlineIcon",
    imports: [
      "import BpkLargeAirlineIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/airline';",
    ],
    example: figma.code`<BpkLargeAirlineIcon />`,
  }
}

export default template
