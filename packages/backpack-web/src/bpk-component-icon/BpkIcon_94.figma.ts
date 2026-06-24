// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A92
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/face--happy.d.ts
// component=BpkSmallFaceHappyIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFaceHappyIcon",
    imports: [
      "import BpkSmallFaceHappyIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/face--happy';",
    ],
    example: figma.code`<BpkSmallFaceHappyIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFaceHappyIcon",
    imports: [
      "import BpkLargeFaceHappyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/face--happy';",
    ],
    example: figma.code`<BpkLargeFaceHappyIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFaceHappyIcon",
    imports: [
      "import BpkLargeFaceHappyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/face--happy';",
    ],
    example: figma.code`<BpkLargeFaceHappyIcon />`,
  }
}

export default template
