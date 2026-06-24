// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A173
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/new-window.d.ts
// component=BpkSmallNewWindowIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallNewWindowIcon",
    imports: [
      "import BpkSmallNewWindowIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/new-window';",
    ],
    example: figma.code`<BpkSmallNewWindowIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeNewWindowIcon",
    imports: [
      "import BpkLargeNewWindowIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/new-window';",
    ],
    example: figma.code`<BpkLargeNewWindowIcon />`,
  }
} else {
  template = {
    id: "BpkLargeNewWindowIcon",
    imports: [
      "import BpkLargeNewWindowIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/new-window';",
    ],
    example: figma.code`<BpkLargeNewWindowIcon />`,
  }
}

export default template
