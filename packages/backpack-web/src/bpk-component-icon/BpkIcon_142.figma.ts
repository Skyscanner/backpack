// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A139
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/legroom--extra.d.ts
// component=BpkSmallLegroomExtraIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallLegroomExtraIcon",
    imports: [
      "import BpkSmallLegroomExtraIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/legroom--extra';",
    ],
    example: figma.code`<BpkSmallLegroomExtraIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeLegroomExtraIcon",
    imports: [
      "import BpkLargeLegroomExtraIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/legroom--extra';",
    ],
    example: figma.code`<BpkLargeLegroomExtraIcon />`,
  }
} else {
  template = {
    id: "BpkLargeLegroomExtraIcon",
    imports: [
      "import BpkLargeLegroomExtraIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/legroom--extra';",
    ],
    example: figma.code`<BpkLargeLegroomExtraIcon />`,
  }
}

export default template
