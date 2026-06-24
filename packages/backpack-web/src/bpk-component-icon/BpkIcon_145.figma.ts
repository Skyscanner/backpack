// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A142
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/leisure.d.ts
// component=BpkSmallLeisureIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallLeisureIcon",
    imports: [
      "import BpkSmallLeisureIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/leisure';",
    ],
    example: figma.code`<BpkSmallLeisureIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeLeisureIcon",
    imports: [
      "import BpkLargeLeisureIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/leisure';",
    ],
    example: figma.code`<BpkLargeLeisureIcon />`,
  }
} else {
  template = {
    id: "BpkLargeLeisureIcon",
    imports: [
      "import BpkLargeLeisureIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/leisure';",
    ],
    example: figma.code`<BpkLargeLeisureIcon />`,
  }
}

export default template
