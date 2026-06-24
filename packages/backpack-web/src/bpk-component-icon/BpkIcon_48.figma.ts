// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A43
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/cars.d.ts
// component=BpkSmallCarsIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCarsIcon",
    imports: [
      "import BpkSmallCarsIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/cars';",
    ],
    example: figma.code`<BpkSmallCarsIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCarsIcon",
    imports: [
      "import BpkLargeCarsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/cars';",
    ],
    example: figma.code`<BpkLargeCarsIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCarsIcon",
    imports: [
      "import BpkLargeCarsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/cars';",
    ],
    example: figma.code`<BpkLargeCarsIcon />`,
  }
}

export default template
