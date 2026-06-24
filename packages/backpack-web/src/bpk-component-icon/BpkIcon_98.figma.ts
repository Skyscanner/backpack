// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A96
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/family.d.ts
// component=BpkSmallFamilyIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFamilyIcon",
    imports: [
      "import BpkSmallFamilyIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/family';",
    ],
    example: figma.code`<BpkSmallFamilyIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFamilyIcon",
    imports: [
      "import BpkLargeFamilyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/family';",
    ],
    example: figma.code`<BpkLargeFamilyIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFamilyIcon",
    imports: [
      "import BpkLargeFamilyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/family';",
    ],
    example: figma.code`<BpkLargeFamilyIcon />`,
  }
}

export default template
