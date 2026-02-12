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

import { render, screen, fireEvent } from '@testing-library/react';

import BpkThumb from './BpkThumb';

const mockOnClick = jest.fn();

describe('BpkThumb', () => {
  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('should render correctly with default props', () => {
    const { asFragment } = render(
      <BpkThumb accessibilityLabel="Thumbs up" type="up" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it.each(['up', 'down'] as const)(
    'should render %s icon correctly',
    (type) => {
      render(
        <BpkThumb
          accessibilityLabel={`Thumbs ${type}`}
          type={type}
          onClick={mockOnClick}
        />,
      );

      const button = screen.getByTestId(`bpk-thumb-${type}`);

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bpk-thumb');
    },
  );

  it.each(['up', 'down'] as const)(
    'should call onClick with %s type',
    (type) => {
      render(
        <BpkThumb
          accessibilityLabel={`Thumbs ${type}`}
          type={type}
          onClick={mockOnClick}
        />,
      );

      fireEvent.click(screen.getByTestId(`bpk-thumb-${type}`));

      expect(mockOnClick).toHaveBeenCalledWith(type);
    },
  );

  it('should render with selected state', () => {
    render(
      <BpkThumb
        accessibilityLabel="Thumbs up"
        type="up"
        onClick={mockOnClick}
        selected
      />,
    );

    expect(screen.getByTestId('bpk-thumb-up')).toHaveClass(
      'bpk-thumb--selected',
    );
  });

  it('should prevent event bubbling', () => {
    const parentClick = jest.fn();
    const { container } = render(
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div onClick={parentClick}>
        <BpkThumb
          accessibilityLabel="Thumbs up"
          type="up"
          onClick={mockOnClick}
        />
      </div>,
    );

    const button = container.querySelector('[data-testid="bpk-thumb-up"]');
    if (button) {
      fireEvent.click(button);
    }

    expect(mockOnClick).toHaveBeenCalled();
    expect(parentClick).not.toHaveBeenCalled();
  });

  it('should have correct accessibility label', () => {
    const label = 'Rate this helpful';
    render(<BpkThumb accessibilityLabel={label} type="up" />);
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('should handle hover state', () => {
    render(<BpkThumb accessibilityLabel="Thumbs up" type="up" />);
    const button = screen.getByTestId('bpk-thumb-up');

    fireEvent.mouseEnter(button);
    expect(button).toHaveClass('bpk-thumb--hovered');

    fireEvent.mouseLeave(button);
    expect(button).not.toHaveClass('bpk-thumb--hovered');
  });

  it('should support disabled state', () => {
    render(
      <BpkThumb accessibilityLabel="Thumbs up" type="up" disabled />,
    );
    const button = screen.getByTestId('bpk-thumb-up');
    expect(button).toBeDisabled();
  });
});
