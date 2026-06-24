// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A167
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/mute.d.ts
// component=BpkSmallMuteIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallMuteIcon",
    imports: [
      "import BpkSmallMuteIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/mute';",
    ],
    example: figma.code`<BpkSmallMuteIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeMuteIcon",
    imports: [
      "import BpkLargeMuteIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/mute';",
    ],
    example: figma.code`<BpkLargeMuteIcon />`,
  }
} else {
  template = {
    id: "BpkLargeMuteIcon",
    imports: [
      "import BpkLargeMuteIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/mute';",
    ],
    example: figma.code`<BpkLargeMuteIcon />`,
  }
}

export default template
