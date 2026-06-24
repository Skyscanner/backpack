// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A35
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/bus.d.ts
// component=BpkSmallBusIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallBusIcon",
    imports: [
      "import BpkSmallBusIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/bus';",
    ],
    example: figma.code`<BpkSmallBusIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeBusIcon",
    imports: [
      "import BpkLargeBusIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/bus';",
    ],
    example: figma.code`<BpkLargeBusIcon />`,
  }
} else {
  template = {
    id: "BpkLargeBusIcon",
    imports: [
      "import BpkLargeBusIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/bus';",
    ],
    example: figma.code`<BpkLargeBusIcon />`,
  }
}

export default template
