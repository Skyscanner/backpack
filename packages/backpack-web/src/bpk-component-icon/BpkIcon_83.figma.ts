// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A81
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/eco-leaf.d.ts
// component=BpkSmallEcoLeafIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallEcoLeafIcon",
    imports: [
      "import BpkSmallEcoLeafIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/eco-leaf';",
    ],
    example: figma.code`<BpkSmallEcoLeafIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeEcoLeafIcon",
    imports: [
      "import BpkLargeEcoLeafIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/eco-leaf';",
    ],
    example: figma.code`<BpkLargeEcoLeafIcon />`,
  }
} else {
  template = {
    id: "BpkLargeEcoLeafIcon",
    imports: [
      "import BpkLargeEcoLeafIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/eco-leaf';",
    ],
    example: figma.code`<BpkLargeEcoLeafIcon />`,
  }
}

export default template
