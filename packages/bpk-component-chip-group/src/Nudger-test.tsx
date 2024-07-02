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

import type { MutableRefObject } from 'react';

import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CHIP_TYPES } from '../../bpk-component-chip';

import Nudger, { POSITION } from './Nudger';


const mockIsRtl = jest.fn(() => false);

jest.mock('../../bpk-react-utils/index', () => ({
  ...jest.requireActual('../../bpk-react-utils/index'),
  isRTL: () => mockIsRtl(),
}));

const createMockScrollContainerRef = (isRtl: boolean): MutableRefObject<HTMLElement> => ({
  current: {
    scrollBy: jest.fn() as (options?: any) => void,
    offsetWidth: 100,
    scrollLeft: isRtl ? -150 : 150,
    scrollWidth: 500,
  },
} as MutableRefObject<HTMLElement>);

describe('Nudger', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it.each([
    [POSITION.trailing, false],
    [POSITION.leading, false],
    [POSITION.trailing, true],
    [POSITION.leading, true],
  ])('should call scrollBy when leading=%s and isRtl=%s', async (position, isRtl) => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const mockScrollContainerRef = createMockScrollContainerRef(isRtl);
    mockIsRtl.mockReturnValue(isRtl);
    render(<Nudger ariaLabel="nudge" scrollContainerRef={mockScrollContainerRef} position={position} />);
    await waitFor(() => {
      expect(screen.queryByRole('button')).not.toHaveAttribute('disabled');
    });

    await user.click(screen.getByRole('button'));

    const leading = position === POSITION.leading;
    const isLeft = (leading && !isRtl) || (!leading && isRtl);
    expect(mockScrollContainerRef.current.scrollBy).toHaveBeenCalledTimes(1);
    expect(mockScrollContainerRef.current.scrollBy).toHaveBeenCalledWith({
      left: isLeft ? -150 : 150,
      behavior: 'smooth',
    });
  });

  it('should render button style matching chips',  async () => {
    render(<Nudger position={POSITION.leading} ariaLabel="scroll" scrollContainerRef={createMockScrollContainerRef(false)} chipStyle={CHIP_TYPES.onDark} />);
    await waitFor(() => {
      expect(screen.queryByRole('button')).toBeVisible();
    });

    expect(screen.getByRole('button')).toHaveClass('bpk-button--secondary-on-dark');
  });
});
