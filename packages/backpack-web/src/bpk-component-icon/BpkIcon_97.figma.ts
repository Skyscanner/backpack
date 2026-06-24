// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A95
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/face--sad.d.ts
// component=BpkSmallFaceSadIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFaceSadIcon",
    imports: [
      "import BpkSmallFaceSadIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/face--sad';",
    ],
    example: figma.code`<BpkSmallFaceSadIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFaceSadIcon",
    imports: [
      "import BpkLargeFaceSadIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/face--sad';",
    ],
    example: figma.code`<BpkLargeFaceSadIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFaceSadIcon",
    imports: [
      "import BpkLargeFaceSadIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/face--sad';",
    ],
    example: figma.code`<BpkLargeFaceSadIcon />`,
  }
}

export default template
