// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A212
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/social-distancing.d.ts
// component=BpkSmallSocialDistancingIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallSocialDistancingIcon",
    imports: [
      "import BpkSmallSocialDistancingIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/social-distancing';",
    ],
    example: figma.code`<BpkSmallSocialDistancingIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeSocialDistancingIcon",
    imports: [
      "import BpkLargeSocialDistancingIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/social-distancing';",
    ],
    example: figma.code`<BpkLargeSocialDistancingIcon />`,
  }
} else {
  template = {
    id: "BpkLargeSocialDistancingIcon",
    imports: [
      "import BpkLargeSocialDistancingIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/social-distancing';",
    ],
    example: figma.code`<BpkLargeSocialDistancingIcon />`,
  }
}

export default template
