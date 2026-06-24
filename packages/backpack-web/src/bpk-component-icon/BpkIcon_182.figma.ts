// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A179
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/paperclip.d.ts
// component=BpkSmallPaperclipIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallPaperclipIcon",
    imports: [
      "import BpkSmallPaperclipIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/paperclip';",
    ],
    example: figma.code`<BpkSmallPaperclipIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargePaperclipIcon",
    imports: [
      "import BpkLargePaperclipIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/paperclip';",
    ],
    example: figma.code`<BpkLargePaperclipIcon />`,
  }
} else {
  template = {
    id: "BpkLargePaperclipIcon",
    imports: [
      "import BpkLargePaperclipIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/paperclip';",
    ],
    example: figma.code`<BpkLargePaperclipIcon />`,
  }
}

export default template
