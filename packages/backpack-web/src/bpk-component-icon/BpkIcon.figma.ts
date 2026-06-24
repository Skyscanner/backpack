// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A0
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/accessibility.d.ts
// component=BpkSmallAccessibilityIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallAccessibilityIcon",
    imports: [
      "import BpkSmallAccessibilityIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/accessibility';",
    ],
    example: figma.code`<BpkSmallAccessibilityIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeAccessibilityIcon",
    imports: [
      "import BpkLargeAccessibilityIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/accessibility';",
    ],
    example: figma.code`<BpkLargeAccessibilityIcon />`,
  }
} else {
  template = {
    id: "BpkLargeAccessibilityIcon",
    imports: [
      "import BpkLargeAccessibilityIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/accessibility';",
    ],
    example: figma.code`<BpkLargeAccessibilityIcon />`,
  }
}

export default template
