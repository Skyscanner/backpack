// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A138
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/language.d.ts
// component=BpkSmallLanguageIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallLanguageIcon",
    imports: [
      "import BpkSmallLanguageIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/language';",
    ],
    example: figma.code`<BpkSmallLanguageIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeLanguageIcon",
    imports: [
      "import BpkLargeLanguageIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/language';",
    ],
    example: figma.code`<BpkLargeLanguageIcon />`,
  }
} else {
  template = {
    id: "BpkLargeLanguageIcon",
    imports: [
      "import BpkLargeLanguageIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/language';",
    ],
    example: figma.code`<BpkLargeLanguageIcon />`,
  }
}

export default template
