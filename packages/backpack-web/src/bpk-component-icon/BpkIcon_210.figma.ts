// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A207
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/settings.d.ts
// component=BpkSmallSettingsIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallSettingsIcon",
    imports: [
      "import BpkSmallSettingsIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/settings';",
    ],
    example: figma.code`<BpkSmallSettingsIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeSettingsIcon",
    imports: [
      "import BpkLargeSettingsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/settings';",
    ],
    example: figma.code`<BpkLargeSettingsIcon />`,
  }
} else {
  template = {
    id: "BpkLargeSettingsIcon",
    imports: [
      "import BpkLargeSettingsIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/settings';",
    ],
    example: figma.code`<BpkLargeSettingsIcon />`,
  }
}

export default template
