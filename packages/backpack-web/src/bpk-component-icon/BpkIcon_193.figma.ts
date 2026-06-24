// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A190
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/plus.d.ts
// component=BpkSmallPlusIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallPlusIcon",
    imports: [
      "import BpkSmallPlusIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/plus';",
    ],
    example: figma.code`<BpkSmallPlusIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargePlusIcon",
    imports: [
      "import BpkLargePlusIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/plus';",
    ],
    example: figma.code`<BpkLargePlusIcon />`,
  }
} else {
  template = {
    id: "BpkLargePlusIcon",
    imports: [
      "import BpkLargePlusIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/plus';",
    ],
    example: figma.code`<BpkLargePlusIcon />`,
  }
}

export default template
