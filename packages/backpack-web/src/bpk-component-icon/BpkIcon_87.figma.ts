// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A85
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/end-call.d.ts
// component=BpkSmallEndCallIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallEndCallIcon",
    imports: [
      "import BpkSmallEndCallIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/end-call';",
    ],
    example: figma.code`<BpkSmallEndCallIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeEndCallIcon",
    imports: [
      "import BpkLargeEndCallIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/end-call';",
    ],
    example: figma.code`<BpkLargeEndCallIcon />`,
  }
} else {
  template = {
    id: "BpkLargeEndCallIcon",
    imports: [
      "import BpkLargeEndCallIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/end-call';",
    ],
    example: figma.code`<BpkLargeEndCallIcon />`,
  }
}

export default template
