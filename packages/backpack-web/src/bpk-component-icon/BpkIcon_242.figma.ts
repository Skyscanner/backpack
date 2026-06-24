// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A238
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/trend--will-rise.d.ts
// component=BpkSmallTrendWillRiseIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallTrendWillRiseIcon",
    imports: [
      "import BpkSmallTrendWillRiseIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/trend--will-rise';",
    ],
    example: figma.code`<BpkSmallTrendWillRiseIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeTrendWillRiseIcon",
    imports: [
      "import BpkLargeTrendWillRiseIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/trend--will-rise';",
    ],
    example: figma.code`<BpkLargeTrendWillRiseIcon />`,
  }
} else {
  template = {
    id: "BpkLargeTrendWillRiseIcon",
    imports: [
      "import BpkLargeTrendWillRiseIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/trend--will-rise';",
    ],
    example: figma.code`<BpkLargeTrendWillRiseIcon />`,
  }
}

export default template
