// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A44
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/cars-flexible.d.ts
// component=BpkSmallCarsFlexibleIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCarsFlexibleIcon",
    imports: [
      "import BpkSmallCarsFlexibleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/cars-flexible';",
    ],
    example: figma.code`<BpkSmallCarsFlexibleIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCarsFlexibleIcon",
    imports: [
      "import BpkLargeCarsFlexibleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/cars-flexible';",
    ],
    example: figma.code`<BpkLargeCarsFlexibleIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCarsFlexibleIcon",
    imports: [
      "import BpkLargeCarsFlexibleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/cars-flexible';",
    ],
    example: figma.code`<BpkLargeCarsFlexibleIcon />`,
  }
}

export default template
