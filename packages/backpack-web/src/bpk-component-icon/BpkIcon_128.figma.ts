// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A126
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/hotels--pets-allowed.d.ts
// component=BpkSmallHotelsPetsAllowedIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallHotelsPetsAllowedIcon",
    imports: [
      "import BpkSmallHotelsPetsAllowedIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/hotels--pets-allowed';",
    ],
    example: figma.code`<BpkSmallHotelsPetsAllowedIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeHotelsPetsAllowedIcon",
    imports: [
      "import BpkLargeHotelsPetsAllowedIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/hotels--pets-allowed';",
    ],
    example: figma.code`<BpkLargeHotelsPetsAllowedIcon />`,
  }
} else {
  template = {
    id: "BpkLargeHotelsPetsAllowedIcon",
    imports: [
      "import BpkLargeHotelsPetsAllowedIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/hotels--pets-allowed';",
    ],
    example: figma.code`<BpkLargeHotelsPetsAllowedIcon />`,
  }
}

export default template
