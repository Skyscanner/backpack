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
import { ChakraProvider } from '@chakra-ui/react';

import BpkBox from './BpkBox';

// Wrap component with ChakraProvider for tests
const renderWithChakra = (component: ReactElement) => {
  return render(<ChakraProvider>{component}</ChakraProvider>);
};

describe('BpkBox', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithChakra(<BpkBox>Test content</BpkBox>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render children', () => {
    const { getByText } = renderWithChakra(
      <BpkBox>Test content</BpkBox>,
    );
    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('should support custom className', () => {
    const { container } = renderWithChakra(
      <BpkBox className="custom-classname">Content</BpkBox>,
    );
    expect(container.firstChild).toHaveClass('custom-classname');
  });

  it('should support Chakra UI props', () => {
    const { container } = renderWithChakra(
      <BpkBox padding={4} margin={2} bg="blue.500">
        Content
      </BpkBox>,
    );
    const box = container.firstChild as HTMLElement;
    expect(box).toBeInTheDocument();
  });

  it('should support as prop for semantic HTML', () => {
    const { container } = renderWithChakra(
      <BpkBox as="section">Content</BpkBox>,
    );
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('should support arbitrary props', () => {
    const { getAllByTestId } = renderWithChakra(
      <BpkBox data-testid="test-box">Content</BpkBox>,
    );
    expect(getAllByTestId('test-box').length).toBe(1);
  });
});

