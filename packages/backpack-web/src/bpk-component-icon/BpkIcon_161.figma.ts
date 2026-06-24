// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A159
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/menu--horizontal.d.ts
// component=BpkSmallMenuHorizontalIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallMenuHorizontalIcon",
    imports: [
      "import BpkSmallMenuHorizontalIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/menu--horizontal';",
    ],
    example: figma.code`<BpkSmallMenuHorizontalIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeMenuHorizontalIcon",
    imports: [
      "import BpkLargeMenuHorizontalIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/menu--horizontal';",
    ],
    example: figma.code`<BpkLargeMenuHorizontalIcon />`,
  }
} else {
  template = {
    id: "BpkLargeMenuHorizontalIcon",
    imports: [
      "import BpkLargeMenuHorizontalIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/menu--horizontal';",
    ],
    example: figma.code`<BpkLargeMenuHorizontalIcon />`,
  }
}

export default template
