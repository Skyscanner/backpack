// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A105
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/flight-landing.d.ts
// component=BpkSmallFlightLandingIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFlightLandingIcon",
    imports: [
      "import BpkSmallFlightLandingIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/flight-landing';",
    ],
    example: figma.code`<BpkSmallFlightLandingIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFlightLandingIcon",
    imports: [
      "import BpkLargeFlightLandingIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flight-landing';",
    ],
    example: figma.code`<BpkLargeFlightLandingIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFlightLandingIcon",
    imports: [
      "import BpkLargeFlightLandingIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flight-landing';",
    ],
    example: figma.code`<BpkLargeFlightLandingIcon />`,
  }
}

export default template
