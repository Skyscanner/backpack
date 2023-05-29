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

import { createRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import type { BpkAutoSuggestProps } from './BpkAutosuggest';
import BpkAutosuggest from './BpkAutosuggest';

const onSuggestionsFetchRequested = jest.fn();

let requiredProps: BpkAutoSuggestProps<any>;

const userInputsValue = async () => {
  const input: HTMLInputElement = screen.getByRole('combobox');

  userEvent.type(input, 'L');

  await waitFor(() => {
    expect(onSuggestionsFetchRequested).toHaveBeenCalled();
  });

  await waitFor(() => {
    expect(input.value).toBe('L');
  });

  return { input };
};

describe('BpkAutosuggest', () => {
  beforeEach(() => {
    requiredProps = {
      suggestions: ['Edinburgh', 'Glasgow', 'London'],
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested: () => null,
      getSuggestionValue: (suggestion: any) => suggestion,
      renderSuggestion: (suggestion: any) => <span>{suggestion}</span>,
      inputProps: {
        name: 'Origin',
      },
      ariaLabels: {
        resultsList: 'suggestions list',
      },
      id: 'origin',
      getA11yResultsMessage: (resultCount: number) => `${resultCount} results`,
    };
  });
  it('should render correctly', () => {
    const { asFragment } = render(<BpkAutosuggest {...requiredProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an "alwaysRenderSuggestions" attribute', () => {
    const { asFragment } = render(
      <BpkAutosuggest {...requiredProps} alwaysRenderSuggestions />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should set the input reference', () => {
    const inputRef = createRef<HTMLInputElement>();

    render(<BpkAutosuggest ref={inputRef} {...requiredProps} />);

    const input = screen.getByRole('combobox');
    expect(input).toEqual(inputRef.current);
  });

  it('should default autocomplete to off', () => {
    render(<BpkAutosuggest {...requiredProps} />);

    const input: HTMLInputElement = screen.getByRole('combobox');

    expect(input.autocomplete).toEqual('off');
  });

  it('should allow a consumer to override autocomplete', () => {
    render(
      <BpkAutosuggest
        {...requiredProps}
        inputProps={{ autoComplete: 'on', ...requiredProps.inputProps }}
      />,
    );

    const input: HTMLInputElement = screen.getByRole('combobox');

    expect(input.autocomplete).toEqual('on');
  });

  it('should update input value on input field change', async () => {
    render(<BpkAutosuggest {...requiredProps} />);
    const input: HTMLInputElement = screen.getByRole('combobox');

    userEvent.type(input, 'London');

    await waitFor(() => {
      expect(input.value).toBe('London');
    });
  });

  it('opens suggestions menu on input change', async () => {
    render(
      <BpkAutosuggest
        {...requiredProps}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      />,
    );
    await userInputsValue();

    const suggestionItems = screen.getAllByRole('option');

    expect(suggestionItems).toHaveLength(requiredProps.suggestions.length);
  });

  it('selects a suggestion and calls onSuggestionSelected', async () => {
    const onSuggestionSelected = jest.fn();
    render(
      <BpkAutosuggest
        {...requiredProps}
        onSuggestionSelected={onSuggestionSelected}
      />,
    );
    const { input } = await userInputsValue();
    const suggestionItems = screen.getAllByRole('option');

    await userEvent.click(suggestionItems[0]);

    await waitFor(() => {
      expect(onSuggestionSelected).toHaveBeenCalledWith({
        suggestion: requiredProps.suggestions[0],
        inputValue: 'L',
      });
    });

    await waitFor(() => {
      expect(input.value).toBe(requiredProps.suggestions[0]);
    });
  });

  it('selects the first selection on enter key', async () => {
    const onSuggestionSelected = jest.fn();
    render(
      <BpkAutosuggest
        {...requiredProps}
        onSuggestionSelected={onSuggestionSelected}
        suggestions={['London', 'Paris']}
      />,
    );
    await userInputsValue();

    await userEvent.keyboard('{Enter}');

    await waitFor(() =>
      expect(onSuggestionSelected).toHaveBeenCalledWith({
        suggestion: 'London',
        inputValue: 'L',
      }),
    );
  });

  it('renders with custom theme classnames', async () => {
    const customTheme = {
      suggestion: 'custom-suggestion-classname',
    };

    render(<BpkAutosuggest {...requiredProps} theme={customTheme} />);

    await userInputsValue();

    await waitFor(async () => {
      const suggestionItems = await screen.findAllByRole('option');

      expect(suggestionItems).toHaveLength(requiredProps.suggestions.length);

      suggestionItems.forEach((item) => {
        expect(item.className).toBe('custom-suggestion-classname');
      });
    });
  });

  it('does not highlight suggestion by default', async () => {
    render(
      <BpkAutosuggest
        {...requiredProps}
        theme={{ suggestionHighlighted: 'suggestionHighlighted' }}
      />,
    );

    await userInputsValue();

    await waitFor(async () => {
      const suggestionItems = await screen.findAllByRole('option');

      expect(suggestionItems[0].className).not.toBe(
        'bpk-autosuggest__suggestion-item suggestionHighlighted',
      );
    });
  });

  it('highlights the first suggestion when passed highlightFirstSuggestion', async () => {
    render(
      <BpkAutosuggest
        {...requiredProps}
        theme={{ suggestionHighlighted: 'suggestionHighlighted' }}
        highlightFirstSuggestion
      />,
    );

    await userInputsValue();

    await waitFor(async () => {
      const suggestionItems = await screen.findAllByRole('option');

      expect(suggestionItems[0].className).toBe(
        'bpk-autosuggest__suggestion-item suggestionHighlighted',
      );
    });
  });

  it('does highlight suggestion on user arrowDown', async () => {
    render(
      <BpkAutosuggest
        {...requiredProps}
        theme={{ suggestionHighlighted: 'suggestionHighlighted' }}
        highlightFirstSuggestion
      />,
    );

    await userInputsValue();
    await userEvent.keyboard('{arrowDown}');

    await waitFor(async () => {
      const suggestionItems = await screen.findAllByRole('option');

      expect(suggestionItems[0].className).toBe(
        'bpk-autosuggest__suggestion-item suggestionHighlighted',
      );
    });
  });

  it('should handle multiSection', async () => {
    const getSectionSuggestions = (section: any) => section.suggestions;
    const renderSectionTitle = (section: any) => <div>{section.title}</div>;

    const props = {
      ...requiredProps,
      suggestions: [
        { title: 'Previous searches', suggestions: ['London', 'Paris'] },
        { title: 'Popular locations', suggestions: ['New York', 'Tokyo'] },
      ],
      multiSection: true,
      renderSectionTitle,
      getSectionSuggestions,
    };

    render(<BpkAutosuggest {...props} />);
    await userInputsValue();

    await waitFor(() => {
      expect(screen.getByText('Previous searches')).toBeInTheDocument();
    });
  });

  it('by default should render BpkInput', () => {
    render(<BpkAutosuggest {...requiredProps} />);
    const input = screen.getByRole('combobox');

    expect(input.className).toBe('bpk-input');
  });

  it('should call onLoad on render if passed as a prop and if not desktop', async () => {
    const onLoad = jest.fn();
    render(<BpkAutosuggest {...requiredProps} onLoad={onLoad} />);

    await waitFor(() => {
      expect(onLoad).toHaveBeenCalled();
    });
  });

  it('should call onLoad on input click if passed as prop and isDesktop', async () => {
    const onLoad = jest.fn();
    render(<BpkAutosuggest {...requiredProps} onLoad={onLoad} isDesktop />);

    expect(onLoad).not.toHaveBeenCalled();

    const input = screen.getByRole('combobox');
    userEvent.click(input);

    await waitFor(() => {
      expect(onLoad).toHaveBeenCalled();
    });
  });

  describe('isBanana', () => {
    it('renders custom input', async () => {
      const { container } = render(
        <BpkAutosuggest
          {...requiredProps}
          theme={{ input: 'customInput' }}
          isBanana
        />,
      );
      const input = screen.getByRole('combobox');
      const label = container.querySelector('label');

      expect(input).not.toHaveClass('bpk-input');
      expect(input).toHaveClass('customInput');

      expect(label).toBeInTheDocument();
    });

    it('calls onSuggestionsClearRequested when clear button clicked', async () => {
      const onSuggestionsClearRequested = jest.fn();
      render(
        <BpkAutosuggest
          {...requiredProps}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          showClear
          isBanana
        />,
      );

      const { input } = await userInputsValue();

      const clearButton = screen.getByTestId('clear button');
      userEvent.click(clearButton);

      await waitFor(() => {
        expect(onSuggestionsClearRequested).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(input).toHaveValue('');
      });
    });

    it('calls onSuggestionsClearRequested when input has been cleared by keyboard after rendering suggestions', async () => {
      const onSuggestionsClearRequested = jest.fn();

      render(
        <BpkAutosuggest
          {...requiredProps}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          showClear
          isBanana
        />,
      );

      const { input } = await userInputsValue();

      userEvent.type(input, '{backspace}');
      await waitFor(() => {
        expect(onSuggestionsClearRequested).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(input).toHaveValue('');
      });
    });
  });
});
