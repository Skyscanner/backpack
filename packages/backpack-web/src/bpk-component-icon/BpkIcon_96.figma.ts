// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A94
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/face-mask.d.ts
// component=BpkSmallFaceMaskIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFaceMaskIcon",
    imports: [
      "import BpkSmallFaceMaskIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/face-mask';",
    ],
    example: figma.code`<BpkSmallFaceMaskIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFaceMaskIcon",
    imports: [
      "import BpkLargeFaceMaskIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/face-mask';",
    ],
    example: figma.code`<BpkLargeFaceMaskIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFaceMaskIcon",
    imports: [
      "import BpkLargeFaceMaskIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/face-mask';",
    ],
    example: figma.code`<BpkLargeFaceMaskIcon />`,
  }
}

export default template
