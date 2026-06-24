// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A250
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/weather--fog.d.ts
// component=BpkSmallWeatherFogIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWeatherFogIcon",
    imports: [
      "import BpkSmallWeatherFogIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/weather--fog';",
    ],
    example: figma.code`<BpkSmallWeatherFogIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWeatherFogIcon",
    imports: [
      "import BpkLargeWeatherFogIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--fog';",
    ],
    example: figma.code`<BpkLargeWeatherFogIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWeatherFogIcon",
    imports: [
      "import BpkLargeWeatherFogIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--fog';",
    ],
    example: figma.code`<BpkLargeWeatherFogIcon />`,
  }
}

export default template
