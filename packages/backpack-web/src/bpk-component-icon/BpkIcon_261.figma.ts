// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A254
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/weather--thunderstorm.d.ts
// component=BpkSmallWeatherThunderstormIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWeatherThunderstormIcon",
    imports: [
      "import BpkSmallWeatherThunderstormIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/weather--thunderstorm';",
    ],
    example: figma.code`<BpkSmallWeatherThunderstormIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWeatherThunderstormIcon",
    imports: [
      "import BpkLargeWeatherThunderstormIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--thunderstorm';",
    ],
    example: figma.code`<BpkLargeWeatherThunderstormIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWeatherThunderstormIcon",
    imports: [
      "import BpkLargeWeatherThunderstormIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--thunderstorm';",
    ],
    example: figma.code`<BpkLargeWeatherThunderstormIcon />`,
  }
}

export default template
