// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A114
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/grid-layout.d.ts
// component=BpkSmallGridLayoutIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallGridLayoutIcon",
    imports: [
      "import BpkSmallGridLayoutIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/grid-layout';",
    ],
    example: figma.code`<BpkSmallGridLayoutIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeGridLayoutIcon",
    imports: [
      "import BpkLargeGridLayoutIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/grid-layout';",
    ],
    example: figma.code`<BpkLargeGridLayoutIcon />`,
  }
} else {
  template = {
    id: "BpkLargeGridLayoutIcon",
    imports: [
      "import BpkLargeGridLayoutIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/grid-layout';",
    ],
    example: figma.code`<BpkLargeGridLayoutIcon />`,
  }
}

export default template
