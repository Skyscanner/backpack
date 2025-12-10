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

import BpkSegmentedControl, {
  getTabPanelProps,
  useSegmentedControlPanels,
  SEGMENT_TYPES,
} from './BpkSegmentedControl';

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

  it('should reflect selectedIndex prop in aria-selected attribute', () => {
    const { rerender } = render(
      <BpkSegmentedControl {...defaultProps} selectedIndex={0} />,
    );
    expect(screen.getByText('one')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('two')).toHaveAttribute('aria-selected', 'false');

    rerender(<BpkSegmentedControl {...defaultProps} selectedIndex={1} />);
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

  it('should auto-generate aria-controls for panels', () => {
    render(<BpkSegmentedControl {...defaultProps} id="my-tabs" />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-controls', 'my-tabs-panel-0');
    expect(tabs[1]).toHaveAttribute('aria-controls', 'my-tabs-panel-1');
  });

  describe('keyboard navigation', () => {
    it('should move focus to next tab on ArrowRight', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          id="my-tabs"
          selectedIndex={1}
        />,
      );
      const tabs = screen.getAllByRole('tab');
      tabs[1].focus();
      fireEvent.keyDown(tabs[1], { key: 'ArrowRight' });

      expect(mockOnItemClick).toHaveBeenCalledWith(0); // wraps to first
      expect(document.activeElement).toBe(tabs[0]);
    });

    it('should move focus to previous tab on ArrowLeft', () => {
      render(<BpkSegmentedControl {...defaultProps} id="my-tabs" />);
      const tabs = screen.getAllByRole('tab');
      tabs[1].focus();
      fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' });

      expect(mockOnItemClick).toHaveBeenCalledWith(0);
      expect(document.activeElement).toBe(tabs[0]);
    });

    it('should wrap to last tab when pressing ArrowLeft on first tab', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          id="my-tabs"
          selectedIndex={0}
        />,
      );
      const tabs = screen.getAllByRole('tab');
      tabs[0].focus();
      fireEvent.keyDown(tabs[0], { key: 'ArrowLeft' });

      expect(mockOnItemClick).toHaveBeenCalledWith(1);
      expect(document.activeElement).toBe(tabs[1]);
    });

    it('should move focus to first tab on Home', () => {
      render(<BpkSegmentedControl {...defaultProps} id="my-tabs" />);
      const tabs = screen.getAllByRole('tab');
      tabs[1].focus();
      fireEvent.keyDown(tabs[1], { key: 'Home' });

      expect(mockOnItemClick).toHaveBeenCalledWith(0);
      expect(document.activeElement).toBe(tabs[0]);
    });

    it('should move focus to last tab on End', () => {
      render(
        <BpkSegmentedControl
          {...defaultProps}
          id="my-tabs"
          selectedIndex={0}
        />,
      );
      const tabs = screen.getAllByRole('tab');
      tabs[0].focus();
      fireEvent.keyDown(tabs[0], { key: 'End' });

      expect(mockOnItemClick).toHaveBeenCalledWith(1);
      expect(document.activeElement).toBe(tabs[1]);
    });

    it('should set tabIndex=0 only on selected tab', () => {
      render(<BpkSegmentedControl {...defaultProps} id="my-tabs" />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('tabIndex', '-1');
      expect(tabs[1]).toHaveAttribute('tabIndex', '0');
    });
  });
});

describe('getTabPanelProps', () => {
  it('should return correct props for selected panel', () => {
    const props = getTabPanelProps('my-tabs', 0, 0);
    expect(props).toEqual({
      id: 'my-tabs-panel-0',
      role: 'tabpanel',
      'aria-labelledby': 'my-tabs-tab-0',
      hidden: false,
      tabIndex: 0,
    });
  });

  it('should return hidden=true for non-selected panel', () => {
    const props = getTabPanelProps('my-tabs', 1, 0);
    expect(props).toEqual({
      id: 'my-tabs-panel-1',
      role: 'tabpanel',
      'aria-labelledby': 'my-tabs-tab-1',
      hidden: true,
      tabIndex: 0,
    });
  });

  it('should generate correct IDs for different indices', () => {
    const props0 = getTabPanelProps('tabs', 0, 0);
    const props1 = getTabPanelProps('tabs', 1, 0);
    const props2 = getTabPanelProps('tabs', 2, 2);

    expect(props0.id).toBe('tabs-panel-0');
    expect(props1.id).toBe('tabs-panel-1');
    expect(props2.id).toBe('tabs-panel-2');

    expect(props0['aria-labelledby']).toBe('tabs-tab-0');
    expect(props1['aria-labelledby']).toBe('tabs-tab-1');
    expect(props2['aria-labelledby']).toBe('tabs-tab-2');
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
