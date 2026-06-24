// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A229
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/tick-circle.d.ts
// component=BpkSmallTickCircleIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallTickCircleIcon",
    imports: [
      "import BpkSmallTickCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/tick-circle';",
    ],
    example: figma.code`<BpkSmallTickCircleIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeTickCircleIcon",
    imports: [
      "import BpkLargeTickCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/tick-circle';",
    ],
    example: figma.code`<BpkLargeTickCircleIcon />`,
  }
} else {
  template = {
    id: "BpkLargeTickCircleIcon",
    imports: [
      "import BpkLargeTickCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/tick-circle';",
    ],
    example: figma.code`<BpkLargeTickCircleIcon />`,
  }
}

export default template
