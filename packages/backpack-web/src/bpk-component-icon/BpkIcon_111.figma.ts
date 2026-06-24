// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A108
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/gears-automatic.d.ts
// component=BpkSmallGearsAutomaticIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallGearsAutomaticIcon",
    imports: [
      "import BpkSmallGearsAutomaticIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/gears-automatic';",
    ],
    example: figma.code`<BpkSmallGearsAutomaticIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeGearsAutomaticIcon",
    imports: [
      "import BpkLargeGearsAutomaticIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/gears-automatic';",
    ],
    example: figma.code`<BpkLargeGearsAutomaticIcon />`,
  }
} else {
  template = {
    id: "BpkLargeGearsAutomaticIcon",
    imports: [
      "import BpkLargeGearsAutomaticIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/gears-automatic';",
    ],
    example: figma.code`<BpkLargeGearsAutomaticIcon />`,
  }
}

export default template
