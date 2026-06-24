// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A147
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/logout.d.ts
// component=BpkSmallLogoutIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallLogoutIcon",
    imports: [
      "import BpkSmallLogoutIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/logout';",
    ],
    example: figma.code`<BpkSmallLogoutIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeLogoutIcon",
    imports: [
      "import BpkLargeLogoutIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/logout';",
    ],
    example: figma.code`<BpkLargeLogoutIcon />`,
  }
} else {
  template = {
    id: "BpkLargeLogoutIcon",
    imports: [
      "import BpkLargeLogoutIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/logout';",
    ],
    example: figma.code`<BpkLargeLogoutIcon />`,
  }
}

export default template
