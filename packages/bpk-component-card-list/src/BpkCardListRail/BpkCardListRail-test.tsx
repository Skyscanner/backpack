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
import { render } from '@testing-library/react';

import BpkCard from '../../../bpk-component-card';

import BpkCardListRail from './BpkCardListRail';

describe('BpkCardListRail', () => {
  it('should render cards correctly in the MobileScrollContainer', () => {
    const { container } = render(
      <BpkCardListRail>
        <BpkCard>Card 1</BpkCard>
        <BpkCard>Card 2</BpkCard>
        <BpkCard>Card 3</BpkCard>
      </BpkCardListRail>,
    );

    expect(container).toMatchSnapshot();
    expect(
      container.getElementsByClassName('bpk-card-list--rail_card'),
    ).toHaveLength(3);
  });
});
