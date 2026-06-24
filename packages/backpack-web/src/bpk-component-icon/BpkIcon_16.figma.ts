// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A15
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/alert--active.d.ts
// component=BpkSmallAlertActiveIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAlertActiveIcon",
    imports: [
      "import BpkSmallAlertActiveIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/alert--active';",
    ],
    example: figma.code`<BpkSmallAlertActiveIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAlertActiveIcon",
    imports: [
      "import BpkLargeAlertActiveIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/alert--active';",
    ],
    example: figma.code`<BpkLargeAlertActiveIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAlertActiveIcon",
    imports: [
      "import BpkLargeAlertActiveIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/alert--active';",
    ],
    example: figma.code`<BpkLargeAlertActiveIcon />`,
  }
}

export default template
