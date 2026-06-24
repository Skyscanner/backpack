// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A156
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/meal.d.ts
// component=BpkSmallMealIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallMealIcon",
    imports: [
      "import BpkSmallMealIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/meal';",
    ],
    example: figma.code`<BpkSmallMealIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeMealIcon",
    imports: [
      "import BpkLargeMealIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/meal';",
    ],
    example: figma.code`<BpkLargeMealIcon />`,
  }
} else {
  template = {
    id: "BpkLargeMealIcon",
    imports: [
      "import BpkLargeMealIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/meal';",
    ],
    example: figma.code`<BpkLargeMealIcon />`,
  }
}

export default template
