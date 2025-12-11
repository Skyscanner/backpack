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
import { render, fireEvent, screen, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import { isRTL } from '../../bpk-react-utils';

import BpkSegmentedControl, {
  useSegmentedControlPanels,
  SEGMENT_TYPES,
} from './BpkSegmentedControl';

jest.mock('../../bpk-react-utils', () => ({
  ...jest.requireActual('../../bpk-react-utils'),
  isRTL: jest.fn(() => false),
}));

const mockOnItemClick = jest.fn();

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

  it('should call onItemClick when a different button is clicked', () => {
    const { getByText } = render(<BpkSegmentedControl {...defaultProps} />);
    const buttonOne = getByText('one');
    fireEvent.click(buttonOne);

    expect(mockOnItemClick).toHaveBeenCalledWith(0);
  });

  it('should set aria-selected based on selectedIndex prop on initial render', () => {
    render(<BpkSegmentedControl {...defaultProps} selectedIndex={0} />);

    expect(screen.getByText('one')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('two')).toHaveAttribute('aria-selected', 'false');
  });

  it('should set aria-selected to true when a different button is clicked', () => {
    render(<BpkSegmentedControl {...defaultProps} selectedIndex={0} />);
    const buttonTwo = screen.getByText('two');
    fireEvent.click(buttonTwo);

    expect(screen.getByText('one')).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText('two')).toHaveAttribute('aria-selected', 'true');
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

  it('should render with role="tablist" on the outer div', () => {
    render(<BpkSegmentedControl {...defaultProps} />);
    const tablist = screen.getByRole('tablist');

    expect(tablist).toBeInTheDocument();
  });

  it('should set aria-orientation="horizontal" on the tablist', () => {
    render(<BpkSegmentedControl {...defaultProps} />);
    const tablist = screen.getByRole('tablist');

    expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('should set the accessible label on the tablist when label prop is provided', () => {
    render(
      <BpkSegmentedControl {...defaultProps} label="Segmented control label" />,
    );
    const tablist = screen.getByRole('tablist');

    expect(tablist).toHaveAttribute('aria-label', 'Segmented control label');
  });

  it('should not set aria-label when label prop is not provided', () => {
    render(<BpkSegmentedControl {...defaultProps} label={undefined} />);
    const tablist = screen.getByRole('tablist');

    expect(tablist).not.toHaveAttribute('aria-label');
  });

  it('should generate tab IDs based on provided id prop', () => {
    render(<BpkSegmentedControl {...defaultProps} id="my-tabs" />);
    const tabs = screen.getAllByRole('tab');

    expect(tabs[0]).toHaveAttribute('id', 'my-tabs-tab-0');
    expect(tabs[1]).toHaveAttribute('id', 'my-tabs-tab-1');
  });

  it('should not generate tab IDs when id prop is not provided', () => {
    render(<BpkSegmentedControl {...defaultProps} />);
    const tabs = screen.getAllByRole('tab');

    expect(tabs[0]).not.toHaveAttribute('id');
    expect(tabs[1]).not.toHaveAttribute('id');
  });

  it('should auto-generate aria-controls for panels when id is provided', () => {
    render(<BpkSegmentedControl {...defaultProps} id="my-tabs" />);
    const tabs = screen.getAllByRole('tab');

    expect(tabs[0]).toHaveAttribute('aria-controls', 'my-tabs-panel-0');
    expect(tabs[1]).toHaveAttribute('aria-controls', 'my-tabs-panel-1');
  });

  it('should not set aria-controls when id prop is not provided', () => {
    render(<BpkSegmentedControl {...defaultProps} />);
    const tabs = screen.getAllByRole('tab');

    expect(tabs[0]).not.toHaveAttribute('aria-controls');
    expect(tabs[1]).not.toHaveAttribute('aria-controls');
  });

  describe('activationMode', () => {
    it('should default to automatic activation mode', () => {
      render(<BpkSegmentedControl {...defaultProps} selectedIndex={0} />);
      const tabs = screen.getAllByRole('tab');
      tabs[0].focus();
      fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });

      // In automatic mode, navigating should call onItemClick
      expect(document.activeElement).toBe(tabs[1]);
      expect(mockOnItemClick).toHaveBeenCalledWith(1);
    });

    it('should not activate tabs automatically in manual mode', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          selectedIndex={0}
          activationMode="manual"
        />,
      );
      const tabs = screen.getAllByRole('tab');
      tabs[0].focus();
      fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });

      // In manual mode (default), arrow keys move focus but don't activate
      expect(document.activeElement).toBe(tabs[1]);
      expect(mockOnItemClick).not.toHaveBeenCalled();
    });

    it('should require Enter or Space to activate in manual mode', () => {
      mockOnItemClick.mockClear();
      render(
        <BpkSegmentedControl
          {...defaultProps}
          selectedIndex={0}
          activationMode="manual"
        />,
      );
      const tabs = screen.getAllByRole('tab');
      tabs[0].focus();
      fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });

      // Focus moves but tab is not activated yet (onItemClick not called)
      expect(document.activeElement).toBe(tabs[1]);
      expect(mockOnItemClick).not.toHaveBeenCalled();

      // Now press Enter to activate
      fireEvent.keyDown(tabs[1], { key: 'Enter' });
      expect(mockOnItemClick).toHaveBeenCalledWith(1);
    });

    it('should activate tab with Space key in manual mode', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          selectedIndex={0}
          activationMode="manual"
        />,
      );
      const tabs = screen.getAllByRole('tab');
      tabs[1].focus();
      fireEvent.keyDown(tabs[1], { key: ' ' });

      expect(mockOnItemClick).toHaveBeenCalledWith(1);
    });
  });

  describe('keyboard navigation', () => {
    beforeEach(() => {
      (isRTL as jest.Mock).mockReturnValue(false);
    });

    it('should move focus to next tab on ArrowRight in manual mode', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          id="my-tabs"
          selectedIndex={1}
          activationMode="manual"
        />,
      );
      const tabs = screen.getAllByRole('tab');
      tabs[1].focus();
      fireEvent.keyDown(tabs[1], { key: 'ArrowRight' });

      // In manual mode, arrow keys only move focus, not activate
      expect(mockOnItemClick).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(tabs[0]); // wraps to first
    });

    it('should move focus to previous tab on ArrowLeft in manual mode', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          id="my-tabs"
          activationMode="manual"
        />,
      );
      const tabs = screen.getAllByRole('tab');
      tabs[1].focus();
      fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' });

      expect(mockOnItemClick).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(tabs[0]);
    });

    it('should wrap to last tab when pressing ArrowLeft on first tab', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          buttonContents={['one', 'two', 'three']}
          id="my-tabs"
          selectedIndex={0}
          activationMode="manual"
        />,
      );
      const tabs = screen.getAllByRole('tab');
      tabs[0].focus();
      fireEvent.keyDown(tabs[0], { key: 'ArrowLeft' });

      expect(mockOnItemClick).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(tabs[2]);
    });

    it('should move focus to first tab on Home', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          id="my-tabs"
          activationMode="manual"
        />,
      );
      const tabs = screen.getAllByRole('tab');
      tabs[1].focus();
      fireEvent.keyDown(tabs[1], { key: 'Home' });

      expect(mockOnItemClick).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(tabs[0]);
    });

    it('should move focus to last tab on End', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          id="my-tabs"
          selectedIndex={0}
          activationMode="manual"
        />,
      );
      const tabs = screen.getAllByRole('tab');
      tabs[0].focus();
      fireEvent.keyDown(tabs[0], { key: 'End' });

      expect(mockOnItemClick).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(tabs[1]);
    });

    it('should set tabIndex=0 only on selected tab', () => {
      render(<BpkSegmentedControl {...defaultProps} id="my-tabs" />);
      const tabs = screen.getAllByRole('tab');

      // default selectedIndex is 1
      expect(tabs[0]).toHaveAttribute('tabIndex', '-1');
      expect(tabs[1]).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('RTL keyboard navigation', () => {
    beforeEach(() => {
      (isRTL as jest.Mock).mockReturnValue(true);
    });

    afterEach(() => {
      (isRTL as jest.Mock).mockReturnValue(false);
    });

    it('should move focus to previous tab on ArrowRight in RTL', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          id="my-tabs"
          selectedIndex={1}
          activationMode="manual"
        />,
      );
      const tabs = screen.getAllByRole('tab');
      tabs[1].focus();
      fireEvent.keyDown(tabs[1], { key: 'ArrowRight' });

      expect(mockOnItemClick).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(tabs[0]);
    });

    it('should move focus to next tab on ArrowLeft in RTL', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          id="my-tabs"
          selectedIndex={0}
          activationMode="manual"
        />,
      );
      const tabs = screen.getAllByRole('tab');
      tabs[0].focus();
      fireEvent.keyDown(tabs[0], { key: 'ArrowLeft' });

      expect(mockOnItemClick).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(tabs[1]);
    });

    it('should wrap from first to last on ArrowRight in RTL', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          id="my-tabs"
          selectedIndex={0}
          activationMode="manual"
        />,
      );
      const tabs = screen.getAllByRole('tab');
      tabs[0].focus();
      fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });

      expect(mockOnItemClick).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(tabs[1]);
    });

    it('should wrap from last to first on ArrowLeft in RTL', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          id="my-tabs"
          selectedIndex={1}
          activationMode="manual"
        />,
      );
      const tabs = screen.getAllByRole('tab');
      tabs[1].focus();
      fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' });

      expect(mockOnItemClick).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(tabs[0]);
    });

    it('should activate tabs automatically in RTL with automatic mode', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          id="my-tabs"
          selectedIndex={0}
          activationMode="automatic"
        />,
      );
      const tabs = screen.getAllByRole('tab');
      tabs[0].focus();
      fireEvent.keyDown(tabs[0], { key: 'ArrowLeft' });

      // In RTL, ArrowLeft goes to next item
      expect(mockOnItemClick).toHaveBeenCalledWith(1);
      expect(document.activeElement).toBe(tabs[1]);
    });
  });
});

