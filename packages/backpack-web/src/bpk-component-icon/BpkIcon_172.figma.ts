// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A170
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/native-android--forward.d.ts
// component=BpkSmallNativeAndroidForwardIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallNativeAndroidForwardIcon",
    imports: [
      "import BpkSmallNativeAndroidForwardIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/native-android--forward';",
    ],
    example: figma.code`<BpkSmallNativeAndroidForwardIcon />`,
  }
} else {
  template = {
    id: "BpkSmallNativeAndroidForwardIcon",
    imports: [
      "import BpkSmallNativeAndroidForwardIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/native-android--forward';",
    ],
    example: figma.code`<BpkSmallNativeAndroidForwardIcon />`,
  }
}

export default template
