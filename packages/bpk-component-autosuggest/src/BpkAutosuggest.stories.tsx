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

import { Component } from 'react';
import type { ReactElement, InputHTMLAttributes, LegacyRef } from 'react';

import { userEvent, within } from 'storybook/test';

import { withRtlSupport } from '../../bpk-component-icon';
import FlightIcon from '../../bpk-component-icon/lg/flight';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import BpkAutosuggest from './BpkAutosuggest';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkAutosuggestSuggestion from './BpkAutosuggestSuggestion';

import type { Meta, StoryObj } from '@storybook/react';

const BpkFlightIcon = withRtlSupport(FlightIcon);

// TODO: Reuse or extract a shared Suggestion type from BpkAutosuggestSuggestion
// once it's migrated from Flow to TypeScript.
type Suggestion = {
  name: string;
  code: string;
  country: string;
  tertiaryLabel: string;
  indent?: boolean;
};

type Section = {
  title: string;
  suggestions: Suggestion[];
};

const offices: Suggestion[] = [
  {
    name: 'Barcelona',
    code: 'BCN',
    country: 'Spain',
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: 'Beijing',
    code: 'Any',
    country: 'China',
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: 'Budapest',
    code: 'BUD',
    country: 'Hungary',
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: 'Edinburgh',
    code: 'EDI',
    country: 'United Kingdom',
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: 'Glasgow',
    code: 'Any',
    country: 'United Kingdom',
    indent: true,
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: 'London',
    code: 'Any',
    country: 'United Kingdom',
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: 'Miami, FL',
    code: 'Any',
    country: 'United States',
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: "Shenzhen Bao'an International",
    code: 'SZX',
    country: 'China',
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: 'Singapore Changi',
    code: 'SIN',
    country: 'Singapore',
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: 'Sofia',
    code: 'SOF',
    country: 'Bulgaria',
    tertiaryLabel: 'Tertiary label',
  },
];

const dataChineseCharacter: Suggestion[] = [
  {
    name: '深圳寶安國際 (Shenzhen)',
    code: 'SZX',
    country: '中國',
    tertiaryLabel: '三級標籤',
  },
];

const sections: Section[] = [
  {
    title: 'Recent searches',
    suggestions: [offices[0], offices[2], offices[1]],
  },
  {
    title: 'Popular locations',
    suggestions: [...offices.slice(1)],
  },
];

const getSuggestions = (
  value: string,
  isChineseCharacter: boolean,
): Suggestion[] => {
  const inputValue = value.trim().toLowerCase();
  const data = isChineseCharacter ? dataChineseCharacter : offices;

  return inputValue.length === 0
    ? data
    : data.filter((office) => office.name.toLowerCase().includes(inputValue));
};

const getSuggestionValue = (suggestion: Suggestion): string =>
  `${suggestion.name} (${suggestion.code})`;

const getFilteredSections = (
  value: string,
  rawSections: Section[],
): Section[] => {
  const inputValue = value.trim().toLowerCase();

  return rawSections
    .map((section) => {
      const filteredSuggestions = section.suggestions.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(inputValue),
      );

      if (filteredSuggestions.length === 0) return null;

      return {
        ...section,
        suggestions: filteredSuggestions,
      };
    })
    .filter(Boolean) as Section[];
};

type Props = {
  isChineseCharacter: boolean;
  includeIcon: boolean;
  includeSubheading: boolean;
  includeTertiaryLabel: boolean;
  alwaysRenderSuggestions: boolean;
  highlightFirstSuggestion: boolean;
  multiSection: boolean;
  renderInputComponent?: (
    inputProps: InputHTMLAttributes<HTMLInputElement> & {
      ref?: LegacyRef<HTMLInputElement>;
    },
  ) => ReactElement;
  renderSectionTitle: (section: Section) => ReactElement | null;
  getSectionSuggestions: (section: Section) => Suggestion[];
};

type State = {
  suggestions: Array<Suggestion | Section>;
};

