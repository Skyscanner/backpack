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
import userEvent from '@testing-library/user-event';

import BpkCard from '../../../bpk-component-card';

import BpkCardListGrid from './BpkCardListGrid';

describe('BpkCardListGrid', () => {
  it('should show expand accessory', () => {
    const cards = Array(12).map(() => <BpkCard>test</BpkCard>);
    render(
      <BpkCardListGrid
        accessory="expand"
        expandText="Show More"
        showContent={jest.fn()}
        hideContent={jest.fn()}
        collapsed
        setCollapsed={jest.fn()}
        onButtonClick={jest.fn()}
      >
        {cards}
      </BpkCardListGrid>,
    );

    expect(screen.getByRole('button')).toHaveClass(
      'bpk-button bpk-button--link',
    );
  });

  it('should show button accessory and handle onButtonClick', async () => {
    const cards = Array(12).map(() => <BpkCard>test</BpkCard>);
    const onButtonClick = jest.fn();
    render(
      <BpkCardListGrid
        accessory="button"
        buttonText="Show More"
        onButtonClick={onButtonClick}
      >
        {cards}
      </BpkCardListGrid>,
    );
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveClass(
      'bpk-button bpk-button--primary',
    );
    expect(onButtonClick).toHaveBeenCalled();
  });
});
