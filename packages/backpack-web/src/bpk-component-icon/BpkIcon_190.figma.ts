// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A187
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/pin.d.ts
// component=BpkSmallPinIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallPinIcon",
    imports: [
      "import BpkSmallPinIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/pin';",
    ],
    example: figma.code`<BpkSmallPinIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargePinIcon",
    imports: [
      "import BpkLargePinIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/pin';",
    ],
    example: figma.code`<BpkLargePinIcon />`,
  }
} else {
  template = {
    id: "BpkLargePinIcon",
    imports: [
      "import BpkLargePinIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/pin';",
    ],
    example: figma.code`<BpkLargePinIcon />`,
  }
}

export default template
