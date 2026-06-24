// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A102
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/flask.d.ts
// component=BpkSmallFlaskIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallFlaskIcon",
    imports: [
      "import BpkSmallFlaskIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/flask';",
    ],
    example: figma.code`<BpkSmallFlaskIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeFlaskIcon",
    imports: [
      "import BpkLargeFlaskIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flask';",
    ],
    example: figma.code`<BpkLargeFlaskIcon />`,
  }
} else {
  template = {
    id: "BpkLargeFlaskIcon",
    imports: [
      "import BpkLargeFlaskIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flask';",
    ],
    example: figma.code`<BpkLargeFlaskIcon />`,
  }
}

export default template
