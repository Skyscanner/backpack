// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A182
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/pause.d.ts
// component=BpkSmallPauseIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallPauseIcon",
    imports: [
      "import BpkSmallPauseIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/pause';",
    ],
    example: figma.code`<BpkSmallPauseIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargePauseIcon",
    imports: [
      "import BpkLargePauseIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/pause';",
    ],
    example: figma.code`<BpkLargePauseIcon />`,
  }
} else {
  template = {
    id: "BpkLargePauseIcon",
    imports: [
      "import BpkLargePauseIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/pause';",
    ],
    example: figma.code`<BpkLargePauseIcon />`,
  }
}

export default template
