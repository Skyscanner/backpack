// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A127
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/hotels--smoking.d.ts
// component=BpkSmallHotelsSmokingIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallHotelsSmokingIcon",
    imports: [
      "import BpkSmallHotelsSmokingIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/hotels--smoking';",
    ],
    example: figma.code`<BpkSmallHotelsSmokingIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeHotelsSmokingIcon",
    imports: [
      "import BpkLargeHotelsSmokingIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/hotels--smoking';",
    ],
    example: figma.code`<BpkLargeHotelsSmokingIcon />`,
  }
} else {
  template = {
    id: "BpkLargeHotelsSmokingIcon",
    imports: [
      "import BpkLargeHotelsSmokingIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/hotels--smoking';",
    ],
    example: figma.code`<BpkLargeHotelsSmokingIcon />`,
  }
}

export default template
