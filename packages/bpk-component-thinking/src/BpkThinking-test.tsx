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

import { render, screen } from '@testing-library/react';

import BpkThinking from './BpkThinking';

describe('BpkThinking', () => {
  it('should render correctly with default props', () => {
    const { asFragment } = render(<BpkThinking content="Thinking..." />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render provided content', () => {
    render(<BpkThinking content="Thinking..." />);

    expect(screen.getByText('Thinking...')).toBeInTheDocument();
  });

  it('should render custom content when provided', () => {
    const customContent = 'Processing your request...';
    render(<BpkThinking content={customContent} />);

    expect(screen.getByText(customContent)).toBeInTheDocument();
  });

  it('should render dots with aria-hidden', () => {
    const { container } = render(<BpkThinking content="Thinking..." />);

    const dotsContainer = container.querySelector(
      '.bpk-thinking__dots[aria-hidden="true"]',
    );
    expect(dotsContainer).toBeInTheDocument();
  });

  it('should render two animated dots', () => {
    const { container } = render(<BpkThinking content="Thinking..." />);

    const dots = container.querySelectorAll('.bpk-thinking__dots--dot');
    expect(dots).toHaveLength(2);
  });

  it('should render the bubble with content', () => {
    const { container } = render(<BpkThinking content="Thinking..." />);

    const bubble = container.querySelector('.bpk-thinking__bubble');
    expect(bubble).toBeInTheDocument();
    expect(bubble).toHaveTextContent('Thinking...');
  });

  it('should handle long content correctly', () => {
    const longContent =
      'This is a very long thinking content to test how the component handles longer text scenarios and ensures proper wrapping';
    render(<BpkThinking content={longContent} />);

    expect(screen.getByText(longContent)).toBeInTheDocument();
  });
});
