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
import { BpkFlex } from './BpkFlex';
import { BpkGrid } from './BpkGrid';
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

  it('BpkFlex basic usage should not have detectable accessibility issues', async () => {
    const { container } = render(
      <BpkProvider>
        <BpkFlex
          role="group"
          aria-label="Flex container"
          direction="row"
          gap={BpkSpacing.MD}
        >
          <BpkBox>Item 1</BpkBox>
          <BpkBox>Item 2</BpkBox>
        </BpkFlex>
      </BpkProvider>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('BpkGrid basic usage should not have detectable accessibility issues', async () => {
    const { container } = render(
      <BpkProvider>
        <BpkGrid
          role="region"
          aria-label="Layout Grid"
          templateColumns="repeat(2, 1fr)"
          gap={BpkSpacing.MD}
        >
          <BpkBox>Cell 1</BpkBox>
          <BpkBox>Cell 2</BpkBox>
          <BpkBox>Cell 3</BpkBox>
          <BpkBox>Cell 4</BpkBox>
        </BpkGrid>
      </BpkProvider>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
