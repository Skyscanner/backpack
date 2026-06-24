// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A252
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/weather--rain.d.ts
// component=BpkSmallWeatherRainIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWeatherRainIcon",
    imports: [
      "import BpkSmallWeatherRainIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/weather--rain';",
    ],
    example: figma.code`<BpkSmallWeatherRainIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWeatherRainIcon",
    imports: [
      "import BpkLargeWeatherRainIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--rain';",
    ],
    example: figma.code`<BpkLargeWeatherRainIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWeatherRainIcon",
    imports: [
      "import BpkLargeWeatherRainIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--rain';",
    ],
    example: figma.code`<BpkLargeWeatherRainIcon />`,
  }
}

export default template
