// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A68
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/content--event.d.ts
// component=BpkSmallContentEventIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallContentEventIcon",
    imports: [
      "import BpkSmallContentEventIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/content--event';",
    ],
    example: figma.code`<BpkSmallContentEventIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeContentEventIcon",
    imports: [
      "import BpkLargeContentEventIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/content--event';",
    ],
    example: figma.code`<BpkLargeContentEventIcon />`,
  }
} else {
  template = {
    id: "BpkLargeContentEventIcon",
    imports: [
      "import BpkLargeContentEventIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/content--event';",
    ],
    example: figma.code`<BpkLargeContentEventIcon />`,
  }
}

export default template
