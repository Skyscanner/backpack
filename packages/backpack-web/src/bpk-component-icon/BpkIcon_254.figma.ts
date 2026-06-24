// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A247
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/weather.d.ts
// component=BpkSmallWeatherIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWeatherIcon",
    imports: [
      "import BpkSmallWeatherIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/weather';",
    ],
    example: figma.code`<BpkSmallWeatherIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWeatherIcon",
    imports: [
      "import BpkLargeWeatherIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather';",
    ],
    example: figma.code`<BpkLargeWeatherIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWeatherIcon",
    imports: [
      "import BpkLargeWeatherIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather';",
    ],
    example: figma.code`<BpkLargeWeatherIcon />`,
  }
}

export default template
