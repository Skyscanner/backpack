// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A123
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/hotels.d.ts
// component=BpkSmallHotelsIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallHotelsIcon",
    imports: [
      "import BpkSmallHotelsIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/hotels';",
    ],
    example: figma.code`<BpkSmallHotelsIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeHotelsIcon",
    imports: [
      "import BpkLargeHotelsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/hotels';",
    ],
    example: figma.code`<BpkLargeHotelsIcon />`,
  }
} else {
  template = {
    id: "BpkLargeHotelsIcon",
    imports: [
      "import BpkLargeHotelsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/hotels';",
    ],
    example: figma.code`<BpkLargeHotelsIcon />`,
  }
}

export default template
