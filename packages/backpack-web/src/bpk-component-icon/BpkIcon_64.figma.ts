// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A63
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/cloakroom.d.ts
// component=BpkSmallCloakroomIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCloakroomIcon",
    imports: [
      "import BpkSmallCloakroomIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/cloakroom';",
    ],
    example: figma.code`<BpkSmallCloakroomIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCloakroomIcon",
    imports: [
      "import BpkLargeCloakroomIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/cloakroom';",
    ],
    example: figma.code`<BpkLargeCloakroomIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCloakroomIcon",
    imports: [
      "import BpkLargeCloakroomIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/cloakroom';",
    ],
    example: figma.code`<BpkLargeCloakroomIcon />`,
  }
}

export default template
