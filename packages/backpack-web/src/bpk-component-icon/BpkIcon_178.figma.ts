// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A176
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/not-allowed.d.ts
// component=BpkSmallNotAllowedIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallNotAllowedIcon",
    imports: [
      "import BpkSmallNotAllowedIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/not-allowed';",
    ],
    example: figma.code`<BpkSmallNotAllowedIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeNotAllowedIcon",
    imports: [
      "import BpkLargeNotAllowedIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/not-allowed';",
    ],
    example: figma.code`<BpkLargeNotAllowedIcon />`,
  }
} else {
  template = {
    id: "BpkLargeNotAllowedIcon",
    imports: [
      "import BpkLargeNotAllowedIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/not-allowed';",
    ],
    example: figma.code`<BpkLargeNotAllowedIcon />`,
  }
}

export default template
