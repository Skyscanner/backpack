// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A65
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/close-circle.d.ts
// component=BpkSmallCloseCircleIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCloseCircleIcon",
    imports: [
      "import BpkSmallCloseCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/close-circle';",
    ],
    example: figma.code`<BpkSmallCloseCircleIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCloseCircleIcon",
    imports: [
      "import BpkLargeCloseCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/close-circle';",
    ],
    example: figma.code`<BpkLargeCloseCircleIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCloseCircleIcon",
    imports: [
      "import BpkLargeCloseCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/close-circle';",
    ],
    example: figma.code`<BpkLargeCloseCircleIcon />`,
  }
}

export default template
