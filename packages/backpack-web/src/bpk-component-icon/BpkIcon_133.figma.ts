// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A130
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/information--language.d.ts
// component=BpkSmallInformationLanguageIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallInformationLanguageIcon",
    imports: [
      "import BpkSmallInformationLanguageIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/information--language';",
    ],
    example: figma.code`<BpkSmallInformationLanguageIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeInformationLanguageIcon",
    imports: [
      "import BpkLargeInformationLanguageIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/information--language';",
    ],
    example: figma.code`<BpkLargeInformationLanguageIcon />`,
  }
} else {
  template = {
    id: "BpkLargeInformationLanguageIcon",
    imports: [
      "import BpkLargeInformationLanguageIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/information--language';",
    ],
    example: figma.code`<BpkLargeInformationLanguageIcon />`,
  }
}

export default template
