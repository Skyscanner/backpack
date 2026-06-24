// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A132
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/information--language-question.d.ts
// component=BpkSmallInformationLanguageQuestionIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallInformationLanguageQuestionIcon",
    imports: [
      "import BpkSmallInformationLanguageQuestionIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/information--language-question';",
    ],
    example: figma.code`<BpkSmallInformationLanguageQuestionIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeInformationLanguageQuestionIcon",
    imports: [
      "import BpkLargeInformationLanguageQuestionIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/information--language-question';",
    ],
    example: figma.code`<BpkLargeInformationLanguageQuestionIcon />`,
  }
} else {
  template = {
    id: "BpkLargeInformationLanguageQuestionIcon",
    imports: [
      "import BpkLargeInformationLanguageQuestionIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/information--language-question';",
    ],
    example: figma.code`<BpkLargeInformationLanguageQuestionIcon />`,
  }
}

export default template
