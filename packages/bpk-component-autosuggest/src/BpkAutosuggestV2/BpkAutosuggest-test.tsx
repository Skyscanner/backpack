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

    it('renders input with aria-label from ariaLabels.label', () => {
      setup();

      expect(screen.getByLabelText('Search input')).toBeInTheDocument();
    });

    it('shows suggestions after typing', async () => {
      const props = setup();
      await typeAndWait(user, 'Lo');

      expect(props.onSuggestionsFetchRequested).toHaveBeenCalledWith('Lo');
      expect(screen.getAllByRole('option')).toHaveLength(suggestions.length);
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

  describe('Accessibility', () => {
    it('adds aria-label to result list from ariaLabels', async () => {
      setup();
      await typeAndWait(user);

      expect(screen.getByRole('listbox')).toHaveAttribute(
        'aria-label',
        'Suggestions list',
      );
    });
  });

  describe('Styling / Theming', () => {
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
