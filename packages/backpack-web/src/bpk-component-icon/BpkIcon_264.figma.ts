// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A258
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/wifi.d.ts
// component=BpkSmallWifiIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWifiIcon",
    imports: [
      "import BpkSmallWifiIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/wifi';",
    ],
    example: figma.code`<BpkSmallWifiIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWifiIcon",
    imports: [
      "import BpkLargeWifiIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/wifi';",
    ],
    example: figma.code`<BpkLargeWifiIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWifiIcon",
    imports: [
      "import BpkLargeWifiIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/wifi';",
    ],
    example: figma.code`<BpkLargeWifiIcon />`,
  }
}

export default template
