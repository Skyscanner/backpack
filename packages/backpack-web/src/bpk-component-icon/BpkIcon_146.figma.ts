// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A143
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/lightning.d.ts
// component=BpkSmallLightningIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallLightningIcon",
    imports: [
      "import BpkSmallLightningIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/lightning';",
    ],
    example: figma.code`<BpkSmallLightningIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeLightningIcon",
    imports: [
      "import BpkLargeLightningIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/lightning';",
    ],
    example: figma.code`<BpkLargeLightningIcon />`,
  }
} else {
  template = {
    id: "BpkLargeLightningIcon",
    imports: [
      "import BpkLargeLightningIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/lightning';",
    ],
    example: figma.code`<BpkLargeLightningIcon />`,
  }
}

export default template
