// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A209
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/share--android.d.ts
// component=BpkSmallShareAndroidIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallShareAndroidIcon",
    imports: [
      "import BpkSmallShareAndroidIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/share--android';",
    ],
    example: figma.code`<BpkSmallShareAndroidIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeShareAndroidIcon",
    imports: [
      "import BpkLargeShareAndroidIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/share--android';",
    ],
    example: figma.code`<BpkLargeShareAndroidIcon />`,
  }
} else {
  template = {
    id: "BpkLargeShareAndroidIcon",
    imports: [
      "import BpkLargeShareAndroidIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/share--android';",
    ],
    example: figma.code`<BpkLargeShareAndroidIcon />`,
  }
}

export default template
