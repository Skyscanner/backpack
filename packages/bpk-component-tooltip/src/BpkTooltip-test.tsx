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
// @ts-nocheck

import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import BpkTooltip from './BpkTooltip';
import { TOOLTIP_TYPES } from './constants';

describe('BpkTooltip', () => {
  it('should render correctly', () => {
    const target = <span>My tooltip target</span>;

    render(
      <BpkTooltip
        id="my-popover"
        target={target}
        ariaLabel="My tooltip content"
        isOpen
      >
        My tooltip content
      </BpkTooltip>,
    );

    expect(screen.getByText('My tooltip content')).toBeVisible();
  });

  it('should render correctly with type=dark', async () => {
    const target = <span>My tooltip target</span>;

    render(
      <BpkTooltip
        id="my-popover"
        type={TOOLTIP_TYPES.dark}
        ariaLabel="My tooltip content"
        target={target}
        isOpen
      >
        My tooltip content
      </BpkTooltip>,
    );

    await userEvent.hover(screen.getByText('My tooltip target'));

    await waitFor(() => {
      expect(screen.getByText('My tooltip content')).toBeVisible();
      expect(screen.getByText('My tooltip content').className).toContain(
        'bpk-tooltip__inner--dark',
      );
    });
  });

  it('should render correctly with "padded" attribute equal to false', async () => {
    const target = <span>My tooltip target</span>;

    render(
      <BpkTooltip
        id="my-popover"
        ariaLabel="My tooltip content"
        target={target}
        padded={false}
        isOpen
      >
        My tooltip content
      </BpkTooltip>,
    );

    await userEvent.hover(screen.getByText('My tooltip target'));

    await waitFor(() => {
      expect(screen.getByText('My tooltip content')).toBeVisible();
      expect(screen.getByText('My tooltip content').className).not.toContain(
        'bpk-tooltip__inner--padded',
      );
    });
  });
});
