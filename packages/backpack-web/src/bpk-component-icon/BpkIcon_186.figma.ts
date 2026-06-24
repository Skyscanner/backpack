// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A183
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/payment-card.d.ts
// component=BpkSmallPaymentCardIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallPaymentCardIcon",
    imports: [
      "import BpkSmallPaymentCardIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/payment-card';",
    ],
    example: figma.code`<BpkSmallPaymentCardIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargePaymentCardIcon",
    imports: [
      "import BpkLargePaymentCardIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/payment-card';",
    ],
    example: figma.code`<BpkLargePaymentCardIcon />`,
  }
} else {
  template = {
    id: "BpkLargePaymentCardIcon",
    imports: [
      "import BpkLargePaymentCardIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/payment-card';",
    ],
    example: figma.code`<BpkLargePaymentCardIcon />`,
  }
}

export default template
