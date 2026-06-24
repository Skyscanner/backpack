// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A110
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/gears-manual.d.ts
// component=BpkSmallGearsManualIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallGearsManualIcon",
    imports: [
      "import BpkSmallGearsManualIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/gears-manual';",
    ],
    example: figma.code`<BpkSmallGearsManualIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeGearsManualIcon",
    imports: [
      "import BpkLargeGearsManualIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/gears-manual';",
    ],
    example: figma.code`<BpkLargeGearsManualIcon />`,
  }
} else {
  template = {
    id: "BpkLargeGearsManualIcon",
    imports: [
      "import BpkLargeGearsManualIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/gears-manual';",
    ],
    example: figma.code`<BpkLargeGearsManualIcon />`,
  }
}

export default template
