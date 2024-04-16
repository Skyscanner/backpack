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

import { render } from '@testing-library/react';

import { CHIP_TYPES } from '../../bpk-component-chip';

import Nudger from './Nudger';


const mockIsRtl = jest.fn(() => false);

jest.mock('../../bpk-react-utils/index', () => ({
  ...jest.requireActual('../../bpk-react-utils/index'),
  isRTL: () => mockIsRtl(),
}));

const mockScrollContainerRef = {
  current: {
    scrollBy: jest.fn() as (options?: any) => void,
    offsetWidth: 70,
    scrollLeft: 10,
    scrollWidth: 100,
  },
} as MutableRefObject<HTMLElement>;

describe('Nudger', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it.each([
    [false, false],
    [true, false],
    [false, true],
    [true, true],
  ])('should render correctly when leading=%s and isRtl=%s', (leading, isRtl) => {
    mockIsRtl.mockReturnValue(isRtl);

    const { asFragment } = render(<Nudger ariaLabel="nudge" scrollContainerRef={mockScrollContainerRef} leading={leading} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly for onDark chip style', () => {
    const { asFragment } = render(<Nudger ariaLabel="scroll" scrollContainerRef={mockScrollContainerRef} chipStyle={CHIP_TYPES.onDark} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
