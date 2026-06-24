// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A99
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/filter.d.ts
// component=BpkSmallFilterIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFilterIcon",
    imports: [
      "import BpkSmallFilterIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/filter';",
    ],
    example: figma.code`<BpkSmallFilterIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFilterIcon",
    imports: [
      "import BpkLargeFilterIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/filter';",
    ],
    example: figma.code`<BpkLargeFilterIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFilterIcon",
    imports: [
      "import BpkLargeFilterIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/filter';",
    ],
    example: figma.code`<BpkLargeFilterIcon />`,
  }
}

export default template
