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

import type { ReactElement } from 'react';

import { Title, Markdown } from '@storybook/blocks';
import { userEvent, within } from '@storybook/test';

// @ts-ignore
import BpkAutosuggestSuggestion from '../../packages/bpk-component-autosuggest/src/BpkAutosuggestSuggestion';
import BpkAutosuggestV2 from '../../packages/bpk-component-autosuggest/src/BpkAutosuggestV2/BpkAutosuggest';

import AutosuggestExample from './examples';

import type { StoryObj } from '@storybook/react';

export default {
  title: 'bpk-component-autosuggestV2',
  component: BpkAutosuggestV2,
  subcomponents: {
    BpkAutosuggestSuggestion,
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Markdown>
            {`**BpkAutosuggest:**
Please refer to react-autosuggest's documentation for a full list of [props](https://github.com/moroshko/react-autosuggest#props).

**Note:** The \`inputProps\` object is passed directly to a [BpkInput](../bpk-component-input/README.md#props) component, so its prop types apply also.`}
          </Markdown>
        </>
      ),
    },
  },
} as const;

// --- Basic examples ---

export const Example = () => <AutosuggestExample />;

export const WithIcons = () => <AutosuggestExample includeIcon />;

export const WithSubHeadings = () => <AutosuggestExample includeSubheading />;

export const WithTertiaryLabels = () => (
  <AutosuggestExample includeTertiaryLabel />
);

export const WithSubHeadingTertiaryLabels = () => (
  <AutosuggestExample includeSubheading includeTertiaryLabel />
);

export const HighlightFistSuggestion = () => (
  <AutosuggestExample
    includeSubheading
    includeTertiaryLabel
    includeIcon
    highlightFirstSuggestion
  />
);

// --- Multi-section example ---

const renderSectionTitle = (section: { title: string }): ReactElement => (
  <div>{section.title}</div>
);

const getSectionSuggestions = (section: { suggestions: any[] }): any[] =>
  section.suggestions;

export const WithSections = () => (
  <AutosuggestExample
    multiSection
    renderSectionTitle={renderSectionTitle}
    getSectionSuggestions={getSectionSuggestions}
    includeIcon
    includeSubheading
    includeTertiaryLabel
  />
);

// --- Other variations ---

export const Hanzi = () => (
  <AutosuggestExample includeSubheading includeTertiaryLabel hanzi />
);

export const All = () => (
  <AutosuggestExample
    includeSubheading
    includeTertiaryLabel
    includeIcon
    alwaysRenderSuggestions
  />
);

export const SmallInput = () => (
  <div style={{ width: '80px' }}>
    <AutosuggestExample />
  </div>
);

const renderCustomInput = (
  inputProps: React.InputHTMLAttributes<HTMLInputElement> & {
      ref?: React.LegacyRef<HTMLInputElement>;
    },
) => (
  <div
    ref={inputProps.ref}
    style={{
      border: '2px solid #007aff',
      borderRadius: '8px',
      padding: '10px 12px',
    }}
  >
    <span
      style={{
        fontWeight: 'bold',
        fontSize: '14px',
        marginBottom: '2px',
      }}
    >
      From
    </span>
    <input
      {...inputProps}
      placeholder="Country, city or airport"
      style={{
        border: 'none',
        outline: 'none',
        fontSize: '16px',
        width: '100%',
      }}
    />
  </div>
);
export const CustomRenderInput = () => (
  <AutosuggestExample renderInputComponent={renderCustomInput} />
);

// --- Visual regression test (Percy) ---

type Story = StoryObj<typeof AutosuggestExample>;

export const VisualTest: Story = {
  render: () => <AutosuggestExample alwaysRenderSuggestions />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByPlaceholderText('Enter an office name');
    input.focus();
    await userEvent.type(input, 'Lon', { delay: 100 });

    await canvas.findByText('London (Any)');
    const dropdown = canvas.getByText('London (Any)');
    dropdown.classList.add('percy-selector-placeholder');
  },
  parameters: {
    percy: {
      waitForSelector: '.percy-selector-placeholder',
    },
  },
};
