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

import { createRef } from 'react';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { BpkGrid } from './BpkGrid';
import { BpkProvider } from './BpkProvider';
import { BpkSpacing } from './tokens';

describe('BpkGrid', () => {
  it('renders children content', () => {
    const { getByText } = render(
      <BpkProvider>
        <BpkGrid>Content</BpkGrid>
      </BpkProvider>,
    );
    expect(getByText('Content')).toBeInTheDocument();
  });

  it('forwards ref to the underlying DOM element', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <BpkProvider>
        <BpkGrid ref={ref}>Content</BpkGrid>
      </BpkProvider>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes tabIndex to the DOM element', () => {
    const { container } = render(
      <BpkProvider>
        <BpkGrid tabIndex={0}>Content</BpkGrid>
      </BpkProvider>,
    );
    expect(container.firstChild).toHaveAttribute('tabindex', '0');
  });

  it('passes role to the DOM element', () => {
    const { container } = render(
      <BpkProvider>
        <BpkGrid role="grid">Content</BpkGrid>
      </BpkProvider>,
    );
    expect(container.firstChild).toHaveAttribute('role', 'grid');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <BpkProvider>
        <BpkGrid onClick={handleClick}>Clickable</BpkGrid>
      </BpkProvider>,
    );
    fireEvent.click(getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onKeyDown when a key is pressed', () => {
    const handleKeyDown = jest.fn();
    const { getByText } = render(
      <BpkProvider>
        <BpkGrid role="button" tabIndex={0} onKeyDown={handleKeyDown}>
          Interactive
        </BpkGrid>
      </BpkProvider>,
    );
    fireEvent.keyDown(getByText('Interactive'), { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it('renders when textStyle is provided', () => {
    const { getByText } = render(
      <BpkProvider>
        <BpkGrid textStyle="body-default">Content</BpkGrid>
      </BpkProvider>,
    );
    expect(getByText('Content')).toBeInTheDocument();
  });

  it('accepts grid props: justify, align, gap', () => {
    const { container } = render(
      <BpkProvider>
        <BpkGrid justify="center" align="center" gap={BpkSpacing.MD}>
          Content
        </BpkGrid>
      </BpkProvider>,
    );
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle('justify-content: center');
    expect(container.firstChild).toHaveStyle('align-items: center');
    expect(container.firstChild).toHaveStyle('gap: .5rem');
  });
});