class AutosuggestExample extends Component<Props, State> {
  static defaultProps: Partial<Props> = {
    isChineseCharacter: false,
    includeIcon: false,
    includeSubheading: false,
    includeTertiaryLabel: false,
    alwaysRenderSuggestions: false,
    highlightFirstSuggestion: false,
    multiSection: false,
    renderInputComponent: undefined,
    renderSectionTitle: () => null,
    getSectionSuggestions: () => [],
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      suggestions: [],
    };
  }

  onSuggestionsFetchRequested = (value: string) => {
    this.setState({
      suggestions: this.props.multiSection
        ? getFilteredSections(value, sections)
        : getSuggestions(value, this.props.isChineseCharacter),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  getA11yResultsMessage = (resultCount: number): string =>
    resultCount === 0
      ? 'no results available'
      : 'handle results being single or plural';

  render() {
    const { suggestions } = this.state;
    const {
      alwaysRenderSuggestions,
      getSectionSuggestions,
      highlightFirstSuggestion,
      includeIcon,
      includeSubheading,
      includeTertiaryLabel,
      multiSection,
      renderSectionTitle,
    } = this.props;

    const inputProps = {
      id: 'my-autosuggest',
      name: 'my_autosuggest',
      placeholder: 'Enter an office name',
    };

    return (
      <BpkAutosuggest
        ariaLabels={{ label: 'input label', resultsList: 'results' }}
        alwaysRenderSuggestions={alwaysRenderSuggestions}
        suggestions={suggestions}
        id="autosuggest-example"
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        highlightFirstSuggestion={highlightFirstSuggestion}
        multiSection={multiSection}
        renderSectionTitle={renderSectionTitle}
        renderInputComponent={this.props.renderInputComponent}
        getSectionSuggestions={getSectionSuggestions}
        getSuggestionValue={getSuggestionValue}
        getA11yResultsMessage={this.getA11yResultsMessage}
        renderSuggestion={(suggestion: Suggestion) => (
          <BpkAutosuggestSuggestion
            value={getSuggestionValue(suggestion)}
            indent={suggestion.indent}
            icon={includeIcon ? BpkFlightIcon : null}
            subHeading={includeSubheading ? suggestion.country : null}
            tertiaryLabel={
              includeTertiaryLabel ? suggestion.tertiaryLabel : null
            }
          />
        )}
        inputProps={inputProps}
      />
    );
  }
}

export default {
  title: 'bpk-component-autosuggest',
  component: BpkAutosuggest,
  subcomponents: {
    BpkAutosuggestSuggestion,
  },
} satisfies Meta<typeof BpkAutosuggest>;

type Story = StoryObj<typeof AutosuggestExample>;

// --- Basic examples ---

export const Example: Story = { render: () => <AutosuggestExample /> };

export const WithIcons: Story = {
  render: () => <AutosuggestExample includeIcon />,
};

export const WithSubHeadings: Story = {
  render: () => <AutosuggestExample includeSubheading />,
};

export const WithTertiaryLabels: Story = {
  render: () => <AutosuggestExample includeTertiaryLabel />,
};

export const WithSubHeadingTertiaryLabels: Story = {
  render: () => <AutosuggestExample includeSubheading includeTertiaryLabel />,
};

export const HighlightFistSuggestion: Story = {
  render: () => (
    <AutosuggestExample
      includeSubheading
      includeTertiaryLabel
      includeIcon
      highlightFirstSuggestion
    />
  ),
};

// --- Multi-section example ---

const renderSectionTitle = (section: { title: string }): ReactElement => (
  <div style={{ padding: '16px 16px 0 16px' }}>{section.title}</div>
);

const getSectionSuggestions = (section: { suggestions: any[] }): any[] =>
  section.suggestions;

export const WithSections: Story = {
  render: () => (
    <AutosuggestExample
      multiSection
      renderSectionTitle={renderSectionTitle}
      getSectionSuggestions={getSectionSuggestions}
      includeIcon
      includeSubheading
      includeTertiaryLabel
    />
  ),
};

// --- Other variations ---

export const ChineseCharacter: Story = {
  render: () => (
    <AutosuggestExample
      includeSubheading
      includeTertiaryLabel
      isChineseCharacter
    />
  ),
};

export const All: Story = {
  render: () => (
    <AutosuggestExample
      includeSubheading
      includeTertiaryLabel
      includeIcon
      alwaysRenderSuggestions
    />
  ),
};

export const SmallInput: Story = {
  render: () => (
    <div style={{ width: '80px' }}>
      <AutosuggestExample />
    </div>
  ),
};

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

export const CustomRenderInput: Story = {
  render: () => <AutosuggestExample renderInputComponent={renderCustomInput} />,
};

// --- Visual regression test (Percy) ---

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
