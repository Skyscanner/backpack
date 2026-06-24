// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A83
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/education.d.ts
// component=BpkSmallEducationIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallEducationIcon",
    imports: [
      "import BpkSmallEducationIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/education';",
    ],
    example: figma.code`<BpkSmallEducationIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeEducationIcon",
    imports: [
      "import BpkLargeEducationIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/education';",
    ],
    example: figma.code`<BpkLargeEducationIcon />`,
  }
} else {
  template = {
    id: "BpkLargeEducationIcon",
    imports: [
      "import BpkLargeEducationIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/education';",
    ],
    example: figma.code`<BpkLargeEducationIcon />`,
  }
}

export default template
