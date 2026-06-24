// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A97
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/fast-track.d.ts
// component=BpkSmallFastTrackIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFastTrackIcon",
    imports: [
      "import BpkSmallFastTrackIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/fast-track';",
    ],
    example: figma.code`<BpkSmallFastTrackIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFastTrackIcon",
    imports: [
      "import BpkLargeFastTrackIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/fast-track';",
    ],
    example: figma.code`<BpkLargeFastTrackIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFastTrackIcon",
    imports: [
      "import BpkLargeFastTrackIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/fast-track';",
    ],
    example: figma.code`<BpkLargeFastTrackIcon />`,
  }
}

export default template
