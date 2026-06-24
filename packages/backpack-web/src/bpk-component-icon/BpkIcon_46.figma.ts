// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6570%3A102
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/car-door.d.ts
// component=BpkSmallCarDoorIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCarDoorIcon",
    imports: [
      "import BpkSmallCarDoorIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/car-door';",
    ],
    example: figma.code`<BpkSmallCarDoorIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCarDoorIcon",
    imports: [
      "import BpkLargeCarDoorIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/car-door';",
    ],
    example: figma.code`<BpkLargeCarDoorIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCarDoorIcon",
    imports: [
      "import BpkLargeCarDoorIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/car-door';",
    ],
    example: figma.code`<BpkLargeCarDoorIcon />`,
  }
}

export default template
