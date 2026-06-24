// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A178
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/paid.d.ts
// component=BpkSmallPaidIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallPaidIcon",
    imports: [
      "import BpkSmallPaidIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/paid';",
    ],
    example: figma.code`<BpkSmallPaidIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargePaidIcon",
    imports: [
      "import BpkLargePaidIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/paid';",
    ],
    example: figma.code`<BpkLargePaidIcon />`,
  }
} else {
  template = {
    id: "BpkLargePaidIcon",
    imports: [
      "import BpkLargePaidIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/paid';",
    ],
    example: figma.code`<BpkLargePaidIcon />`,
  }
}

export default template
