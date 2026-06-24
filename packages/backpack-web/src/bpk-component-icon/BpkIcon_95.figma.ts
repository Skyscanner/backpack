// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A93
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/face-id.d.ts
// component=BpkSmallFaceIdIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFaceIdIcon",
    imports: [
      "import BpkSmallFaceIdIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/face-id';",
    ],
    example: figma.code`<BpkSmallFaceIdIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFaceIdIcon",
    imports: [
      "import BpkLargeFaceIdIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/face-id';",
    ],
    example: figma.code`<BpkLargeFaceIdIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFaceIdIcon",
    imports: [
      "import BpkLargeFaceIdIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/face-id';",
    ],
    example: figma.code`<BpkLargeFaceIdIcon />`,
  }
}

export default template
