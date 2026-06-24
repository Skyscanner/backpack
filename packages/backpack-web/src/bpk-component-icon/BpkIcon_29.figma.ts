// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=8308%3A189
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/baggage-checked.d.ts
// component=BpkSmallBaggageCheckedIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallBaggageCheckedIcon",
    imports: [
      "import BpkSmallBaggageCheckedIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/baggage-checked';",
    ],
    example: figma.code`<BpkSmallBaggageCheckedIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeBaggageCheckedIcon",
    imports: [
      "import BpkLargeBaggageCheckedIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/baggage-checked';",
    ],
    example: figma.code`<BpkLargeBaggageCheckedIcon />`,
  }
} else {
  template = {
    id: "BpkLargeBaggageCheckedIcon",
    imports: [
      "import BpkLargeBaggageCheckedIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/baggage-checked';",
    ],
    example: figma.code`<BpkLargeBaggageCheckedIcon />`,
  }
}

export default template
