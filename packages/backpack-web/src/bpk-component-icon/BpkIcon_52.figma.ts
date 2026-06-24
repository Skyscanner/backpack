// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A46
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/chauffeur.d.ts
// component=BpkSmallChauffeurIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallChauffeurIcon",
    imports: [
      "import BpkSmallChauffeurIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/chauffeur';",
    ],
    example: figma.code`<BpkSmallChauffeurIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeChauffeurIcon",
    imports: [
      "import BpkLargeChauffeurIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/chauffeur';",
    ],
    example: figma.code`<BpkLargeChauffeurIcon />`,
  }
} else {
  template = {
    id: "BpkLargeChauffeurIcon",
    imports: [
      "import BpkLargeChauffeurIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/chauffeur';",
    ],
    example: figma.code`<BpkLargeChauffeurIcon />`,
  }
}

export default template
