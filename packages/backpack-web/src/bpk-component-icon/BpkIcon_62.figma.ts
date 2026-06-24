// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A61
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/clean-policy.d.ts
// component=BpkSmallCleanPolicyIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCleanPolicyIcon",
    imports: [
      "import BpkSmallCleanPolicyIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/clean-policy';",
    ],
    example: figma.code`<BpkSmallCleanPolicyIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCleanPolicyIcon",
    imports: [
      "import BpkLargeCleanPolicyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/clean-policy';",
    ],
    example: figma.code`<BpkLargeCleanPolicyIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCleanPolicyIcon",
    imports: [
      "import BpkLargeCleanPolicyIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/clean-policy';",
    ],
    example: figma.code`<BpkLargeCleanPolicyIcon />`,
  }
}

export default template
