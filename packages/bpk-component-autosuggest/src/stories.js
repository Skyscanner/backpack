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

import { Title, Markdown, ArgTypes } from '@storybook/addon-docs/blocks';
import { userEvent, within } from 'storybook/test';

import BpkAutosuggest, { BpkAutosuggestSuggestion } from '../index';

import AutosuggestExample from './examples';

import type { StoryObj } from '@storybook/react-webpack5';

export default {
  title: 'bpk-component-autosuggest',
  component: BpkAutosuggest,
  subcomponents: {
    BpkAutosuggestSuggestion,
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <ArgTypes exclude={['zoomEnabled']} />
          <Markdown>
            {
            `**BpkAutosuggest:**
            Please refer to react-autosuggest's
            documentation for a full list of [props](https://github.com/moroshko/react-autosuggest#props).
            **Note:** The \`inputProps\` object is passed directly to a
            [BpkInput](../bpk-component-input/README.md#props) component, so its prop types apply also.`
            }
          </Markdown>
        </>
      )
    },
  },
};

export const Example = () => <AutosuggestExample />;
export const WithIcons = () => <AutosuggestExample includeIcon />;

export const WithSubHeadings = () => <AutosuggestExample includeSubheading />;

export const WithTertiaryLabels = () => (
  <AutosuggestExample includeTertiaryLabel />
);

export const WithSubHeadingTertiaryLabels = () => (
  <AutosuggestExample includeSubheading includeTertiaryLabel />
);

export const Hanzi = () => (
  <AutosuggestExample includeSubheading includeTertiaryLabel hanzi />
);

export const All = () => (
  <AutosuggestExample includeSubheading includeTertiaryLabel includeIcon alwaysRenderSuggestions />
);

export const SmallInput = () => (
  <div style={{ width: '80px' }}>
    <AutosuggestExample />
  </div>
);

type Story = StoryObj<typeof AutosuggestExample>;

export const VisualTest: Story = {
  render: () => <AutosuggestExample alwaysRenderSuggestions />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByPlaceholderText('Enter an office name'); // Find the input field
    input.focus(); // Explicitly set focus using the DOM's focus method
    await userEvent.type(input, 'Lon', { delay: 100 }); // Simulate typing into the input field

    await canvas.findByText('London (Any)'); // Wait for the suggestions to appear
    const dropdown = canvas.getByText('London (Any)'); // Find the dropdown field

    dropdown.classList.add('percy-selector-placeholder'); // Add placeholder to trigger Percy snapshot
  },
  parameters: {
    percy: {
      waitForSelector: '.percy-selector-placeholder', // Wait for the input to have this class before taking the snapshot
    }
  }
};
