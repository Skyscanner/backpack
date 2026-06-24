// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A134
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/insurance.d.ts
// component=BpkSmallInsuranceIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallInsuranceIcon",
    imports: [
      "import BpkSmallInsuranceIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/insurance';",
    ],
    example: figma.code`<BpkSmallInsuranceIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeInsuranceIcon",
    imports: [
      "import BpkLargeInsuranceIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/insurance';",
    ],
    example: figma.code`<BpkLargeInsuranceIcon />`,
  }
} else {
  template = {
    id: "BpkLargeInsuranceIcon",
    imports: [
      "import BpkLargeInsuranceIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/insurance';",
    ],
    example: figma.code`<BpkLargeInsuranceIcon />`,
  }
}

export default template
