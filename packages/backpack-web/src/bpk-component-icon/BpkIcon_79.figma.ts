// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A78
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/document-pdf.d.ts
// component=BpkSmallDocumentPdfIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallDocumentPdfIcon",
    imports: [
      "import BpkSmallDocumentPdfIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/document-pdf';",
    ],
    example: figma.code`<BpkSmallDocumentPdfIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeDocumentPdfIcon",
    imports: [
      "import BpkLargeDocumentPdfIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/document-pdf';",
    ],
    example: figma.code`<BpkLargeDocumentPdfIcon />`,
  }
} else {
  template = {
    id: "BpkLargeDocumentPdfIcon",
    imports: [
      "import BpkLargeDocumentPdfIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/document-pdf';",
    ],
    example: figma.code`<BpkLargeDocumentPdfIcon />`,
  }
}

export default template
