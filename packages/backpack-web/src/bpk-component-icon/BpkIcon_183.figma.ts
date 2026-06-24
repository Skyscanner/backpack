// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A180
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/parking.d.ts
// component=BpkSmallParkingIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallParkingIcon",
    imports: [
      "import BpkSmallParkingIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/parking';",
    ],
    example: figma.code`<BpkSmallParkingIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeParkingIcon",
    imports: [
      "import BpkLargeParkingIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/parking';",
    ],
    example: figma.code`<BpkLargeParkingIcon />`,
  }
} else {
  template = {
    id: "BpkLargeParkingIcon",
    imports: [
      "import BpkLargeParkingIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/parking';",
    ],
    example: figma.code`<BpkLargeParkingIcon />`,
  }
}

export default template
