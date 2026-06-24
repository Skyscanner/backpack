// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A205
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/send-message.d.ts
// component=BpkSmallSendMessageIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallSendMessageIcon",
    imports: [
      "import BpkSmallSendMessageIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/send-message';",
    ],
    example: figma.code`<BpkSmallSendMessageIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeSendMessageIcon",
    imports: [
      "import BpkLargeSendMessageIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/send-message';",
    ],
    example: figma.code`<BpkLargeSendMessageIcon />`,
  }
} else {
  template = {
    id: "BpkLargeSendMessageIcon",
    imports: [
      "import BpkLargeSendMessageIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/send-message';",
    ],
    example: figma.code`<BpkLargeSendMessageIcon />`,
  }
}

export default template
