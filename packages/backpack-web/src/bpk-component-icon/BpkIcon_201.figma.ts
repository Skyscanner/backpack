// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6443%3A18
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/redo.d.ts
// component=BpkSmallRedoIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallRedoIcon",
    imports: [
      "import BpkSmallRedoIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/redo';",
    ],
    example: figma.code`<BpkSmallRedoIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeRedoIcon",
    imports: [
      "import BpkLargeRedoIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/redo';",
    ],
    example: figma.code`<BpkLargeRedoIcon />`,
  }
} else {
  template = {
    id: "BpkLargeRedoIcon",
    imports: [
      "import BpkLargeRedoIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/redo';",
    ],
    example: figma.code`<BpkLargeRedoIcon />`,
  }
}

export default template
