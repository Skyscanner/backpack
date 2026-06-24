// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A40
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/camera.d.ts
// component=BpkSmallCameraIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCameraIcon",
    imports: [
      "import BpkSmallCameraIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/camera';",
    ],
    example: figma.code`<BpkSmallCameraIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCameraIcon",
    imports: [
      "import BpkLargeCameraIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/camera';",
    ],
    example: figma.code`<BpkLargeCameraIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCameraIcon",
    imports: [
      "import BpkLargeCameraIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/camera';",
    ],
    example: figma.code`<BpkLargeCameraIcon />`,
  }
}

export default template
