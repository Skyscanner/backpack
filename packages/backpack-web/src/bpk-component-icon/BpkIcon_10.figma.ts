// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=9244%3A148
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/ai.d.ts
// component=BpkSmallAiIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAiIcon",
    imports: [
      "import BpkSmallAiIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/ai';",
    ],
    example: figma.code`<BpkSmallAiIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAiIcon",
    imports: [
      "import BpkLargeAiIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/ai';",
    ],
    example: figma.code`<BpkLargeAiIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAiIcon",
    imports: [
      "import BpkLargeAiIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/ai';",
    ],
    example: figma.code`<BpkLargeAiIcon />`,
  }
}

export default template
