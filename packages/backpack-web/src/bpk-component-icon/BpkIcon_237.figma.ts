// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A233
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/train.d.ts
// component=BpkSmallTrainIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallTrainIcon",
    imports: [
      "import BpkSmallTrainIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/train';",
    ],
    example: figma.code`<BpkSmallTrainIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeTrainIcon",
    imports: [
      "import BpkLargeTrainIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/train';",
    ],
    example: figma.code`<BpkLargeTrainIcon />`,
  }
} else {
  template = {
    id: "BpkLargeTrainIcon",
    imports: [
      "import BpkLargeTrainIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/train';",
    ],
    example: figma.code`<BpkLargeTrainIcon />`,
  }
}

export default template
