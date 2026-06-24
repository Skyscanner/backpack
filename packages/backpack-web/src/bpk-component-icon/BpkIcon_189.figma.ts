// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A186
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/picture.d.ts
// component=BpkSmallPictureIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallPictureIcon",
    imports: [
      "import BpkSmallPictureIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/picture';",
    ],
    example: figma.code`<BpkSmallPictureIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargePictureIcon",
    imports: [
      "import BpkLargePictureIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/picture';",
    ],
    example: figma.code`<BpkLargePictureIcon />`,
  }
} else {
  template = {
    id: "BpkLargePictureIcon",
    imports: [
      "import BpkLargePictureIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/picture';",
    ],
    example: figma.code`<BpkLargePictureIcon />`,
  }
}

export default template
