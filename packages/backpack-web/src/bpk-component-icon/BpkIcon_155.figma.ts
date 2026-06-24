// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A152
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/lounge.d.ts
// component=BpkSmallLoungeIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallLoungeIcon",
    imports: [
      "import BpkSmallLoungeIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/lounge';",
    ],
    example: figma.code`<BpkSmallLoungeIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeLoungeIcon",
    imports: [
      "import BpkLargeLoungeIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/lounge';",
    ],
    example: figma.code`<BpkLargeLoungeIcon />`,
  }
} else {
  template = {
    id: "BpkLargeLoungeIcon",
    imports: [
      "import BpkLargeLoungeIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/lounge';",
    ],
    example: figma.code`<BpkLargeLoungeIcon />`,
  }
}

export default template
