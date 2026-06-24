// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A62
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/cleaning-medical.d.ts
// component=BpkSmallCleaningMedicalIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCleaningMedicalIcon",
    imports: [
      "import BpkSmallCleaningMedicalIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/cleaning-medical';",
    ],
    example: figma.code`<BpkSmallCleaningMedicalIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCleaningMedicalIcon",
    imports: [
      "import BpkLargeCleaningMedicalIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/cleaning-medical';",
    ],
    example: figma.code`<BpkLargeCleaningMedicalIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCleaningMedicalIcon",
    imports: [
      "import BpkLargeCleaningMedicalIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/cleaning-medical';",
    ],
    example: figma.code`<BpkLargeCleaningMedicalIcon />`,
  }
}

export default template
