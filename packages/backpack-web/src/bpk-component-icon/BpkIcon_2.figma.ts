// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A2
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/account--add.d.ts
// component=BpkSmallAccountAddIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAccountAddIcon",
    imports: [
      "import BpkSmallAccountAddIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/account--add';",
    ],
    example: figma.code`<BpkSmallAccountAddIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAccountAddIcon",
    imports: [
      "import BpkLargeAccountAddIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/account--add';",
    ],
    example: figma.code`<BpkLargeAccountAddIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAccountAddIcon",
    imports: [
      "import BpkLargeAccountAddIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/account--add';",
    ],
    example: figma.code`<BpkLargeAccountAddIcon />`,
  }
}

export default template
