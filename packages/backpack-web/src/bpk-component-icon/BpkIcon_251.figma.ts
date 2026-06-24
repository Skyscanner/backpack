// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A245
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/virus.d.ts
// component=BpkSmallVirusIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallVirusIcon",
    imports: [
      "import BpkSmallVirusIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/virus';",
    ],
    example: figma.code`<BpkSmallVirusIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeVirusIcon",
    imports: [
      "import BpkLargeVirusIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/virus';",
    ],
    example: figma.code`<BpkLargeVirusIcon />`,
  }
} else {
  template = {
    id: "BpkLargeVirusIcon",
    imports: [
      "import BpkLargeVirusIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/virus';",
    ],
    example: figma.code`<BpkLargeVirusIcon />`,
  }
}

export default template
