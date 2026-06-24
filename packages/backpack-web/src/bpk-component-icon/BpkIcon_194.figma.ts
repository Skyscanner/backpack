// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A191
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/policy.d.ts
// component=BpkSmallPolicyIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallPolicyIcon",
    imports: [
      "import BpkSmallPolicyIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/policy';",
    ],
    example: figma.code`<BpkSmallPolicyIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargePolicyIcon",
    imports: [
      "import BpkLargePolicyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/policy';",
    ],
    example: figma.code`<BpkLargePolicyIcon />`,
  }
} else {
  template = {
    id: "BpkLargePolicyIcon",
    imports: [
      "import BpkLargePolicyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/policy';",
    ],
    example: figma.code`<BpkLargePolicyIcon />`,
  }
}

export default template
