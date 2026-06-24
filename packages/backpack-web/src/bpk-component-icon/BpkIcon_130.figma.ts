// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=13884%3A52
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/incompatible.d.ts
// component=BpkSmallIncompatibleIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallIncompatibleIcon",
    imports: [
      "import BpkSmallIncompatibleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/incompatible';",
    ],
    example: figma.code`<BpkSmallIncompatibleIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeIncompatibleIcon",
    imports: [
      "import BpkLargeIncompatibleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/incompatible';",
    ],
    example: figma.code`<BpkLargeIncompatibleIcon />`,
  }
} else {
  template = {
    id: "BpkLargeIncompatibleIcon",
    imports: [
      "import BpkLargeIncompatibleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/incompatible';",
    ],
    example: figma.code`<BpkLargeIncompatibleIcon />`,
  }
}

export default template
