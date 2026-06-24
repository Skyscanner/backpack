// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A225
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/taxi.d.ts
// component=BpkSmallTaxiIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallTaxiIcon",
    imports: [
      "import BpkSmallTaxiIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/taxi';",
    ],
    example: figma.code`<BpkSmallTaxiIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeTaxiIcon",
    imports: [
      "import BpkLargeTaxiIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/taxi';",
    ],
    example: figma.code`<BpkLargeTaxiIcon />`,
  }
} else {
  template = {
    id: "BpkLargeTaxiIcon",
    imports: [
      "import BpkLargeTaxiIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/taxi';",
    ],
    example: figma.code`<BpkLargeTaxiIcon />`,
  }
}

export default template
