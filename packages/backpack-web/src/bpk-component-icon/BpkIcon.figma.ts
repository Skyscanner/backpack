// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A0

globalThis["__FIGMA_BATCH"] = {
  url: "https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A0",
  id: "bpk-icon-lg-accessibility",
  componentName: "BpkLargeAccessibilityIcon",
  importPath: "@skyscanner/backpack-web/bpk-component-icon/lg/accessibility",
  variantProp: "Size",
  sizeVariant: "24",
}
/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// eslint-disable-next-line import/no-unresolved
import figma from "figma"
export default {
  id: "TODO",
  id: figma.batch.id,
  variant: { [figma.batch.variantProp]: `${figma.batch.sizeVariant}` },
  example: figma.code`<${figma.batch.componentName} />`,
  imports: [
    `import ${figma.batch.componentName} from '${figma.batch.importPath}'`,
  ],
}
