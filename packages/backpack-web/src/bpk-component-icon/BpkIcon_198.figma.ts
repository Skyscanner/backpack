// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A195
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/price-alerts.d.ts
// component=BpkSmallPriceAlertsIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallPriceAlertsIcon",
    imports: [
      "import BpkSmallPriceAlertsIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/price-alerts';",
    ],
    example: figma.code`<BpkSmallPriceAlertsIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargePriceAlertsIcon",
    imports: [
      "import BpkLargePriceAlertsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/price-alerts';",
    ],
    example: figma.code`<BpkLargePriceAlertsIcon />`,
  }
} else {
  template = {
    id: "BpkLargePriceAlertsIcon",
    imports: [
      "import BpkLargePriceAlertsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/price-alerts';",
    ],
    example: figma.code`<BpkLargePriceAlertsIcon />`,
  }
}

export default template
