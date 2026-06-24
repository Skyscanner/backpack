// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A125
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/hotels--jacuzzi.d.ts
// component=BpkSmallHotelsJacuzziIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallHotelsJacuzziIcon",
    imports: [
      "import BpkSmallHotelsJacuzziIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/hotels--jacuzzi';",
    ],
    example: figma.code`<BpkSmallHotelsJacuzziIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeHotelsJacuzziIcon",
    imports: [
      "import BpkLargeHotelsJacuzziIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/hotels--jacuzzi';",
    ],
    example: figma.code`<BpkLargeHotelsJacuzziIcon />`,
  }
} else {
  template = {
    id: "BpkLargeHotelsJacuzziIcon",
    imports: [
      "import BpkLargeHotelsJacuzziIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/hotels--jacuzzi';",
    ],
    example: figma.code`<BpkLargeHotelsJacuzziIcon />`,
  }
}

export default template
