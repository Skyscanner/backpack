// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A57
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/child-seat.d.ts
// component=BpkSmallChildSeatIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallChildSeatIcon",
    imports: [
      "import BpkSmallChildSeatIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/child-seat';",
    ],
    example: figma.code`<BpkSmallChildSeatIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeChildSeatIcon",
    imports: [
      "import BpkLargeChildSeatIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/child-seat';",
    ],
    example: figma.code`<BpkLargeChildSeatIcon />`,
  }
} else {
  template = {
    id: "BpkLargeChildSeatIcon",
    imports: [
      "import BpkLargeChildSeatIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/child-seat';",
    ],
    example: figma.code`<BpkLargeChildSeatIcon />`,
  }
}

export default template
