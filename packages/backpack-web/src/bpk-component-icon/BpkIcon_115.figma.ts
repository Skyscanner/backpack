// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A112
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/globe.d.ts
// component=BpkSmallGlobeIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallGlobeIcon",
    imports: [
      "import BpkSmallGlobeIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/globe';",
    ],
    example: figma.code`<BpkSmallGlobeIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeGlobeIcon",
    imports: [
      "import BpkLargeGlobeIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/globe';",
    ],
    example: figma.code`<BpkLargeGlobeIcon />`,
  }
} else {
  template = {
    id: "BpkLargeGlobeIcon",
    imports: [
      "import BpkLargeGlobeIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/globe';",
    ],
    example: figma.code`<BpkLargeGlobeIcon />`,
  }
}

export default template
