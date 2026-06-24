// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A155
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/map.d.ts
// component=BpkSmallMapIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallMapIcon",
    imports: [
      "import BpkSmallMapIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/map';",
    ],
    example: figma.code`<BpkSmallMapIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeMapIcon",
    imports: [
      "import BpkLargeMapIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/map';",
    ],
    example: figma.code`<BpkLargeMapIcon />`,
  }
} else {
  template = {
    id: "BpkLargeMapIcon",
    imports: [
      "import BpkLargeMapIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/map';",
    ],
    example: figma.code`<BpkLargeMapIcon />`,
  }
}

export default template
