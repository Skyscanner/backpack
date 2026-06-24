// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A80
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/duration.d.ts
// component=BpkSmallDurationIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallDurationIcon",
    imports: [
      "import BpkSmallDurationIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/duration';",
    ],
    example: figma.code`<BpkSmallDurationIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeDurationIcon",
    imports: [
      "import BpkLargeDurationIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/duration';",
    ],
    example: figma.code`<BpkLargeDurationIcon />`,
  }
} else {
  template = {
    id: "BpkLargeDurationIcon",
    imports: [
      "import BpkLargeDurationIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/duration';",
    ],
    example: figma.code`<BpkLargeDurationIcon />`,
  }
}

export default template
