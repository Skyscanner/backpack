// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A11
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/aircraft.d.ts
// component=BpkSmallAircraftIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAircraftIcon",
    imports: [
      "import BpkSmallAircraftIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/aircraft';",
    ],
    example: figma.code`<BpkSmallAircraftIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAircraftIcon",
    imports: [
      "import BpkLargeAircraftIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/aircraft';",
    ],
    example: figma.code`<BpkLargeAircraftIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAircraftIcon",
    imports: [
      "import BpkLargeAircraftIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/aircraft';",
    ],
    example: figma.code`<BpkLargeAircraftIcon />`,
  }
}

export default template
