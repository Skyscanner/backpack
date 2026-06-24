// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A16
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/alert--add.d.ts
// component=BpkSmallAlertAddIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAlertAddIcon",
    imports: [
      "import BpkSmallAlertAddIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/alert--add';",
    ],
    example: figma.code`<BpkSmallAlertAddIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAlertAddIcon",
    imports: [
      "import BpkLargeAlertAddIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/alert--add';",
    ],
    example: figma.code`<BpkLargeAlertAddIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAlertAddIcon",
    imports: [
      "import BpkLargeAlertAddIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/alert--add';",
    ],
    example: figma.code`<BpkLargeAlertAddIcon />`,
  }
}

export default template
