// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A162
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/minus.d.ts
// component=BpkSmallMinusIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallMinusIcon",
    imports: [
      "import BpkSmallMinusIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/minus';",
    ],
    example: figma.code`<BpkSmallMinusIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeMinusIcon",
    imports: [
      "import BpkLargeMinusIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/minus';",
    ],
    example: figma.code`<BpkLargeMinusIcon />`,
  }
} else {
  template = {
    id: "BpkLargeMinusIcon",
    imports: [
      "import BpkLargeMinusIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/minus';",
    ],
    example: figma.code`<BpkLargeMinusIcon />`,
  }
}

export default template
