// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A14
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/airports.d.ts
// component=BpkSmallAirportsIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAirportsIcon",
    imports: [
      "import BpkSmallAirportsIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/airports';",
    ],
    example: figma.code`<BpkSmallAirportsIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAirportsIcon",
    imports: [
      "import BpkLargeAirportsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/airports';",
    ],
    example: figma.code`<BpkLargeAirportsIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAirportsIcon",
    imports: [
      "import BpkLargeAirportsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/airports';",
    ],
    example: figma.code`<BpkLargeAirportsIcon />`,
  }
}

export default template
