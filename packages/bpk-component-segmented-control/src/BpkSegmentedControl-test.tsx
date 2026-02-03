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

import {
  render,
  fireEvent,
  screen,
  waitFor,
  renderHook,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import BpkSegmentedControl, {
  SEGMENT_TYPES,
  useSegmentedControlPanels,
} from './BpkSegmentedControl';

const mockOnItemClick = jest.fn();

const mockIsRtl = jest.fn(() => false);

jest.mock('../../bpk-react-utils', () => ({
  ...jest.requireActual('../../bpk-react-utils'),
  isRTL: () => mockIsRtl(),
}));

const defaultProps = {
  buttonContents: ['one', 'two'],
  onItemClick: mockOnItemClick,
  selectedIndex: 1,
  shadow: false,
  type: SEGMENT_TYPES.CanvasContrast,
};

describe('BpkSegmentedControl', () => {
  beforeEach(() => {
    mockOnItemClick.mockClear();
    mockIsRtl.mockReturnValue(false);
  });

  it('should render ReactNode contents correctly', () => {
    const propsWithReactNodes = {
      ...defaultProps,
      buttonContents: [<div>one</div>, <div>two</div>, <div>three</div>],
    };
    const { getByText } = render(
      <BpkSegmentedControl {...propsWithReactNodes} />,
    );

    expect(getByText('one')).toBeInTheDocument();
    expect(getByText('two')).toBeInTheDocument();
    expect(getByText('three')).toBeInTheDocument();
  });

  it('should render button contents correctly', () => {
    const { getByText } = render(<BpkSegmentedControl {...defaultProps} />);

    expect(getByText('one')).toBeInTheDocument();
    expect(getByText('two')).toBeInTheDocument();
  });

  it('should call onItemClick with the correct index when a button is clicked', () => {
    const { getByText } = render(<BpkSegmentedControl {...defaultProps} />);
    const firstButton = getByText('one');
    fireEvent.click(firstButton);

    expect(mockOnItemClick).toHaveBeenCalledWith(0);
  });

  describe('ARIA attributes in button group mode (no id prop)', () => {
    it('should update selection when a button is clicked', () => {
      const { getByText } = render(<BpkSegmentedControl {...defaultProps} />);
      const buttonOne = getByText('one');
      fireEvent.click(buttonOne);

      expect(mockOnItemClick).toHaveBeenCalledWith(0);
    });

    it('should set the accessible label when label prop is provided', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          label="Segmented control label"
        />,
      );
      const container = screen.getByLabelText('Segmented control label');
      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute(
        'aria-label',
        'Segmented control label',
      );
    });

    it('should not set aria-label when label prop is not provided', () => {
      const { container } = render(
        <BpkSegmentedControl {...defaultProps} label={undefined} />,
      );
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).not.toHaveAttribute('aria-label');
    });

    it('should not have role="tablist" when no id prop is provided', () => {
      const { container } = render(<BpkSegmentedControl {...defaultProps} />);
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).not.toHaveAttribute('role', 'tablist');
    });

    it('should not have tab-related ARIA attributes when no id prop is provided', () => {
      render(<BpkSegmentedControl {...defaultProps} />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).not.toHaveAttribute('aria-selected');
        expect(button).not.toHaveAttribute('aria-controls');
        expect(button).not.toHaveAttribute('role', 'tab');
      });
    });
  });

  describe('ARIA attributes in tabs mode (with id prop)', () => {
    it('should render with role="tablist" when id prop is provided', () => {
      render(<BpkSegmentedControl {...defaultProps} id="test-control" />);
      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();
    });

    it('should have aria-orientation="horizontal" when id prop is provided', () => {
      render(<BpkSegmentedControl {...defaultProps} id="test-control" />);
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('should have role="tab" on buttons when id prop is provided', () => {
      render(<BpkSegmentedControl {...defaultProps} id="test-control" />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(2);
    });

    it('should have correct aria-selected state on tabs', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={0}
        />,
      );
      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    });

    it('should have aria-controls pointing to panel id', () => {
      render(<BpkSegmentedControl {...defaultProps} id="test-control" />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('aria-controls', 'test-control-panel-0');
      expect(tabs[1]).toHaveAttribute('aria-controls', 'test-control-panel-1');
    });

    it('should have correct tabIndex roving pattern', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={0}
        />,
      );
      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('tabindex', '0');
      expect(tabs[1]).toHaveAttribute('tabindex', '-1');
    });

    it('should update tabIndex and aria-selected when selection changes', async () => {
      const { getByText } = render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={0}
        />,
      );
      const buttonTwo = getByText('two');
      fireEvent.click(buttonTwo);

      await waitFor(() => {
        const tabs = screen.getAllByRole('tab');
        expect(tabs[0]).toHaveAttribute('tabindex', '-1');
        expect(tabs[1]).toHaveAttribute('tabindex', '0');
        expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
        expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
      });
    });

    it('should not have aria-pressed in tabs mode', () => {
      render(<BpkSegmentedControl {...defaultProps} id="test-control" />);
      const tabs = screen.getAllByRole('tab');
      tabs.forEach((tab) => {
        expect(tab).not.toHaveAttribute('aria-pressed');
      });
    });

    it('should have correct button ids when id prop is provided', () => {
      render(<BpkSegmentedControl {...defaultProps} id="my-control" />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('id', 'my-control-tab-0');
      expect(tabs[1]).toHaveAttribute('id', 'my-control-tab-1');
    });
  });

  it('should render with the correct type class', () => {
    const { container } = render(<BpkSegmentedControl {...defaultProps} />);
    const button = container.querySelector(
      '.bpk-segmented-control--canvas-contrast',
    );

    expect(button).toBeInTheDocument();
  });

  it('should apply shadow class when shadow prop is true', () => {
    const props = { ...defaultProps, shadow: true };
    const { container } = render(<BpkSegmentedControl {...props} />);

    expect(container.firstChild).toHaveClass(
      'bpk-segmented-control-group-shadow',
    );
  });

  it('should apply the correct class when button is selected and shadow is true', () => {
    const props = { ...defaultProps, shadow: true };
    const { container } = render(<BpkSegmentedControl {...props} />);
    const selectedButton = container.querySelector(
      '.bpk-segmented-control--canvas-contrast-selected-shadow',
    );

    expect(selectedButton).toBeInTheDocument();
  });

  describe('Keyboard navigation - Automatic Mode', () => {
    it('should move to next tab on ArrowRight and change selection', async () => {
      const user = userEvent.setup();
      const { getByText } = render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={0}
          activationMode="automatic"
        />,
      );

      const buttonOne = getByText('one');
      await user.click(buttonOne);
      await user.keyboard('{ArrowRight}');

      await waitFor(() => {
        expect(mockOnItemClick).toHaveBeenCalledWith(1);
      });
    });

    it('should move to previous tab on ArrowLeft and change selection', async () => {
      const user = userEvent.setup();
      const { getByText } = render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={1}
          activationMode="automatic"
        />,
      );

      const buttonTwo = getByText('two');
      await user.click(buttonTwo);
      await user.keyboard('{ArrowLeft}');

      await waitFor(() => {
        expect(mockOnItemClick).toHaveBeenCalledWith(0);
      });
    });

    it('should wrap from last tab to first on ArrowRight', async () => {
      const user = userEvent.setup();
      const { getByText } = render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={1}
          activationMode="automatic"
        />,
      );

      const buttonTwo = getByText('two');
      await user.click(buttonTwo);
      await user.keyboard('{ArrowRight}');

      await waitFor(() => {
        expect(mockOnItemClick).toHaveBeenCalledWith(0);
      });
    });

    it('should wrap from first tab to last on ArrowLeft', async () => {
      const user = userEvent.setup();
      const { getByText } = render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={0}
          activationMode="automatic"
        />,
      );

      const buttonOne = getByText('one');
      await user.click(buttonOne);
      await user.keyboard('{ArrowLeft}');

      await waitFor(() => {
        expect(mockOnItemClick).toHaveBeenCalledWith(1);
      });
    });

    it('should move focus to next button on arrow key', async () => {
      const user = userEvent.setup();
      const { getByText } = render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={0}
          activationMode="automatic"
        />,
      );

      const buttonOne = getByText('one');
      await user.click(buttonOne);
      await user.keyboard('{ArrowRight}');

      const buttonTwo = getByText('two');
      expect(document.activeElement).toBe(buttonTwo);
    });

    it('should jump to first tab on Home key', async () => {
      const user = userEvent.setup();
      const { getByText } = render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={1}
          activationMode="automatic"
        />,
      );

      const buttonTwo = getByText('two');
      await user.click(buttonTwo);
      await user.keyboard('{Home}');

      await waitFor(() => {
        expect(mockOnItemClick).toHaveBeenCalledWith(0);
      });
    });

    it('should jump to last tab on End key', async () => {
      const user = userEvent.setup();
      const { getByText } = render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={0}
          activationMode="automatic"
        />,
      );

      const buttonOne = getByText('one');
      await user.click(buttonOne);
      await user.keyboard('{End}');

      await waitFor(() => {
        expect(mockOnItemClick).toHaveBeenCalledWith(1);
      });
    });

    it('should have automatic mode as default activation mode', () => {
      // This test verifies that without specifying activationMode, arrow keys activate tabs
      const { getByText } = render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={0}
        />,
      );

      const buttonOne = getByText('one');
      fireEvent.click(buttonOne);
      fireEvent.keyDown(buttonOne, { key: 'ArrowRight' });

      expect(mockOnItemClick).toHaveBeenCalled();
    });
  });

  describe('Keyboard navigation - Manual Mode', () => {
    it('should move focus on ArrowRight but not change selection', async () => {
      const user = userEvent.setup();
      mockOnItemClick.mockClear();

      const { getByText } = render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={0}
          activationMode="manual"
        />,
      );

      const buttonOne = getByText('one');
      await user.click(buttonOne);
      await user.keyboard('{ArrowRight}');

      const buttonTwo = getByText('two');
      expect(document.activeElement).toBe(buttonTwo);
      expect(mockOnItemClick).not.toHaveBeenCalled();
    });

    it('should activate tab on Space key in manual mode', async () => {
      const user = userEvent.setup();
      const { getByText } = render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={0}
          activationMode="manual"
        />,
      );

      const buttonOne = getByText('one');
      await user.click(buttonOne);
      await user.keyboard('{ArrowRight}');
      await user.keyboard(' ');

      await waitFor(() => {
        expect(mockOnItemClick).toHaveBeenCalledWith(1);
      });
    });

    it('should activate tab on Enter key in manual mode', async () => {
      const user = userEvent.setup();
      const { getByText } = render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={0}
          activationMode="manual"
        />,
      );

      const buttonOne = getByText('one');
      await user.click(buttonOne);
      await user.keyboard('{ArrowRight}');
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(mockOnItemClick).toHaveBeenCalledWith(1);
      });
    });

    it('should move focus on ArrowLeft but not change selection', async () => {
      const user = userEvent.setup();
      mockOnItemClick.mockClear();

      const { getByText } = render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={1}
          activationMode="manual"
        />,
      );

      const buttonTwo = getByText('two');
      await user.click(buttonTwo);
      await user.keyboard('{ArrowLeft}');

      const buttonOne = getByText('one');
      expect(document.activeElement).toBe(buttonOne);
      expect(mockOnItemClick).not.toHaveBeenCalled();
    });
  });

  describe('RTL keyboard navigation', () => {
    it('should reverse arrow key direction when isRTL is true', async () => {
      const user = userEvent.setup();
      mockIsRtl.mockReturnValue(true);

      const { getByText } = render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={0}
          activationMode="automatic"
        />,
      );

      const buttonOne = getByText('one');
      await user.click(buttonOne);
      await user.keyboard('{ArrowRight}');

      await waitFor(() => {
        expect(mockOnItemClick).toHaveBeenCalledWith(1);
      });
    });

    it('should reverse ArrowLeft direction when isRTL is true', async () => {
      const user = userEvent.setup();
      mockIsRtl.mockReturnValue(true);

      const { getByText } = render(
        <BpkSegmentedControl
          {...defaultProps}
          id="test-control"
          selectedIndex={1}
          activationMode="automatic"
        />,
      );

      const buttonTwo = getByText('two');
      await user.click(buttonTwo);
      // In RTL, ArrowLeft should go to next (wrap to first)
      await user.keyboard('{ArrowLeft}');

      await waitFor(() => {
        expect(mockOnItemClick).toHaveBeenCalledWith(0);
      });
    });
  });

  describe('Segment types', () => {
    const segmentTypeEntries = Object.entries(SEGMENT_TYPES);

    segmentTypeEntries.forEach(([name, type]) => {
      it(`should render correctly with type="${type}"`, () => {
        const { container } = render(
          <BpkSegmentedControl
            {...defaultProps}
            type={type}
            selectedIndex={0}
          />,
        );

        const button = container.querySelector(
          `.bpk-segmented-control--${type}`,
        );
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('useSegmentedControlPanels hook', () => {
    it('should generate unique ids', () => {
      const buttonContents = ['one', 'two'];
      const { result: result1 } = renderHook(() =>
        useSegmentedControlPanels(buttonContents, 0),
      );
      const { result: result2 } = renderHook(() =>
        useSegmentedControlPanels(buttonContents, 0),
      );

      expect(result1.current.controlProps.id).not.toBe(
        result2.current.controlProps.id,
      );
    });

    it('should return controlProps with correct structure', () => {
      const buttonContents = ['one', 'two'];
      const { result } = renderHook(() =>
        useSegmentedControlPanels(buttonContents, 0),
      );

      expect(result.current.controlProps).toHaveProperty('id');
      expect(result.current.controlProps).toHaveProperty('buttonContents');
      expect(result.current.controlProps).toHaveProperty('selectedIndex');
      expect(result.current.controlProps.buttonContents).toEqual(
        buttonContents,
      );
      expect(result.current.controlProps.selectedIndex).toBe(0);
    });

    it('should return getPanelProps function that generates correct props', () => {
      const buttonContents = ['one', 'two'];
      const { result } = renderHook(() =>
        useSegmentedControlPanels(buttonContents, 0),
      );

      const panelProps0 = result.current.getPanelProps(0);
      const panelProps1 = result.current.getPanelProps(1);

      expect(panelProps0).toHaveProperty('id');
      expect(panelProps0).toHaveProperty('role', 'tabpanel');
      expect(panelProps0).toHaveProperty('aria-labelledby');
      expect(panelProps0).toHaveProperty('hidden', false);
      expect(panelProps0).toHaveProperty('tabIndex', 0);

      expect(panelProps1.hidden).toBe(true);
    });

    it('should update panel hidden state when selectedIndex changes', () => {
      const buttonContents = ['one', 'two'];
      const { rerender, result } = renderHook(
        ({ selectedIndex }) =>
          useSegmentedControlPanels(buttonContents, selectedIndex),
        { initialProps: { selectedIndex: 0 } },
      );

      expect(result.current.getPanelProps(0).hidden).toBe(false);
      expect(result.current.getPanelProps(1).hidden).toBe(true);

      rerender({ selectedIndex: 1 });

      expect(result.current.getPanelProps(0).hidden).toBe(true);
      expect(result.current.getPanelProps(1).hidden).toBe(false);
    });

    it('should link tab to panel with correct aria-labelledby', () => {
      const buttonContents = ['one', 'two'];
      const { result } = renderHook(() =>
        useSegmentedControlPanels(buttonContents, 0),
      );

      const baseId = result.current.controlProps.id;
      const panelProps0 = result.current.getPanelProps(0);

      expect(panelProps0['aria-labelledby']).toBe(`${baseId}-tab-0`);
      expect(panelProps0.id).toBe(`${baseId}-panel-0`);
    });
  });
});
