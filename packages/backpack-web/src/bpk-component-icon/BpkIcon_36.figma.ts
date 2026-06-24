// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A32
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/beer.d.ts
// component=BpkSmallBeerIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallBeerIcon",
    imports: [
      "import BpkSmallBeerIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/beer';",
    ],
    example: figma.code`<BpkSmallBeerIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeBeerIcon",
    imports: [
      "import BpkLargeBeerIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/beer';",
    ],
    example: figma.code`<BpkLargeBeerIcon />`,
  }
} else {
  template = {
    id: "BpkLargeBeerIcon",
    imports: [
      "import BpkLargeBeerIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/beer';",
    ],
    example: figma.code`<BpkLargeBeerIcon />`,
  }
}

export default template
