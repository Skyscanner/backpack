// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10858%3A49736
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-card/src/BpkCardWrapper.tsx
// component=BpkCardWrapper

import figma from "figma"

export default {
  id: "BpkCardWrapper",
  imports: [
    "import BpkCardWrapper from '@skyscanner/backpack-web/bpk-component-card';",
  ],
  example: figma.code`<BpkCardWrapper card={<div>Card content</div>} backgroundColor={coreAccentDay} header={<span>Header</span>}/>`,
}
