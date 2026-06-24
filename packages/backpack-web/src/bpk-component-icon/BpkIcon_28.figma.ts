// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=14620%3A307
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/baggage-cabin-uncertain.d.ts
// component=BpkSmallBaggageCabinUncertainIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallBaggageCabinUncertainIcon",
    imports: [
      "import BpkSmallBaggageCabinUncertainIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/baggage-cabin-uncertain';",
    ],
    example: figma.code`<BpkSmallBaggageCabinUncertainIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeBaggageCabinUncertainIcon",
    imports: [
      "import BpkLargeBaggageCabinUncertainIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/baggage-cabin-uncertain';",
    ],
    example: figma.code`<BpkLargeBaggageCabinUncertainIcon />`,
  }
} else {
  template = {
    id: "BpkLargeBaggageCabinUncertainIcon",
    imports: [
      "import BpkLargeBaggageCabinUncertainIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/baggage-cabin-uncertain';",
    ],
    example: figma.code`<BpkLargeBaggageCabinUncertainIcon />`,
  }
}

export default template
