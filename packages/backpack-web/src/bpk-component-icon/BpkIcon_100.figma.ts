// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A98
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/fast-train.d.ts
// component=BpkSmallFastTrainIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFastTrainIcon",
    imports: [
      "import BpkSmallFastTrainIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/fast-train';",
    ],
    example: figma.code`<BpkSmallFastTrainIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFastTrainIcon",
    imports: [
      "import BpkLargeFastTrainIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/fast-train';",
    ],
    example: figma.code`<BpkLargeFastTrainIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFastTrainIcon",
    imports: [
      "import BpkLargeFastTrainIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/fast-train';",
    ],
    example: figma.code`<BpkLargeFastTrainIcon />`,
  }
}

export default template
