// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A86
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/estimated.d.ts
// component=BpkSmallEstimatedIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallEstimatedIcon",
    imports: [
      "import BpkSmallEstimatedIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/estimated';",
    ],
    example: figma.code`<BpkSmallEstimatedIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeEstimatedIcon",
    imports: [
      "import BpkLargeEstimatedIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/estimated';",
    ],
    example: figma.code`<BpkLargeEstimatedIcon />`,
  }
} else {
  template = {
    id: "BpkLargeEstimatedIcon",
    imports: [
      "import BpkLargeEstimatedIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/estimated';",
    ],
    example: figma.code`<BpkLargeEstimatedIcon />`,
  }
}

export default template
