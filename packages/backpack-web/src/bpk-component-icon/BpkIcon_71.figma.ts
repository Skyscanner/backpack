// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A70
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/currency.d.ts
// component=BpkSmallCurrencyIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCurrencyIcon",
    imports: [
      "import BpkSmallCurrencyIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/currency';",
    ],
    example: figma.code`<BpkSmallCurrencyIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCurrencyIcon",
    imports: [
      "import BpkLargeCurrencyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/currency';",
    ],
    example: figma.code`<BpkLargeCurrencyIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCurrencyIcon",
    imports: [
      "import BpkLargeCurrencyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/currency';",
    ],
    example: figma.code`<BpkLargeCurrencyIcon />`,
  }
}

export default template
