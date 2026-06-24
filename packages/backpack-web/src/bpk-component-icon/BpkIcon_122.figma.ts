// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A120
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/help-circle.d.ts
// component=BpkSmallHelpCircleIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallHelpCircleIcon",
    imports: [
      "import BpkSmallHelpCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/help-circle';",
    ],
    example: figma.code`<BpkSmallHelpCircleIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeHelpCircleIcon",
    imports: [
      "import BpkLargeHelpCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/help-circle';",
    ],
    example: figma.code`<BpkLargeHelpCircleIcon />`,
  }
} else {
  template = {
    id: "BpkLargeHelpCircleIcon",
    imports: [
      "import BpkLargeHelpCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/help-circle';",
    ],
    example: figma.code`<BpkLargeHelpCircleIcon />`,
  }
}

export default template
