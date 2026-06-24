// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A235
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/trend.d.ts
// component=BpkSmallTrendIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallTrendIcon",
    imports: [
      "import BpkSmallTrendIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/trend';",
    ],
    example: figma.code`<BpkSmallTrendIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeTrendIcon",
    imports: [
      "import BpkLargeTrendIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/trend';",
    ],
    example: figma.code`<BpkLargeTrendIcon />`,
  }
} else {
  template = {
    id: "BpkLargeTrendIcon",
    imports: [
      "import BpkLargeTrendIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/trend';",
    ],
    example: figma.code`<BpkLargeTrendIcon />`,
  }
}

export default template
