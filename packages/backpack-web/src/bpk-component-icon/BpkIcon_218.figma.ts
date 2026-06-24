// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A215
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/sort-up.d.ts
// component=BpkSmallSortUpIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallSortUpIcon",
    imports: [
      "import BpkSmallSortUpIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/sort-up';",
    ],
    example: figma.code`<BpkSmallSortUpIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeSortUpIcon",
    imports: [
      "import BpkLargeSortUpIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/sort-up';",
    ],
    example: figma.code`<BpkLargeSortUpIcon />`,
  }
} else {
  template = {
    id: "BpkLargeSortUpIcon",
    imports: [
      "import BpkLargeSortUpIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/sort-up';",
    ],
    example: figma.code`<BpkLargeSortUpIcon />`,
  }
}

export default template
