// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A84
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/electric.d.ts
// component=BpkSmallElectricIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallElectricIcon",
    imports: [
      "import BpkSmallElectricIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/electric';",
    ],
    example: figma.code`<BpkSmallElectricIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeElectricIcon",
    imports: [
      "import BpkLargeElectricIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/electric';",
    ],
    example: figma.code`<BpkLargeElectricIcon />`,
  }
} else {
  template = {
    id: "BpkLargeElectricIcon",
    imports: [
      "import BpkLargeElectricIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/electric';",
    ],
    example: figma.code`<BpkLargeElectricIcon />`,
  }
}

export default template
