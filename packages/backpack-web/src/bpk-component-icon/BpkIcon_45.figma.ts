// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A41
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/camper-van.d.ts
// component=BpkSmallCamperVanIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCamperVanIcon",
    imports: [
      "import BpkSmallCamperVanIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/camper-van';",
    ],
    example: figma.code`<BpkSmallCamperVanIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCamperVanIcon",
    imports: [
      "import BpkLargeCamperVanIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/camper-van';",
    ],
    example: figma.code`<BpkLargeCamperVanIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCamperVanIcon",
    imports: [
      "import BpkLargeCamperVanIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/camper-van';",
    ],
    example: figma.code`<BpkLargeCamperVanIcon />`,
  }
}

export default template
