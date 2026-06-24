// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=8992%3A156
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/flame.d.ts
// component=BpkSmallFlameIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFlameIcon",
    imports: [
      "import BpkSmallFlameIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/flame';",
    ],
    example: figma.code`<BpkSmallFlameIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFlameIcon",
    imports: [
      "import BpkLargeFlameIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flame';",
    ],
    example: figma.code`<BpkLargeFlameIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFlameIcon",
    imports: [
      "import BpkLargeFlameIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flame';",
    ],
    example: figma.code`<BpkLargeFlameIcon />`,
  }
}

export default template
