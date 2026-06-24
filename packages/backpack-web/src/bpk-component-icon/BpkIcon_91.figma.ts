// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A89
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/expand.d.ts
// component=BpkSmallExpandIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallExpandIcon",
    imports: [
      "import BpkSmallExpandIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/expand';",
    ],
    example: figma.code`<BpkSmallExpandIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeExpandIcon",
    imports: [
      "import BpkLargeExpandIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/expand';",
    ],
    example: figma.code`<BpkLargeExpandIcon />`,
  }
} else {
  template = {
    id: "BpkLargeExpandIcon",
    imports: [
      "import BpkLargeExpandIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/expand';",
    ],
    example: figma.code`<BpkLargeExpandIcon />`,
  }
}

export default template
