// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A36
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/business.d.ts
// component=BpkSmallBusinessIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallBusinessIcon",
    imports: [
      "import BpkSmallBusinessIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/business';",
    ],
    example: figma.code`<BpkSmallBusinessIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeBusinessIcon",
    imports: [
      "import BpkLargeBusinessIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/business';",
    ],
    example: figma.code`<BpkLargeBusinessIcon />`,
  }
} else {
  template = {
    id: "BpkLargeBusinessIcon",
    imports: [
      "import BpkLargeBusinessIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/business';",
    ],
    example: figma.code`<BpkLargeBusinessIcon />`,
  }
}

export default template
