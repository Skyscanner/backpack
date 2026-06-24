// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A169
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/native-android--close.d.ts
// component=BpkSmallNativeAndroidCloseIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallNativeAndroidCloseIcon",
    imports: [
      "import BpkSmallNativeAndroidCloseIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/native-android--close';",
    ],
    example: figma.code`<BpkSmallNativeAndroidCloseIcon />`,
  }
} else {
  template = {
    id: "BpkSmallNativeAndroidCloseIcon",
    imports: [
      "import BpkSmallNativeAndroidCloseIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/native-android--close';",
    ],
    example: figma.code`<BpkSmallNativeAndroidCloseIcon />`,
  }
}

export default template
