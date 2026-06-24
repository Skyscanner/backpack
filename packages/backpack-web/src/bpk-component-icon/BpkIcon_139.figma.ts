// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A136
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/keypad.d.ts
// component=BpkSmallKeypadIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallKeypadIcon",
    imports: [
      "import BpkSmallKeypadIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/keypad';",
    ],
    example: figma.code`<BpkSmallKeypadIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeKeypadIcon",
    imports: [
      "import BpkLargeKeypadIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/keypad';",
    ],
    example: figma.code`<BpkLargeKeypadIcon />`,
  }
} else {
  template = {
    id: "BpkLargeKeypadIcon",
    imports: [
      "import BpkLargeKeypadIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/keypad';",
    ],
    example: figma.code`<BpkLargeKeypadIcon />`,
  }
}

export default template
