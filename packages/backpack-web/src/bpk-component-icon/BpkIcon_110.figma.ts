// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A107
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/food.d.ts
// component=BpkSmallFoodIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFoodIcon",
    imports: [
      "import BpkSmallFoodIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/food';",
    ],
    example: figma.code`<BpkSmallFoodIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFoodIcon",
    imports: [
      "import BpkLargeFoodIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/food';",
    ],
    example: figma.code`<BpkLargeFoodIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFoodIcon",
    imports: [
      "import BpkLargeFoodIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/food';",
    ],
    example: figma.code`<BpkLargeFoodIcon />`,
  }
}

export default template
