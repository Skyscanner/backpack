// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A260
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/window--reduce.d.ts
// component=BpkSmallWindowReduceIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWindowReduceIcon",
    imports: [
      "import BpkSmallWindowReduceIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/window--reduce';",
    ],
    example: figma.code`<BpkSmallWindowReduceIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWindowReduceIcon",
    imports: [
      "import BpkLargeWindowReduceIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/window--reduce';",
    ],
    example: figma.code`<BpkLargeWindowReduceIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWindowReduceIcon",
    imports: [
      "import BpkLargeWindowReduceIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/window--reduce';",
    ],
    example: figma.code`<BpkLargeWindowReduceIcon />`,
  }
}

export default template
