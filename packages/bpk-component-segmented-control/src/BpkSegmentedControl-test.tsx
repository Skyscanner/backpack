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
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import BpkSegmentedControl, { SEGMENT_TYPES } from './BpkSegmentedControl';

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

  it('should update the selected button when a button is clicked', () => {
    const { getByText } = render(<BpkSegmentedControl {...defaultProps} />);
    const buttonOne = getByText('one');
    fireEvent.click(buttonOne);

    expect(screen.getByText('one')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('two')).toHaveAttribute('aria-pressed', 'false');
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

  it('should render with role="group" on the outer div', () => {
    render(<BpkSegmentedControl {...defaultProps} />);
    const group = screen.getByRole('group');
    expect(group).toBeInTheDocument();
  });

  it('should set the accessible label on the group when label prop is provided', () => {
    render(
      <BpkSegmentedControl
        {...defaultProps}
        label="Segmented control label"
      />,
    );
    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('aria-label', 'Segmented control label');
  });

  it('should not set aria-label when label prop is not provided', () => {
    render(<BpkSegmentedControl {...defaultProps} label={undefined} />);
    const group = screen.getByRole('group');
    expect(group).not.toHaveAttribute('aria-label');
  });
});
