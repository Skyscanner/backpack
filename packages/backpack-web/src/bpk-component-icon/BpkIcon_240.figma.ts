// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A236
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/trend--down.d.ts
// component=BpkSmallTrendDownIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallTrendDownIcon",
    imports: [
      "import BpkSmallTrendDownIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/trend--down';",
    ],
    example: figma.code`<BpkSmallTrendDownIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeTrendDownIcon",
    imports: [
      "import BpkLargeTrendDownIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/trend--down';",
    ],
    example: figma.code`<BpkLargeTrendDownIcon />`,
  }
} else {
  template = {
    id: "BpkLargeTrendDownIcon",
    imports: [
      "import BpkLargeTrendDownIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/trend--down';",
    ],
    example: figma.code`<BpkLargeTrendDownIcon />`,
  }
}

export default template
