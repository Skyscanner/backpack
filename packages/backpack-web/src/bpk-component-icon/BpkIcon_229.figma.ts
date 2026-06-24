// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=14087%3A34
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/temperature.d.ts
// component=BpkSmallTemperatureIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallTemperatureIcon",
    imports: [
      "import BpkSmallTemperatureIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/temperature';",
    ],
    example: figma.code`<BpkSmallTemperatureIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeTemperatureIcon",
    imports: [
      "import BpkLargeTemperatureIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/temperature';",
    ],
    example: figma.code`<BpkLargeTemperatureIcon />`,
  }
} else {
  template = {
    id: "BpkLargeTemperatureIcon",
    imports: [
      "import BpkLargeTemperatureIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/temperature';",
    ],
    example: figma.code`<BpkLargeTemperatureIcon />`,
  }
}

export default template
