// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A192
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/powerplug.d.ts
// component=BpkSmallPowerplugIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallPowerplugIcon",
    imports: [
      "import BpkSmallPowerplugIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/powerplug';",
    ],
    example: figma.code`<BpkSmallPowerplugIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargePowerplugIcon",
    imports: [
      "import BpkLargePowerplugIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/powerplug';",
    ],
    example: figma.code`<BpkLargePowerplugIcon />`,
  }
} else {
  template = {
    id: "BpkLargePowerplugIcon",
    imports: [
      "import BpkLargePowerplugIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/powerplug';",
    ],
    example: figma.code`<BpkLargePowerplugIcon />`,
  }
}

export default template
