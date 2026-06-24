// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A58
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/city.d.ts
// component=BpkSmallCityIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCityIcon",
    imports: [
      "import BpkSmallCityIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/city';",
    ],
    example: figma.code`<BpkSmallCityIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCityIcon",
    imports: [
      "import BpkLargeCityIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/city';",
    ],
    example: figma.code`<BpkLargeCityIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCityIcon",
    imports: [
      "import BpkLargeCityIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/city';",
    ],
    example: figma.code`<BpkLargeCityIcon />`,
  }
}

export default template