describe('useSegmentedControlPanels', () => {
  it('should return controlProps with auto-generated id', () => {
    const { result } = renderHook(() =>
      useSegmentedControlPanels(['One', 'Two'], 0),
    );

    expect(result.current.controlProps).toHaveProperty('id');
    expect(result.current.controlProps.id).toBeTruthy();
    expect(result.current.controlProps.buttonContents).toEqual(['One', 'Two']);
    expect(result.current.controlProps.selectedIndex).toBe(0);
  });

  it('should return getPanelProps function that generates correct props', () => {
    const { result } = renderHook(() =>
      useSegmentedControlPanels(['One', 'Two', 'Three'], 1),
    );

    const panel0Props = result.current.getPanelProps(0);
    const panel1Props = result.current.getPanelProps(1);
    const panel2Props = result.current.getPanelProps(2);

    expect(panel0Props.hidden).toBe(true);
    expect(panel1Props.hidden).toBe(false);
    expect(panel2Props.hidden).toBe(true);

    expect(panel0Props.role).toBe('tabpanel');
    expect(panel1Props.role).toBe('tabpanel');
    expect(panel2Props.role).toBe('tabpanel');

    expect(panel0Props['aria-labelledby']).toContain('-tab-0');
    expect(panel1Props['aria-labelledby']).toContain('-tab-1');
    expect(panel2Props['aria-labelledby']).toContain('-tab-2');

    expect(panel0Props.id).toContain('-panel-0');
    expect(panel1Props.id).toContain('-panel-1');
    expect(panel2Props.id).toContain('-panel-2');
  });

  it('should maintain stable IDs across re-renders with same inputs', () => {
    const { rerender, result } = renderHook(
      ({ contents, selected }) => useSegmentedControlPanels(contents, selected),
      {
        initialProps: { contents: ['A', 'B'], selected: 0 },
      },
    );

    const firstId = result.current.controlProps.id;
    const firstPanelId = result.current.getPanelProps(0).id;

    rerender({ contents: ['A', 'B'], selected: 0 });

    expect(result.current.controlProps.id).toBe(firstId);
    expect(result.current.getPanelProps(0).id).toBe(firstPanelId);
  });

  it('should update panel hidden state when selectedIndex changes', () => {
    const { rerender, result } = renderHook(
      ({ contents, selected }) => useSegmentedControlPanels(contents, selected),
      {
        initialProps: { contents: ['A', 'B', 'C'], selected: 0 },
      },
    );

    expect(result.current.getPanelProps(0).hidden).toBe(false);
    expect(result.current.getPanelProps(1).hidden).toBe(true);

    rerender({ contents: ['A', 'B', 'C'], selected: 1 });

    expect(result.current.getPanelProps(0).hidden).toBe(true);
    expect(result.current.getPanelProps(1).hidden).toBe(false);
  });
});
