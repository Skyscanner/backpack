// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A71
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/data.d.ts
// component=BpkSmallDataIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallDataIcon",
    imports: [
      "import BpkSmallDataIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/data';",
    ],
    example: figma.code`<BpkSmallDataIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeDataIcon",
    imports: [
      "import BpkLargeDataIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/data';",
    ],
    example: figma.code`<BpkLargeDataIcon />`,
  }
} else {
  template = {
    id: "BpkLargeDataIcon",
    imports: [
      "import BpkLargeDataIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/data';",
    ],
    example: figma.code`<BpkLargeDataIcon />`,
  }
}

export default template
