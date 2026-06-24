// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A66
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/collapse.d.ts
// component=BpkSmallCollapseIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCollapseIcon",
    imports: [
      "import BpkSmallCollapseIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/collapse';",
    ],
    example: figma.code`<BpkSmallCollapseIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCollapseIcon",
    imports: [
      "import BpkLargeCollapseIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/collapse';",
    ],
    example: figma.code`<BpkLargeCollapseIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCollapseIcon",
    imports: [
      "import BpkLargeCollapseIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/collapse';",
    ],
    example: figma.code`<BpkLargeCollapseIcon />`,
  }
}

export default template
