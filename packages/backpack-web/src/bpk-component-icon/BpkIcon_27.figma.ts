// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=8308%3A195
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/baggage-cabin-not-included.d.ts
// component=BpkSmallBaggageCabinNotIncludedIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallBaggageCabinNotIncludedIcon",
    imports: [
      "import BpkSmallBaggageCabinNotIncludedIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/baggage-cabin-not-included';",
    ],
    example: figma.code`<BpkSmallBaggageCabinNotIncludedIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeBaggageCabinNotIncludedIcon",
    imports: [
      "import BpkLargeBaggageCabinNotIncludedIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/baggage-cabin-not-included';",
    ],
    example: figma.code`<BpkLargeBaggageCabinNotIncludedIcon />`,
  }
} else {
  template = {
    id: "BpkLargeBaggageCabinNotIncludedIcon",
    imports: [
      "import BpkLargeBaggageCabinNotIncludedIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/baggage-cabin-not-included';",
    ],
    example: figma.code`<BpkLargeBaggageCabinNotIncludedIcon />`,
  }
}

export default template
