// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A203
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/scales.d.ts
// component=BpkSmallScalesIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallScalesIcon",
    imports: [
      "import BpkSmallScalesIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/scales';",
    ],
    example: figma.code`<BpkSmallScalesIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeScalesIcon",
    imports: [
      "import BpkLargeScalesIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/scales';",
    ],
    example: figma.code`<BpkLargeScalesIcon />`,
  }
} else {
  template = {
    id: "BpkLargeScalesIcon",
    imports: [
      "import BpkLargeScalesIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/scales';",
    ],
    example: figma.code`<BpkLargeScalesIcon />`,
  }
}

export default template
