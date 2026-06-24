// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A171
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/native-ios-close.d.ts
// component=BpkSmallNativeIosCloseIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallNativeIosCloseIcon",
    imports: [
      "import BpkSmallNativeIosCloseIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/native-ios-close';",
    ],
    example: figma.code`<BpkSmallNativeIosCloseIcon />`,
  }
} else {
  template = {
    id: "BpkSmallNativeIosCloseIcon",
    imports: [
      "import BpkSmallNativeIosCloseIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/native-ios-close';",
    ],
    example: figma.code`<BpkSmallNativeIosCloseIcon />`,
  }
}

export default template
