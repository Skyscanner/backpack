/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import BpkNudger from './BpkNudger';

describe('BpkNudger accessibility tests', () => {
  /*
  This component's accessibility is lacking right now due to
  use of a read only input. We should improve it soon and then
  this test will become possible.
  */
  it.skip('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkNudger
        id="nudger"
        min={1}
        max={9}
        value={2}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
