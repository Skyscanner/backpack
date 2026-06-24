// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6443%3A19
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/undo.d.ts
// component=BpkSmallUndoIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallUndoIcon",
    imports: [
      "import BpkSmallUndoIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/undo';",
    ],
    example: figma.code`<BpkSmallUndoIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeUndoIcon",
    imports: [
      "import BpkLargeUndoIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/undo';",
    ],
    example: figma.code`<BpkLargeUndoIcon />`,
  }
} else {
  template = {
    id: "BpkLargeUndoIcon",
    imports: [
      "import BpkLargeUndoIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/undo';",
    ],
    example: figma.code`<BpkLargeUndoIcon />`,
  }
}

export default template
