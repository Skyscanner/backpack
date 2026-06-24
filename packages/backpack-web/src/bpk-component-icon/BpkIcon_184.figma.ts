// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A181
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/passport.d.ts
// component=BpkSmallPassportIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallPassportIcon",
    imports: [
      "import BpkSmallPassportIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/passport';",
    ],
    example: figma.code`<BpkSmallPassportIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargePassportIcon",
    imports: [
      "import BpkLargePassportIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/passport';",
    ],
    example: figma.code`<BpkLargePassportIcon />`,
  }
} else {
  template = {
    id: "BpkLargePassportIcon",
    imports: [
      "import BpkLargePassportIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/passport';",
    ],
    example: figma.code`<BpkLargePassportIcon />`,
  }
}

export default template
