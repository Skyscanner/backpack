// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A103
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/flight.d.ts
// component=BpkSmallFlightIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFlightIcon",
    imports: [
      "import BpkSmallFlightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/flight';",
    ],
    example: figma.code`<BpkSmallFlightIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFlightIcon",
    imports: [
      "import BpkLargeFlightIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flight';",
    ],
    example: figma.code`<BpkLargeFlightIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFlightIcon",
    imports: [
      "import BpkLargeFlightIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flight';",
    ],
    example: figma.code`<BpkLargeFlightIcon />`,
  }
}

export default template
