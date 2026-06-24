// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A135
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/key.d.ts
// component=BpkSmallKeyIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallKeyIcon",
    imports: [
      "import BpkSmallKeyIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/key';",
    ],
    example: figma.code`<BpkSmallKeyIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeKeyIcon",
    imports: [
      "import BpkLargeKeyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/key';",
    ],
    example: figma.code`<BpkLargeKeyIcon />`,
  }
} else {
  template = {
    id: "BpkLargeKeyIcon",
    imports: [
      "import BpkLargeKeyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/key';",
    ],
    example: figma.code`<BpkLargeKeyIcon />`,
  }
}

export default template
