// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A210
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/share--ios.d.ts
// component=BpkSmallShareIosIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallShareIosIcon",
    imports: [
      "import BpkSmallShareIosIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/share--ios';",
    ],
    example: figma.code`<BpkSmallShareIosIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeShareIosIcon",
    imports: [
      "import BpkLargeShareIosIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/share--ios';",
    ],
    example: figma.code`<BpkLargeShareIosIcon />`,
  }
} else {
  template = {
    id: "BpkLargeShareIosIcon",
    imports: [
      "import BpkLargeShareIosIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/share--ios';",
    ],
    example: figma.code`<BpkLargeShareIosIcon />`,
  }
}

export default template
