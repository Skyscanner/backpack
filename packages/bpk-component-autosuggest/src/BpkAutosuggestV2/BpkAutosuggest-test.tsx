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

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkAutosuggest from './BpkAutosuggest';

type Suggestion = { PlaceId: string; PlaceName: string };

const suggestions: Suggestion[] = [
  { PlaceId: '1', PlaceName: 'London' },
  { PlaceId: '2', PlaceName: 'Paris' },
];

const renderSuggestion = (s: Suggestion) => <div>{s.PlaceName}</div>;
const getSuggestionValue = (s: Suggestion) => s.PlaceName;

const getBaseProps = () => ({
  id: 'bpk-autosuggest',
  suggestions,
  getSuggestionValue,
  renderSuggestion,
  inputProps: { placeholder: 'Search here...' },
  ariaLabels: {
    label: 'Search input',
    resultsList: 'Suggestions list',
    clearButton: 'Clear',
    noResults: 'No results',
  },
  onSuggestionsFetchRequested: jest.fn(),
  onSuggestionsClearRequested: jest.fn(),
  onSuggestionSelected: jest.fn(),
  getA11yResultsMessage: (count: number) =>
    `${count} result${count === 1 ? '' : 's'}`,
});

const setup = (overrides = {}) => {
  const props = { ...getBaseProps(), ...overrides };
  render(<BpkAutosuggest {...props} />);
  return props;
};

const typeAndWait = async (
  user: ReturnType<typeof userEvent.setup>,
  value = 'Lo',
) => {
  const input = screen.getByRole('combobox');
  await user.click(input);
  await user.type(input, value);

  await waitFor(() => expect(input).toHaveValue(value));
  return input;
};

