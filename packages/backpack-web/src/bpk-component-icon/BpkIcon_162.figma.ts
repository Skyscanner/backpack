// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A160
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/menu--vertical.d.ts
// component=BpkSmallMenuVerticalIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallMenuVerticalIcon",
    imports: [
      "import BpkSmallMenuVerticalIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/menu--vertical';",
    ],
    example: figma.code`<BpkSmallMenuVerticalIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeMenuVerticalIcon",
    imports: [
      "import BpkLargeMenuVerticalIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/menu--vertical';",
    ],
    example: figma.code`<BpkLargeMenuVerticalIcon />`,
  }
} else {
  template = {
    id: "BpkLargeMenuVerticalIcon",
    imports: [
      "import BpkLargeMenuVerticalIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/menu--vertical';",
    ],
    example: figma.code`<BpkLargeMenuVerticalIcon />`,
  }
}

export default template
