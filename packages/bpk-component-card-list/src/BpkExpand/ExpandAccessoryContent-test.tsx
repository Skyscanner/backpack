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

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ExpandAccessoryContent from './ExpandAccessoryContent';

describe('ExpandAccessoryContent', () => {
  const onExpandToggle = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly when collapsed', async () => {
    const user = userEvent.setup();

    render(
      <ExpandAccessoryContent collapsed onExpandToggle={onExpandToggle}>
        Expand
      </ExpandAccessoryContent>,
    );

    const button = screen.getByTestId('bpk-card-list__accessory-expand-button');
    expect(button).toHaveTextContent('Expand');

    await user.click(button);
    expect(onExpandToggle).toHaveBeenCalled();
  });

  it('should render correctly when expanded', async () => {
    const user = userEvent.setup();

    render(
      <ExpandAccessoryContent collapsed={false} onExpandToggle={onExpandToggle}>
        Collapse
      </ExpandAccessoryContent>,
    );

    const button = screen.getByTestId('bpk-card-list__accessory-expand-button');
    expect(button).toHaveTextContent('Collapse');

    await user.click(button);
    expect(onExpandToggle).toHaveBeenCalled();
  });
});
