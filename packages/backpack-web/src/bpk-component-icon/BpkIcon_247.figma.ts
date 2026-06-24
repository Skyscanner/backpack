// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A242
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/upgrade.d.ts
// component=BpkSmallUpgradeIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallUpgradeIcon",
    imports: [
      "import BpkSmallUpgradeIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/upgrade';",
    ],
    example: figma.code`<BpkSmallUpgradeIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeUpgradeIcon",
    imports: [
      "import BpkLargeUpgradeIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/upgrade';",
    ],
    example: figma.code`<BpkLargeUpgradeIcon />`,
  }
} else {
  template = {
    id: "BpkLargeUpgradeIcon",
    imports: [
      "import BpkLargeUpgradeIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/upgrade';",
    ],
    example: figma.code`<BpkLargeUpgradeIcon />`,
  }
}

export default template
