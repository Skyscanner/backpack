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
/* eslint-disable no-underscore-dangle */
import { useRef } from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import mockCards from '../../testMocks';

import BpkCardListRow from './BpkCardListRow';

import type { BpkAccessoryTypes } from '../common-types';

jest.mock('../../../bpk-react-utils', () => ({
  ...jest.requireActual('../../../bpk-react-utils'),
  isRTL: jest.fn(),
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));

const mockScroll = jest.fn();

describe('BpkCardListRow', () => {
  const props = {
    accessory: 'pagination' as typeof BpkAccessoryTypes.Pagination,
    ariaLabelIndicator: 'Go to slide',
    ariaLabelNext: 'Next',
    ariaLabelPrev: 'Previous',
    numberOfCardsToShow: 3,
  };

  const mockRef = (
    clientWidth: number,
    type: 'once' | 'default' = 'default',
  ) => {
    const ref = { current: {} };
    Object.defineProperty(ref, 'current', {
      set(_current) {
        if (_current) {
          jest
            .spyOn(_current, 'clientWidth', 'get')
            .mockReturnValue(clientWidth);
        }
        this._current = { ..._current, scroll: mockScroll };
      },
      get() {
        return this._current;
      },
    });
    type === 'once'
      ? (useRef as jest.Mock).mockReturnValueOnce(ref)
      : (useRef as jest.Mock).mockReturnValue(ref);
  };

  it('should render cards and accessory correctly for 7 cards', () => {
    mockRef(1224, 'once');
    mockRef(408);
    const { container, getAllByRole } = render(
      <BpkCardListRow {...props}>{mockCards(7)}</BpkCardListRow>,
    );

    expect(container).toMatchSnapshot();
    expect(
      container.getElementsByClassName(
        'bpk-card-list-row__card bpk-card-list-row__card-padding',
      ),
    ).toHaveLength(7);
    expect(getAllByRole('button')).toHaveLength(12); // 7 cards, 2 arrow, 3 indicators
    expect(container.getElementsByClassName('bpk-button')).toHaveLength(2);
    expect(
      container.getElementsByClassName('bpk-page-indicator__indicator'),
    ).toHaveLength(3);
  });

  it('should not render accessory when the number of indicators is 1', () => {
    const { container } = render(
      <BpkCardListRow {...props}>{mockCards(2)}</BpkCardListRow>,
    );

    expect(container.getElementsByClassName('bpk-page-indicator')).toHaveLength(
      0,
    );
  });

  it('should not render accessory when there is no accessory prop', () => {
    const { container } = render(
      <BpkCardListRow {...props} accessory={undefined}>
        {mockCards(7)}
      </BpkCardListRow>,
    );

    expect(container.getElementsByClassName('bpk-page-indicator')).toHaveLength(
      0,
    );
  });

  it('should not render without padding className when number of cards displayed is > 5', () => {
    const { container } = render(
      <BpkCardListRow {...props} numberOfCardsToShow={5}>
        {mockCards(7)}
      </BpkCardListRow>,
    );

    expect(
      container.getElementsByClassName('bpk-card-list-row__card'),
    ).toHaveLength(7);
    expect(
      container.getElementsByClassName('bpk-card-list-row__card-padding'),
    ).toHaveLength(0);
  });

  describe('pagination accessory', () => {
    it('should render cards and accessory correctly for 10 cards with correct aria labels', () => {
      mockRef(1224, 'once');
      mockRef(408);
      const { container } = render(
        <BpkCardListRow {...props}>{mockCards(10)}</BpkCardListRow>,
      );

      expect(
        container.getElementsByClassName('bpk-page-indicator__indicator'),
      ).toHaveLength(4);
      expect(
        screen.getByRole('button', { name: 'Previous' }),
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Go to slide 1' }),
      ).toBeInTheDocument();
    });

    it('should update the pageIndicator buttons when next arrow clicked', async () => {
      mockRef(1224, 'once');
      mockRef(408);
      const { container } = render(
        <BpkCardListRow {...props}>{mockCards(4)}</BpkCardListRow>,
      );
      const prevArrow = screen.getByRole('button', { name: 'Previous' });
      const nextArrow = screen.getByRole('button', { name: 'Next' });

      expect(
        container.getElementsByClassName('bpk-page-indicator__indicator'),
      ).toHaveLength(2);
      expect(prevArrow).toHaveAttribute('disabled', '');
      expect(nextArrow).not.toHaveAttribute('disabled');

      await userEvent.click(nextArrow);

      expect(prevArrow).not.toHaveAttribute('disabled');
      expect(nextArrow).toHaveAttribute('disabled', '');
    });

    it('should update the pageIndicator indicators on click with correct aria labels', async () => {
      mockRef(1224, 'once');
      mockRef(408);
      const { container } = render(
        <BpkCardListRow {...props}>{mockCards(4)}</BpkCardListRow>,
      );
      const indicator1 = screen.getByRole('button', { name: 'Go to slide 1' });
      const indicator2 = screen.getByRole('button', { name: 'Go to slide 2' });

      expect(
        container.getElementsByClassName('bpk-page-indicator__indicator'),
      ).toHaveLength(2);
      expect(indicator1).toHaveAttribute('aria-current', 'true');
      expect(indicator2).toHaveAttribute('aria-current', 'false');

      await userEvent.click(indicator2);

      expect(indicator1).toHaveAttribute('aria-current', 'false');
      expect(indicator2).toHaveAttribute('aria-current', 'true');
    });
  });
});
