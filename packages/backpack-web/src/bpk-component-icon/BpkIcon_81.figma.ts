// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A79
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/download.d.ts
// component=BpkSmallDownloadIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallDownloadIcon",
    imports: [
      "import BpkSmallDownloadIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/download';",
    ],
    example: figma.code`<BpkSmallDownloadIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeDownloadIcon",
    imports: [
      "import BpkLargeDownloadIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/download';",
    ],
    example: figma.code`<BpkLargeDownloadIcon />`,
  }
} else {
  template = {
    id: "BpkLargeDownloadIcon",
    imports: [
      "import BpkLargeDownloadIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/download';",
    ],
    example: figma.code`<BpkLargeDownloadIcon />`,
  }
}

export default template
