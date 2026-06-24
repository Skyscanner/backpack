// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A104
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/flight-flexible.d.ts
// component=BpkSmallFlightFlexibleIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFlightFlexibleIcon",
    imports: [
      "import BpkSmallFlightFlexibleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/flight-flexible';",
    ],
    example: figma.code`<BpkSmallFlightFlexibleIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFlightFlexibleIcon",
    imports: [
      "import BpkLargeFlightFlexibleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flight-flexible';",
    ],
    example: figma.code`<BpkLargeFlightFlexibleIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFlightFlexibleIcon",
    imports: [
      "import BpkLargeFlightFlexibleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flight-flexible';",
    ],
    example: figma.code`<BpkLargeFlightFlexibleIcon />`,
  }
}

export default template
