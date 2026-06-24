// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A174
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/news.d.ts
// component=BpkSmallNewsIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallNewsIcon",
    imports: [
      "import BpkSmallNewsIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/news';",
    ],
    example: figma.code`<BpkSmallNewsIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeNewsIcon",
    imports: [
      "import BpkLargeNewsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/news';",
    ],
    example: figma.code`<BpkLargeNewsIcon />`,
  }
} else {
  template = {
    id: "BpkLargeNewsIcon",
    imports: [
      "import BpkLargeNewsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/news';",
    ],
    example: figma.code`<BpkLargeNewsIcon />`,
  }
}

export default template
