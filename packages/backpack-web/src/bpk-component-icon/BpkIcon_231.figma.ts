// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A227
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/thumbs-up.d.ts
// component=BpkSmallThumbsUpIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallThumbsUpIcon",
    imports: [
      "import BpkSmallThumbsUpIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/thumbs-up';",
    ],
    example: figma.code`<BpkSmallThumbsUpIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeThumbsUpIcon",
    imports: [
      "import BpkLargeThumbsUpIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/thumbs-up';",
    ],
    example: figma.code`<BpkLargeThumbsUpIcon />`,
  }
} else {
  template = {
    id: "BpkLargeThumbsUpIcon",
    imports: [
      "import BpkLargeThumbsUpIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/thumbs-up';",
    ],
    example: figma.code`<BpkLargeThumbsUpIcon />`,
  }
}

export default template
