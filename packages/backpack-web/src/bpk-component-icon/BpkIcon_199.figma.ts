// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A196
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/print.d.ts
// component=BpkSmallPrintIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallPrintIcon",
    imports: [
      "import BpkSmallPrintIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/print';",
    ],
    example: figma.code`<BpkSmallPrintIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargePrintIcon",
    imports: [
      "import BpkLargePrintIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/print';",
    ],
    example: figma.code`<BpkLargePrintIcon />`,
  }
} else {
  template = {
    id: "BpkLargePrintIcon",
    imports: [
      "import BpkLargePrintIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/print';",
    ],
    example: figma.code`<BpkLargePrintIcon />`,
  }
}

export default template
