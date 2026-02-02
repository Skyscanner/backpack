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

import BpkBreakpoint, { BREAKPOINTS } from './BpkBreakpoint';

describe('BpkBreakpoint', () => {
  it('should not render when breakpoint is not mocked within tests', () => {
    const { asFragment } = render(
      <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
        <div>doesnt match</div>
      </BpkBreakpoint>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
