// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A206
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/services.d.ts
// component=BpkSmallServicesIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallServicesIcon",
    imports: [
      "import BpkSmallServicesIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/services';",
    ],
    example: figma.code`<BpkSmallServicesIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeServicesIcon",
    imports: [
      "import BpkLargeServicesIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/services';",
    ],
    example: figma.code`<BpkLargeServicesIcon />`,
  }
} else {
  template = {
    id: "BpkLargeServicesIcon",
    imports: [
      "import BpkLargeServicesIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/services';",
    ],
    example: figma.code`<BpkLargeServicesIcon />`,
  }
}

export default template
