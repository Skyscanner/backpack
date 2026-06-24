// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A91
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/face--blank.d.ts
// component=BpkSmallFaceBlankIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFaceBlankIcon",
    imports: [
      "import BpkSmallFaceBlankIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/face--blank';",
    ],
    example: figma.code`<BpkSmallFaceBlankIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFaceBlankIcon",
    imports: [
      "import BpkLargeFaceBlankIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/face--blank';",
    ],
    example: figma.code`<BpkLargeFaceBlankIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFaceBlankIcon",
    imports: [
      "import BpkLargeFaceBlankIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/face--blank';",
    ],
    example: figma.code`<BpkLargeFaceBlankIcon />`,
  }
}

export default template
