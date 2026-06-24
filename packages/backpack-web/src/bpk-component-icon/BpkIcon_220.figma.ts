// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=12895%3A198
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/speaker-mute.d.ts
// component=BpkSmallSpeakerMuteIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallSpeakerMuteIcon",
    imports: [
      "import BpkSmallSpeakerMuteIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/speaker-mute';",
    ],
    example: figma.code`<BpkSmallSpeakerMuteIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeSpeakerMuteIcon",
    imports: [
      "import BpkLargeSpeakerMuteIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/speaker-mute';",
    ],
    example: figma.code`<BpkLargeSpeakerMuteIcon />`,
  }
} else {
  template = {
    id: "BpkLargeSpeakerMuteIcon",
    imports: [
      "import BpkLargeSpeakerMuteIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/speaker-mute';",
    ],
    example: figma.code`<BpkLargeSpeakerMuteIcon />`,
  }
}

export default template
