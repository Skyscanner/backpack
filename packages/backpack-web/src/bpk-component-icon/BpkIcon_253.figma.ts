// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A246
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/wallet.d.ts
// component=BpkSmallWalletIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWalletIcon",
    imports: [
      "import BpkSmallWalletIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/wallet';",
    ],
    example: figma.code`<BpkSmallWalletIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWalletIcon",
    imports: [
      "import BpkLargeWalletIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/wallet';",
    ],
    example: figma.code`<BpkLargeWalletIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWalletIcon",
    imports: [
      "import BpkLargeWalletIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/wallet';",
    ],
    example: figma.code`<BpkLargeWalletIcon />`,
  }
}

export default template
