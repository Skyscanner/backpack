// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A232
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/toilets.d.ts
// component=BpkSmallToiletsIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallToiletsIcon",
    imports: [
      "import BpkSmallToiletsIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/toilets';",
    ],
    example: figma.code`<BpkSmallToiletsIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeToiletsIcon",
    imports: [
      "import BpkLargeToiletsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/toilets';",
    ],
    example: figma.code`<BpkLargeToiletsIcon />`,
  }
} else {
  template = {
    id: "BpkLargeToiletsIcon",
    imports: [
      "import BpkLargeToiletsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/toilets';",
    ],
    example: figma.code`<BpkLargeToiletsIcon />`,
  }
}

export default template
