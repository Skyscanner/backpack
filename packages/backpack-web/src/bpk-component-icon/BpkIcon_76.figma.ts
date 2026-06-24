// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A75
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/device-wide.d.ts
// component=BpkSmallDeviceWideIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallDeviceWideIcon",
    imports: [
      "import BpkSmallDeviceWideIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/device-wide';",
    ],
    example: figma.code`<BpkSmallDeviceWideIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeDeviceWideIcon",
    imports: [
      "import BpkLargeDeviceWideIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/device-wide';",
    ],
    example: figma.code`<BpkLargeDeviceWideIcon />`,
  }
} else {
  template = {
    id: "BpkLargeDeviceWideIcon",
    imports: [
      "import BpkLargeDeviceWideIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/device-wide';",
    ],
    example: figma.code`<BpkLargeDeviceWideIcon />`,
  }
}

export default template
