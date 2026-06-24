// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10885%3A10298
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-list/src/BpkList.tsx
// component=BpkList

import figma from "figma"

export default {
  id: "BpkList",
  imports: [
    "import BpkList from '@skyscanner/backpack-web/bpk-component-list';",
    "import BpkListItem from '@skyscanner/backpack-web/bpk-component-list';",
  ],
  example: figma.code`<BpkList>
        <BpkListItem>List item 1</BpkListItem>
        <BpkListItem>List item 2</BpkListItem>
        <BpkListItem>List item 3</BpkListItem>
      </BpkList>`,
}
