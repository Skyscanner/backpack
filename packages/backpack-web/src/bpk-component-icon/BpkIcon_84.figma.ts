// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A82
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/edit.d.ts
// component=BpkSmallEditIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallEditIcon",
    imports: [
      "import BpkSmallEditIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/edit';",
    ],
    example: figma.code`<BpkSmallEditIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeEditIcon",
    imports: [
      "import BpkLargeEditIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/edit';",
    ],
    example: figma.code`<BpkLargeEditIcon />`,
  }
} else {
  template = {
    id: "BpkLargeEditIcon",
    imports: [
      "import BpkLargeEditIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/edit';",
    ],
    example: figma.code`<BpkLargeEditIcon />`,
  }
}

export default template
