// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A88
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/exclamation-circle.d.ts
// component=BpkSmallExclamationCircleIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallExclamationCircleIcon",
    imports: [
      "import BpkSmallExclamationCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/exclamation-circle';",
    ],
    example: figma.code`<BpkSmallExclamationCircleIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeExclamationCircleIcon",
    imports: [
      "import BpkLargeExclamationCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/exclamation-circle';",
    ],
    example: figma.code`<BpkLargeExclamationCircleIcon />`,
  }
} else {
  template = {
    id: "BpkLargeExclamationCircleIcon",
    imports: [
      "import BpkLargeExclamationCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/exclamation-circle';",
    ],
    example: figma.code`<BpkLargeExclamationCircleIcon />`,
  }
}

export default template
