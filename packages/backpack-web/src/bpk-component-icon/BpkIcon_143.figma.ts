// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A140
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/legroom--normal.d.ts
// component=BpkSmallLegroomNormalIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallLegroomNormalIcon",
    imports: [
      "import BpkSmallLegroomNormalIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/legroom--normal';",
    ],
    example: figma.code`<BpkSmallLegroomNormalIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeLegroomNormalIcon",
    imports: [
      "import BpkLargeLegroomNormalIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/legroom--normal';",
    ],
    example: figma.code`<BpkLargeLegroomNormalIcon />`,
  }
} else {
  template = {
    id: "BpkLargeLegroomNormalIcon",
    imports: [
      "import BpkLargeLegroomNormalIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/legroom--normal';",
    ],
    example: figma.code`<BpkLargeLegroomNormalIcon />`,
  }
}

export default template
