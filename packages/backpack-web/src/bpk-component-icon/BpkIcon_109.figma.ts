// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A106
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/flight-takeoff.d.ts
// component=BpkSmallFlightTakeoffIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFlightTakeoffIcon",
    imports: [
      "import BpkSmallFlightTakeoffIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/flight-takeoff';",
    ],
    example: figma.code`<BpkSmallFlightTakeoffIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFlightTakeoffIcon",
    imports: [
      "import BpkLargeFlightTakeoffIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flight-takeoff';",
    ],
    example: figma.code`<BpkLargeFlightTakeoffIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFlightTakeoffIcon",
    imports: [
      "import BpkLargeFlightTakeoffIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flight-takeoff';",
    ],
    example: figma.code`<BpkLargeFlightTakeoffIcon />`,
  }
}

export default template
