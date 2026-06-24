// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=14620%3A292
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/baggage-checked-uncertain.d.ts
// component=BpkSmallBaggageCheckedUncertainIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallBaggageCheckedUncertainIcon",
    imports: [
      "import BpkSmallBaggageCheckedUncertainIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/baggage-checked-uncertain';",
    ],
    example: figma.code`<BpkSmallBaggageCheckedUncertainIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeBaggageCheckedUncertainIcon",
    imports: [
      "import BpkLargeBaggageCheckedUncertainIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/baggage-checked-uncertain';",
    ],
    example: figma.code`<BpkLargeBaggageCheckedUncertainIcon />`,
  }
} else {
  template = {
    id: "BpkLargeBaggageCheckedUncertainIcon",
    imports: [
      "import BpkLargeBaggageCheckedUncertainIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/baggage-checked-uncertain';",
    ],
    example: figma.code`<BpkLargeBaggageCheckedUncertainIcon />`,
  }
}

export default template
