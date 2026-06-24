// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A194
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/price-tag.d.ts
// component=BpkSmallPriceTagIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallPriceTagIcon",
    imports: [
      "import BpkSmallPriceTagIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/price-tag';",
    ],
    example: figma.code`<BpkSmallPriceTagIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargePriceTagIcon",
    imports: [
      "import BpkLargePriceTagIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/price-tag';",
    ],
    example: figma.code`<BpkLargePriceTagIcon />`,
  }
} else {
  template = {
    id: "BpkLargePriceTagIcon",
    imports: [
      "import BpkLargePriceTagIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/price-tag';",
    ],
    example: figma.code`<BpkLargePriceTagIcon />`,
  }
}

export default template
