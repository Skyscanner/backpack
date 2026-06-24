// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A133
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/information-circle.d.ts
// component=BpkSmallInformationCircleIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallInformationCircleIcon",
    imports: [
      "import BpkSmallInformationCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/information-circle';",
    ],
    example: figma.code`<BpkSmallInformationCircleIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeInformationCircleIcon",
    imports: [
      "import BpkLargeInformationCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/information-circle';",
    ],
    example: figma.code`<BpkLargeInformationCircleIcon />`,
  }
} else {
  template = {
    id: "BpkLargeInformationCircleIcon",
    imports: [
      "import BpkLargeInformationCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/information-circle';",
    ],
    example: figma.code`<BpkLargeInformationCircleIcon />`,
  }
}

export default template
