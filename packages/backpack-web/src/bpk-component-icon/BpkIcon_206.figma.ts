// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A204
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/search.d.ts
// component=BpkSmallSearchIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallSearchIcon",
    imports: [
      "import BpkSmallSearchIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/search';",
    ],
    example: figma.code`<BpkSmallSearchIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeSearchIcon",
    imports: [
      "import BpkLargeSearchIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/search';",
    ],
    example: figma.code`<BpkLargeSearchIcon />`,
  }
} else {
  template = {
    id: "BpkLargeSearchIcon",
    imports: [
      "import BpkLargeSearchIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/search';",
    ],
    example: figma.code`<BpkLargeSearchIcon />`,
  }
}

export default template
