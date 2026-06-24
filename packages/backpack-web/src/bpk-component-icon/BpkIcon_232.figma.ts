// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A228
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/tick.d.ts
// component=BpkSmallTickIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallTickIcon",
    imports: [
      "import BpkSmallTickIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/tick';",
    ],
    example: figma.code`<BpkSmallTickIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeTickIcon",
    imports: [
      "import BpkLargeTickIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/tick';",
    ],
    example: figma.code`<BpkLargeTickIcon />`,
  }
} else {
  template = {
    id: "BpkLargeTickIcon",
    imports: [
      "import BpkLargeTickIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/tick';",
    ],
    example: figma.code`<BpkLargeTickIcon />`,
  }
}

export default template
