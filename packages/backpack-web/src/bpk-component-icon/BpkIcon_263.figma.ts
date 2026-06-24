// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A256
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/weather--wind.d.ts
// component=BpkSmallWeatherWindIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWeatherWindIcon",
    imports: [
      "import BpkSmallWeatherWindIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/weather--wind';",
    ],
    example: figma.code`<BpkSmallWeatherWindIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWeatherWindIcon",
    imports: [
      "import BpkLargeWeatherWindIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--wind';",
    ],
    example: figma.code`<BpkLargeWeatherWindIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWeatherWindIcon",
    imports: [
      "import BpkLargeWeatherWindIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--wind';",
    ],
    example: figma.code`<BpkLargeWeatherWindIcon />`,
  }
}

export default template
