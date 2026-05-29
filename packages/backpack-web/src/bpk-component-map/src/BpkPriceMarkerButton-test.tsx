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

import { fireEvent, render, screen } from '@testing-library/react';

import BpkPriceMarkerButton, { MARKER_STATUSES } from './BpkPriceMarkerButton';

describe('BpkPriceMarkerButton', () => {
  it('should render properly', () => {
    render(<BpkPriceMarkerButton label="£120" />);

    expect(screen.getByText('£120')).toBeInTheDocument();
    expect(document.querySelector('.bpk-price-marker-button')).toHaveClass(
      'bpk-price-marker-button bpk-price-marker-button-unselected',
    );
  });

  it('should render properly with a icon', () => {
    const icon = <span>Icon</span>;
    render(
      <BpkPriceMarkerButton
        label="£120"
        icon={icon}
        status={MARKER_STATUSES.selected}
      />,
    );

    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('should render correctly with "status" attribute as "selected"', () => {
    render(
      <BpkPriceMarkerButton label="£120" status={MARKER_STATUSES.selected} />,
    );

    expect(document.querySelector('.bpk-price-marker-button')).toHaveClass(
      'bpk-price-marker-button bpk-price-marker-button-selected',
    );
  });

  it('should render correctly with "status" attribute as "previous_selected"', () => {
    render(
      <BpkPriceMarkerButton
        label="£120"
        status={MARKER_STATUSES.previous_selected}
      />,
    );

    expect(document.querySelector('.bpk-price-marker-button')).toHaveClass(
      'bpk-price-marker-button-previous_selected',
    );
  });

  it('should render correctly with a "className" attribute', () => {
    render(
      <BpkPriceMarkerButton
        label="£120"
        className="custom-class-1 custom-class-2"
      />,
    );

    expect(document.querySelector('.bpk-price-marker-button')).toHaveClass(
      'custom-class-1 custom-class-2',
    );
  });

  it('should render correctly with a "buttonProps" attribute', () => {
    render(
      <BpkPriceMarkerButton
        label="£120"
        buttonProps={{ testId: 'arbitrary value' }}
      />,
    );

    expect(screen.getByRole('button')).toHaveAttribute(
      'testid',
      'arbitrary value',
    );
  });

  it('should render correctly with a "onClick" attribute', () => {
    const mockOnClick = jest.fn();
    render(<BpkPriceMarkerButton label="£120" onClick={mockOnClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
