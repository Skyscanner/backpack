// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A119
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/help.d.ts
// component=BpkSmallHelpIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallHelpIcon",
    imports: [
      "import BpkSmallHelpIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/help';",
    ],
    example: figma.code`<BpkSmallHelpIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeHelpIcon",
    imports: [
      "import BpkLargeHelpIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/help';",
    ],
    example: figma.code`<BpkLargeHelpIcon />`,
  }
} else {
  template = {
    id: "BpkLargeHelpIcon",
    imports: [
      "import BpkLargeHelpIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/help';",
    ],
    example: figma.code`<BpkLargeHelpIcon />`,
  }
}

export default template
