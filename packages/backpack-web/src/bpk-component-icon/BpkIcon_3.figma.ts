// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A3
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/account--female.d.ts
// component=BpkSmallAccountFemaleIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAccountFemaleIcon",
    imports: [
      "import BpkSmallAccountFemaleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/account--female';",
    ],
    example: figma.code`<BpkSmallAccountFemaleIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAccountFemaleIcon",
    imports: [
      "import BpkLargeAccountFemaleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/account--female';",
    ],
    example: figma.code`<BpkLargeAccountFemaleIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAccountFemaleIcon",
    imports: [
      "import BpkLargeAccountFemaleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/account--female';",
    ],
    example: figma.code`<BpkLargeAccountFemaleIcon />`,
  }
}

export default template
