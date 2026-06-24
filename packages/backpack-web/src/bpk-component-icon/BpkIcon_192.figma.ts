// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A189
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/play.d.ts
// component=BpkSmallPlayIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallPlayIcon",
    imports: [
      "import BpkSmallPlayIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/play';",
    ],
    example: figma.code`<BpkSmallPlayIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargePlayIcon",
    imports: [
      "import BpkLargePlayIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/play';",
    ],
    example: figma.code`<BpkLargePlayIcon />`,
  }
} else {
  template = {
    id: "BpkLargePlayIcon",
    imports: [
      "import BpkLargePlayIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/play';",
    ],
    example: figma.code`<BpkLargePlayIcon />`,
  }
}

export default template
