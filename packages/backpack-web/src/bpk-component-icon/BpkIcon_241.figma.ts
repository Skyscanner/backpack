// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A237
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/trend--steady.d.ts
// component=BpkSmallTrendSteadyIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallTrendSteadyIcon",
    imports: [
      "import BpkSmallTrendSteadyIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/trend--steady';",
    ],
    example: figma.code`<BpkSmallTrendSteadyIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeTrendSteadyIcon",
    imports: [
      "import BpkLargeTrendSteadyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/trend--steady';",
    ],
    example: figma.code`<BpkLargeTrendSteadyIcon />`,
  }
} else {
  template = {
    id: "BpkLargeTrendSteadyIcon",
    imports: [
      "import BpkLargeTrendSteadyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/trend--steady';",
    ],
    example: figma.code`<BpkLargeTrendSteadyIcon />`,
  }
}

export default template
