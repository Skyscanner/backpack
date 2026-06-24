// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A161
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/mileage.d.ts
// component=BpkSmallMileageIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallMileageIcon",
    imports: [
      "import BpkSmallMileageIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/mileage';",
    ],
    example: figma.code`<BpkSmallMileageIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeMileageIcon",
    imports: [
      "import BpkLargeMileageIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/mileage';",
    ],
    example: figma.code`<BpkLargeMileageIcon />`,
  }
} else {
  template = {
    id: "BpkLargeMileageIcon",
    imports: [
      "import BpkLargeMileageIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/mileage';",
    ],
    example: figma.code`<BpkLargeMileageIcon />`,
  }
}

export default template
