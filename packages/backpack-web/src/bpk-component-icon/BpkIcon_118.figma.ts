// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A116
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/health-fitness.d.ts
// component=BpkSmallHealthFitnessIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallHealthFitnessIcon",
    imports: [
      "import BpkSmallHealthFitnessIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/health-fitness';",
    ],
    example: figma.code`<BpkSmallHealthFitnessIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeHealthFitnessIcon",
    imports: [
      "import BpkLargeHealthFitnessIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/health-fitness';",
    ],
    example: figma.code`<BpkLargeHealthFitnessIcon />`,
  }
} else {
  template = {
    id: "BpkLargeHealthFitnessIcon",
    imports: [
      "import BpkLargeHealthFitnessIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/health-fitness';",
    ],
    example: figma.code`<BpkLargeHealthFitnessIcon />`,
  }
}

export default template
