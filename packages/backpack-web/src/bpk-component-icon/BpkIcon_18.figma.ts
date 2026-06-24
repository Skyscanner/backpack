// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A17
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/alert--expired.d.ts
// component=BpkSmallAlertExpiredIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAlertExpiredIcon",
    imports: [
      "import BpkSmallAlertExpiredIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/alert--expired';",
    ],
    example: figma.code`<BpkSmallAlertExpiredIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAlertExpiredIcon",
    imports: [
      "import BpkLargeAlertExpiredIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/alert--expired';",
    ],
    example: figma.code`<BpkLargeAlertExpiredIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAlertExpiredIcon",
    imports: [
      "import BpkLargeAlertExpiredIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/alert--expired';",
    ],
    example: figma.code`<BpkLargeAlertExpiredIcon />`,
  }
}

export default template
