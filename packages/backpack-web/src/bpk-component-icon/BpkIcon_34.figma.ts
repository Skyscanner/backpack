// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A30
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/bar.d.ts
// component=BpkSmallBarIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallBarIcon",
    imports: [
      "import BpkSmallBarIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/bar';",
    ],
    example: figma.code`<BpkSmallBarIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeBarIcon",
    imports: [
      "import BpkLargeBarIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/bar';",
    ],
    example: figma.code`<BpkLargeBarIcon />`,
  }
} else {
  template = {
    id: "BpkLargeBarIcon",
    imports: [
      "import BpkLargeBarIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/bar';",
    ],
    example: figma.code`<BpkLargeBarIcon />`,
  }
}

export default template
