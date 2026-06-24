// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A259
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/window.d.ts
// component=BpkSmallWindowIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWindowIcon",
    imports: [
      "import BpkSmallWindowIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/window';",
    ],
    example: figma.code`<BpkSmallWindowIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWindowIcon",
    imports: [
      "import BpkLargeWindowIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/window';",
    ],
    example: figma.code`<BpkLargeWindowIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWindowIcon",
    imports: [
      "import BpkLargeWindowIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/window';",
    ],
    example: figma.code`<BpkLargeWindowIcon />`,
  }
}

export default template
