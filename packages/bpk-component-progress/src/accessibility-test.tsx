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
import { axe } from 'jest-axe';

import BpkProgress from './BpkProgress';

describe('BpkProgress accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <div>
        <label id="label" htmlFor="progress">
          Progress indicator
        </label>
        <BpkProgress
          // @ts-expect-error TS(2769): No overload matches this call.
          id="progress"
          aria-labelledby="label"
          min={0}
          max={100}
          value={25}
        />
      </div>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
