// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A77
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/document-csv.d.ts
// component=BpkSmallDocumentCsvIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallDocumentCsvIcon",
    imports: [
      "import BpkSmallDocumentCsvIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/document-csv';",
    ],
    example: figma.code`<BpkSmallDocumentCsvIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeDocumentCsvIcon",
    imports: [
      "import BpkLargeDocumentCsvIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/document-csv';",
    ],
    example: figma.code`<BpkLargeDocumentCsvIcon />`,
  }
} else {
  template = {
    id: "BpkLargeDocumentCsvIcon",
    imports: [
      "import BpkLargeDocumentCsvIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/document-csv';",
    ],
    example: figma.code`<BpkLargeDocumentCsvIcon />`,
  }
}

export default template
