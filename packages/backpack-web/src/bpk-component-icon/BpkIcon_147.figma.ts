// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A144
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/list.d.ts
// component=BpkSmallListIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallListIcon",
    imports: [
      "import BpkSmallListIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/list';",
    ],
    example: figma.code`<BpkSmallListIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeListIcon",
    imports: [
      "import BpkLargeListIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/list';",
    ],
    example: figma.code`<BpkLargeListIcon />`,
  }
} else {
  template = {
    id: "BpkLargeListIcon",
    imports: [
      "import BpkLargeListIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/list';",
    ],
    example: figma.code`<BpkLargeListIcon />`,
  }
}

export default template
