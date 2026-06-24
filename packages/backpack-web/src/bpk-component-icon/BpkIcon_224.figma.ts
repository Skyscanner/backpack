// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A221
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/stops.d.ts
// component=BpkSmallStopsIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallStopsIcon",
    imports: [
      "import BpkSmallStopsIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/stops';",
    ],
    example: figma.code`<BpkSmallStopsIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeStopsIcon",
    imports: [
      "import BpkLargeStopsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/stops';",
    ],
    example: figma.code`<BpkLargeStopsIcon />`,
  }
} else {
  template = {
    id: "BpkLargeStopsIcon",
    imports: [
      "import BpkLargeStopsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/stops';",
    ],
    example: figma.code`<BpkLargeStopsIcon />`,
  }
}

export default template
