// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A18
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/alert--remove.d.ts
// component=BpkSmallAlertRemoveIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAlertRemoveIcon",
    imports: [
      "import BpkSmallAlertRemoveIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/alert--remove';",
    ],
    example: figma.code`<BpkSmallAlertRemoveIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAlertRemoveIcon",
    imports: [
      "import BpkLargeAlertRemoveIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/alert--remove';",
    ],
    example: figma.code`<BpkLargeAlertRemoveIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAlertRemoveIcon",
    imports: [
      "import BpkLargeAlertRemoveIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/alert--remove';",
    ],
    example: figma.code`<BpkLargeAlertRemoveIcon />`,
  }
}

export default template
