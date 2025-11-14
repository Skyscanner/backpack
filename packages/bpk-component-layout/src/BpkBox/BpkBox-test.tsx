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

import { BpkLayoutProvider } from '../BpkLayoutProvider';

import BpkBox from './BpkBox';

// Wrap component with BpkLayoutProvider for tests
const renderWithLayout = (component: ReactElement) => render(<BpkLayoutProvider>{component}</BpkLayoutProvider>);

describe('BpkBox', () => {
  it('should render correctly', () => {
    const { container } = renderWithLayout(<BpkBox>Test content</BpkBox>);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveTextContent('Test content');
  });

  it('should render children', () => {
    const { getByText } = renderWithLayout(
      <BpkBox>Test content</BpkBox>,
    );
    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('should not support custom className', () => {
    const { container } = renderWithLayout(
      <BpkBox className="custom-classname">Content</BpkBox>,
    );
    expect(container.firstChild).not.toHaveClass('custom-classname');
  });

  it('should support Backpack spacing tokens', () => {
    const { container } = renderWithLayout(
      <BpkBox padding="base" margin="lg">
        Content
      </BpkBox>,
    );
    const box = container.firstChild as HTMLElement;
    expect(box).toBeInTheDocument();
  });

  it('should support Backpack color tokens', () => {
    const { container } = renderWithLayout(
      <BpkBox bg="canvas-contrast" color="text-primary">
        Content
      </BpkBox>,
    );
    const box = container.firstChild as HTMLElement;
    expect(box).toBeInTheDocument();
  });

  it('should support as prop for semantic HTML', () => {
    const { container } = renderWithLayout(
      <BpkBox as="section">Content</BpkBox>,
    );
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('should support arbitrary props', () => {
    const { getAllByTestId } = renderWithLayout(
      <BpkBox data-testid="test-box">Content</BpkBox>,
    );
    expect(getAllByTestId('test-box').length).toBe(1);
  });
});

