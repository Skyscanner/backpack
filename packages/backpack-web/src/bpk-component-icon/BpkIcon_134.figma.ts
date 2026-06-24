// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A131
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/information--language-alert.d.ts
// component=BpkSmallInformationLanguageAlertIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallInformationLanguageAlertIcon",
    imports: [
      "import BpkSmallInformationLanguageAlertIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/information--language-alert';",
    ],
    example: figma.code`<BpkSmallInformationLanguageAlertIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeInformationLanguageAlertIcon",
    imports: [
      "import BpkLargeInformationLanguageAlertIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/information--language-alert';",
    ],
    example: figma.code`<BpkLargeInformationLanguageAlertIcon />`,
  }
} else {
  template = {
    id: "BpkLargeInformationLanguageAlertIcon",
    imports: [
      "import BpkLargeInformationLanguageAlertIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/information--language-alert';",
    ],
    example: figma.code`<BpkLargeInformationLanguageAlertIcon />`,
  }
}

export default template
