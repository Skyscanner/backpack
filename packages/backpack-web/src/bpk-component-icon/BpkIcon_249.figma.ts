// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A243
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/use-location.d.ts
// component=BpkSmallUseLocationIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallUseLocationIcon",
    imports: [
      "import BpkSmallUseLocationIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/use-location';",
    ],
    example: figma.code`<BpkSmallUseLocationIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeUseLocationIcon",
    imports: [
      "import BpkLargeUseLocationIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/use-location';",
    ],
    example: figma.code`<BpkLargeUseLocationIcon />`,
  }
} else {
  template = {
    id: "BpkLargeUseLocationIcon",
    imports: [
      "import BpkLargeUseLocationIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/use-location';",
    ],
    example: figma.code`<BpkLargeUseLocationIcon />`,
  }
}

export default template
