// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A8
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/add-circle.d.ts
// component=BpkSmallAddCircleIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAddCircleIcon",
    imports: [
      "import BpkSmallAddCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/add-circle';",
    ],
    example: figma.code`<BpkSmallAddCircleIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAddCircleIcon",
    imports: [
      "import BpkLargeAddCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/add-circle';",
    ],
    example: figma.code`<BpkLargeAddCircleIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAddCircleIcon",
    imports: [
      "import BpkLargeAddCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/add-circle';",
    ],
    example: figma.code`<BpkLargeAddCircleIcon />`,
  }
}

export default template
