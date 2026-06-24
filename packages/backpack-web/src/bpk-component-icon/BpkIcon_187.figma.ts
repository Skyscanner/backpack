// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A184
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/petrol.d.ts
// component=BpkSmallPetrolIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallPetrolIcon",
    imports: [
      "import BpkSmallPetrolIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/petrol';",
    ],
    example: figma.code`<BpkSmallPetrolIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargePetrolIcon",
    imports: [
      "import BpkLargePetrolIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/petrol';",
    ],
    example: figma.code`<BpkLargePetrolIcon />`,
  }
} else {
  template = {
    id: "BpkLargePetrolIcon",
    imports: [
      "import BpkLargePetrolIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/petrol';",
    ],
    example: figma.code`<BpkLargePetrolIcon />`,
  }
}

export default template
