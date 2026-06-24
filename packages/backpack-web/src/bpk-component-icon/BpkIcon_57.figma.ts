// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A56
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/child.d.ts
// component=BpkSmallChildIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallChildIcon",
    imports: [
      "import BpkSmallChildIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/child';",
    ],
    example: figma.code`<BpkSmallChildIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeChildIcon",
    imports: [
      "import BpkLargeChildIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/child';",
    ],
    example: figma.code`<BpkLargeChildIcon />`,
  }
} else {
  template = {
    id: "BpkLargeChildIcon",
    imports: [
      "import BpkLargeChildIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/child';",
    ],
    example: figma.code`<BpkLargeChildIcon />`,
  }
}

export default template
