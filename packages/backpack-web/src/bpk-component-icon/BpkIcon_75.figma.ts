// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A74
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/device-mid.d.ts
// component=BpkSmallDeviceMidIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallDeviceMidIcon",
    imports: [
      "import BpkSmallDeviceMidIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/device-mid';",
    ],
    example: figma.code`<BpkSmallDeviceMidIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeDeviceMidIcon",
    imports: [
      "import BpkLargeDeviceMidIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/device-mid';",
    ],
    example: figma.code`<BpkLargeDeviceMidIcon />`,
  }
} else {
  template = {
    id: "BpkLargeDeviceMidIcon",
    imports: [
      "import BpkLargeDeviceMidIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/device-mid';",
    ],
    example: figma.code`<BpkLargeDeviceMidIcon />`,
  }
}

export default template
