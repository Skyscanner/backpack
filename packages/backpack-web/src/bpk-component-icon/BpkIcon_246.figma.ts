// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A241
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/unmute.d.ts
// component=BpkSmallUnmuteIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallUnmuteIcon",
    imports: [
      "import BpkSmallUnmuteIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/unmute';",
    ],
    example: figma.code`<BpkSmallUnmuteIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeUnmuteIcon",
    imports: [
      "import BpkLargeUnmuteIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/unmute';",
    ],
    example: figma.code`<BpkLargeUnmuteIcon />`,
  }
} else {
  template = {
    id: "BpkLargeUnmuteIcon",
    imports: [
      "import BpkLargeUnmuteIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/unmute';",
    ],
    example: figma.code`<BpkLargeUnmuteIcon />`,
  }
}

export default template
