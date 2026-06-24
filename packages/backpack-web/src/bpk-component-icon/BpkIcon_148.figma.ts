// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A145
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/location.d.ts
// component=BpkSmallLocationIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallLocationIcon",
    imports: [
      "import BpkSmallLocationIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/location';",
    ],
    example: figma.code`<BpkSmallLocationIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeLocationIcon",
    imports: [
      "import BpkLargeLocationIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/location';",
    ],
    example: figma.code`<BpkLargeLocationIcon />`,
  }
} else {
  template = {
    id: "BpkLargeLocationIcon",
    imports: [
      "import BpkLargeLocationIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/location';",
    ],
    example: figma.code`<BpkLargeLocationIcon />`,
  }
}

export default template
