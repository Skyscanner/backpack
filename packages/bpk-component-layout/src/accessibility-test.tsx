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

import '@testing-library/jest-dom';

import { BpkBox } from './BpkBox';
import { BpkProvider } from './BpkProvider';
import { BpkStack } from './BpkStack';
import { BpkSpacing } from './tokens';

describe('bpk-component-layout accessibility tests', () => {
  it('BpkBox basic usage should not have detectable accessibility issues', async () => {
    const { container } = render(
      <BpkProvider>
        <BpkBox
          role="region"
          aria-label="Layout region"
          padding={BpkSpacing.MD}
        >
          Accessible layout content
        </BpkBox>
      </BpkProvider>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('BpkStack basic usage should not have detectable accessibility issues', async () => {
    const { container } = render(
      <BpkProvider>
        <BpkStack
          role="group"
          aria-label="Stack region"
          gap={BpkSpacing.MD}
        >
          <div>Item one</div>
          <div>Item two</div>
        </BpkStack>
      </BpkProvider>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

});
