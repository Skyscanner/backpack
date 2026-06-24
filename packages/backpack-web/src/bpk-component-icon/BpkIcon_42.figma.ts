// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A38
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/calendar.d.ts
// component=BpkSmallCalendarIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallCalendarIcon",
    imports: [
      "import BpkSmallCalendarIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/calendar';",
    ],
    example: figma.code`<BpkSmallCalendarIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeCalendarIcon",
    imports: [
      "import BpkLargeCalendarIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/calendar';",
    ],
    example: figma.code`<BpkLargeCalendarIcon />`,
  }
} else {
  template = {
    id: "BpkLargeCalendarIcon",
    imports: [
      "import BpkLargeCalendarIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/calendar';",
    ],
    example: figma.code`<BpkLargeCalendarIcon />`,
  }
}

export default template
