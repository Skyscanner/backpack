// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A202
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/room.d.ts
// component=BpkSmallRoomIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallRoomIcon",
    imports: [
      "import BpkSmallRoomIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/room';",
    ],
    example: figma.code`<BpkSmallRoomIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeRoomIcon",
    imports: [
      "import BpkLargeRoomIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/room';",
    ],
    example: figma.code`<BpkLargeRoomIcon />`,
  }
} else {
  template = {
    id: "BpkLargeRoomIcon",
    imports: [
      "import BpkLargeRoomIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/room';",
    ],
    example: figma.code`<BpkLargeRoomIcon />`,
  }
}

export default template
