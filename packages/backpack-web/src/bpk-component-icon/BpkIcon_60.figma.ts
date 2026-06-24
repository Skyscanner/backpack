// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A59
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/city-center.d.ts
// component=BpkSmallCityCenterIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCityCenterIcon",
    imports: [
      "import BpkSmallCityCenterIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/city-center';",
    ],
    example: figma.code`<BpkSmallCityCenterIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCityCenterIcon",
    imports: [
      "import BpkLargeCityCenterIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/city-center';",
    ],
    example: figma.code`<BpkLargeCityCenterIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCityCenterIcon",
    imports: [
      "import BpkLargeCityCenterIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/city-center';",
    ],
    example: figma.code`<BpkLargeCityCenterIcon />`,
  }
}

export default template
