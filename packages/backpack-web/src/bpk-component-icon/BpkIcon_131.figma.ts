// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A128
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/infant.d.ts
// component=BpkSmallInfantIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallInfantIcon",
    imports: [
      "import BpkSmallInfantIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/infant';",
    ],
    example: figma.code`<BpkSmallInfantIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeInfantIcon",
    imports: [
      "import BpkLargeInfantIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/infant';",
    ],
    example: figma.code`<BpkLargeInfantIcon />`,
  }
} else {
  template = {
    id: "BpkLargeInfantIcon",
    imports: [
      "import BpkLargeInfantIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/infant';",
    ],
    example: figma.code`<BpkLargeInfantIcon />`,
  }
}

export default template
