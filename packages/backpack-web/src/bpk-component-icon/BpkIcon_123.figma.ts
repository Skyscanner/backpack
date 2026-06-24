// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A121
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/hide.d.ts
// component=BpkSmallHideIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallHideIcon",
    imports: [
      "import BpkSmallHideIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/hide';",
    ],
    example: figma.code`<BpkSmallHideIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeHideIcon",
    imports: [
      "import BpkLargeHideIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/hide';",
    ],
    example: figma.code`<BpkLargeHideIcon />`,
  }
} else {
  template = {
    id: "BpkLargeHideIcon",
    imports: [
      "import BpkLargeHideIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/hide';",
    ],
    example: figma.code`<BpkLargeHideIcon />`,
  }
}

export default template
