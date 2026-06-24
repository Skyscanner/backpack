// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A208
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/share.d.ts
// component=BpkSmallShareIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallShareIcon",
    imports: [
      "import BpkSmallShareIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/share';",
    ],
    example: figma.code`<BpkSmallShareIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeShareIcon",
    imports: [
      "import BpkLargeShareIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/share';",
    ],
    example: figma.code`<BpkLargeShareIcon />`,
  }
} else {
  template = {
    id: "BpkLargeShareIcon",
    imports: [
      "import BpkLargeShareIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/share';",
    ],
    example: figma.code`<BpkLargeShareIcon />`,
  }
}

export default template
