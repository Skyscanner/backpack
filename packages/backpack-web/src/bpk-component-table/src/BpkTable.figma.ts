// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10911%3A52693
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-table/src/BpkTable.tsx
// component=BpkTable

import figma from "figma"

export default {
  id: "BpkTable",
  imports: [
    "import BpkTable from '@skyscanner/backpack-web/bpk-component-table';",
    "import BpkTableBody from '@skyscanner/backpack-web/bpk-component-table';",
    "import BpkTableCell from '@skyscanner/backpack-web/bpk-component-table';",
    "import BpkTableHead from '@skyscanner/backpack-web/bpk-component-table';",
    "import BpkTableHeadCell from '@skyscanner/backpack-web/bpk-component-table';",
    "import BpkTableRow from '@skyscanner/backpack-web/bpk-component-table';",
  ],
  example: figma.code`<BpkTable>
        <BpkTableHead>
          <BpkTableRow>
            <BpkTableHeadCell>Column 1</BpkTableHeadCell>
            <BpkTableHeadCell>Column 2</BpkTableHeadCell>
          </BpkTableRow>
        </BpkTableHead>
        <BpkTableBody>
          <BpkTableRow>
            <BpkTableCell>Cell 1</BpkTableCell>
            <BpkTableCell>Cell 2</BpkTableCell>
          </BpkTableRow>
        </BpkTableBody>
      </BpkTable>`,
}
