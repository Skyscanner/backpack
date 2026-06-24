// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=7185%3A93
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/self-service.d.ts
// component=BpkSmallSelfServiceIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Property 1") === "16") {
  template = {
    id: "BpkSmallSelfServiceIcon",
    imports: [
      "import BpkSmallSelfServiceIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/self-service';",
    ],
    example: figma.code`<BpkSmallSelfServiceIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Property 1") === "24") {
  template = {
    id: "BpkLargeSelfServiceIcon",
    imports: [
      "import BpkLargeSelfServiceIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/self-service';",
    ],
    example: figma.code`<BpkLargeSelfServiceIcon />`,
  }
} else {
  template = {
    id: "BpkLargeSelfServiceIcon",
    imports: [
      "import BpkLargeSelfServiceIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/self-service';",
    ],
    example: figma.code`<BpkLargeSelfServiceIcon />`,
  }
}

export default template
