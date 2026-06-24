// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=8875%3A146
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/upload.d.ts
// component=BpkSmallUploadIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallUploadIcon",
    imports: [
      "import BpkSmallUploadIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/upload';",
    ],
    example: figma.code`<BpkSmallUploadIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeUploadIcon",
    imports: [
      "import BpkLargeUploadIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/upload';",
    ],
    example: figma.code`<BpkLargeUploadIcon />`,
  }
} else {
  template = {
    id: "BpkLargeUploadIcon",
    imports: [
      "import BpkLargeUploadIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/upload';",
    ],
    example: figma.code`<BpkLargeUploadIcon />`,
  }
}

export default template
