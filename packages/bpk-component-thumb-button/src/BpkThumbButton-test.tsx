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

import { BpkBox, BpkProvider } from '../../bpk-component-layout';

import BpkThumbButton from './BpkThumbButton';

const mockOnClick = jest.fn();

describe('BpkThumbButton', () => {
  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('should render correctly with default props', () => {
    const { asFragment } = render(
      <BpkThumbButton accessibilityLabel="Thumbs up" type="up" onClick={mockOnClick} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it.each(['up', 'down'] as const)(
    'should render %s icon correctly',
    (type) => {
      render(
        <BpkThumbButton
          accessibilityLabel={`Thumbs ${type}`}
          type={type}
          onClick={mockOnClick}
        />,
      );

      const button = screen.getByTestId(`bpk-thumb-button-${type}`);

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bpk-thumb-button');
    },
  );

  it.each(['up', 'down'] as const)(
    'should call onClick with %s type',
    (type) => {
      render(
        <BpkThumbButton
          accessibilityLabel={`Thumbs ${type}`}
          type={type}
          onClick={mockOnClick}
        />,
      );

      fireEvent.click(screen.getByTestId(`bpk-thumb-button-${type}`));

      expect(mockOnClick).toHaveBeenCalledWith(type);
    },
  );

  it('should render with selected state', () => {
    render(
      <BpkThumbButton
        accessibilityLabel="Thumbs up"
        type="up"
        onClick={mockOnClick}
        selected
      />,
    );

    expect(screen.getByTestId('bpk-thumb-button-up')).toHaveClass(
      'bpk-thumb-button--selected',
    );
  });

  it('should prevent event bubbling', () => {
    const parentClick = jest.fn();
    const { container } = render(
      <BpkProvider>
        <BpkBox onClick={parentClick}>
          <BpkThumbButton
            accessibilityLabel="Thumbs up"
            type="up"
            onClick={mockOnClick}
          />
        </BpkBox>
      </BpkProvider>,
    );

    const button = container.querySelector('[data-testid="bpk-thumb-button-up"]');
    if (button) {
      fireEvent.click(button);
    }

    expect(mockOnClick).toHaveBeenCalled();
    expect(parentClick).not.toHaveBeenCalled();
  });

  it('should have correct accessibility label', () => {
    const label = 'Rate this helpful';
    render(<BpkThumbButton accessibilityLabel={label} type="up" onClick={mockOnClick} />);
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('should apply small modifier class when size is small', () => {
    render(
      <BpkThumbButton
        accessibilityLabel="Thumbs up"
        type="up"
        onClick={mockOnClick}
        size="small"
      />,
    );
    expect(screen.getByTestId('bpk-thumb-button-up')).toHaveClass('bpk-thumb-button--small');
  });

  it('should not apply small modifier class by default', () => {
    render(
      <BpkThumbButton accessibilityLabel="Thumbs up" type="up" onClick={mockOnClick} />,
    );
    expect(screen.getByTestId('bpk-thumb-button-up')).not.toHaveClass('bpk-thumb-button--small');
  });

});