describe('BpkAutosuggest', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('renders input with placeholder', () => {
      setup();
      expect(screen.getByPlaceholderText('Search here...')).toBeInTheDocument();
    });

    it('shows suggestions after typing', async () => {
      const props = setup();
      await typeAndWait(user, 'Lo');

      expect(props.onSuggestionsFetchRequested).toHaveBeenCalledWith('Lo');
      expect(screen.getAllByRole('option')).toHaveLength(suggestions.length);
    });

    it('sets aria-label on the input to input value if present', async () => {
      setup();

      const input = screen.getByRole('combobox');
      await user.click(input);
      await user.type(input, 'Lo');

      expect(input).toHaveAttribute('aria-label', 'Lo');
    });
  });

  describe('Interaction: selection', () => {
    it('selects suggestion by click', async () => {
      const props = setup();
      await typeAndWait(user);
      await user.click(screen.getAllByRole('option')[0]);

      expect(props.onSuggestionSelected).toHaveBeenCalledWith({
        inputValue: 'Lo',
        suggestion: suggestions[0],
      });
    });

    it('selects suggestion by Enter key', async () => {
      const props = setup();
      await typeAndWait(user);
      await user.keyboard('{Enter}');

      expect(props.onSuggestionSelected).toHaveBeenCalledWith({
        inputValue: 'Lo',
        suggestion: suggestions[0],
      });
    });

    it('calls onInputValueChange with method and newValue', async () => {
      const onInputValueChange = jest.fn();
      setup({ onInputValueChange });

      await typeAndWait(user, 'Lo');

      expect(onInputValueChange).toHaveBeenCalledWith({
        method: expect.any(String),
        newValue: 'Lo',
      });
    });

    it('blurs input when suggestion is clicked and focusInputOnSuggestionClick is false', async () => {
      setup({ focusInputOnSuggestionClick: false });

      const input = await typeAndWait(user);
      expect(input).toHaveFocus();

      await user.click(screen.getAllByRole('option')[0]);

      expect(input).not.toHaveFocus();
    });
  });

  describe('Clear button', () => {
    it('clears input via clear button', async () => {
      const props = setup({ showClear: true });
      const input = await typeAndWait(user);
      const clearButton = screen.getByRole('button', { name: 'Clear' });
      await user.click(clearButton);

      expect(props.onSuggestionsClearRequested).toHaveBeenCalled();
      expect(input).toHaveValue('');
    });

    it('clears input via backspace to empty', async () => {
      const props = setup({ showClear: true });
      const input = await typeAndWait(user);
      await user.type(input, '{backspace}{backspace}');

      expect(props.onSuggestionsClearRequested).toHaveBeenCalled();
      expect(input).toHaveValue('');
    });
  });

  describe('Custom renderInputComponent', () => {
    it('calls renderInputComponent if provided', () => {
      const renderInputComponent = jest.fn((props) => (
        <input data-testid="custom-input" {...props} />
      ));
      setup({ renderInputComponent });

      expect(screen.getByTestId('custom-input')).toBeInTheDocument();
      expect(renderInputComponent).toHaveBeenCalled();
    });
  });

  describe('Custom renderBesideInput', () => {
    it('renders beside input when provided', () => {
      setup({ renderBesideInput: () => <div data-testid="icon">Icon</div> });
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('highlightFirstSuggestion', () => {
    it('applies highlight to first suggestion when enabled', async () => {
      setup({
        highlightFirstSuggestion: true,
        theme: { suggestionHighlighted: 'highlighted' },
      });

      await typeAndWait(user);
      expect(screen.getAllByRole('option')[0]).toHaveClass('highlighted');
    });
  });

  describe('onSuggestionHighlighted', () => {
    it('calls onSuggestionHighlighted when highlighting a suggestion', async () => {
      const onSuggestionHighlighted = jest.fn();
      setup({ onSuggestionHighlighted });

      await typeAndWait(user);
      await user.keyboard('{ArrowDown}');

      expect(onSuggestionHighlighted).toHaveBeenCalledWith({
        suggestion: suggestions[0],
      });
    });

    it('calls onSuggestionHighlighted with null when no suggestion is highlighted', async () => {
      const onSuggestionHighlighted = jest.fn();
      setup({ onSuggestionHighlighted });

      await typeAndWait(user);
      await user.keyboard('{Escape}');

      expect(
        onSuggestionHighlighted.mock.calls.some(
          ([call]) => call?.suggestion === null,
        ),
      ).toBe(true);
    });
  });

  describe('alwaysRenderSuggestions', () => {
    it('always renders suggestions when alwaysRenderSuggestions is true', () => {
      setup({ alwaysRenderSuggestions: true });

      expect(screen.getAllByRole('option')).toHaveLength(suggestions.length);
    });
  });

  describe('multiSection and renderSectionTitle', () => {
    const sectionSuggestions = [
      {
        title: 'UK',
        items: [
          { PlaceId: '1', PlaceName: 'London' },
          { PlaceId: '2', PlaceName: 'Manchester' },
        ],
      },
      {
        title: 'France',
        items: [{ PlaceId: '3', PlaceName: 'Paris' }],
      },
    ];

    const getSectionSuggestions = (section: any) => section.items;
    const renderSectionTitle = (section: any) => (
      <strong>{section.title}</strong>
    );

    it('renders section titles and grouped suggestions', async () => {
      setup({
        suggestions: sectionSuggestions,
        multiSection: true,
        getSectionSuggestions,
        renderSectionTitle,
      });

      await typeAndWait(user);

      expect(screen.getByText('UK')).toBeInTheDocument();
      expect(screen.getByText('France')).toBeInTheDocument();
      expect(screen.getAllByRole('option')).toHaveLength(3);
    });
  });

  describe('floating portal (desktop)', () => {
    it('renders suggestions outside container via portal', async () => {
      const { container } = render(
        <BpkAutosuggest {...getBaseProps()} isDesktop />,
      );

      await typeAndWait(user);

      const inside = container.querySelector('[role="listbox"]');
      expect(inside).not.toBeInTheDocument();

      const outside = document.body.querySelector('[role="listbox"]');
      expect(outside).toBeInTheDocument();
    });
  });

  describe('ARIA attributes', () => {
    it('applies aria-activedescendant when highlighting', async () => {
      setup();
      await typeAndWait(user);
      await user.keyboard('{ArrowDown}');

      const input = screen.getByRole('combobox');
      const activeId = input.getAttribute('aria-activedescendant');

      expect(activeId).toBeTruthy();

      const highlightedOption = document.getElementById(activeId!);
      expect(highlightedOption).toHaveAttribute('aria-selected', 'true');
    });

    it('adds aria-label to result list from ariaLabels', async () => {
      setup();
      await typeAndWait(user);

      expect(screen.getByRole('listbox')).toHaveAttribute(
        'aria-label',
        'Suggestions list',
      );
    });

    it('renders visually hidden label from ariaLabels.label and links it via aria-describedby', () => {
      setup();

      const input = screen.getByRole('combobox');
      const describedById = input.getAttribute('aria-describedby');

      expect(describedById).toBeTruthy();

      const hiddenLabel = document.getElementById(describedById!);
      expect(hiddenLabel).toBeInTheDocument();
      expect(hiddenLabel).toHaveTextContent('Search input');
    });

    it('sets aria-describedby on the input to the generated srLabelId and renders corresponding label', () => {
      setup();

      const input = screen.getByRole('combobox');
      const describedById = input.getAttribute('aria-describedby');

      expect(describedById).toBeTruthy();

      const srLabel = document.getElementById(describedById!);
      expect(srLabel).toBeInTheDocument();
      expect(srLabel).toHaveTextContent('Search input');
    });

    it('sets aria-label on the input to the input value or placeholder', async () => {
      setup();
      let input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('aria-label', 'Search here...');

      input = await typeAndWait(user, 'Lo');
      expect(input).toHaveAttribute('aria-label', 'Lo');
    });
  });

  describe('defaultValue', () => {
    it('pre-fills input if defaultValue is given', () => {
      setup({ defaultValue: 'Paris' });

      const input = screen.getByRole('combobox');
      expect(input).toHaveValue('Paris');
    });
  });

  describe('Set Theme', () => {
    it('applies custom theme classNames', async () => {
      setup({
        theme: {
          suggestion: 'custom-suggestion',
          input: 'custom-input',
        },
      });

      const input = await typeAndWait(user);
      expect(input).toHaveClass('custom-input');

      screen
        .getAllByRole('option')
        .forEach((el) => expect(el).toHaveClass('custom-suggestion'));
    });
  });
});
