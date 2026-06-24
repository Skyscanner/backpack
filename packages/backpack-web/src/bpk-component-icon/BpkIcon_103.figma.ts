// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A101
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/flag.d.ts
// component=BpkSmallFlagIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFlagIcon",
    imports: [
      "import BpkSmallFlagIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/flag';",
    ],
    example: figma.code`<BpkSmallFlagIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFlagIcon",
    imports: [
      "import BpkLargeFlagIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flag';",
    ],
    example: figma.code`<BpkLargeFlagIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFlagIcon",
    imports: [
      "import BpkLargeFlagIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flag';",
    ],
    example: figma.code`<BpkLargeFlagIcon />`,
  }
}

export default template
