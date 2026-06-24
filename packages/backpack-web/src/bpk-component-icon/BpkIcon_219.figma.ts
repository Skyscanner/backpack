// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A216
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/speaker.d.ts
// component=BpkSmallSpeakerIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallSpeakerIcon",
    imports: [
      "import BpkSmallSpeakerIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/speaker';",
    ],
    example: figma.code`<BpkSmallSpeakerIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeSpeakerIcon",
    imports: [
      "import BpkLargeSpeakerIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/speaker';",
    ],
    example: figma.code`<BpkLargeSpeakerIcon />`,
  }
} else {
  template = {
    id: "BpkLargeSpeakerIcon",
    imports: [
      "import BpkLargeSpeakerIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/speaker';",
    ],
    example: figma.code`<BpkLargeSpeakerIcon />`,
  }
}

export default template
