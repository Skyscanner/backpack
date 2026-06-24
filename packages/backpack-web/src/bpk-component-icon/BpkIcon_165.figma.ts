// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A163
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/mobile.d.ts
// component=BpkSmallMobileIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallMobileIcon",
    imports: [
      "import BpkSmallMobileIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/mobile';",
    ],
    example: figma.code`<BpkSmallMobileIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeMobileIcon",
    imports: [
      "import BpkLargeMobileIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/mobile';",
    ],
    example: figma.code`<BpkLargeMobileIcon />`,
  }
} else {
  template = {
    id: "BpkLargeMobileIcon",
    imports: [
      "import BpkLargeMobileIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/mobile';",
    ],
    example: figma.code`<BpkLargeMobileIcon />`,
  }
}

export default template
