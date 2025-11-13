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

import BpkGrid from './BpkGrid';
import { BpkLayoutProvider } from '../BpkLayoutProvider';

// Wrap component with BpkLayoutProvider for tests
const renderWithLayout = (component: ReactElement) => render(<BpkLayoutProvider>{component}</BpkLayoutProvider>);

describe('BpkGrid', () => {
  it('should render correctly', () => {
    const { container } = renderWithLayout(<BpkGrid>Test content</BpkGrid>);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveTextContent('Test content');
  });

  it('should render children', () => {
    const { getByText } = renderWithLayout(
      <BpkGrid>Test content</BpkGrid>,
    );
    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('should not support custom className', () => {
    const { container } = renderWithLayout(
      <BpkGrid className="custom-classname">Content</BpkGrid>,
    );
    expect(container.firstChild).not.toHaveClass('custom-classname');
  });

  it('should support Backpack spacing tokens', () => {
    const { container } = renderWithLayout(
      <BpkGrid padding="base" gap="md">
        Content
      </BpkGrid>,
    );
    const grid = container.firstChild as HTMLElement;
    expect(grid).toBeInTheDocument();
  });

  it('should support Backpack color tokens', () => {
    const { container } = renderWithLayout(
      <BpkGrid bg="canvas-contrast" color="text-primary">
        Content
      </BpkGrid>,
    );
    const grid = container.firstChild as HTMLElement;
    expect(grid).toBeInTheDocument();
  });

  it('should support grid props', () => {
    const { container } = renderWithLayout(
      <BpkGrid gridTemplateColumns="repeat(3, 1fr)" gap="base">
        Content
      </BpkGrid>,
    );
    const grid = container.firstChild as HTMLElement;
    expect(grid).toBeInTheDocument();
  });

  it('should support all Chakra UI Grid props including auto props', () => {
    const { container } = renderWithLayout(
      <BpkGrid
        gridTemplateColumns="repeat(3, 1fr)"
        gridAutoFlow="row"
        gridAutoRows="minmax(100px, auto)"
        gridAutoColumns="1fr"
        gridColumnStart={1}
        gridColumnEnd={3}
        gridRowStart={1}
        gridRowEnd={2}
        gap="base"
      >
        Content
      </BpkGrid>,
    );
    const grid = container.firstChild as HTMLElement;
    expect(grid).toBeInTheDocument();
  });

  it('should support as prop for semantic HTML', () => {
    const { container } = renderWithLayout(
      <BpkGrid as="section">Content</BpkGrid>,
    );
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('should support arbitrary props', () => {
    const { getAllByTestId } = renderWithLayout(
      <BpkGrid data-testid="test-grid">Content</BpkGrid>,
    );
    expect(getAllByTestId('test-grid').length).toBe(1);
  });
});

