// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A253
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/weather--snow.d.ts
// component=BpkSmallWeatherSnowIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWeatherSnowIcon",
    imports: [
      "import BpkSmallWeatherSnowIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/weather--snow';",
    ],
    example: figma.code`<BpkSmallWeatherSnowIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWeatherSnowIcon",
    imports: [
      "import BpkLargeWeatherSnowIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--snow';",
    ],
    example: figma.code`<BpkLargeWeatherSnowIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWeatherSnowIcon",
    imports: [
      "import BpkLargeWeatherSnowIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--snow';",
    ],
    example: figma.code`<BpkLargeWeatherSnowIcon />`,
  }
}

export default template
