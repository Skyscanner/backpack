// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A248
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/weather--clear.d.ts
// component=BpkSmallWeatherClearIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWeatherClearIcon",
    imports: [
      "import BpkSmallWeatherClearIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/weather--clear';",
    ],
    example: figma.code`<BpkSmallWeatherClearIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWeatherClearIcon",
    imports: [
      "import BpkLargeWeatherClearIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--clear';",
    ],
    example: figma.code`<BpkLargeWeatherClearIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWeatherClearIcon",
    imports: [
      "import BpkLargeWeatherClearIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--clear';",
    ],
    example: figma.code`<BpkLargeWeatherClearIcon />`,
  }
}

export default template
