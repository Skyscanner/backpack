// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A72
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/deals.d.ts
// component=BpkSmallDealsIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallDealsIcon",
    imports: [
      "import BpkSmallDealsIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/deals';",
    ],
    example: figma.code`<BpkSmallDealsIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeDealsIcon",
    imports: [
      "import BpkLargeDealsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/deals';",
    ],
    example: figma.code`<BpkLargeDealsIcon />`,
  }
} else {
  template = {
    id: "BpkLargeDealsIcon",
    imports: [
      "import BpkLargeDealsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/deals';",
    ],
    example: figma.code`<BpkLargeDealsIcon />`,
  }
}

export default template
