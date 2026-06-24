// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A111
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/gears-manual-circle.d.ts
// component=BpkSmallGearsManualCircleIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallGearsManualCircleIcon",
    imports: [
      "import BpkSmallGearsManualCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/gears-manual-circle';",
    ],
    example: figma.code`<BpkSmallGearsManualCircleIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeGearsManualCircleIcon",
    imports: [
      "import BpkLargeGearsManualCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/gears-manual-circle';",
    ],
    example: figma.code`<BpkLargeGearsManualCircleIcon />`,
  }
} else {
  template = {
    id: "BpkLargeGearsManualCircleIcon",
    imports: [
      "import BpkLargeGearsManualCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/gears-manual-circle';",
    ],
    example: figma.code`<BpkLargeGearsManualCircleIcon />`,
  }
}

export default template
