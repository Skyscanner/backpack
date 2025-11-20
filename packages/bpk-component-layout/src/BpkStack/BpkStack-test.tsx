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

import type { ReactElement } from 'react';

import { render } from '@testing-library/react';

import { BpkProvider } from '../BpkProvider';

import BpkStack from './BpkStack';

const renderWithLayout = (component: ReactElement) => render(<BpkProvider>{component}</BpkProvider>);

describe('BpkStack', () => {
  it('should render correctly', () => {
    const { container } = renderWithLayout(<BpkStack>Test content</BpkStack>);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveTextContent('Test content');
  });

  it('should support Backpack spacing tokens', () => {
    const { container } = renderWithLayout(
      <BpkStack spacing="base" padding="md">
        Content
      </BpkStack>,
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack).toBeInTheDocument();
  });

  it('should support direction prop', () => {
    const { container } = renderWithLayout(
      <BpkStack direction="row">
        Content
      </BpkStack>,
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack).toBeInTheDocument();
  });

  it('should support numeric pixel values in spacing prop (direct conversion to Chakra UI scale)', () => {
    const { container } = renderWithLayout(
      <BpkStack spacing={2}>Content</BpkStack>, // 2px → Chakra UI 0.5
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack).toBeInTheDocument();
  });

  it('should support responsive spacing prop with numeric values', () => {
    const { container } = renderWithLayout(
      <BpkStack spacing={{ base: 0, lg: 6 }}>Content</BpkStack>, // 0px → 0, lg → smallTablet → lg, 6px → 1.5
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack).toBeInTheDocument();
  });

  it('should support fine-grained numeric spacing values', () => {
    const { container } = renderWithLayout(
      <BpkStack spacing={6}>Content</BpkStack>, // 6px → Chakra UI 1.5
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack).toBeInTheDocument();
  });
});

