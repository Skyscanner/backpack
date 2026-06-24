// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A214
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/sort-down.d.ts
// component=BpkSmallSortDownIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallSortDownIcon",
    imports: [
      "import BpkSmallSortDownIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/sort-down';",
    ],
    example: figma.code`<BpkSmallSortDownIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeSortDownIcon",
    imports: [
      "import BpkLargeSortDownIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/sort-down';",
    ],
    example: figma.code`<BpkLargeSortDownIcon />`,
  }
} else {
  template = {
    id: "BpkLargeSortDownIcon",
    imports: [
      "import BpkLargeSortDownIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/sort-down';",
    ],
    example: figma.code`<BpkLargeSortDownIcon />`,
  }
}

export default template
