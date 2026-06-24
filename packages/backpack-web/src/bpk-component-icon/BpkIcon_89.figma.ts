// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A87
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/exclamation.d.ts
// component=BpkSmallExclamationIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallExclamationIcon",
    imports: [
      "import BpkSmallExclamationIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/exclamation';",
    ],
    example: figma.code`<BpkSmallExclamationIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeExclamationIcon",
    imports: [
      "import BpkLargeExclamationIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/exclamation';",
    ],
    example: figma.code`<BpkLargeExclamationIcon />`,
  }
} else {
  template = {
    id: "BpkLargeExclamationIcon",
    imports: [
      "import BpkLargeExclamationIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/exclamation';",
    ],
    example: figma.code`<BpkLargeExclamationIcon />`,
  }
}

export default template
