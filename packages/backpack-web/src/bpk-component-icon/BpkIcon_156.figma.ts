// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A154
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/mail.d.ts
// component=BpkSmallMailIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallMailIcon",
    imports: [
      "import BpkSmallMailIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/mail';",
    ],
    example: figma.code`<BpkSmallMailIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeMailIcon",
    imports: [
      "import BpkLargeMailIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/mail';",
    ],
    example: figma.code`<BpkLargeMailIcon />`,
  }
} else {
  template = {
    id: "BpkLargeMailIcon",
    imports: [
      "import BpkLargeMailIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/mail';",
    ],
    example: figma.code`<BpkLargeMailIcon />`,
  }
}

export default template
