// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A69
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/content--guides.d.ts
// component=BpkSmallContentGuidesIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallContentGuidesIcon",
    imports: [
      "import BpkSmallContentGuidesIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/content--guides';",
    ],
    example: figma.code`<BpkSmallContentGuidesIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeContentGuidesIcon",
    imports: [
      "import BpkLargeContentGuidesIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/content--guides';",
    ],
    example: figma.code`<BpkLargeContentGuidesIcon />`,
  }
} else {
  template = {
    id: "BpkLargeContentGuidesIcon",
    imports: [
      "import BpkLargeContentGuidesIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/content--guides';",
    ],
    example: figma.code`<BpkLargeContentGuidesIcon />`,
  }
}

export default template
