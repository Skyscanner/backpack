// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A45
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/chart.d.ts
// component=BpkSmallChartIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallChartIcon",
    imports: [
      "import BpkSmallChartIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/chart';",
    ],
    example: figma.code`<BpkSmallChartIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeChartIcon",
    imports: [
      "import BpkLargeChartIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/chart';",
    ],
    example: figma.code`<BpkLargeChartIcon />`,
  }
} else {
  template = {
    id: "BpkLargeChartIcon",
    imports: [
      "import BpkLargeChartIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/chart';",
    ],
    example: figma.code`<BpkLargeChartIcon />`,
  }
}

export default template
