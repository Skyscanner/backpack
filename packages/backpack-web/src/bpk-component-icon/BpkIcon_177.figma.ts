// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A175
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/night.d.ts
// component=BpkSmallNightIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallNightIcon",
    imports: [
      "import BpkSmallNightIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/night';",
    ],
    example: figma.code`<BpkSmallNightIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeNightIcon",
    imports: [
      "import BpkLargeNightIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/night';",
    ],
    example: figma.code`<BpkLargeNightIcon />`,
  }
} else {
  template = {
    id: "BpkLargeNightIcon",
    imports: [
      "import BpkLargeNightIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/night';",
    ],
    example: figma.code`<BpkLargeNightIcon />`,
  }
}

export default template
