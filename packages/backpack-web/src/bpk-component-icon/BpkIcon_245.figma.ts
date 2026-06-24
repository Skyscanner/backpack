// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A240
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/unlock.d.ts
// component=BpkSmallUnlockIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallUnlockIcon",
    imports: [
      "import BpkSmallUnlockIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/unlock';",
    ],
    example: figma.code`<BpkSmallUnlockIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeUnlockIcon",
    imports: [
      "import BpkLargeUnlockIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/unlock';",
    ],
    example: figma.code`<BpkLargeUnlockIcon />`,
  }
} else {
  template = {
    id: "BpkLargeUnlockIcon",
    imports: [
      "import BpkLargeUnlockIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/unlock';",
    ],
    example: figma.code`<BpkLargeUnlockIcon />`,
  }
}

export default template
