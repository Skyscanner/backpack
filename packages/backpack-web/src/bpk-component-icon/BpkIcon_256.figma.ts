// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A249
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/weather--cloudy.d.ts
// component=BpkSmallWeatherCloudyIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWeatherCloudyIcon",
    imports: [
      "import BpkSmallWeatherCloudyIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/weather--cloudy';",
    ],
    example: figma.code`<BpkSmallWeatherCloudyIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWeatherCloudyIcon",
    imports: [
      "import BpkLargeWeatherCloudyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--cloudy';",
    ],
    example: figma.code`<BpkLargeWeatherCloudyIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWeatherCloudyIcon",
    imports: [
      "import BpkLargeWeatherCloudyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/weather--cloudy';",
    ],
    example: figma.code`<BpkLargeWeatherCloudyIcon />`,
  }
}

export default template
