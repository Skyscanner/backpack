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
// @ts-nocheck

import figma from "@figma/code-connect"

import BpkCheckbox from "../../bpk-component-checkbox";
import BpkInput, { INPUT_TYPES } from "../../bpk-component-input";
import BpkSelect from "../../bpk-component-select";
import BpkTextarea from "../../bpk-component-textarea";

import BpkFieldset from "./BpkFieldset";

const figmaUrl = "https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=30459%3A44425";
// Input variant
figma.connect(BpkFieldset, figmaUrl, {
  variant: { Type: "Input" },
  props: {
    error: figma.boolean("Error"),
    labelInstance: figma.nestedProps("Label", {
      label: figma.textContent("Label"),
    }),
  },
  example: ({ error, labelInstance }) => (
    <BpkFieldset
      label={labelInstance.label}
      required={false}
      disabled={false}
      valid={!error}
    >
      <BpkInput
        id="example-input"
        name="example-input"
        value=""
        type={INPUT_TYPES.text}
      />
    </BpkFieldset>
  ),
});

// Select variant
figma.connect(BpkFieldset, figmaUrl, {
  variant: { Type: "Select" },
  props: {
    error: figma.boolean("Error"),
    labelInstance: figma.nestedProps("Label", {
      label: figma.textContent("Label"),
    }),
  },
  example: ({ error, labelInstance }) => (
    <BpkFieldset
      label={labelInstance.label}
      required={false}
      disabled={false}
      valid={!error}
    >
      <BpkSelect id="example-select" name="example-select" value="">
        <option value="">Select</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </BpkSelect>
    </BpkFieldset>
  ),
});

// Text area variant
figma.connect(BpkFieldset, figmaUrl, {
  variant: { Type: "Text area" },
  props: {
    error: figma.boolean("Error"),
    labelInstance: figma.nestedProps("Label", {
      label: figma.textContent("Label"),
    }),
  },
  example: ({ error, labelInstance }) => (
    <BpkFieldset
      label={labelInstance.label}
      required={false}
      disabled={false}
      valid={!error}
    >
      <BpkTextarea id="textarea" name="textarea" value="" />
    </BpkFieldset>
  ),
});

// Radio group variant
figma.connect(BpkFieldset, figmaUrl, {
  variant: { Type: "Radio group" },
  props: {
    error: figma.boolean("Error"),
    labelInstance: figma.nestedProps("Label", {
      label: figma.textContent("Label"),
    }),
  },
  example: ({ error, labelInstance }) => (
    <BpkFieldset
      label={labelInstance.label}
      required={false}
      disabled={false}
      valid={!error}
    >
      <div id="example-radio-group">
        <BpkCheckbox name="group" label="Radio 1" checked={false} />
        <BpkCheckbox name="group" label="Radio 2" checked={false} />
      </div>
    </BpkFieldset>
  ),
});
