// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A90
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/explore.d.ts
// component=BpkSmallExploreIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallExploreIcon",
    imports: [
      "import BpkSmallExploreIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/explore';",
    ],
    example: figma.code`<BpkSmallExploreIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeExploreIcon",
    imports: [
      "import BpkLargeExploreIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/explore';",
    ],
    example: figma.code`<BpkLargeExploreIcon />`,
  }
} else {
  template = {
    id: "BpkLargeExploreIcon",
    imports: [
      "import BpkLargeExploreIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/explore';",
    ],
    example: figma.code`<BpkLargeExploreIcon />`,
  }
}

export default template
