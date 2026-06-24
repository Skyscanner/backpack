// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A158
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/menu.d.ts
// component=BpkSmallMenuIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallMenuIcon",
    imports: [
      "import BpkSmallMenuIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/menu';",
    ],
    example: figma.code`<BpkSmallMenuIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeMenuIcon",
    imports: [
      "import BpkLargeMenuIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/menu';",
    ],
    example: figma.code`<BpkLargeMenuIcon />`,
  }
} else {
  template = {
    id: "BpkLargeMenuIcon",
    imports: [
      "import BpkLargeMenuIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/menu';",
    ],
    example: figma.code`<BpkLargeMenuIcon />`,
  }
}

export default template
