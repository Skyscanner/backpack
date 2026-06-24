// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A213
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/sort.d.ts
// component=BpkSmallSortIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallSortIcon",
    imports: [
      "import BpkSmallSortIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/sort';",
    ],
    example: figma.code`<BpkSmallSortIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeSortIcon",
    imports: [
      "import BpkLargeSortIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/sort';",
    ],
    example: figma.code`<BpkLargeSortIcon />`,
  }
} else {
  template = {
    id: "BpkLargeSortIcon",
    imports: [
      "import BpkLargeSortIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/sort';",
    ],
    example: figma.code`<BpkLargeSortIcon />`,
  }
}

export default template
