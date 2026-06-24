// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A24
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/baby-carriage.d.ts
// component=BpkSmallBabyCarriageIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallBabyCarriageIcon",
    imports: [
      "import BpkSmallBabyCarriageIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/baby-carriage';",
    ],
    example: figma.code`<BpkSmallBabyCarriageIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeBabyCarriageIcon",
    imports: [
      "import BpkLargeBabyCarriageIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/baby-carriage';",
    ],
    example: figma.code`<BpkLargeBabyCarriageIcon />`,
  }
} else {
  template = {
    id: "BpkLargeBabyCarriageIcon",
    imports: [
      "import BpkLargeBabyCarriageIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/baby-carriage';",
    ],
    example: figma.code`<BpkLargeBabyCarriageIcon />`,
  }
}

export default template
