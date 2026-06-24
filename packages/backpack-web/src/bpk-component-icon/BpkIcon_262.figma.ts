// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A255
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/weather--tornado.d.ts
// component=BpkSmallWeatherTornadoIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWeatherTornadoIcon",
    imports: [
      "import BpkSmallWeatherTornadoIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/weather--tornado';",
    ],
    example: figma.code`<BpkSmallWeatherTornadoIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWeatherTornadoIcon",
    imports: [
      "import BpkLargeWeatherTornadoIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--tornado';",
    ],
    example: figma.code`<BpkLargeWeatherTornadoIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWeatherTornadoIcon",
    imports: [
      "import BpkLargeWeatherTornadoIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--tornado';",
    ],
    example: figma.code`<BpkLargeWeatherTornadoIcon />`,
  }
}

export default template
