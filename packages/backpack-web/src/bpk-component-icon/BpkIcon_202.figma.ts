// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A200
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/refresh.d.ts
// component=BpkSmallRefreshIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallRefreshIcon",
    imports: [
      "import BpkSmallRefreshIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/refresh';",
    ],
    example: figma.code`<BpkSmallRefreshIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeRefreshIcon",
    imports: [
      "import BpkLargeRefreshIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/refresh';",
    ],
    example: figma.code`<BpkLargeRefreshIcon />`,
  }
} else {
  template = {
    id: "BpkLargeRefreshIcon",
    imports: [
      "import BpkLargeRefreshIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/refresh';",
    ],
    example: figma.code`<BpkLargeRefreshIcon />`,
  }
}

export default template
