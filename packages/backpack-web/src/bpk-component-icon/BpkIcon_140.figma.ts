// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A137
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/landmark.d.ts
// component=BpkSmallLandmarkIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallLandmarkIcon",
    imports: [
      "import BpkSmallLandmarkIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/landmark';",
    ],
    example: figma.code`<BpkSmallLandmarkIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeLandmarkIcon",
    imports: [
      "import BpkLargeLandmarkIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/landmark';",
    ],
    example: figma.code`<BpkLargeLandmarkIcon />`,
  }
} else {
  template = {
    id: "BpkLargeLandmarkIcon",
    imports: [
      "import BpkLargeLandmarkIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/landmark';",
    ],
    example: figma.code`<BpkLargeLandmarkIcon />`,
  }
}

export default template
