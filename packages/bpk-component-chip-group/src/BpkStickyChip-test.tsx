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

import { render, screen , waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CHIP_TYPES } from '../../bpk-component-chip';

import BpkStickyChip from './BpkStickyChip';

let isDesktopMock = true;
const getIsDesktopMock = () => isDesktopMock;

jest.mock('../../bpk-component-breakpoint/src/useMediaQuery', () => ({
  __esModule: true,
  default: () => getIsDesktopMock(),
}));

describe('BpkStickyChip', () => {
  let scrollContainerRef: MutableRefObject<HTMLElement | null>;

  const setup = (props = {}) => {
    const scrollContainer = document.createElement('div');
    document.body.appendChild(scrollContainer);
    scrollContainerRef = { current: scrollContainer };

    return render(
      <BpkStickyChip
        chipStyle={CHIP_TYPES.default}
        stickyChip={{
          text: 'Sort & Filter',
          selected: false,
          onClick: jest.fn(),
        }}
        scrollContainerRef={scrollContainerRef}
        {...props}
      />,
    );
  };

  beforeEach(() => {
    isDesktopMock = true;
  });

  it('renders the sticky chip with full text on desktop', () => {
    setup();
    const chip = screen.getByRole('button', { name: 'Sort & Filter' });
    expect(chip).toBeVisible();
    expect(screen.getByText('Sort & Filter')).toBeVisible();
  });

  it('hides the text on mobile when not at scroll start', async () => {
    isDesktopMock = false;
    setup();

    if (scrollContainerRef.current) {
      Object.defineProperty(scrollContainerRef.current, 'scrollLeft', {
        value: 100,
        writable: true,
      });
      scrollContainerRef.current.dispatchEvent(new Event('scroll'));
    }

    await waitFor(() => {
      const chipText = screen.getByText('Sort & Filter');
      expect(chipText).toHaveClass('bpk-sticky-chip--hide');
    });
  });

  it('shows the text on mobile when at scroll start', async () => {
    isDesktopMock = false;
    setup();

    if (scrollContainerRef.current) {
      Object.defineProperty(scrollContainerRef.current, 'scrollLeft', {
        value: 0,
        writable: true,
      });
      scrollContainerRef.current.dispatchEvent(new Event('scroll'));
    }
    await waitFor(() => {
      const chipText = screen.getByText('Sort & Filter');
      expect(chipText).toHaveClass('bpk-sticky-chip--show');
    });
  });

  it('calls onClick with correct arguments when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <BpkStickyChip
        chipStyle={CHIP_TYPES.default}
        stickyChip={{
          text: 'Sort & Filter',
          selected: false,
          onClick,
        }}
        scrollContainerRef={{ current: document.createElement('div') }}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Sort & Filter' }));

    expect(onClick).toHaveBeenCalledWith(true, -1);
  });

  it('renders nothing if stickyChip is null', () => {
    const { container } = render(
      <BpkStickyChip
        chipStyle={CHIP_TYPES.default}
        stickyChip={null as any}
        scrollContainerRef={{ current: null }}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
