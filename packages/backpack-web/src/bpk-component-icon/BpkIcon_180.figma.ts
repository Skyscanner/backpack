// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=8663%3A167
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/origin.d.ts
// component=BpkSmallOriginIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallOriginIcon",
    imports: [
      "import BpkSmallOriginIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/origin';",
    ],
    example: figma.code`<BpkSmallOriginIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeOriginIcon",
    imports: [
      "import BpkLargeOriginIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/origin';",
    ],
    example: figma.code`<BpkLargeOriginIcon />`,
  }
} else {
  template = {
    id: "BpkLargeOriginIcon",
    imports: [
      "import BpkLargeOriginIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/origin';",
    ],
    example: figma.code`<BpkLargeOriginIcon />`,
  }
}

export default template
