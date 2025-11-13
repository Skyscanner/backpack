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

import BpkFlex from './BpkFlex';
import { BpkLayoutProvider } from '../BpkLayoutProvider';

// Wrap component with BpkLayoutProvider for tests
const renderWithLayout = (component: ReactElement) => render(<BpkLayoutProvider>{component}</BpkLayoutProvider>);

describe('BpkFlex', () => {
  it('should render correctly', () => {
    const { container } = renderWithLayout(<BpkFlex>Test content</BpkFlex>);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveTextContent('Test content');
  });

  it('should render children', () => {
    const { getByText } = renderWithLayout(
      <BpkFlex>Test content</BpkFlex>,
    );
    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('should not support custom className', () => {
    const { container } = renderWithLayout(
      <BpkFlex className="custom-classname">Content</BpkFlex>,
    );
    expect(container.firstChild).not.toHaveClass('custom-classname');
  });

  it('should support Backpack spacing tokens', () => {
    const { container } = renderWithLayout(
      <BpkFlex padding="base" gap="md">
        Content
      </BpkFlex>,
    );
    const flex = container.firstChild as HTMLElement;
    expect(flex).toBeInTheDocument();
  });

  it('should support Backpack color tokens', () => {
    const { container } = renderWithLayout(
      <BpkFlex bg="canvas-contrast" color="text-primary">
        Content
      </BpkFlex>,
    );
    const flex = container.firstChild as HTMLElement;
    expect(flex).toBeInTheDocument();
  });

  it('should support flexbox props', () => {
    const { container } = renderWithLayout(
      <BpkFlex flexDirection="column" alignItems="center" justifyContent="space-between">
        Content
      </BpkFlex>,
    );
    const flex = container.firstChild as HTMLElement;
    expect(flex).toBeInTheDocument();
  });

  it('should support Chakra UI Flex shorthand props', () => {
    const { container } = renderWithLayout(
      <BpkFlex align="center" justify="space-between" wrap="wrap" direction="row">
        Content
      </BpkFlex>,
    );
    const flex = container.firstChild as HTMLElement;
    expect(flex).toBeInTheDocument();
  });

  it('should support as prop for semantic HTML', () => {
    const { container } = renderWithLayout(
      <BpkFlex as="nav">Content</BpkFlex>,
    );
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('should support arbitrary props', () => {
    const { getAllByTestId } = renderWithLayout(
      <BpkFlex data-testid="test-flex">Content</BpkFlex>,
    );
    expect(getAllByTestId('test-flex').length).toBe(1);
  });
});

