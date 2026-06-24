// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A42
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/car-wash.d.ts
// component=BpkSmallCarWashIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCarWashIcon",
    imports: [
      "import BpkSmallCarWashIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/car-wash';",
    ],
    example: figma.code`<BpkSmallCarWashIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCarWashIcon",
    imports: [
      "import BpkLargeCarWashIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/car-wash';",
    ],
    example: figma.code`<BpkLargeCarWashIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCarWashIcon",
    imports: [
      "import BpkLargeCarWashIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/car-wash';",
    ],
    example: figma.code`<BpkLargeCarWashIcon />`,
  }
}

export default template
