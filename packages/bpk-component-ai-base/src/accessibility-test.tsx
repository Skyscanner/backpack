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

import BpkAiBase from './BpkAiBase';

// Mock layout components that depend on @chakra-ui/react (not available in Jest)
jest.mock('../../bpk-component-layout/src/BpkStack', () => ({
  BpkVStack: ({ children, ...props }: any) => <div data-testid="mock-vstack" {...props}>{children}</div>,
}));

jest.mock('../../bpk-component-layout/src/BpkBox', () => ({
  BpkBox: ({ children, ...props }: any) => <div data-testid="mock-box" {...props}>{children}</div>,
}));

describe('BpkAiBase accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkAiBase.Root>
        <BpkAiBase.Header>Header</BpkAiBase.Header>
        <BpkAiBase.Content>Content</BpkAiBase.Content>
        <BpkAiBase.Footer>Footer</BpkAiBase.Footer>
      </BpkAiBase.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
