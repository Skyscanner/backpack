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

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

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

  it('should render correctly with type=dark', () => {
    const target = <span>My tooltip target</span>;

    const { container } = render(
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

    expect(screen.getByText('My tooltip content')).toBeVisible();
    expect(container.querySelector('.bpk-tooltip__inner--dark')).not.toBeNull();
    expect(container.querySelector('.bpk-tooltip__arrow--dark')).not.toBeNull();
  });

  it('should render correctly with "padded" attribute equal to false', () => {
    const target = <span>My tooltip target</span>;

    const { container } = render(
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

    expect(screen.getByText('My tooltip content')).toBeVisible();
    expect(container.querySelector('.bpk-tooltip__inner--padded')).toBeNull();
  });
});
