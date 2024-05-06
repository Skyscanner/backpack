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

import { ArgsTable } from '@storybook/addon-docs';
import { Title, Markdown, PRIMARY_STORY } from '@storybook/blocks';

import BpkAutosuggest from '../../packages/bpk-component-autosuggest/src/BpkAutosuggest';
import BpkAutosuggestSuggestion from '../../packages/bpk-component-autosuggest/src/BpkAutosuggestSuggestion';

import AutosuggestExample from './examples';

export default {
  title: 'bpk-component-autosuggest',
  component: BpkAutosuggest,
  subcomponents: {
    BpkAutosuggestSuggestion
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <ArgsTable of={PRIMARY_STORY} />
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
  <AutosuggestExample includeSubheading includeTertiaryLabel includeIcon />
);

export const SmallInput = () => (
  <div style={{ width: '80px' }}>
    <AutosuggestExample />
  </div>
);
