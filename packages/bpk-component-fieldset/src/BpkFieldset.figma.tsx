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

import figma from "@figma/code-connect"

import BpkCheckbox from "../../bpk-component-checkbox";
import BpkInput, { INPUT_TYPES } from "../../bpk-component-input";
import BpkSelect from "../../bpk-component-select";
import BpkTextarea from "../../bpk-component-textarea";

import BpkFieldset from "./BpkFieldset"


figma.connect(
  BpkFieldset,
  "https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=30459%3A44425",
  {
    props: {
      error: figma.boolean('Error'),
      type: figma.enum('Type', {
        Input: 'input',
        Select: 'select',
        'Text area': 'text-area',
        'Radio group': 'radio-group',
      }),
    },
    example: (props) => {
      let child;
      switch (props.type) {
        case 'input':
          child = (
            <BpkInput
              id="example-input"
              name="example-input"
              value=""
              type={INPUT_TYPES.text}
            />
          );
          break;
        case 'select':
          child = (
            <BpkSelect
              id="example-select"
              name="example-select"
              value=""
            >
              <option value="">Select</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </BpkSelect>
          );
          break;
        case 'text-area':
          child = (
            <BpkTextarea
              id="textarea"
              name="textarea"
              value=""
            />
          );
          break;
        case 'radio-group':
          child = (
            <div id="example-radio-group">
              <BpkCheckbox name="group" label="Radio 1" checked={false} />
              <BpkCheckbox name="group" label="Radio 2" checked={false} />
            </div>
          );
          break;
        default:
          child = (
            <BpkInput
              id="example-input"
              name="example-input"
              value=""
              type={INPUT_TYPES.text}
            />
          );
      }
      // Provide required props for BpkFieldset
      return (
        <BpkFieldset
          label="Example Fieldset"
          required={false}
          disabled={false}
          valid={!props.error}
        >
          {child}
        </BpkFieldset>
      );
    },
  },
)
