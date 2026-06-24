// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A251
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/weather--partly-cloudy.d.ts
// component=BpkSmallWeatherPartlyCloudyIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWeatherPartlyCloudyIcon",
    imports: [
      "import BpkSmallWeatherPartlyCloudyIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/weather--partly-cloudy';",
    ],
    example: figma.code`<BpkSmallWeatherPartlyCloudyIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWeatherPartlyCloudyIcon",
    imports: [
      "import BpkLargeWeatherPartlyCloudyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--partly-cloudy';",
    ],
    example: figma.code`<BpkLargeWeatherPartlyCloudyIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWeatherPartlyCloudyIcon",
    imports: [
      "import BpkLargeWeatherPartlyCloudyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--partly-cloudy';",
    ],
    example: figma.code`<BpkLargeWeatherPartlyCloudyIcon />`,
  }
}

export default template
