// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A261
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/world--amer.d.ts
// component=BpkSmallWorldAmerIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWorldAmerIcon",
    imports: [
      "import BpkSmallWorldAmerIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/world--amer';",
    ],
    example: figma.code`<BpkSmallWorldAmerIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWorldAmerIcon",
    imports: [
      "import BpkLargeWorldAmerIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/world--amer';",
    ],
    example: figma.code`<BpkLargeWorldAmerIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWorldAmerIcon",
    imports: [
      "import BpkLargeWorldAmerIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/world--amer';",
    ],
    example: figma.code`<BpkLargeWorldAmerIcon />`,
  }
}

export default template
