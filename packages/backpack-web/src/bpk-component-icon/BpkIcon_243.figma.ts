// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A239
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/trips.d.ts
// component=BpkSmallTripsIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallTripsIcon",
    imports: [
      "import BpkSmallTripsIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/trips';",
    ],
    example: figma.code`<BpkSmallTripsIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeTripsIcon",
    imports: [
      "import BpkLargeTripsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/trips';",
    ],
    example: figma.code`<BpkLargeTripsIcon />`,
  }
} else {
  template = {
    id: "BpkLargeTripsIcon",
    imports: [
      "import BpkLargeTripsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/trips';",
    ],
    example: figma.code`<BpkLargeTripsIcon />`,
  }
}

export default template
