// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A39
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/call-back.d.ts
// component=BpkSmallCallBackIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCallBackIcon",
    imports: [
      "import BpkSmallCallBackIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/call-back';",
    ],
    example: figma.code`<BpkSmallCallBackIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCallBackIcon",
    imports: [
      "import BpkLargeCallBackIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/call-back';",
    ],
    example: figma.code`<BpkLargeCallBackIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCallBackIcon",
    imports: [
      "import BpkLargeCallBackIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/call-back';",
    ],
    example: figma.code`<BpkLargeCallBackIcon />`,
  }
}

export default template
