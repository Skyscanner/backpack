// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A124
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/hotels--disabled-facilities.d.ts
// component=BpkSmallHotelsDisabledFacilitiesIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallHotelsDisabledFacilitiesIcon",
    imports: [
      "import BpkSmallHotelsDisabledFacilitiesIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/hotels--disabled-facilities';",
    ],
    example: figma.code`<BpkSmallHotelsDisabledFacilitiesIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeHotelsDisabledFacilitiesIcon",
    imports: [
      "import BpkLargeHotelsDisabledFacilitiesIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/hotels--disabled-facilities';",
    ],
    example: figma.code`<BpkLargeHotelsDisabledFacilitiesIcon />`,
  }
} else {
  template = {
    id: "BpkLargeHotelsDisabledFacilitiesIcon",
    imports: [
      "import BpkLargeHotelsDisabledFacilitiesIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/hotels--disabled-facilities';",
    ],
    example: figma.code`<BpkLargeHotelsDisabledFacilitiesIcon />`,
  }
}

export default template
