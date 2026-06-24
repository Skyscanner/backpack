// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A146
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/lock.d.ts
// component=BpkSmallLockIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallLockIcon",
    imports: [
      "import BpkSmallLockIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/lock';",
    ],
    example: figma.code`<BpkSmallLockIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeLockIcon",
    imports: [
      "import BpkLargeLockIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/lock';",
    ],
    example: figma.code`<BpkLargeLockIcon />`,
  }
} else {
  template = {
    id: "BpkLargeLockIcon",
    imports: [
      "import BpkLargeLockIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/lock';",
    ],
    example: figma.code`<BpkLargeLockIcon />`,
  }
}

export default template
