// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A9
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/adult.d.ts
// component=BpkSmallAdultIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAdultIcon",
    imports: [
      "import BpkSmallAdultIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/adult';",
    ],
    example: figma.code`<BpkSmallAdultIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAdultIcon",
    imports: [
      "import BpkLargeAdultIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/adult';",
    ],
    example: figma.code`<BpkLargeAdultIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAdultIcon",
    imports: [
      "import BpkLargeAdultIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/adult';",
    ],
    example: figma.code`<BpkLargeAdultIcon />`,
  }
}

export default template
