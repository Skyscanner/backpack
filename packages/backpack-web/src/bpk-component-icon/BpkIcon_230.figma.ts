// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A226
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/thumbs-down.d.ts
// component=BpkSmallThumbsDownIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallThumbsDownIcon",
    imports: [
      "import BpkSmallThumbsDownIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/thumbs-down';",
    ],
    example: figma.code`<BpkSmallThumbsDownIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeThumbsDownIcon",
    imports: [
      "import BpkLargeThumbsDownIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/thumbs-down';",
    ],
    example: figma.code`<BpkLargeThumbsDownIcon />`,
  }
} else {
  template = {
    id: "BpkLargeThumbsDownIcon",
    imports: [
      "import BpkLargeThumbsDownIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/thumbs-down';",
    ],
    example: figma.code`<BpkLargeThumbsDownIcon />`,
  }
}

export default template
