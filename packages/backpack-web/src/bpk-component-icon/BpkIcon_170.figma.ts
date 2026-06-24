// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A168
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/native-android--back.d.ts
// component=BpkSmallNativeAndroidBackIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallNativeAndroidBackIcon",
    imports: [
      "import BpkSmallNativeAndroidBackIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/native-android--back';",
    ],
    example: figma.code`<BpkSmallNativeAndroidBackIcon />`,
  }
} else {
  template = {
    id: "BpkSmallNativeAndroidBackIcon",
    imports: [
      "import BpkSmallNativeAndroidBackIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/native-android--back';",
    ],
    example: figma.code`<BpkSmallNativeAndroidBackIcon />`,
  }
}

export default template
