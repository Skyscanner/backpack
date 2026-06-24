// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A199
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/recent-searches.d.ts
// component=BpkSmallRecentSearchesIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallRecentSearchesIcon",
    imports: [
      "import BpkSmallRecentSearchesIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/recent-searches';",
    ],
    example: figma.code`<BpkSmallRecentSearchesIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeRecentSearchesIcon",
    imports: [
      "import BpkLargeRecentSearchesIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/recent-searches';",
    ],
    example: figma.code`<BpkLargeRecentSearchesIcon />`,
  }
} else {
  template = {
    id: "BpkLargeRecentSearchesIcon",
    imports: [
      "import BpkLargeRecentSearchesIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/recent-searches';",
    ],
    example: figma.code`<BpkLargeRecentSearchesIcon />`,
  }
}

export default template
