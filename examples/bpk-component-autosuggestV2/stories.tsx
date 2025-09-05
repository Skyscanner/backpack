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

import type {
  ReactElement,
  InputHTMLAttributes,
  LegacyRef,
  FocusEvent,
  ChangeEventHandler,
  FocusEventHandler,
} from 'react';
import { useState } from 'react';

import { userEvent, within } from '@storybook/test';

// @ts-ignore
// BpkAutosuggestSuggestion is a Flow-based JS file without type declarations.
// TODO: This will be removed once the file is migrated to TypeScript.
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
};

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
  <div style={{ padding: '16px 16px 0 16px' }}>{section.title}</div>
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

export const ChineseCharacter = () => (
  <AutosuggestExample
    includeSubheading
    includeTertiaryLabel
    isChineseCharacter
  />
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
  inputProps: InputHTMLAttributes<HTMLInputElement> & {
    ref?: LegacyRef<HTMLInputElement>;
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

const renderBrokenInput = (
  inputProps: InputHTMLAttributes<HTMLInputElement> & {
    ref?: LegacyRef<HTMLInputElement>;
  },
) => (
  <div
    style={{
      border: '2px dashed red',
      borderRadius: '6px',
      padding: '10px',
      background: '#fffbe6',
    }}
  >
    <div
      style={{
        fontWeight: 600,
        fontSize: '13px',
        marginBottom: '4px',
      }}
    >
      Broken Input (Missing ref)
    </div>
    <input
      {...inputProps}
      placeholder="Search"
      style={{
        border: 'none',
        outline: 'none',
        fontSize: '14px',
        width: '100%',
      }}
    />
  </div>
);

export const BrokenRefMisalignment = () => (
  <div style={{ padding: '16px' }}>
    <AutosuggestExample
      renderInputComponent={renderBrokenInput}
      alwaysRenderSuggestions
      includeIcon
    />
  </div>
);

export const LegacyEvents = () => {
  const [value, setValue] = useState('');

  const onChange = (_e: Event, { newValue }: { newValue: string }) => {
    setValue(newValue);
  };

  const onBlur = (
    _e: Event,
    { highlightedSuggestion }: { highlightedSuggestion?: any },
  ) => {};

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    setTimeout(() => target.select(), 10);
  };

  const onSuggestionSelected = (
    e: Event,
    { suggestion }: { suggestion: any },
  ) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
  };

  return (
    <div style={{ padding: '16px', width: '360px' }}>
      <AutosuggestExample
        onSuggestionSelected={onSuggestionSelected}
        highlightFirstSuggestion
        inputProps={{
          id: 'my-autosuggest',
          name: 'my_autosuggest',
          placeholder: 'Type e.g. London',
          value,
          onChange: onChange as unknown as ChangeEventHandler<HTMLInputElement>,
          onBlur: onBlur as unknown as FocusEventHandler<HTMLInputElement>,
          onFocus,
        }}
      />
    </div>
  );
};

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
