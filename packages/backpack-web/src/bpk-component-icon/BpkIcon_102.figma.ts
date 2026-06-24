// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A100
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/fingerprint.d.ts
// component=BpkSmallFingerprintIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFingerprintIcon",
    imports: [
      "import BpkSmallFingerprintIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/fingerprint';",
    ],
    example: figma.code`<BpkSmallFingerprintIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFingerprintIcon",
    imports: [
      "import BpkLargeFingerprintIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/fingerprint';",
    ],
    example: figma.code`<BpkLargeFingerprintIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFingerprintIcon",
    imports: [
      "import BpkLargeFingerprintIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/fingerprint';",
    ],
    example: figma.code`<BpkLargeFingerprintIcon />`,
  }
}

export default template
