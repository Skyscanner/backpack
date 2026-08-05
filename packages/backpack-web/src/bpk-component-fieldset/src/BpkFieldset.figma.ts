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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10872%3A4953
// source=https://github.com/Skyscanner/design-system/blob/main/packages/backpack-web/src/bpk-component-fieldset/src/BpkFieldset.tsx
// component=BpkFieldset

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Type") === "Input") {
  const labelInstance = (function () {
    const nestedLayer0 = figma.selectedInstance.findInstance("Label")
    return {
      label:
        nestedLayer0.type !== "ERROR"
          ? nestedLayer0.findText("Label").__render__()
          : undefined,
    }
  })()

  template = {
    id: "BpkFieldset",
    imports: [
      'import BpkInput, { INPUT_TYPES } from "../../bpk-component-input";',
      "import BpkFieldset from '@skyscanner-internal/backpack-web/bpk-component-fieldset';",
    ],
    example: figma.code`<BpkFieldset${figma.helpers.react.renderProp(
      "label",
      labelInstance.label,
    )} required={false} disabled={false} valid={!error}>
      <BpkInput id="example-input" name="example-input" value="" type={INPUT_TYPES.text}/>
    </BpkFieldset>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Select") {
  const labelInstance = (function () {
    const nestedLayer1 = figma.selectedInstance.findInstance("Label")
    return {
      label:
        nestedLayer1.type !== "ERROR"
          ? nestedLayer1.findText("Label").__render__()
          : undefined,
    }
  })()

  template = {
    id: "BpkFieldset",
    imports: [
      'import BpkSelect from "../../bpk-component-select";',
      "import BpkFieldset from '@skyscanner-internal/backpack-web/bpk-component-fieldset';",
    ],
    example: figma.code`<BpkFieldset${figma.helpers.react.renderProp(
      "label",
      labelInstance.label,
    )} required={false} disabled={false} valid={!error}>
      <BpkSelect id="example-select" name="example-select" value="">
        <option value="">Select</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </BpkSelect>
    </BpkFieldset>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Text area") {
  const labelInstance = (function () {
    const nestedLayer2 = figma.selectedInstance.findInstance("Label")
    return {
      label:
        nestedLayer2.type !== "ERROR"
          ? nestedLayer2.findText("Label").__render__()
          : undefined,
    }
  })()

  template = {
    id: "BpkFieldset",
    imports: [
      'import BpkTextarea from "../../bpk-component-textarea";',
      "import BpkFieldset from '@skyscanner-internal/backpack-web/bpk-component-fieldset';",
    ],
    example: figma.code`<BpkFieldset${figma.helpers.react.renderProp(
      "label",
      labelInstance.label,
    )} required={false} disabled={false} valid={!error}>
      <BpkTextarea id="textarea" name="textarea" value=""/>
    </BpkFieldset>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Radio group") {
  const labelInstance = (function () {
    const nestedLayer3 = figma.selectedInstance.findInstance("Label")
    return {
      label:
        nestedLayer3.type !== "ERROR"
          ? nestedLayer3.findText("Label").__render__()
          : undefined,
    }
  })()

  template = {
    id: "BpkFieldset",
    imports: [
      'import BpkCheckbox from "../../bpk-component-checkbox";',
      "import BpkFieldset from '@skyscanner-internal/backpack-web/bpk-component-fieldset';",
    ],
    example: figma.code`<BpkFieldset${figma.helpers.react.renderProp(
      "label",
      labelInstance.label,
    )} required={false} disabled={false} valid={!error}>
      <div id="example-radio-group">
        <BpkCheckbox name="group" label="Radio 1" checked={false}/>
        <BpkCheckbox name="group" label="Radio 2" checked={false}/>
      </div>
    </BpkFieldset>`,
    metadata: { nestable: true },
  }
} else {
  const labelInstance = (function () {
    const nestedLayer3 = figma.selectedInstance.findInstance("Label")
    return {
      label:
        nestedLayer3.type !== "ERROR"
          ? nestedLayer3.findText("Label").__render__()
          : undefined,
    }
  })()

  template = {
    id: "BpkFieldset",
    imports: [
      'import BpkCheckbox from "../../bpk-component-checkbox";',
      "import BpkFieldset from '@skyscanner-internal/backpack-web/bpk-component-fieldset';",
    ],
    example: figma.code`<BpkFieldset${figma.helpers.react.renderProp(
      "label",
      labelInstance.label,
    )} required={false} disabled={false} valid={!error}>
      <div id="example-radio-group">
        <BpkCheckbox name="group" label="Radio 1" checked={false}/>
        <BpkCheckbox name="group" label="Radio 2" checked={false}/>
      </div>
    </BpkFieldset>`,
    metadata: { nestable: true },
  }
}

export default template
