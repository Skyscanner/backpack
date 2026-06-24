// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A164
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/money.d.ts
// component=BpkSmallMoneyIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallMoneyIcon",
    imports: [
      "import BpkSmallMoneyIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/money';",
    ],
    example: figma.code`<BpkSmallMoneyIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeMoneyIcon",
    imports: [
      "import BpkLargeMoneyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/money';",
    ],
    example: figma.code`<BpkLargeMoneyIcon />`,
  }
} else {
  template = {
    id: "BpkLargeMoneyIcon",
    imports: [
      "import BpkLargeMoneyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/money';",
    ],
    example: figma.code`<BpkLargeMoneyIcon />`,
  }
}

export default template
