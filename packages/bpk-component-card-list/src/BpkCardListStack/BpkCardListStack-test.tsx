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

import BpkCardListStack from './BpkCardListStack';

describe('BpkCardListStack', () => {
  it('should show expand accessory', () => {
    const cards = Array(12).map(() => <BpkCard>test</BpkCard>);
    render(
      <BpkCardListStack
        accessory="expand"
        expandText="Show More"
        showContent={jest.fn()}
        hideContent={jest.fn()}
        collapsed
        setCollapsed={jest.fn()}
        onButtonClick={jest.fn()}
      >
        {cards}
      </BpkCardListStack>,
    );

    expect(screen.getByRole('button')).toHaveClass(
      'bpk-button bpk-button--link',
    );
  });

  it('should show button accessory', async () => {
    const cards = Array(12).map(() => <BpkCard>test</BpkCard>);
    const onButtonClick = jest.fn();
    render(
      <BpkCardListStack
        accessory="button"
        buttonText="Show More"
        onButtonClick={onButtonClick}
      >
        {cards}
      </BpkCardListStack>,
    );
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveClass(
      'bpk-button bpk-button--primary',
    );
    expect(onButtonClick).toHaveBeenCalled();
  });
});
